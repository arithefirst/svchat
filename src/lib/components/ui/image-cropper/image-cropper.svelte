<!--
	jsrepo 1.41.3
	Installed from github/ieedan/shadcn-svelte-extras
	3-4-2025
-->

<script lang="ts">
  import { box } from 'svelte-toolbelt';
  import { useImageCropperRoot } from './image-cropper.svelte.js';
  import type { ImageCropperRootProps } from './types';
  import { onDestroy } from 'svelte';
  import { useId } from 'bits-ui';

  let {
    id = useId(),
    src = $bindable(''),
    onCropped = () => {},
    children,
    error = $bindable(null),
    ...rest
  }: ImageCropperRootProps & { error?: string | null } = $props();

  const rootState = useImageCropperRoot({
    id: box.with(() => id),
    src: box.with(
      () => src,
      (v) => (src = v),
    ),
    onCropped,
  });

  onDestroy(() => rootState.dispose());
</script>

{@render children?.()}
<input
  {...rest}
  onchange={(e) => {
    const file = e.currentTarget.files?.[0];
    if (!file) return;
    // Prevent the user from uploading non-image files
    if (file.type.split('/')[0] !== 'image') {
      error = 'Please upload a valid image.';
      return;
    }
    error = null;
    rootState.onUpload(file);
    // reset so that we can reupload the same file
    (e.target! as HTMLInputElement).value = '';
  }}
  type="file"
  {id}
  style="display: none;"
/>
