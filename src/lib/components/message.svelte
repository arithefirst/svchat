<script lang="ts">
  import { type TypeMessage } from '$lib/types';
  import Prose from '$lib/components/prose.svelte';
  import renderMarkdown from '$lib/functions/renderMarkdown';
  import * as ContextMenu from '$lib/components/ui/context-menu';

  interface Props {
    open: boolean;
    closeDialogs: (i: number) => void;
    i: number;
  }

  let { message, imageSrc, user, timestamp, uid, open = $bindable(), closeDialogs, i }: TypeMessage & Props = $props();
  let epoch: number = Math.floor(timestamp.getTime() / 1000);

  function copy(itemName: string, content: string | number) {
    navigator.clipboard
      .writeText(content as string)
      .then(() => {
        console.info(`Successfully copied ${itemName} to clipboard`);
        // dispatchToast('Successfully copied to clipboard.', true);
      })
      .catch((e) => {
        console.error(`Error copying ${itemName}: ${(e as Error).message}`);
        // dispatchToast('Copying failed. (See console)', false);
      });
  }
</script>

<ContextMenu.Root bind:open>
  <ContextMenu.Trigger class="flex w-full p-2 hover:bg-zinc-200 dark:hover:bg-stone-900" oncontextmenu={() => closeDialogs(i)}>
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
          >{timestamp.toLocaleDateString('en-US', {
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
  </ContextMenu.Trigger>
  <ContextMenu.Content>
    <ContextMenu.Item class="cursor-pointer" onclick={() => copy('username', user)}>Copy Username</ContextMenu.Item>
    <ContextMenu.Item class="cursor-pointer" onclick={() => copy('user ID', uid)}>Copy User ID</ContextMenu.Item>
    <ContextMenu.Separator />
    <ContextMenu.Item class="cursor-pointer" onclick={() => copy('message', message)}>Copy message content</ContextMenu.Item>
    <ContextMenu.Item class="cursor-pointer" onclick={() => copy('timestamp', epoch)}>Copy message epoch</ContextMenu.Item>
  </ContextMenu.Content>
</ContextMenu.Root>

<style>
  .inline-size-full {
    inline-size: calc(100% - 64px);
  }
</style>
