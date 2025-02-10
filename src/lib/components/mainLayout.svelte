<script lang="ts">
  import MessagesSquare from 'lucide-svelte/icons/messages-square';
  import type { Snippet } from 'svelte';
  import type { PageData } from '../../routes/$types';
  import Channel from './channel.svelte';
  import ChannelDialog from './channelDialog.svelte';
  import ModeSwitcher from './modeSwitcher.svelte';
  import User from './user.svelte';

  interface Props {
    data: PageData;
    children: Snippet;
  }

  let sidebarWidth = $state(0);
  const { data, children }: Props = $props();
  const channels = data.channels;
</script>

<div class="w-screen">
  <div class="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
    <div class="hidden border-r bg-muted/40 md:block" bind:clientWidth={sidebarWidth}>
      <div class="flex h-full max-h-screen flex-col gap-2">
        <div class="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <a href="/" class="flex items-center gap-2 font-semibold">
            <MessagesSquare class="h-6 w-6" />
            <span class="">SVChat</span>
          </a>
          <ModeSwitcher />
        </div>
        <div class="flex-1">
          <nav class="grid items-start px-2 text-sm font-medium lg:px-4">
            {#each channels as channelName}
              <Channel {channelName} />
            {/each}
          </nav>
        </div>
        <div class="mt-auto p-4">
          <User {data} />
          <ChannelDialog data={data.form} />
        </div>
      </div>
    </div>
    <div class="max-h-screen p-2" style={`max-width: calc(100vw - 1px - ${sidebarWidth}px)`}>
      {@render children()}
    </div>
  </div>
</div>
