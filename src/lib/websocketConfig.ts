import { Server as SocketIOServer } from 'socket.io';
import type { HttpServer } from 'vite';
import { type TypeMessage } from './';

let io: SocketIOServer | undefined;

export function startupSocketIOServer(httpServer: HttpServer | null) {
  if (io) return;
  console.log('[ws:kit] setup');
  io = new SocketIOServer(httpServer);

  io.on('connection', (socket) => {
    // Runs on client connect
    console.log(`[ws:kit] client connected (${socket.id})`);

    // Runs on message receive
    socket.on('message', (msg) => {
      console.log(`[ws:kit] message from ${socket.id}: ${msg}`);
      io!.emit('message', {
        user: socket.id,
        message: msg,
        imageSrc: 'https://www.arithefirst.com/images/pfp.png',
      });
    });

    // Runs on client disconnect
    socket.on('disconnect', () => {
      console.log(`[ws:kit] client disconnected (${socket.id})`);
    });
  });
}
