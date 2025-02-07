<script lang="ts">
  import { page } from '$app/state';
  import Message from '$lib/components/message.svelte';
  import { Button } from '$lib/components/ui/button/index';
  import { Input } from '$lib/components/ui/input/index';
  import Websocket from '$lib/functions/clientWebsocket.svelte';
  import type { TypeMessage } from '$lib/types';
  import Send from 'lucide-svelte/icons/send';
  import { io } from 'socket.io-client';
  import { onMount } from 'svelte';
  import { v4 as uuidv4 } from 'uuid';
  import type { PageData } from './$types';

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
  <title>SVChat | #{channel}</title>
</svelte:head>

{#snippet message(messages: TypeMessage[])}
  {#each messages as message}
    <Message imageSrc={message.imageSrc} user={message.user} message={message.message} />
  {/each}
{/snippet}
<div class="flex h-full flex-1 flex-col items-center justify-center gap-1 rounded-lg shadow-sm">
  <div class="flex w-full flex-auto flex-grow flex-col-reverse overflow-x-hidden overflow-y-scroll rounded-lg border">
    {@render message(socket?.messages!)}
    {@render message(data.messages)}
  </div>
  <form
    class="flex w-full gap-1"
    onsubmit={() => {
      socket?.sendMessage(user!, msg);
      msg = '';
    }}>
    <Input type="text" placeholder="Type Here" bind:value={msg} />
    <Button class="h-9 w-14" type="submit"><Send class="size-full" /></Button>
  </form>
</div>
