<script lang="ts">
  import { type TypeMessage } from '$lib/types';
  import Prose from '$lib/components/prose.svelte';
  import renderMarkdown from '$lib/functions/renderMarkdown';
  const { message, imageSrc, user, timestamp }: TypeMessage = $props();
</script>

<div class="flex w-full p-2 hover:bg-zinc-200 dark:hover:bg-stone-900">
  <div class="avatar mr-2 rounded-sm">
    <div class="h-12 w-12 overflow-hidden rounded-lg border bg-white">
      <img src={imageSrc} alt="Profile image for {user}" />
    </div>
  </div>
  <div class="w-full">
    <p class="inline-size-full flex items-center gap-1 break-words">
      <span class="font-bold">{user}</span>
      <span>·</span>
      <span class="text-muted-foreground"
        >{new Date(timestamp).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour12: true,
          hour: 'numeric',
          minute: 'numeric',
        })}</span
      >
    </p>
    <Prose class="inline-size-full text-wrap break-words font-sans">{@html renderMarkdown(message)}</Prose>
  </div>
</div>

<style>
  .inline-size-full {
    inline-size: calc(100% - 64px);
  }
</style>
