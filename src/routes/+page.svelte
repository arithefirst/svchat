<script lang="ts">
  import { io } from 'socket.io-client';

  let socket: ReturnType<typeof io> | null = null;
  let log: string[] = [];

  function logEvent(str: string) {
    log = [...log, str];
  }

  function establishSocketIOConnection() {
    if (socket) return;
    socket = io();

    socket.on('connect', () => {
      console.log('[ws] connection open');
      logEvent('[ws] connection open');
    });

    socket.on('disconnect', () => {
      console.log('[ws] connection closed');
      logEvent('[ws] connection closed');
    });

    socket.on('message', (data: string) => {
      console.log('[ws] message received', data);
      logEvent(`[ws] message received: ${data}`);
    });
  }
</script>

<main>
  <h1 class="text-lg"># SvelteKit with Socket.IO Integration</h1>

  <button class="btn btn-primary" on:click={() => establishSocketIOConnection()}> Establish Socket.IO connection </button>

  <ul>
    {#each log as event}
      <li>{event}</li>
    {/each}
  </ul>
</main>
