import { handler } from './build/handler.js';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { db } from './src/lib/server/db';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const server = createServer(app);
const io = new Server(server);

io.on('connection', async (socket) => {
  // Runs on client connection
  console.log(`\x1b[35m[ws:kit]\x1b[0m client connected (${socket.id})`);
  // Runs on message received
  socket.on('message', async (msg) => {
    // If message not empty
    if (msg.content !== '') {
      console.log(`\x1b[35m[ws:kit]\x1b[0m message from ${socket.id}: ${msg.content}`);
      // Store the message in the database
      await db.sendMessage(msg.channel, msg.content, msg.id, uuidv4());
      io!.emit('message', {
        user: msg.id,
        message: msg.content,
        imageSrc: `https://api.dicebear.com/9.x/identicon/svg?seed=${msg.id}`,
        channel: msg.channel,
      });
    }
  });

  // Runs on client disconnect
  socket.on('disconnect', () => {
    console.log(`\x1b[35m[ws:kit]\x1b[0m client disconnected (${socket.id})`);
  });
});

app.use((req, res, next) => {
  if (req.path.startsWith('/socket.io/')) {
    next();
  } else {
    handler(req, res, next);
  }
});

server.listen(3005, () => {
  console.log('Listening on http://0.0.0.0:3005');
});
