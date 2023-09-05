const router = require("express").Router();

const calendarService = require("../services/calendarService");
const { isAuth } = require("../middlewares/authMiddleware");

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
  }
};

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

router.get("/", renderAgenda);
router.get("/search", searchNotes);
router.get("/edit-custom-note/:noteId", initGetOneNote);
router.get("/edit-calendar-note/:noteId", initGetOneCalNote);
router.post("/create-holiday", initializeCreateHoliday);
router.post("/create-note", initializeCreateNote);
router.delete("/delete-custom-note/:noteId", initializeDeleteNote);
router.delete("/delete-calendar-note/:noteId", isAuth, initializeDeleteCalNote);
router.put("/edit-custom-note/:noteId", isAuth, initializeEditNote);
router.put("/edit-calendar-note/:noteId", isAuth, initializeEditCalNote);

module.exports = router;
