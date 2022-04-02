const tripService = require("../services/tripService");
exports.isGuest = function (req, res, next) {
  if (!req.user) {
    next();
  } else {
    res.redirect("/");
  }
};

exports.isOwner = async function (req, res, next) {
  try {
    const trip = await tripService.getOne(req.params.tripId);
    console.log(req.user?._id);
    console.log(trip.creator);
    if (req.user?._id == trip.creator._id) {
      req.trip = trip;
      next();
    } else {
      res.redirect(`/trips/${req.params.tripId}/details`);
    }
  } catch (error) {
    next(error);
  }
};

exports.isNotOwner = async function (req, res, next) {
  try {
    const trip = await tripService.getOne(req.params.tripId);
    if (req.user?._id != trip.creator._id) {
      req.trip = trip;
      next();
    } else {
      res.redirect(`/trips/${req.params.tripId}/details`);
    }
  } catch (error) {
    next(error);
  }
};

exports.hasNotJoined = async function (req, res, next) {
  try {
    const trip = await tripService.getOne(req.params.tripId);
    const hasJoined = trip.buddies.some((x) => x._id == req.user._id);
    if (!hasJoined) {
      req.trip = trip;
      next();
    } else {
      res.redirect(`/trips/${req.params.tripId}/details`);
    }
  } catch (error) {
    next(error);
  }
};
