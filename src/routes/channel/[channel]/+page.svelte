<script lang="ts">
  import { page } from '$app/state';
  import Message from '$lib/components/message.svelte';
  import { Button } from '$lib/components/ui/button/index';
  import { autoResize } from '$lib/functions/autoresize.svelte';
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
  const channel: string = $derived(page.params.channel);
  let textareaRef: HTMLElement | undefined = $state();
  let submitRef: HTMLButtonElement | undefined = $state();

  onMount(() => {
    // Connect on page load
    socket = new Websocket(io());
    socket.connect();

    // Submit on textarea enter
    textareaRef?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        submitRef?.click();
      }
    });
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
      if (textareaRef) textareaRef.style.height = '40px';
      msg = '';
    }}>
    <textarea
      placeholder="Type Here"
      bind:value={msg}
      bind:this={textareaRef}
      use:autoResize
      class="flex min-h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm
      placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring
       disabled:cursor-not-allowed disabled:opacity-50"></textarea>
    <Button class="h-full min-h-10 w-14" type="submit"><Send class="size-full" /></Button>
    <button type="submit" bind:this={submitRef} class="hidden">submit</button>
  </form>
</div>
