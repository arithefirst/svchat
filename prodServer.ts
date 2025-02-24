import { handler } from './build/handler.js';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { db } from './src/lib/server/db/index.js';
import { authdb } from './src/lib/server/db/sqlite.js';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const server = createServer(app);
const io = new Server(server);
const port = 3000;

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
      const sender = authdb.getUser(msg.id);
      io!.emit('message', {
        user: sender.username,
        message: msg.content,
        imageSrc: sender.image,
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

server.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
