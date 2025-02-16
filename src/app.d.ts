// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces

import { Server as SocketIOServer } from 'socket.io';
import type { HttpServer } from 'vite';

declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      io: SocketIOServer | undefined;
      httpServer: HttpServer | null;
    }
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}

export {};
