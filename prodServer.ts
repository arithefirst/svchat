import { handler } from './build/handler.js';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { client, createChannel, storeMessage } from './src/lib/server/db';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const server = createServer(app);
const io = new Server(server);

io.on('connection', async (socket) => {
  // Runs on client connect
  console.log(`[ws:kit] client connected (${socket.id})`);
  // Runs on message receive
  socket.on('message', async (msg) => {
    // If message not empty
    if (msg.content !== '') {
      console.log(`[ws:kit] message from ${socket.id}: ${msg.content}`);
      // Store the message in the database
      await createChannel(client, '000');
      await storeMessage(client, '000', msg.content, msg.id, uuidv4());
      io!.emit('message', {
        user: msg.id,
        message: msg.content,
        imageSrc: 'https://www.arithefirst.com/images/pfp.png',
      });
    }
  });
});

app.use((req, res, next) => {
  if (req.path.startsWith('/socket.io/')) {
    next();
  } else {
    handler(req, res);
  }
});

server.listen(3005, () => {
  console.log('Listening on http://0.0.0.0:3005');
});
