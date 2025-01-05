<script lang="ts">
  import { io } from 'socket.io-client';
  import { onMount } from 'svelte';

  let socket: ReturnType<typeof io> | null = null;
  let log: string[] = [];
  let msg: string = '';

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
      logEvent(data);
    });
  }

  function sendMessage() {
    if (!socket) return;
    socket.emit('message', msg);
    msg = '';
  }

  onMount(() => {
    establishSocketIOConnection();
  });
</script>

<main class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-fit">
  <h1 class="text-lg"># SvelteKit with Socket.IO Integration</h1>
  <form class="my-1 flex" on:submit={sendMessage}>
    <input type="text" placeholder="Type here" class="input input-bordered w-1/2 mr-1" bind:value={msg} />
    <button class="btn w-1/2" type="submit">Send</button>
  </form>
  <button
    class="btn w-full"
    on:click={() => {
      log = [];
    }}>Clear</button>
  <ul>
    {#each log as event}
      <li>{event}</li>
    {/each}
  </ul>
</main>
