import { Server as SocketIOServer } from 'socket.io';
import type { HttpServer } from 'vite';
import { client, createChannel, storeMessage } from './server/db/';
import { v4 as uuidv4 } from 'uuid';

let io: SocketIOServer | undefined;

export function startupSocketIOServer(httpServer: HttpServer | null) {
  if (io) return;
  console.log('[ws:kit] setup');
  io = new SocketIOServer(httpServer);

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

    // Runs on client disconnect
    socket.on('disconnect', () => {
      console.log(`[ws:kit] client disconnected (${socket.id})`);
    });
  });
}
