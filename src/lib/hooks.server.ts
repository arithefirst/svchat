import { building } from '$app/environment';
import { startupSocketIOServer } from '$lib/functions/websocketConfig';
import type { Handle } from '@sveltejs/kit';
import { Server as SocketIOServer } from 'socket.io';

let io: SocketIOServer | undefined;
export const handle = (async ({ event, resolve }) => {
  if (!building) {
    startupSocketIOServer(event.locals.httpServer);
    event.locals.io = io;
  }
  return resolve(event, {
    filterSerializedResponseHeaders: (name) => name === 'content-type',
  });
}) satisfies Handle;
