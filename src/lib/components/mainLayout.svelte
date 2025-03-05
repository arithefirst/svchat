<script lang="ts">
  import { MessageSquare } from 'lucide-svelte';
  import type { Snippet } from 'svelte';
  import type { PageData } from '../../routes/(main)/$types';
  import Channel from './channel.svelte';
  import ChannelDialog from './forms/channelDialog.svelte';
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
  <div class="grid h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
    <div class="hidden border-r bg-muted/40 md:block" bind:clientWidth={sidebarWidth}>
      <div class="flex h-full max-h-screen flex-col gap-2">
        <div class="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <a href="/" class="flex items-center gap-2 font-semibold">
            <MessageSquare class="h-6 w-6" />
            <span class="">SVChat</span>
          </a>
          <ModeSwitcher />
        </div>
        <div class="h-full flex-1 overflow-scroll">
          <nav class="grid items-start px-2 text-sm font-medium lg:px-4">
            {#each channels as channelName}
              <Channel {channelName} />
            {/each}
          </nav>
        </div>
        <div class="mt-auto border-t p-4">
          <User {data} />
          <ChannelDialog data={data.form} />
        </div>
      </div>
    </div>
    <div class="relative max-h-screen p-2" style={`max-width: calc(100vw - 1px - ${sidebarWidth}px)`}>
      {@render children()}
    </div>
  </div>
</div>
