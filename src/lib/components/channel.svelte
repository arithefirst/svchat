<script lang="ts">
  import MessageSquare from 'lucide-svelte/icons/message-square';
  import MessageUnread from 'lucide-svelte/icons/message-square-dot';

  interface Props {
    channelName: string;
    unread?: boolean;
  }

  const { channelName, unread = false }: Props = $props();
</script>

<a href={`/channel/${channelName}`} class="text-muted-foreground hover:text-primary flex items-center gap-3 rounded-lg px-3 py-2 transition-all">
  {#if unread}
    <MessageUnread class="h-4 w-4" />
  {:else}
    <MessageSquare class="h-4 w-4" />
  {/if}
  {channelName}
</a>
