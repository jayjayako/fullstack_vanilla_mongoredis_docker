var express = require("express");
var router = express.Router();

const multer = require("multer");
const upload = multer();

const client = require("../../../modulelibrary/importredisio");

router.post("/subscribe", upload.none(), async (req, res) => {
  const { strsubscription } = req.body;

  client.hmset(req.session.userid + "-notif", {
    strsubscription: strsubscription,
  });

  console.log(strsubscription);
  res.send(JSON.stringify([{ data: "success" }]));
  res.end();
});

module.exports = router;
