require("dotenv").config();
var express = require("express");
var router = express.Router();

const session = require("express-session");
const RedisStore = require("connect-redis").default;
const client = require("./importredisio");

let redisStore = new RedisStore({
  client: client,
  prefix: "user:",
});

const sessionMiddleware = session({
  key: "sessid",
  store: redisStore,
  secret: process.env.SECRETKEY,
  resave: false,
  saveUninitialized: false,
  proxy: true, // remove if no proxy in front
  cookie: {
    secure: true,
    httpOnly: true,
    sameSite: "lax",
  },
});

router.use(sessionMiddleware);

module.exports = router;
