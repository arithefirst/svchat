import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { startupSocketIOServer } from './src/lib/websocketConfig';

export default defineConfig({
  plugins: [
    sveltekit(),
    {
      name: 'integratedSocketIOServer',
      configureServer(server) {
        startupSocketIOServer(server.httpServer);
      },
      configurePreviewServer(server) {
        startupSocketIOServer(server.httpServer);
      },
    },
  ],
});
