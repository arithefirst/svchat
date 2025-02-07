<script lang="ts">
  import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
  import * as Dialog from '$lib/components/ui/dialog/index.js';
  import { Input } from '$lib/components/ui/input/index.js';
</script>

<Dialog.Root>
  <Dialog.Trigger class={buttonVariants({ variant: 'secondary' }) + ' w-full'}>Create Channel</Dialog.Trigger>
  <Dialog.Content class="sm:max-w-[425px]">
    <Dialog.Header>
      <Dialog.Title>Create Channel</Dialog.Title>
    </Dialog.Header>
    <form class="grid gap-4 py-4">
      <Input id="channelName" name="channelName" placeholder="Channel Name" type="text" />
    </form>
    <Dialog.Footer>
      <Button type="submit">Create</Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
