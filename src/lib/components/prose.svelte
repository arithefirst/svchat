<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    children: Snippet;
    class: string;
  }

  const { children, class: className = '' }: Props = $props();
</script>

<div class={className + ' prose prose-stone prose-blue dark:prose-invert'}>{@render children()}</div>
