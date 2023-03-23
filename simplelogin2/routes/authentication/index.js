var express = require("express");
var router = express.Router();

var login = require("../../controllers/login");
var checkuser = require("../../controllers/checkuser");
var logout = require("../../controllers/logout");

//// login
router.post("/login", login);

//// checkuser
router.get("/checkuser", checkuser);

//// logout
router.get("/logout", logout);

module.exports = router;
