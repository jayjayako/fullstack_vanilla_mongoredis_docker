const client = require("../modulelibrary/importredisio");

async function socketfunct(socket, pubClient, subClient) {
  if (socket.request.session.authenticated == true) {
    client.hmset(socket.request.session.userid, {
      servername: "server2-channel",
      socketid: socket.id,
      conn: "connected",
    });
  }
  /////////////// function for user logout /////////////
  async function autologout(socketid) {
    ////////////////////// for user 1 ///////////////////
    const socketidresult = await client.hget(
      socket.request.session.userid,
      "socketid"
    );
    if (socketidresult) {
      if (socketid == socketidresult) {
        client.del(socket.request.session.userid);
        socket.request.session.destroy();
        console.log("User Logged Out");
      }
    }
    /////////////////////////////////////////////////////
    return;
  }
  //////////////////////////////////////////////////////

  //////////// listens to incoming messages from another server //////////
  async function onMessage(channel, message) {
    console.log(
      `Received message socket ${socket.id}"${message}" on channel "${channel}"`
    );
    socket.to(message.socketid).emit("clientmessagerecieve", {
      message: message.message,
    });
  }

  subClient.on("message", onMessage);
  ////////////////////////////////////////////////////////////////////////

  socket.on("message", (message) => {
    console.log(message.message);
    socket.emit("chat-message", "from this server node 2");
  });

  socket.on("disconnect", () => {
    console.log("Disconnected: socket " + socket.id);
    /////////// remove subscriber client after disconnect ///////////
    subClient.removeListener("message", onMessage);
    /////////////////////////////////////////////////////////////////
    client.hmset(socket.request.session.userid, {
      servername: "server2-channel",
      socketid: socket.id,
      conn: "disconnected",
    });
    setTimeout(autologout, 5000, socket.id);
    socket.disconnect(true);
  });
}

module.exports = {
  socketfunct: socketfunct,
};
