<script lang="ts">
  import { page } from '$app/state';
  import { Button } from '$lib/components/ui/button';
  import BrokenHeart from 'lucide-svelte/icons/heart-crack';
  import * as Card from '$lib/components/ui/card';
</script>

<main class="relative size-full">
  <Card.Root class="md:w-1/4 w-1/2 h-1/2 abs-center flex flex-col">
    <Card.Header class="h-fit">
      <Card.Title class="text-center">{page.status} - {page.error?.message}</Card.Title>
    </Card.Header>
    <Card.Content class="relative grow">
      <BrokenHeart class="size-1/2 abs-center" />
    </Card.Content>
    <Card.Footer class="h-fit">
      <Button href="/" variant="secondary" class="mx-auto">Go Home</Button>
    </Card.Footer>
  </Card.Root>
</main>
