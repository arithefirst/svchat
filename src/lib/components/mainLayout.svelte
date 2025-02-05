<script lang="ts">
  import MessagesSquare from 'lucide-svelte/icons/messages-square';
  import Channel from './channel.svelte';
  import type { Snippet } from 'svelte';

  interface Props {
    channels: string[];
    children: Snippet;
  }

  const { channels, children }: Props = $props();
</script>

<div class="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
  <div class="bg-muted/40 hidden border-r md:block">
    <div class="flex h-full max-h-screen flex-col gap-2">
      <div class="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <a href="/" class="flex items-center gap-2 font-semibold">
          <MessagesSquare class="h-6 w-6" />
          <span class="">SVChat</span>
        </a>
      </div>
      <div class="flex-1">
        <nav class="grid items-start px-2 text-sm font-medium lg:px-4">
          {#each channels as channelName}
            <Channel {channelName} />
          {/each}
        </nav>
      </div>
    </div>
  </div>
  <div class="flex flex-col">
    <main class="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div class="flex items-center">
        <h1 class="text-lg font-semibold md:text-2xl">bello</h1>
      </div>
      <div class="flex flex-1 items-center justify-center rounded-lg border border-dashed border-black shadow-sm"></div>
    </main>
  </div>
</div>
