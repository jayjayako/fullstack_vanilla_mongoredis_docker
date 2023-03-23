var express = require("express");
var router = express.Router();

var register = require("../../controllers/register");

router.use("/register", register);

module.exports = router;
