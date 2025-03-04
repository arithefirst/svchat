<!--
	jsrepo 1.41.3
	Installed from github/ieedan/shadcn-svelte-extras
	3-4-2025
-->

<script lang="ts">
  import { type ButtonProps, Button } from '$lib/components/ui/button';
  import type { WithoutChildren } from 'bits-ui';
  import { useImageCropperCrop } from './image-cropper.svelte.js';
  import { ImageUp } from 'lucide-svelte';

  let { variant = 'default', size = 'sm', ...rest }: Omit<WithoutChildren<ButtonProps>, 'onclick'> = $props();

  const cropState = useImageCropperCrop();
</script>

<Button {...rest} {size} {variant} onclick={cropState.onclick}>
  <ImageUp />
  <span>Upload</span>
</Button>
