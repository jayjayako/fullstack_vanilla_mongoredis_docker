var express = require("express");
var router = express.Router();

const multer = require("multer");

var uniqid = require("uniqid");

var auth = require("../../modulelibrary/authsession");

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, uniqid() + "--" + file.originalname);
  },
});

function fileFilter(req, file, cb) {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/svg"
  ) {
    cb(null, true);
  } else {
    cb(null, false); // else fails
  }
}

const upload = multer({ storage: fileStorageEngine, fileFilter: fileFilter });

router.use(auth);

/////////////////////// for dashboard page ///////////////////
router.get("/dashboard", async (req, res) => {
  try {
    console.log(
      "Connected: " + req.app.socket.id + " node1 \nmy ip is " + req.ip
    );
    req.app.socket.emit(
      "chat-message",
      "from server" + " node1 \nmy ip is " + req.ip
    );
    res.send(
      JSON.stringify([
        {
          id: "loggedin",
          name: req.session.lastname + " " + req.session.firstname,
        },
      ])
    );
    res.end();
  } catch (error) {
    res.send(JSON.stringify([{ id: "invalid" }]));
    res.end();
  }
});
///////////////////////////////////////////////////////////////

router.post("/fileupload", upload.single("file1"), (req, res) => {
  res.send(JSON.stringify([{ id: "success" }]));
  res.end();
});

module.exports = router;
