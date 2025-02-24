<script lang="ts">
  import { Button } from '$lib/components/ui/button/index';
  import * as Tooltip from '$lib/components/ui/tooltip';
  import Cog from 'lucide-svelte/icons/cog';
  import type { PageData } from '../../routes/(main)/$types';
  const { data }: { data: PageData } = $props();

  const imageSrc = data.user.image ?? `https://api.dicebear.com/9.x/identicon/svg?seed=${data.session?.user.id}`;
</script>

{#if data.user.username}
  <div class="mb-1 flex w-full items-center p-2">
    <div class="avatar mr-2 rounded-sm">
      <div class="h-12 w-12 overflow-hidden rounded-lg border bg-white">
        <img src={imageSrc} alt="Profile image for {data.user.username}" />
      </div>
    </div>
    <div class="flex w-full items-center align-middle">
      <p class="font-bold">{data.user.username}</p>
    </div>
    <Tooltip.Root>
      <Tooltip.Trigger>
        <Button size="icon" href="/account"><Cog /></Button>
      </Tooltip.Trigger>
      <Tooltip.Content>
        <p>Account Settings</p>
      </Tooltip.Content>
    </Tooltip.Root>
  </div>
{/if}
