<!--
	jsrepo 1.41.3
	Installed from github/ieedan/shadcn-svelte-extras
	3-4-2025
-->

<script lang="ts">
  import { cn } from '$lib/utils/utils';
  import type { HTMLAttributes } from 'svelte/elements';

  let { class: className, children, ...rest }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<div {...rest} class={cn('flex w-full place-items-center justify-center gap-2', className)}>
  {@render children?.()}
</div>
