const Note = require("../models/Note");
const Holiday = require("../models/Holiday");

const createHoliday = (data) => Holiday.create(data);
const createNote = (data) => Note.create(data);
const deleteNote = (id, owner) => Note.deleteOne({ _id: id, owner: owner });
const deleteCalNote = (id, creator) =>
  Holiday.deleteOne({ _id: id, creator: creator });

const getAll = () => Poster.find().lean();
const getMonthAgenda = async (year, month, user) => {
  const holidays = await Holiday.find({ month: month });
  const notes = await Note.find({ year: year, month: month, owner: user });
  return { holidays, notes };
};

const searchNotes = async (holidaysOption, notesOption) => {
  const holidays = await Holiday.find(holidaysOption);
  const notes = await Note.find(notesOption);
  return { holidays, notes };
};

const getOneNote = async (noteId, user) => {
  const note = await Note.find({ _id: noteId, owner: user });
  return note;
};

const getOneCalNote = async (noteId, user) => {
  const note = await Holiday.find({ _id: noteId, creator: user });
  return note;
};

const updateNote = async (noteId, editData) => {
  await Note.findOneAndUpdate({ _id: noteId }, editData, {
    runValidators: true,
  });
  const result = await Note.findOne({ _id: noteId });
  return result;
};

const updateCalNote = async (noteId, editData) => {
  await Holiday.findOneAndUpdate({ _id: noteId }, editData, {
    runValidators: true,
  });
  const result = await Holiday.findOne({ _id: noteId });
  return result;
};

const calendarService = {
  createHoliday,
  createNote,
  getAll,
  getMonthAgenda,
  searchNotes,
  getOneNote,
  getOneCalNote,
  deleteNote,
  deleteCalNote,
  updateNote,
  updateCalNote,
};

module.exports = calendarService;
