<script lang="ts">
  import { page } from '$app/state';
  import { MessageSquare, Clipboard, Link } from 'lucide-svelte';
  import * as ContextMenu from '$lib/components/ui/context-menu';
  import { copy } from '$lib/utils/copy';

  interface Props {
    channelName: string;
  }

  let { channelName }: Props = $props();
  const color = $derived(page.params.channel === channelName ? 'text-primary' : 'text-muted-foreground hover:text-primary');
  const channelURL = `${page.url.origin}/channel/${channelName}`;
</script>

<ContextMenu.Root>
  <ContextMenu.Trigger>
    <a href={`/channel/${channelName}`} class="flex items-center gap-3 rounded-lg px-3 py-2 transition-all {color}">
      <MessageSquare class="h-4 w-4" />
      {channelName}
    </a>
  </ContextMenu.Trigger>
  <ContextMenu.Content>
    <!-- Copy Channel Name -->
    <ContextMenu.Item class="flex cursor-pointer items-center gap-1.5" onclick={() => copy('Channel Name', channelName)}
      ><Clipboard size={16} />Copy Channel Name</ContextMenu.Item
    >
    <!-- Copy Channel URL -->
    <ContextMenu.Item class="flex cursor-pointer items-center gap-1.5" onclick={() => copy('Channel Channel URL', channelURL)}
      ><Link size={16} />Copy Channel URL</ContextMenu.Item
    >
  </ContextMenu.Content>
</ContextMenu.Root>
