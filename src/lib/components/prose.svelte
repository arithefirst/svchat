<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    children: Snippet;
    class: string;
  }

  const { children, class: className = '' }: Props = $props();
</script>

<div class={className + ' prose prose-stone dark:prose-invert prose-blue'}>{@render children()}</div>
