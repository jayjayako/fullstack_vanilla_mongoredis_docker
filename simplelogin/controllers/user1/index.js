var express = require("express");
var router = express.Router();

var dashboard = require("./dashboard");
var message = require("./message");
var notification = require("./notification");

router.use("/dashboard", dashboard);
router.use("/message", message);
router.use("/notification", notification);

module.exports = router;
