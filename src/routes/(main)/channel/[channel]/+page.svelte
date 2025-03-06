<script lang="ts">
  import { page } from '$app/state';
  import EmptyChannel from '$lib/components/emptyChannel.svelte';
  import Message from '$lib/components/message.svelte';
  import MessageLengthDialog from '$lib/components/messageLengthDialog.svelte';
  import { buttonVariants } from '$lib/components/ui/button';
  import Textbox from '$lib/components/textbox.svelte';
  import Websocket from '$lib/functions/clientWebsocket.svelte';
  import { Send } from 'lucide-svelte';
  import { io } from 'socket.io-client';
  import { onMount } from 'svelte';
  import type { PageData } from './$types';
  import * as Tooltip from '$lib/components/ui/tooltip';

  const { data }: { data: PageData } = $props();

  let socket: Websocket | undefined = $state();
  let msg: string = $state('');
  let showDialog: boolean = $state(false);
  const channel: string = $derived(page.params.channel);
  let textareaRef = $state<HTMLTextAreaElement>();
  let formRef = $state<HTMLFormElement>();
  let contextMenus: boolean[] = $state(Array(data.messages.length).fill(false));

  $effect(() => {
    const totalMessages = (socket?.messages?.length || 0) + data.messages.length;
    if (contextMenus.length !== totalMessages) {
      contextMenus = Array(totalMessages).fill(false);
    }
  });

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
  });

  // Update channel on page refresh
  $effect(() => {
    if (socket) socket.updateChannel(channel);
  });
</script>

<svelte:head>
  <title>SVChat | #{channel}</title>
</svelte:head>

<MessageLengthDialog messageLength={msg.length} bind:showDialog />

<div class="flex h-full flex-col items-center justify-center gap-1 rounded-lg shadow-sm">
  <div class="relative flex size-full h-full w-full flex-auto flex-grow flex-col-reverse overflow-x-hidden overflow-y-scroll rounded-lg border">
    {#if data.messages.length != 0 || socket?.messages.length != 0}
      <div class="flex flex-col-reverse">
        {#if contextMenus.length === (socket?.messages?.length || 0) + data.messages.length}
          <!-- Concatenate the two arrays together -->
          {#each [...(socket?.messages ?? []), ...data.messages] as message, i}
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
        {/if}
      </div>
    {:else}
      <EmptyChannel />
    {/if}
  </div>
  <form bind:this={formRef} class="flex w-full gap-1" onsubmit={submit}>
    <Textbox bind:msg bind:textareaRef={textareaRef!} bind:formRef={formRef!} />
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger class="h-full min-h-10 w-14 {buttonVariants({ variant: 'default' })}" type="submit">
          <Send class="size-full" />
        </Tooltip.Trigger>
        <Tooltip.Content>
          <p>Send</p>
        </Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>
  </form>
</div>
