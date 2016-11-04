const express = require('express');
const SocketServer = require('ws').Server;

const PORT = 3001;

const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server: server }); //or just ({ server })

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    client.send(data);
  });
};

let messageId = 1;

let usersOnline = 0;
wss.on('connection', function connection(ws) {

  usersOnline += 1;

  wss.broadcast(JSON.stringify({
    type: 'userCount',
    usersOnline: usersOnline
  }));

  console.log('Client connected');
  ws.on('message', function incoming(message) {
     console.log('received: %s', message);
     const id = messageId++;
     const messageObject = JSON.parse(message);
     messageObject.id = id;
    //  //  wss.broadcast(JSON.stringify(messageObject));
    //  // messageObject.type can be one of:  "postMessage"   "postNotification"
    //  console.log("messageHandlers[messageObject.type] is ", messageHandlers[messageObject.type])
    //  messageHandlers[messageObject.type](messageObject);

     if(messageObject.type === "postMessage") {
       wss.broadcast(JSON.stringify(messageObject));
     } else if(messageObject.type === "postNotification") {
       wss.broadcast(JSON.stringify(messageObject));
     } else {
       throw new Error("Could not recognize message type " + messageObject.type);
     }
   });

   ws.on('close', function () {
     usersOnline -= 1;
     wss.broadcast(JSON.stringify({
       type: 'userCount',
       usersOnline: usersOnline
     }));
   });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});
