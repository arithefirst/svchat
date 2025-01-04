import { building } from '$app/environment';
import type { Handle } from '@sveltejs/kit';
import { Server as SocketIOServer } from 'socket.io';

let io: SocketIOServer | undefined;

const startupSocketIOServer = (httpServer: never) => {
	if (io) return;
	console.log('[ws:kit] setup');
	io = new SocketIOServer(httpServer);
	io.on('connection', (socket) => {
		console.log(`[ws:kit] client connected (${socket.id})`);
		socket.emit('message', `Hello from SvelteKit ${new Date().toLocaleString()} (${socket.id})`);

		socket.on('disconnect', () => {
			console.log(`[ws:kit] client disconnected (${socket.id})`);
		});
	});
};

export const handle = (async ({ event, resolve }) => {
	if (!building) {
		startupSocketIOServer(event.locals.httpServer);
		event.locals.io = io;
	}
	return resolve(event, {
		filterSerializedResponseHeaders: (name) => name === 'content-type'
	});
}) satisfies Handle;