const NodeCahe = require('node-cache');
const cache = new NodeCahe();

module.exports = duration =>(req, res, next) =>{
    if (req.method !== 'GET') {
        console.log("can not cache non-GEt reqest");
        return next();
    }
    const key = req.originalUrl;
    const cachedResponce = cache.get(key);

    if (cachedResponce) {
        console.log('cache hit for '+ key)
        res.send(cachedResponce);
        return;
    } else {
        console.log('Cahce miss for ' +key);

        res.originalSend = res.send;

        res.send = body =>{
            try {
                // Serialize body to JSON before caching
                const serializedBody = typeof body === 'object' ? JSON.stringify(body) : body;
                cache.set(key, serializedBody, duration);
                res.originalSend(body);
            } catch (err) {
                console.error('Error caching response:', err);
                originalSend(body);
            }
        };
        next();
    }

};