<script lang="ts">
  import { Button } from '$lib/components/ui/button/index.js';
  import * as Card from '$lib/components/ui/card/index.js';
  import { Input } from '$lib/components/ui/input/index.js';
  import { Label } from '$lib/components/ui/label/index.js';
  import { superForm } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import { loginSchema } from '$lib/types/login';

  let { data } = $props();
  const { form, errors, message, enhance } = superForm(data.form, {
    validators: zodClient(loginSchema),
  });
</script>

<svelte:head>
  <title>SVChat | Log In</title>
</svelte:head>

<main class="abs-center w-96">
  <Card.Root class="mx-auto">
    <Card.Header>
      <Card.Title class="text-2xl">Log In</Card.Title>
      <Card.Description>Enter your email below to login to your account</Card.Description>
    </Card.Header>
    <Card.Content>
      <form class="grid gap-4" method="POST" action="?/login" use:enhance>
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
            <a href="##" class="ml-auto inline-block text-sm underline"> Forgot your password? </a>
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
        <Button type="submit" class="w-full">Log In</Button>
      </form>
      <p class="mt-1 text-center text-green-500">
        {#if $message}{$message}{/if}
      </p>
      <div class="mt-4 text-center text-sm">
        Don&apos;t have an account?
        <a href="/signup" class="underline"> Sign up </a>
      </div>
    </Card.Content>
  </Card.Root>
</main>
