<script lang="ts">
  import { io } from 'socket.io-client';
  import { onMount } from 'svelte';
  import { v4 as uuidv4 } from 'uuid';
  import type { TypeMessage } from '$lib/types';
  import type { PageData } from './$types';
  import { Input } from '$lib/components/ui/input/index';
  import { Button } from '$lib/components/ui/button/index';
  import Send from 'lucide-svelte/icons/send';
  import Message from '$lib/components/message.svelte';
  import { page } from '$app/state';
  import Websocket from '$lib/functions/clientWebsocket.svelte';

  const { data }: { data: PageData } = $props();

  let user: string = uuidv4();
  let socket: Websocket | undefined = $state();
  let msg: string = $state('');
  const channel = $derived(page.params.channel);

  // Connect on page load
  onMount(() => {
    socket = new Websocket(io());
    socket.connect();
  });

  // Update channel on page refresh
  $effect(() => {
    if (socket) socket.updateChannel(channel);
  });
</script>

<svelte:head>
  <title>SVChat | {channel}</title>
</svelte:head>

{#snippet message(messages: TypeMessage[])}
  {#each messages as message}
    <Message imageSrc={message.imageSrc} user={message.user} message={message.message} />
  {/each}
{/snippet}
<div class="flex flex-1 flex-col items-center justify-center rounded-lg shadow-sm gap-1 h-full">
  <div class="flex-grow flex-col-reverse flex flex-auto overflow-y-scroll overflow-x-hidden rounded-lg border w-full">
    {@render message(socket?.messages!)}
    {@render message(data.messages)}
  </div>
  <form
    class="flex gap-1 w-full"
    onsubmit={() => {
      socket?.sendMessage(user!, msg);
      msg = '';
    }}>
    <Input type="text" placeholder="Type Here" bind:value={msg} />
    <Button class="h-9 w-14" type="submit"><Send class="size-full" /></Button>
  </form>
</div>
