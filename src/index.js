
require('dotenv').config();

const app = require('express')();
var request = require('request');
var cors = require('cors');
const cache = require('./cache.js');

const PORT = process.env.PORT;
const apiUrl = "http://api.coinlayer.com/api/";
const target = "EUR";


app.use(
    cors({
        origin: "http://localhost:3000"
    })
);
//obtain API_KEY from coinlayer.com by using the free tier.

// Caching is done for an houre because the coinlayer free api restricts free users to 25 request per 24h.
// The "target" variable determines the denominating currency and could be handed of to the front-end to be determined by the enduser. 
app.get('/getCoin', cache(3600000), (req,res) => {
    request.get({
        url: apiUrl+"live?"+"&access_key="+process.env.API_KEY+"&target="+target,
        json: true,
        headers: {'User-Agent': 'request'}
      }, (err, responce, data) => {
        if (err) {
            console.log('Error:', err);
        } else if (responce.statusCode !== 200) {
            console.log('Status:', responce.statusCode);
            return res.status(500).send({ error: 'API error' }); 
        } else {
            console.log(responce);
            res.status(200).send(responce);
        }
    });
});

if (require.main === module) {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
}
module.exports = app;

