<script lang="ts">
  import { Button } from '$lib/components/ui/button/index.js';
  import * as Dialog from '$lib/components/ui/dialog/index.js';

  interface Props {
    messageLength: number | undefined;
    showDialog: boolean;
  }

  let { messageLength, showDialog = $bindable() }: Props = $props();
  const lengthString = $derived(messageLength ? ` (${messageLength})` : '');
  $inspect(lengthString);
</script>

<Dialog.Root bind:open={showDialog}>
  <Dialog.Content class="sm:max-w-[425px]">
    <Dialog.Header>
      <Dialog.Title>Message too long</Dialog.Title>
    </Dialog.Header>
    This message exceeds the maximum character limit of 2000 characters {lengthString}. Please shorten it and then try again.
    <Button onclick={() => (showDialog = false)}>Okay</Button>
  </Dialog.Content>
</Dialog.Root>
