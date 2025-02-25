import { Server as SocketIOServer } from 'socket.io';
import type { HttpServer } from 'vite';
// Don't try to replace with $lib alias. Since this
// file gets loaded as a vite plugin, it will crash
import { v4 as uuidv4 } from 'uuid';
import { db } from '../server/db';
import { authdb } from '../server/db/sqlite';

let io: SocketIOServer | undefined;

export function startupSocketIOServer(httpServer: HttpServer | null) {
  if (io) return;
  console.log('\x1b[35m[ws:kit]\x1b[0m setup');

  if (!httpServer) {
    console.error('Error: httpServer is null. Cannot start Socket.IO server.');
    return;
  }

  io = new SocketIOServer(httpServer);

  io.on('connection', async (socket) => {
    // Runs on client connection
    console.log(`\x1b[35m[ws:kit]\x1b[0m client connected (${socket.id})`);
    // Runs on message received
    socket.on('message', async (msg) => {
      // If message not empty
      if (msg.content !== '') {
        console.log(`\x1b[35m[ws:kit]\x1b[0m message from ${socket.id}: ${msg.content}`);
        // Store the message in the database
        const timestamp = new Date();
        await db.sendMessage(msg.channel, msg.content, msg.id, uuidv4(), timestamp);
        const sender = authdb.getUser(msg.id);
        io!.emit('message', {
          user: sender.username,
          message: msg.content,
          imageSrc: sender.image,
          channel: msg.channel,
          timestamp: timestamp,
        });
      }
    });

    // Runs on client disconnect
    socket.on('disconnect', () => {
      console.log(`\x1b[35m[ws:kit]\x1b[0m client disconnected (${socket.id})`);
    });
  });
}
