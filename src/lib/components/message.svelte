<script lang="ts">
  import { type TypeMessage } from '$lib';
  const { message, imageSrc, user }: TypeMessage = $props();
</script>

<div class="w-full hover:bg-zinc-200 flex py-2 dark:hover:bg-stone-900">
  <div class="avatar mx-2 rounded-sm">
    <div class="w-12 h-12 overflow-hidden rounded-lg border bg-white">
      <img src={imageSrc} alt="Profile image for {user}" />
    </div>
  </div>
  <div class="flex-col">
    <p class="font-bold">{user}</p>
    <p class="flex-wrap">{message}</p>
  </div>
</div>
