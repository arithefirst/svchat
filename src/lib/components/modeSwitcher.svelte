<script lang="ts">
  import { Button } from '$lib/components/ui/button/index';
  import * as Tooltip from '$lib/components/ui/tooltip';
  import Moon from 'lucide-svelte/icons/moon-star';
  import Sun from 'lucide-svelte/icons/sun';
  import { toggleMode } from 'mode-watcher';
</script>

<Tooltip.Root>
  <Tooltip.Trigger class="ml-auto">
    <Button on:click={toggleMode} variant="secondary" size="icon">
      <Sun class="size-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon class="absolute size-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  </Tooltip.Trigger>
  <Tooltip.Content>
    <p>Toggle theme</p>
  </Tooltip.Content>
</Tooltip.Root>
