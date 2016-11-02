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

wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.on('message', function incoming(message) {
     console.log('received: %s', message);
     const id = messageId++;
     const messageObject = JSON.parse(message);
     messageObject.id = id;
     wss.broadcast(JSON.stringify(messageObject));
   });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});
