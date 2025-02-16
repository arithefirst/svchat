import { auth } from '$lib/server/db/auth';
import { svelteKitHandler } from 'better-auth/svelte-kit';
import { building } from '$app/environment';
import { startupSocketIOServer } from '$lib/functions/websocketConfig';
import type { Handle } from '@sveltejs/kit';
import { Server as SocketIOServer } from 'socket.io';

let io: SocketIOServer | undefined;

export const handle = (async ({ event, resolve }) => {
  // Initialize WebSocket server if not building
  if (!building) {
    startupSocketIOServer(event.locals.httpServer);
    event.locals.io = io;
  }

  // Handle authentication
  const response = await svelteKitHandler({ event, resolve, auth });
  return response;
}) satisfies Handle;
