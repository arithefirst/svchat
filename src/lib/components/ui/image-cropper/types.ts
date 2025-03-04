/*
	jsrepo 1.41.3
	Installed from github/ieedan/shadcn-svelte-extras
	3-4-2025
*/

import type { AvatarRootProps, DialogContentProps, WithChildren } from 'bits-ui';
import type { Snippet } from 'svelte';
import type { HTMLInputAttributes } from 'svelte/elements';

export type ImageCropperRootProps = HTMLInputAttributes &
  WithChildren<{
    id?: string;
    src?: string;
    onCropped?: (url: string) => void;
  }>;

export type ImageCropperDialogProps = DialogContentProps;

export type ImageCropperPreviewProps = Omit<AvatarRootProps, 'child'> & {
  child?: Snippet<[{ src: string }]>;
};
