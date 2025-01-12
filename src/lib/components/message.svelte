<script lang="ts">
  import { type TypeMessage } from '$lib';
  const { message, imageSrc, user }: TypeMessage = $props();
</script>

<div class="w-full hover:bg-base-300 bg-base-200 flex py-2">
  <div class="avatar mx-2">
    <div class="w-12 h-12 rounded">
      <img src={imageSrc} alt="Profile image for {user}" />
    </div>
  </div>
  <div class="flex-col">
    <p class="font-bold">{user}</p>
    <p class="flex-wrap">{message}</p>
  </div>
</div>
