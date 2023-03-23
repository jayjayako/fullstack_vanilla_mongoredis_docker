var express = require("express");
var router = express.Router();

var auth = require("../modulelibrary/authsession");

router.use(auth, (req, res) => {
  res.send(JSON.stringify([{ id: "loggedin" }]));
  res.end();
});

module.exports = router;
