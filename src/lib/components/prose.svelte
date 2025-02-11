<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    children: Snippet;
    class: string;
  }

  const { children, class: className = '' }: Props = $props();
</script>

<div class={className + ' prose prose-stone prose-blue !max-w-full dark:prose-invert prose-pre:w-fit prose-pre:max-w-[95%] '}>
  {@render children()}
</div>
