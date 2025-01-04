import { handler } from './build/handler.js';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
	console.log(`[ws:kit] client connected (${socket.id})`);
	io!.emit('message', `Hello from SvelteKit ${new Date().toLocaleString()} (${socket.id})`);

	socket.on('disconnect', () => {
		io!.emit('message', `client disconnected (${socket.id})`)
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