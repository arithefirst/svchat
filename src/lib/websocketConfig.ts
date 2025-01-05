import { Server as SocketIOServer } from 'socket.io';
import type { HttpServer } from 'vite';

let io: SocketIOServer | undefined;

export function startupSocketIOServer(httpServer: HttpServer | null) {
  if (io) return;
  console.log('[ws:kit] setup');
  io = new SocketIOServer(httpServer);

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
}
