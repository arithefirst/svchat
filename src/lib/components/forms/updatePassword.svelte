<script lang="ts">
  import { Button } from '$lib/components/ui/button/index';
  import { Input } from '$lib/components/ui/input/index';
  import { Label } from '$lib/components/ui/label/index';
  import { type ChangePasswordSchema, changePasswordSchema } from '$lib/types/account';
  import type { Infer, SuperValidated } from 'sveltekit-superforms';
  import { superForm } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';

  let { data }: { data: SuperValidated<Infer<ChangePasswordSchema>> } = $props();
  const { form, errors, message, enhance } = superForm(data, {
    validators: zodClient(changePasswordSchema),
  });
</script>

<!-- Update Password -->
<form class="grid w-full items-start gap-3" use:enhance method="POST" action="?/updatePassword">
  <fieldset class="grid w-full gap-3 rounded-lg border p-4">
    <legend class="-ml-1 px-1 text-sm font-medium"> Update Password </legend>
    <div class="grid gap-3">
      <Label for="currentPassword">Current Password</Label>
      <Input
        id="currentPassword"
        name="currentPassword"
        type="password"
        placeholder="Current Password"
        bind:value={$form.currentPassword}
        aria-invalid={$errors.currentPassword ? 'true' : undefined}
      />
      {#if $errors.currentPassword}<span class="text-sm text-red-500">{$errors.currentPassword[0]}</span>{/if}
    </div>
    <div class="grid gap-3">
      <Label for="newPassword">New Password</Label>
      <Input
        id="newPassword"
        name="newPassword"
        type="password"
        placeholder="New Password"
        bind:value={$form.newPassword}
        aria-invalid={$errors.newPassword ? 'true' : undefined}
      />
      {#if $errors.newPassword}<span class="text-sm text-red-500">{$errors.newPassword[0]}</span>{/if}
    </div>
    <Button type="submit">Update Password</Button>
    <p class="mt-1 text-center text-sm text-green-500">
      {#if $message}{$message}{/if}
    </p>
  </fieldset>
</form>
