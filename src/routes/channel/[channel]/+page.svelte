<script lang="ts">
  import { io } from 'socket.io-client';
  import { onMount } from 'svelte';
  import { v4 as uuidv4 } from 'uuid';
  import type { TypeMessage, TypeFullMessage } from '$lib';
  import type { PageData } from './$types';
  import { Input } from '$lib/components/ui/input/index';
  import { Button } from '$lib/components/ui/button/index';
  import Send from 'lucide-svelte/icons/send';
  import Message from '$lib/components/message.svelte';
  import { page } from '$app/state';

  let { data }: { data: PageData } = $props();
  let user: string | undefined;
  let socket: ReturnType<typeof io> | null = null;
  let log: TypeMessage[] = $state([]);
  let msg: string = $state('');
  const channel = $derived(page.params.channel);

  function logEvent(newMsg: TypeMessage) {
    log = [
      {
        message: newMsg.message,
        imageSrc: newMsg.imageSrc,
        user: newMsg.user,
      },
      ...log,
    ];
  }

  function establishSocketIOConnection() {
    if (socket) return;
    socket = io();

    socket.on('message', (data: TypeFullMessage) => {
      console.log('[ws] message received', data);
      if (data.channel == channel) {
        logEvent(data);
      }
    });
  }

  function sendMessage() {
    if (!socket) return;
    socket.emit('message', { id: user, content: msg, channel: channel });
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
<div class="flex flex-1 flex-col items-center justify-center rounded-lg shadow-sm gap-1 h-full">
  <div class="flex-grow flex-col-reverse flex flex-auto overflow-y-scroll overflow-x-hidden rounded-lg border w-full">
    {@render message(log)}
    {@render message(data.messages)}
  </div>
  <form class="flex gap-1 w-full" onsubmit={sendMessage}>
    <Input type="text" placeholder="Type Here" bind:value={msg} />
    <Button class="h-9 w-14"><Send class="size-full" /></Button>
  </form>
</div>
