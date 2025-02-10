<script lang="ts">
  import type { PageData } from '../../routes/(main)/$types';
  const { data }: { data: PageData } = $props();

  const imageSrc = data.session?.user.image ?? `https://api.dicebear.com/9.x/identicon/svg?seed=${data.session?.user.id}`;
</script>

{#if data.session}
  <div class="mb-1 flex w-full p-2">
    <div class="avatar mr-2 rounded-sm">
      <div class="h-12 w-12 overflow-hidden rounded-lg border bg-white">
        <img src={imageSrc} alt="Profile image for {data.session?.user.name}" />
      </div>
    </div>
    <div class="flex w-full items-center align-middle">
      <p class="font-bold">{data.session?.user.name}</p>
    </div>
  </div>
{/if}
