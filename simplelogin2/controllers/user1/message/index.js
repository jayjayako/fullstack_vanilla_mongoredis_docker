require("dotenv").config();
var express = require("express");
var router = express.Router();

const multer = require("multer");
const upload = multer();

const client = require("../../../modulelibrary/importredisio");

var xss = require("xss");

const webpush = require("web-push");
const schedule = require("node-schedule");
var mjob;

async function sendnotiffunc(useridnum) {
  console.log("Notif func triggered");
  let strsubscription = await client.hget(
    useridnum + "-notif",
    "strsubscription"
  );
  const datetime = new Date(Date.now() + 10000);
  mjob = schedule.scheduleJob(useridnum, datetime, () => {
    webpush.setVapidDetails(
      process.env.WEBPUSHMAILTO,
      process.env.PUBLICVAPIDKEY,
      process.env.PRIVATEVAPIDKEY
    );

    console.log(strsubscription);
    const payload = JSON.stringify({
      "title": "Push Message",
      "content": "sample message",
    });
    webpush
      .sendNotification(JSON.parse(strsubscription), payload)
      .catch((err) => console.error(err));
    mjob.cancel(useridnum);
  });
}

router.post("/sendmessage", upload.none(), async (req, res) => {
  const { scheduleid, useridnum, usermsgid } = req.body;
  const pubClient = client.duplicate();

  const socketidresult = await client.hget(useridnum, "socketid");
  const servernameresult = await client.hget(useridnum, "servername");

  if (scheduleid == "nosched") {
    if (servernameresult == "server1-channel") {
      pubClient.publish("server2-channel", {
        schedule: xss(scheduleid),
        userid: xss(useridnum),
        socketid: socketidresult,
        message: xss(usermsgid),
      });
    }
    if (servernameresult == "server2-channel") {
      req.app.socket.to(socketidresult).emit("clientmessagerecieve", {
        message: usermsgid,
      });
    }
  } else {
    sendnotiffunc(useridnum);
  }

  console.log(scheduleid, useridnum, usermsgid);
  res.send(JSON.stringify([{ id: "success" }]));
  res.end();
});

module.exports = router;
