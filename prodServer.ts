import { handler } from './build/handler.js';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  // Runs on client connect
  console.log(`[ws:kit] client connected (${socket.id})`);
  io!.emit('message', `[ws] Hello from SvelteKit ${new Date().toLocaleString()} (${socket.id})`);

  // Runs on message receive
  socket.on('message', (msg) => {
    console.log(`[ws:kit] message from ${socket.id}: ${msg}`);
    io!.emit('message', `[${socket.id}] ${msg}`);
  });

  // Runs on client disconnect
  socket.on('disconnect', () => {
    io!.emit('message', `client disconnected (${socket.id})`);
    console.log(`[ws:kit] client disconnected (${socket.id})`);
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
