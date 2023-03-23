require("dotenv").config();
const Redis = require("ioredis");

const client = new Redis({
  port: 6379, // Redis port
  host: process.env.REDIS, // Redis host
});

module.exports = client;
