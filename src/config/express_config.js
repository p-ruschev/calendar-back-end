const express = require("express");
const cors = require("cors");

const { auth } = require("../middlewares/authMiddleware");

const expressConfig = (app) => {
  app.use(express.urlencoded({ extended: true }));
  app.use(auth);
  app.use(express.json());
  app.use(cors());
};

module.exports = expressConfig;
