<script lang="ts">
  import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
  import * as Dialog from '$lib/components/ui/dialog/index.js';
  import { Input } from '$lib/components/ui/input/index.js';
  import { Label } from '$lib/components/ui/label/index';
  import type { NewChannelSchema } from '$lib/types/misc';
  import type { Infer, SuperValidated } from 'sveltekit-superforms';
  import { superForm } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import { newChannelSchema } from '$lib/types/misc';

  let open: boolean = $state(false);
  let { data }: { data: SuperValidated<Infer<NewChannelSchema>> } = $props();
  const { form, errors, constraints, enhance } = superForm(data, {
    validators: zodClient(newChannelSchema),
    onResult: ({ result }) => {
      if (result.type === 'success') {
        open = false;
        // TODO (reactive channels)
        // Send an event to the channel list to tell it to re-index all of the channels
        // we *could* just reload, but then there would be a flash of un-rendered content
        // and I would like to avoid that if possible
      }
    },
  });
</script>

<Dialog.Root bind:open>
  <Dialog.Trigger class="{buttonVariants({ variant: 'secondary' })} w-full">Create Channel</Dialog.Trigger>
  <Dialog.Content class="sm:max-w-[425px]">
    <Dialog.Header>
      <Dialog.Title>Create Channel</Dialog.Title>
    </Dialog.Header>
    <form class="grid gap-4 py-4" use:enhance method="POST" action="/?/newchannel">
      <Input
        id="channelName"
        name="channelName"
        placeholder="Channel Name"
        type="text"
        bind:value={$form.channelName}
        aria-invalid={$errors.channelName ? 'true' : undefined}
      />
      {#if $errors.channelName}<Label for="channelName" class="m-0 p-0 text-red-500">{$errors.channelName}</Label>{/if}
      <Dialog.Footer>
        <Button type="submit">Create</Button>
      </Dialog.Footer>
    </form>
  </Dialog.Content>
</Dialog.Root>
