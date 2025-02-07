<script lang="ts">
  import MessagesSquare from 'lucide-svelte/icons/messages-square';
  import type { SuperValidated } from 'sveltekit-superforms';
  import ChannelDialog from './channelDialog.svelte';
  import ModeSwitcher from './modeSwitcher.svelte';
  import Channel from './channel.svelte';
  import type { Snippet } from 'svelte';

  interface Props {
    data: SuperValidated<
      {
        channelName: string;
      },
      any,
      {
        channelName: string;
      }
    >;
    channels: string[];
    children: Snippet;
  }

  let sidebarWidth = $state(0);
  const { data, channels, children }: Props = $props();
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
          <ChannelDialog {data} />
        </div>
      </div>
    </div>
    <div class="max-h-screen p-2" style={`max-width: calc(100vw - 1px - ${sidebarWidth}px)`}>
      {@render children()}
    </div>
  </div>
</div>
