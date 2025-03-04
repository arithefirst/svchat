<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    children: Snippet;
    class: string;
  }

  const { children, class: className = '' }: Props = $props();
</script>

<div class="{className} prose prose-stone prose-blue dark:prose-invert prose-pre:w-fit prose-pre:max-w-[95%] !max-w-full">
  {@render children()}
</div>
