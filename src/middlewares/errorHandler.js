const errorHandler = function (error, req, res, next) {
  if (error) {
    res.status(404).json({error});
  } else {
    next();
  }
};

module.exports = { errorHandler };
