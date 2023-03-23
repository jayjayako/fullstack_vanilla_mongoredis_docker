var express = require("express");
var router = express.Router();

var user1 = require("../../controllers/user1");

router.use("/user1", user1);

module.exports = router;
