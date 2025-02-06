import { Server as SocketIOServer } from 'socket.io';
import type { HttpServer } from 'vite';
// Don't try to replace with $lib alias. Since this
// file gets loaded as a vite plugin, it will crash
import { db } from './server/db/';
import { v4 as uuidv4 } from 'uuid';

let io: SocketIOServer | undefined;

export function startupSocketIOServer(httpServer: HttpServer | null) {
  if (io) return;
  console.log('\x1b[35m[ws:kit]\x1b[0m setup');
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
        await db.sendMessage('general', msg.content, msg.id, uuidv4());
        io!.emit('message', {
          user: msg.id,
          message: msg.content,
          imageSrc: `https://api.dicebear.com/9.x/identicon/svg?seed=${msg.id}`,
        });
      }
    });

    // Runs on client disconnect
    socket.on('disconnect', () => {
      console.log(`\x1b[35m[ws:kit]\x1b[0m client disconnected (${socket.id})`);
    });
  });
}
