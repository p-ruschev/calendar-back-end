const router = require("express").Router();

const userController = require("./controllers/userController");
const calendarController = require("./controllers/calendarController");

router.use("/users", userController);
router.use("/calendar", calendarController);
router.use("*", (req, res) => {
  res.status("404").render("404");
});

module.exports = router;
