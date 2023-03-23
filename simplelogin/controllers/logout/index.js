var express = require("express");
var router = express.Router();

var auth = require("../modulelibrary/authsession");
const client = require("../../modulelibrary/importredisio");

router.use(auth, (req, res) => {
  console.log("User Logged Out");
  client.del(req.session.userid);
  req.session.destroy();
  res.clearCookie("sessid");
  res.send(JSON.stringify([{ id: "done" }]));
  res.end();
});

module.exports = router;
