const User = require("../models/User");

const { sign } = require("../utils/jwt");
// const { JWT_SECRET } = require("../constants");

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

//const getOwnTrips = async (creatorId) => Trip.find({creator: creatorId}).lean();
/*
 * const editProfle = () => {}
 *
 * const deleteProfle = () => {}
 *
 * const searchUser = () => {}
 *
 * const requestFriendship = () => {}
 *
 * const acceptFriendship = () => {}
 *
 * const removeFriendship = () => {}
 *
 * const getMyPosters = () => {}
 *  */
const userService = {
  login,
  register,
};

module.exports = userService;
