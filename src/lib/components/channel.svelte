<script lang="ts">
  import MessageSquare from 'lucide-svelte/icons/message-square';
  import { page } from '$app/state';

  interface Props {
    channelName: string;
  }

  const { channelName }: Props = $props();
  const color = $derived(page.params.channel === channelName ? 'text-primary' : 'text-muted-foreground hover:text-primary');

  $inspect(page.params.channel, color);
</script>

<a href={`/channel/${channelName}`} class={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${color}`}>
  <MessageSquare class="h-4 w-4" />
  {channelName}
</a>
