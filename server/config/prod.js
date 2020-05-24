//prod.js - production keys!
module.exports = {
  mongoURI: process.env.MONGO_URI,
  redirectDomain: process.env.REDIRECT_DOMAIN,
  cookieSecret: process.env.COOKIE_SECRET
};
