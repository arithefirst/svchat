import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { startupSocketIOServer } from './src/lib/functions/websocketConfig';
import closePlugin from './src/lib/functions/autoCloseViteBuild';

export default defineConfig({
  plugins: [
    sveltekit(),
    closePlugin(),
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
  server: {
    allowedHosts: true,
  },
});
