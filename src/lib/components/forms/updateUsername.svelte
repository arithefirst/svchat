<script lang="ts">
  import { Button } from '$lib/components/ui/button/index';
  import { Input } from '$lib/components/ui/input/index';
  import { Label } from '$lib/components/ui/label/index';
  import type { ChangeUsernameSchema } from '$lib/types/account';
  import type { Infer, SuperValidated } from 'sveltekit-superforms';
  import { superForm } from 'sveltekit-superforms';

  let { data }: { data: SuperValidated<Infer<ChangeUsernameSchema>> } = $props();
  const { form, errors, message, enhance } = superForm(data);
</script>

<form class="grid w-full items-start gap-3" method="POST" action="?/updateUsername" use:enhance>
  <fieldset class="grid w-full gap-3 rounded-lg border p-4">
    <legend class="-ml-1 px-1 text-sm font-medium"> Update Username </legend>
    <div class="grid gap-3">
      <Label for="username">New Username</Label>
      <Input
        id="username"
        name="username"
        type="password"
        placeholder="New Username"
        bind:value={$form.username}
        aria-invalid={$errors.username ? 'true' : undefined}
      />
      {#if $errors.username}<span class="text-sm text-red-500">{$errors.username[0]}</span>{/if}
    </div>
    <div class="grid gap-3">
      <Label for="password">Password</Label>
      <Input
        id="password"
        name="password"
        type="password"
        placeholder="Password"
        bind:value={$form.password}
        aria-invalid={$errors.password ? 'true' : undefined}
      />
      {#if $errors.password}<span class="text-sm text-red-500">{$errors.password[0]}</span>{/if}
    </div>
    <Button type="submit">Update Username</Button>
    <p class="mt-1 text-center text-sm text-green-500">
      {#if $message}{$message}{/if}
    </p>
  </fieldset>
</form>
