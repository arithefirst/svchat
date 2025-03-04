<!--
	jsrepo 1.41.3
	Installed from github/ieedan/shadcn-svelte-extras
	3-4-2025
-->

<script lang="ts">
  import { Avatar as AvatarPrimitive } from 'bits-ui';
  import { cn } from '$lib/utils/utils.js';

  let { ref = $bindable(null), class: className, ...restProps }: AvatarPrimitive.FallbackProps = $props();
</script>

<AvatarPrimitive.Fallback bind:ref class={cn('flex h-full w-full items-center justify-center rounded-full bg-muted', className)} {...restProps} />
