<script lang="ts">
  import { Button } from '$lib/components/ui/button/index.js';
  import * as Card from '$lib/components/ui/card/index.js';
  import { Input } from '$lib/components/ui/input/index.js';
  import { Label } from '$lib/components/ui/label/index.js';
  import { superForm } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import { signupSchema } from '$lib/types/signup.js';

  let { data } = $props();
  const { form, errors, message, enhance } = superForm(data.form, {
    validators: zodClient(signupSchema),
  });
</script>

<svelte:head>
  <title>SVChat | Sign Up</title>
</svelte:head>

<main class="abs-center w-96">
  <Card.Root class="mx-auto">
    <Card.Header>
      <Card.Title class="text-2xl">Sign Up</Card.Title>
      <Card.Description>Enter your email below to create an account</Card.Description>
    </Card.Header>
    <Card.Content>
      <form class="grid gap-4" method="POST" action="?/signup" use:enhance>
        <div class="grid gap-2">
          <Label for="email">Username</Label>
          <Input
            id="username"
            type="text"
            name="username"
            placeholder="janedoe"
            bind:value={$form.username}
            aria-invalid={$errors.username ? 'true' : undefined}
          />
          {#if $errors.username}<span class="text-sm text-red-500">{$errors.username[0]}</span>{/if}
        </div>
        <div class="grid gap-2">
          <Label for="email">Email</Label>
          <Input
            id="email"
            type="text"
            name="email"
            placeholder="janedoe@example.com"
            bind:value={$form.email}
            aria-invalid={$errors.email ? 'true' : undefined}
          />
          {#if $errors.email}<span class="text-sm text-red-500">{$errors.email[0]}</span>{/if}
        </div>
        <div class="grid gap-2">
          <div class="flex items-center">
            <Label for="password">Password</Label>
          </div>
          <Input
            id="password"
            type="password"
            name="password"
            bind:value={$form.password}
            aria-invalid={$errors.password ? 'true' : undefined}
            placeholder="Password123!"
          />
          {#if $errors.password}<span class="text-sm text-red-500">{$errors.password[0]}</span>{/if}
        </div>
        <div class="grid gap-2">
          <div class="flex items-center">
            <Label for="verify">Verify Password</Label>
          </div>
          <Input
            id="verify"
            type="password"
            name="verify"
            bind:value={$form.verify}
            aria-invalid={$errors.verify ? 'true' : undefined}
            placeholder="Password123!"
          />
          {#if $errors.verify}<span class="text-sm text-red-500">{$errors.verify[0]}</span>{/if}
        </div>
        <Button type="submit" class="w-full">Sign Up</Button>
      </form>
      <p class="mt-1 text-center text-green-500">
        {#if $message}{$message}{/if}
      </p>
      <div class="mt-4 text-center text-sm">
        Already have an account?
        <a href="/login" class="underline"> Log in </a>
      </div>
    </Card.Content>
  </Card.Root>
</main>
