const router = require("express").Router();

const calendarService = require("../services/calendarService");
//const { isGuest, isOwner, isNotOwner, hasNotJoined } = require('../middlewares/securityMiddleware');
const { isAuth } = require("../middlewares/authMiddleware");
//const { handleMultipleErrors } = require('../middlewares/errorHandler');
//
const renderAgenda = async (req, res) => {
  try {
    const year = req.query.year;
    const month = req.query.month;
    const user = req.user ? req.user : null;
    const agenda = await calendarService.getMonthAgenda(year, month, user);
    res.status(200).json(agenda);
  } catch (error) {
    console.log("error");
  }
};

const searchNotes = async (req, res) => {
  try {
    const user = req.user;
    const title = req.query.title;
    const year = req.query.year;
    const month = req.query.month;
    const day = req.query.day;
    const holidaysOption = {};
    const notesOption = {};

    if (title) {
      holidaysOption.title = { $regex: title, $options: "i" };
      notesOption.title = { $regex: title, $options: "i" };
    }
    if (year) {
      holidaysOption.year = year;
      notesOption.year = year;
    }
    if (month) {
      holidaysOption.month = Number(month);
      notesOption.month = Number(month);
    }
    if (day) {
      holidaysOption.day = Number(day);
      notesOption.day = Number(day);
    }
    notesOption.owner = user;

    //    const holidaysOption = {title: {$regex: title, $options: 'i'}, month, day};
    //    const notesOption = {title: {$regex: title, $options: 'i'}, year, month, day, owner: user};

    const result = await calendarService.searchNotes(
      holidaysOption,
      notesOption
    );

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};

const initGetOneNote = async (req, res) => {
  try {
    const noteId = req.params.noteId;
    const user = req.user ? req.user : null;
    const agenda = await calendarService.getOneNote(noteId, user);
    res.status(200).json(agenda[0]);
  } catch (error) {
    console.log("error");
  }
};

const initGetOneCalNote = async (req, res) => {
  try {
    const noteId = req.params.noteId;
    const user = req.user ? req.user : null;
    const agenda = await calendarService.getOneCalNote(noteId, user);
    res.status(200).json(agenda[0]);
  } catch (error) {
    console.log(error);
  }
};
//const renderCreate = (req, res) => {
//  res.render('trips/trip-create');
//};
const initializeCreateHoliday = async (req, res) => {
  try {
    const data = {
      title: req.body.title,
      description: req.body.description,
      day: req.body.day,
      month: req.body.month,
    };
    const holiday = await calendarService.createHoliday({
      ...data,
      creator: req.user._id,
    });
    res.status(200).json(holiday);
  } catch (error) {
    console.log("error");
    //  handleMultipleErrors(res, error, 'trips/trip-create');
  }
};

const initializeCreateNote = async (req, res) => {
  try {
    const note = await calendarService.createNote({
      ...req.body,
      owner: req.user._id,
    });
    res.status(200).json(note);
  } catch (error) {
    console.log("error");
    //  handleMultipleErrors(res, error, 'trips/trip-create');
  }
};

const initializeEditNote = async (req, res) => {
  try {
    const note = await calendarService.updateNote(req.params.noteId, {
      ...req.body,
    });
    res.status(200).json({ note });
  } catch (error) {
    console.log("error");
    //  handleMultipleErrors(res, error, 'trips/trip-create');
  }
};

const initializeEditCalNote = async (req, res) => {
  try {
    const note = await calendarService.updateCalNote(req.params.noteId, {
      ...req.body,
    });
    res.status(200).json({ note });
  } catch (error) {
    console.log("error");
    //  handleMultipleErrors(res, error, 'trips/trip-create');
  }
};

/*
const initializeGetAll = async (req, res) => {
  try {
    const allPosters = await posterService.getAll();
    res.status(200).json(allPosters);
  } catch(error) {
    console.log(error);
  }
}
*/

const initializeDeleteNote = async (req, res) => {
  try {
    const noteId = req.params.noteId;
    const owner = req.user._id;
    await calendarService.deleteNote(noteId, owner);
    res.status(200).json({ deletion: true });
  } catch (error) {
    console.log(error);
  }
};
const initializeDeleteCalNote = async (req, res) => {
  try {
    const noteId = req.params.noteId;
    const creator = req.user._id;
    await calendarService.deleteCalNote(noteId, creator);
    res.status(200).json({ deletion: true });
  } catch (error) {
    console.log(error);
  }
};
//
//
//
//const renderDetails = async (req, res, next) => {
//  try {
//    const tripId = req.params.tripId;
//    const userId = req.user?._id;
//    const trip = await tripService.getOne(tripId);
//    const isCreator = userId == trip.creator._id;
//    const hasJoined = trip.buddies.some(x => x._id == userId);
//    const availableSeats = trip.seats == 0 ? false : true;
//    const buddies =  trip.buddies.length > 0
//      ? trip.buddies.map(x => x.email).join(', ')
//      : null;
//    res.render('trips/trip-details', {...trip, buddies, isCreator, hasJoined, availableSeats});
//  } catch(error) {
//    next(error);
//  }
//};
//
//const initializeDelete = async (req, res, next) => {
//  try {
//    await tripService.deleteOne(req.params.tripId);
//    res.redirect('/trips');
//  } catch(error) {
//    next(error);
//  }
//};
//
//const initializeJoin = async (req, res, next) => {
//  try {
//    const tripId = req.params.tripId;
//    const userId = req.user?._id;
//    await tripService.join(tripId, userId);
//    const trip = await tripService.getOne(tripId);
//    const isCreator = userId == trip.creator._id;
//    const hasJoined = trip.buddies.some(x => x._id == userId);
//    const availableSeats = trip.seats == 0 ? false : true;
//    const buddies =  trip.buddies.length > 0
//      ? trip.buddies.map(x => x.email).join(', ')
//      : null;
//      res.redirect('/trips/' + tripId + '/details')
//    //res.render('trips/trip-details', {...trip, buddies, isCreator, hasJoined, availableSeats});
//  } catch(error) {
//    next(error);
//  }
//};
//
//const renderEdit = async (req, res) => {
//  res.render('trips/trip-edit', req.trip);
//};
//const initializeEdit = async (req, res) => {
//   try {
//    await tripService.editOne(req.params.tripId, req.body);
//    res.redirect('/trips/' + req.params.tripId + '/details');
//  } catch(error) {
//    const _id = req.trip._id;
//    handleMultipleErrors(res, error, 'trips/trip-edit', {...req.body, _id});
//}
//}
////const renderSearch = async (req, res) => {
////  res.render('search');
////};
////
////const initializeSearch = async (req, res, next) => {
//// try {
////   const { type } = req.body;
////   const offers = await search(type);
////   const searched = true;
////   res.render('search', {offers, searched});
////
//// } catch(error) {
////   console.log(error);
////    next(error);
//// }
////};
////
router.get("/", renderAgenda);
router.get("/search", searchNotes);
router.get("/edit-custom-note/:noteId", isAuth, initGetOneNote);
router.get("/edit-calendar-note/:noteId", isAuth, initGetOneCalNote);
//router.get('/create', isAuth, renderCreate);
router.post("/create-holiday", isAuth, initializeCreateHoliday);
router.post("/create-note", isAuth, initializeCreateNote);
//router.get('/all', initializeGetAll);
//router.get('/:tripId/details', renderDetails);
router.delete("/delete-custom-note/:noteId", isAuth, initializeDeleteNote);
router.delete("/delete-calendar-note/:noteId", isAuth, initializeDeleteCalNote);
//router.get('/:tripId/join', isAuth, isNotOwner, hasNotJoined, initializeJoin);
//router.get('/:tripId/edit', isAuth, isOwner, renderEdit);
router.put("/edit-custom-note/:noteId", isAuth, initializeEditNote);
router.put("/edit-calendar-note/:noteId", isAuth, initializeEditCalNote);
//router.get('/search',  renderSearch);
//router.post('/search',  initializeSearch);
//
module.exports = router;
