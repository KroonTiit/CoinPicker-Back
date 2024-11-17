Server for connecting to coinlayer.com api and serving CoinPicker-Front with data.

Obtain API_KEY from coinlayer.com by signing up for the free tier.

CoinPicker-Back is made with Nodejs and ExpressJs.
No database is used with this server; it caches the response from coinlayer for an hour and serves that.
The reasoning for this implementation is due to the time constraint that happened to occur during the development of this project.
