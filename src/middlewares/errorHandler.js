const errorHandler = function (error, req, res, next) {
  if (error) {
    res.locals.errors = [error];
    res.status(404).render("404");
  } else {
    next();
  }
};

const handleMultipleErrors = (res, error, renderView, body) => {
  if (error.errors) {
    const errorsResult = [];
    Object.keys(error.errors).forEach((e) =>
      errorsResult.push(error.errors[e].properties)
    );
    res.locals.errors = errorsResult;
  } else {
    res.locals.errors = [error];
  }
  if (body) {
    return res.render(renderView, body);
  } else {
    return res.render(renderView);
  }
};
module.exports = { errorHandler, handleMultipleErrors };
