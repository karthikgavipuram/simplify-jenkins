const  projectconfig = require('../config/projconfig').get(process.env.NODE_ENV)

const isAuthenticated = (req, res, next) => {
  const redirectURL = `${req.protocol}://${req.headers.host}${req.path}`;
  if(!req.headers.referer || !req.headers.referer.includes('login')){
    if (req.cookies.ssoCookie == null) {
      return res.redirect(
        `${projectconfig.redirectUrl[0]}`
      );
    }
  }
  next()
};

module.exports = isAuthenticated;
