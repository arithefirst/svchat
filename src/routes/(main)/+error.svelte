<script lang="ts">
  import { page } from '$app/state';
  import { Button } from '$lib/components/ui/button';
  import * as Card from '$lib/components/ui/card';
  import { BrokenHeart } from 'lucide-svelte';
</script>

<main class="relative size-full">
  <Card.Root class="abs-center flex h-1/2 w-1/2 flex-col md:w-1/4">
    <Card.Header class="h-fit">
      <Card.Title class="text-center">{page.status} - {page.error?.message}</Card.Title>
    </Card.Header>
    <Card.Content class="relative grow">
      <BrokenHeart class="abs-center size-1/2" />
    </Card.Content>
    <Card.Footer class="h-fit">
      <Button href="/channel/general" variant="secondary" class="mx-auto">Go Home</Button>
    </Card.Footer>
  </Card.Root>
</main>
