const errorHandler = function (error, req, res, next) {
  if (error) {
    res.locals.errors = [error];
    res.status(404).render("404");
  } else {
    next();
  }
};

const handleMultipleErrors = (res, error ) => {
  if (error.errors) {
    const errorsResult = [];
    Object.keys(error.errors).forEach((e) =>
      errorsResult.push(error.errors[e].properties)
    );
    res.json({error: errorsResult})
  } else {
    res.json({error: error})
  }
};
module.exports = { errorHandler, handleMultipleErrors };
