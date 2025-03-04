<!--
	jsrepo 1.41.3
	Installed from github/ieedan/shadcn-svelte-extras
	3-4-2025
-->

<script lang="ts">
  import { type WithChildren } from 'bits-ui';
  import { useImageCropperTrigger } from './image-cropper.svelte.js';

  let { children }: WithChildren = $props();

  const triggerState = useImageCropperTrigger();
</script>

<label for={triggerState.rootState.id} class="hover:cursor-pointer">
  {@render children?.()}
</label>
