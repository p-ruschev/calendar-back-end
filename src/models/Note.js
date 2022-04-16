const mongoose = require("mongoose");

let noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: [4, "End point should be at least 4 characters"],
      maxlength: [20, "End point should be at max 20 characters"],
    },
    description: {
      type: String,
      required: true,
      minlength: [4, "End point should be at least 4 aracters"],
    },
    year: {
      require: true,
      type: Number,
    },
    month: {
      require: true,
      type: Number,
    },
    day: {
      require: true,
      type: Number,
    },
    hour: {
      type: String,
    },
    minutes: {
      type: String,
    },
    owner: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

let Note = mongoose.model("Note", noteSchema);

module.exports = Note;
