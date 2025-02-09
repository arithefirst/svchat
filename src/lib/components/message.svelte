<script lang="ts">
  import { type TypeMessage } from '$lib/types';
  const { message, imageSrc, user }: TypeMessage = $props();
</script>

<div class="flex w-full p-2 hover:bg-zinc-200 dark:hover:bg-stone-900">
  <div class="avatar mr-2 rounded-sm">
    <div class="h-12 w-12 overflow-hidden rounded-lg border bg-white">
      <img src={imageSrc} alt="Profile image for {user}" />
    </div>
  </div>
  <div class="w-full">
    <p class="inline-size-full break-words font-bold">{user}</p>
    <pre class="inline-size-full text-wrap break-words font-sans">{message}</pre>
  </div>
</div>

<style>
  .inline-size-full {
    inline-size: calc(100% - 64px);
  }
</style>
