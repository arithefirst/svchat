<!--
	jsrepo 1.41.3
	Installed from github/ieedan/shadcn-svelte-extras
	3-4-2025
-->

<script lang="ts">
  import { Avatar as AvatarPrimitive } from 'bits-ui';
  import { cn } from '$lib/utils/utils.js';

  let { ref = $bindable(null), class: className, ...restProps }: AvatarPrimitive.ImageProps = $props();
</script>

<AvatarPrimitive.Image bind:ref class={cn('aspect-square h-full w-full', className)} {...restProps} />
