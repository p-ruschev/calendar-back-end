const mongoose = require("mongoose");

const initDatabase = () => mongoose.connect(process.env.DB_CONNECTION_STRING);

module.exports = { initDatabase };
