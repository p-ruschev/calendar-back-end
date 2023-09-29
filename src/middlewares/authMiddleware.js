const { verify } = require("../utils/jwt");

const auth = (req, res, next) => {
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
