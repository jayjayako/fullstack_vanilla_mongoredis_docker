require("dotenv").config();
const express = require("express");
const app = express();
app.disable("x-powered-by");
app.set("trust proxy", true);

const cors = require("cors");
app.use(cors({ credentials: true, origin: true }));

app.use(express.json({}));
app.use(
  express.urlencoded({
    extended: true,
  })
);

const mongoose = require("mongoose");

//connect
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfully");
  })
  .catch((err) => {
    console.log(err.message);
  });

// const helmet = require("./modulelibrary/helmet");
// app.use(helmet);

var sessionMiddleware = require("./modulelibrary/sessionconfig");
app.use(sessionMiddleware);

var routes = require("./routes");

var server = require("http").createServer(app);

const port = 3000;

const io = require("socket.io")(server, { cors: { origin: "*" } });

server.listen(port, (err) => {
  if (err) {
    return console.log("ERROR", err);
  }
  console.log(`Listening on port...${port}`);
});

///////////// to wrap express session auth inside socket //////////
const wrap = (middleware) => (socket, next) =>
  middleware(socket.request, {}, next);
io.use(wrap(sessionMiddleware));
///////////////////////////////////////////////////////////////////

////////////////// use for realtime connection ////////////////////
var { iofunc } = require("./socketauth/ioinside.js");
iofunc(io);
var { socketfunct } = require("./extrasocket/socketinside.js");
///////////////////////////////////////////////////////////////////

const client = require("./modulelibrary/importredisio");

///// use to connect to redis channel to communicate to another server ///
const pubClient = client.duplicate();

const subClient = client.duplicate();
//////////////////////////////////////////////////////////////////////////

const channel = "server2-channel"; // listens to server2 channel
subClient.subscribe(channel);

/////////////////// socket connection instance /////////////////
io.on("connection", (socket) => {
  console.log(`Socket ${socket.id} connected`);
  const clientIP =
    socket.request.headers["x-forwarded-for"].split(",")[0] ||
    socket.request.connection.remoteAddress;
  console.log("ip address is " + clientIP);
  console.log("this is from express " + socket.request.session.authenticated);
  console.log("this is from socketio " + socket.request.session.userid);
  socketfunct(socket, pubClient, subClient);

  app.socket = socket.on("disconnect", () => {
    console.log("Disconnected: outside " + socket.id);
    socket.disconnect(true);
  });
});
////////////////////////////////////////////////////////////////

app.use("/api", routes);

///////////////// express static views frontend ////////////////
app.use(express.static("views"));
app.use("/views", express.static(__dirname + "views"));
////////////////////////////////////////////////////////////////
