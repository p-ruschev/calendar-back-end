const mongoose = require("mongoose");

let holidaySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: [4, "End point should be at least 4 aracters"],
    },
    description: {
      type: String,
      required: true,
      minlength: [4, "End point should be at least 4 aracters"],
    },
    day: {
      type: Number,
      require: true,
      min: [1, "well can't be less than 1"],
      max: [31, "well can't be more than 31"],
    },
    month: {
      type: Number,
      require: true,
      min: [1, "well can't be less than 1"],
      max: [12, "well can't be more than 12"],
    },
    creator: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

let Holiday = mongoose.model("Holiday", holidaySchema);

module.exports = Holiday;
