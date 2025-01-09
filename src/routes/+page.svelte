<script lang="ts">
  import { io } from 'socket.io-client';
  import { onMount } from 'svelte';
  import { v4 as uuidv4 } from 'uuid';
  import Message from '../lib/components/message.svelte';
  import { type TypeMessage } from '../lib';

  let user: string | undefined;
  let socket: ReturnType<typeof io> | null = null;
  let log: TypeMessage[] = [];
  let msg: string = '';

  function logEvent(newMsg: TypeMessage) {
    log = [...log, newMsg];
  }

  function establishSocketIOConnection() {
    if (socket) return;
    socket = io();

    socket.on('message', (data: TypeMessage) => {
      console.log('[ws] message received', data);
      logEvent(data);
    });
  }

  function sendMessage() {
    if (!socket) return;
    socket.emit('message', { id: user, content: msg });
    msg = '';
  }

  onMount(() => {
    establishSocketIOConnection();
    user = uuidv4();
  });
</script>

<main class="grid grid-cols-2 h-screen w-full">
  <div class="relative h-full w-full">
    <div class="h-fit col-span-1 w-10/12 abs-centered">
      <div class="flex">
        <span><span class="text-svelte">SV</span>Chat</span>
        <span class="ml-auto">Logged in as <span class="font-bold">{user}</span></span>
      </div>
      <form class="my-1 flex" on:submit={sendMessage}>
        <input type="text" placeholder="Type here" class="input input-bordered w-1/2 mr-1" bind:value={msg} />
        <button class="btn w-1/2" type="submit">Send Message</button>
      </form>
      <button
        class="btn w-full"
        on:click={() => {
          log = [];
        }}>Clear Messages</button>
    </div>
  </div>
  <div class="col-span-1 overflow-scroll bg-base-200 m-4 rounded-lg">
    {#each log as message}
      <Message imageSrc={message.imageSrc} user={message.user} message={message.message} />
    {/each}
  </div>
</main>
