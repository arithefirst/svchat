<script lang="ts">
  import { page } from '$app/state';
  import EmptyChannel from '$lib/components/emptyChannel.svelte';
  import Message from '$lib/components/message.svelte';
  import MessageLengthDialog from '$lib/components/messageLengthDialog.svelte';
  import { buttonVariants } from '$lib/components/ui/button';
  import { autoResize } from '$lib/functions/autoresize.svelte';
  import Websocket from '$lib/functions/clientWebsocket.svelte';
  import type { TypeMessage } from '$lib/types';
  import Send from 'lucide-svelte/icons/send';
  import { io } from 'socket.io-client';
  import { onMount } from 'svelte';
  import type { PageData } from './$types';
  import * as Tooltip from '$lib/components/ui/tooltip';

  const { data }: { data: PageData } = $props();

  let socket: Websocket | undefined = $state();
  let msg: string = $state('');
  let showDialog: boolean = $state(false);
  const channel: string = $derived(page.params.channel);
  let textareaRef: HTMLTextAreaElement | undefined = $state();
  let formref: HTMLFormElement | undefined = $state();
  let contextMenus: boolean[] = $state([]);

  function askNotificationPermission() {
    // Check if the browser supports notifications
    if (!('Notification' in window)) {
      alert('This browser does not support notifications. Sorry :(');
      return;
    }

    Notification.requestPermission();
  }

  function closeDialogs(i: number) {
    for (let x = 0; x < contextMenus.length; x++) {
      if (x !== i) {
        contextMenus[x] = false;
      }
    }
  }

  function submit(event: Event) {
    event.preventDefault();
    if (msg.length <= 2000) {
      socket?.sendMessage(data.currentUserID, msg);
      if (textareaRef) textareaRef.style.height = '40px';
      msg = '';
    } else {
      showDialog = true;
    }
  }

  onMount(() => {
    // Connect on page load
    socket = new Websocket(io(), data.currentUserName);
    socket.connect();

    // Ask for notification permissions
    askNotificationPermission();

    // Submit on textarea enter
    textareaRef?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        formref?.requestSubmit();
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
  {#each messages as message, i}
    <Message
      bind:open={contextMenus[i]}
      imageSrc={message.imageSrc}
      user={message.user}
      message={message.message}
      timestamp={message.timestamp}
      uid={message.uid}
      {closeDialogs}
      {i}
    />
  {/each}
{/snippet}

<MessageLengthDialog messageLength={msg.length} bind:showDialog />

<div class="flex h-full flex-col items-center justify-center gap-1 rounded-lg shadow-sm">
  <div class="relative flex size-full h-full w-full flex-auto flex-grow flex-col-reverse overflow-x-hidden overflow-y-scroll rounded-lg border">
    {#if data.messages.length != 0 || socket?.messages.length != 0}
      <div class="flex flex-col-reverse">
        {@render message(socket?.messages ?? [])}
        {@render message(data.messages)}
      </div>
    {:else}
      <EmptyChannel />
    {/if}
  </div>
  <form bind:this={formref} class="flex w-full gap-1" onsubmit={submit}>
    <textarea
      placeholder="Type Here"
      bind:value={msg}
      bind:this={textareaRef}
      use:autoResize
      class="flex h-10 min-h-10 w-full resize-none rounded-md border border-input bg-transparent px-3 py-2 text-sm
      shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1
      focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
    ></textarea>
    <Tooltip.Root>
      <Tooltip.Trigger class="h-full min-h-10 w-14 {buttonVariants({ variant: 'default' })}" type="submit">
        <Send class="size-full" />
      </Tooltip.Trigger>
      <Tooltip.Content>
        <p>Send</p>
      </Tooltip.Content>
    </Tooltip.Root>
  </form>
</div>
