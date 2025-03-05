<script lang="ts">
  import { buttonVariants } from '$lib/components/ui/button/index';
  import * as ImageCropper from '$lib/components/ui/image-cropper';
  import { getFileFromUrl } from '$lib/components/ui/image-cropper';
  import { generateStream } from '$lib/functions/generateReadableStream';
  import { Edit } from 'lucide-svelte';
  import type { PageData } from '../../../routes/(main)/account/$types';

  const { data }: { data: PageData } = $props();
  let src = $state(data.user.image ?? `https://api.dicebear.com/9.x/identicon/svg?seed=${data.session?.user.id}`);
  let error: string | null = $state(null);

  async function submit(file: File) {
    await generateStream(file).then((res) => {
      if (res.ok) window.location.reload();
    });
  }
</script>

<form class="grid w-full items-start gap-3">
  <fieldset class="flex size-full flex-col items-center justify-center gap-3 rounded-lg border p-4">
    <legend class="-ml-1 px-1 text-sm font-medium"> Upload Profile Image </legend>
    <ImageCropper.Root
      bind:error
      bind:src
      onCropped={async (url) => {
        const file = await getFileFromUrl(url);
        submit(file);
      }}
    >
      <div class="relative">
        <ImageCropper.UploadTrigger>
          <ImageCropper.Preview class="rounded-md border bg-white" />
          <div class="absolute -bottom-3 -left-3 size-9 rounded-lg {buttonVariants({ variant: 'outline' })}">
            <Edit class="size-4" />
          </div>
        </ImageCropper.UploadTrigger>
      </div>
      <ImageCropper.Dialog>
        <ImageCropper.Cropper cropShape="rect" />
        <ImageCropper.Controls>
          <ImageCropper.Cancel />
          <ImageCropper.Crop />
        </ImageCropper.Controls>
      </ImageCropper.Dialog>
    </ImageCropper.Root>
    {#if error}<span class="text-sm text-red-500">{error}</span>{/if}
  </fieldset>
</form>
