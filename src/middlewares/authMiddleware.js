const { verify } = require("../utils/jwt");
// const { AUTH_KEY, JWT_SECRET } = require("../constants");

const auth = (req, res, next) => {
  //  console.log(req);
  let token = req.headers[process.env.AUTH_KEY];
  if (token) {
    verify(token, process.env.JWT_SECRET)
      .then((decodedToken) => {
        req.user = decodedToken;
        next();
      })
      .catch((err) => {
        res.status(401).json({ msg: err.message });
      });
  } else {
    next();
  }
};

const isAuth = (req, res, next) => {
  if (req.user) {
    next();
  }
};

const authMiddleware = {
  auth,
  isAuth,
};

module.exports = authMiddleware;
