import { Server as SocketIOServer } from 'socket.io';
import type { HttpServer } from 'vite';

let io: SocketIOServer | undefined;


export function startupSocketIOServer(httpServer: HttpServer | null) {
	if (io) return;
	console.log('[ws:kit] setup');
	io = new SocketIOServer(httpServer);
	io.on('connection', (socket) => {
		console.log(`[ws:kit] client connected (${socket.id})`);
		io!.emit('message', `Hello from SvelteKit ${new Date().toLocaleString()} (${socket.id})`);

		socket.on('disconnect', () => {
			io!.emit('message', `[ws:kit] client disconnected (${socket.id})`)
			console.log(`client disconnected (${socket.id})`);
		});
	});
}