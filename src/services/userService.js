const User = require("../models/User");

const { sign } = require("../utils/jwt");

const login = async (userData) => {
  let user = await User.findOne({ email: userData.email });
  if (!user) {
    throw new Error("Invalid username or password");
  }
  let isValid = await user.validatePassword(userData.password);
  if (!isValid) {
    throw new Error("Invalid username or password");
  }
  let peyload = {
    _id: user._id,
    email: user.email,
    role: user.role,
  };
  let token = await sign(peyload, process.env.JWT_SECRET);
  return {
    token,
    _id: user._id,
    email: user.email,
    role: user.role,
  };
};

const register = (userData) => User.create(userData);

const userService = {
  login,
  register,
};

module.exports = userService;
