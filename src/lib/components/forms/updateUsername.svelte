<script lang="ts">
  import { Button } from '$lib/components/ui/button/index';
  import { Input } from '$lib/components/ui/input/index';
  import { Label } from '$lib/components/ui/label/index';
  import { type ChangeUsernameSchema, changeUsernameSchema } from '$lib/types/account';
  import type { Infer, SuperValidated } from 'sveltekit-superforms';
  import { superForm } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';

  let { data }: { data: SuperValidated<Infer<ChangeUsernameSchema>> } = $props();
  const { form, errors, message, enhance } = superForm(data, {
    validators: zodClient(changeUsernameSchema),
  });
</script>

<form class="grid size-full items-start gap-3" method="POST" action="?/updateUsername" use:enhance>
  <fieldset class="flex size-full flex-col justify-center gap-3 rounded-lg border p-4">
    <legend class="-ml-1 px-1 text-sm font-medium"> Update Username </legend>
    <div class="grid gap-3">
      <Label for="username">New Username</Label>
      <Input
        id="username"
        name="username"
        type="text"
        placeholder="New Username"
        bind:value={$form.username}
        aria-invalid={$errors.username ? 'true' : undefined}
      />
      {#if $errors.username}<span class="text-sm text-red-500">{$errors.username[0]}</span>{/if}
    </div>
    <Button type="submit">Update Username</Button>
    <p class="mt-1 text-center text-sm text-green-500">
      {#if $message}{$message}{/if}
    </p>
  </fieldset>
</form>
