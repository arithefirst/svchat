<script lang="ts">
  import { io } from 'socket.io-client';
  import { onMount } from 'svelte';
  import { v4 as uuidv4 } from 'uuid';
  import Message from '$lib/components/message.svelte';
  import SendIcon from '$lib/icons/SendIcon.svelte';
  import { type TypeMessage } from '$lib';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
  let user: string | undefined;
  let socket: ReturnType<typeof io> | null = null;
  let log: TypeMessage[] = $state([]);
  let msg: string = $state('');

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

{#snippet message(messages: TypeMessage[])}
  {#each messages as message}
    <Message imageSrc={message.imageSrc} user={message.user} message={message.message} />
  {/each}
{/snippet}

<main class="h-full flex flex-col">
  <div class="flex-grow flex-auto overflow-y-scroll mx-2 mt-2 mb-1 rounded-lg bg-base-200 border-2 border-base-300">
    <div class="w-full">
      <h1 class="text-center text-base-content text-2xl"><span class="text-primary">SV</span>Chat</h1>
      <hr class="w-11/12 border-primary border-1 mx-auto" />
    </div>
    {@render message(data.messages)}
    {@render message(log)}
  </div>
  <form class="flex mb-2 mx-2 mt-1" onsubmit={sendMessage}>
    <input type="text" placeholder="Type here" class="input border-base-300 w-5/6 mr-1 border-2" bind:value={msg} />
    <button aria-label="send message" class="btn w-1/6 btn-primary" type="submit"><SendIcon /></button>
  </form>
</main>
