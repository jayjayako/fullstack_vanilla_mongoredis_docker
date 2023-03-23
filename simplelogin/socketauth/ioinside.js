// both web and mobile auth
const client = require("../modulelibrary/importredisio");
function iofunc(io) {
  io.use(async (socket, next) => {
    const session = socket.request.session;
    if (session.authenticated == true) {
      // i use pwa for all
      io.sockets.sockets.forEach((socket) => {
        // If given socket id is exist in list of all sockets, kill it
        if (!socket.connected) {
          socket.disconnect(true);
        }
      });
      client.hmset(session.userid, {
        servername: "server1-channel",
        socketid: socket.id,
        conn: "disconnected",
      });
      next();
    } else {
      console.log("Invalid user");
      client.del(session.userid);
      if (socket && socket.connected) {
        socket.disconnect(true);
      }
    }
  });
}

module.exports = {
  iofunc: iofunc,
};
