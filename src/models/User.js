const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      validate: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Email is not valid",
      ],
    },
    password: {
      type: String,
      required: true,
      minlength: [4, "Password should be at least 4 characters long"],
    },
    role: {
      required: true,
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    notes: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Note",
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  return bcrypt.hash(this.password, SALT_ROUNDS).then((hash) => {
    this.password = hash;
    return next();
  });
});
userSchema.method("validatePassword", function (password) {
  return bcrypt.compare(password, this.password);
});

const User = mongoose.model("User", userSchema);

module.exports = User;
