<script lang="ts">
  import MessagesSquare from 'lucide-svelte/icons/messages-square';
  import type { SuperValidated } from 'sveltekit-superforms';
  import ChannelDialog from './channelDialog.svelte';
  import ModeSwitcher from './modeSwitcher.svelte';
  import Channel from './channel.svelte';
  import type { Snippet } from 'svelte';
  import { Button } from '$lib/components/ui/button';
  import PanelLeft from 'lucide-svelte/icons/panel-left';

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

  let open: boolean = $state(false);
  let mobileSidebarTransform: string = $derived(open ? '' : '@apply -translate-x-[100%] md:translate-x-0');

  const { data, channels, children }: Props = $props();
</script>

<Button
  class="fixed top-4 md:hidden block aspect-square p-0 right-4"
  variant="secondary"
  onclick={() => {
    open = !open;
  }}><PanelLeft class="w-1/2 h-1/2 mx-auto" /></Button>
<div class="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
  <div
    class={'bg-muted/40 border-r md:w-[220px] lg:w-[280px] w-3/4 h-full md:relative absolute transition-transform duration-300' +
      mobileSidebarTransform}>
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
  <div class="p-2 max-h-screen">
    {@render children()}
  </div>
</div>
