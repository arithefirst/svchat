<script lang="ts">
  import { generateStream } from '$lib/functions/generateReadableStream';
  import { Button } from '$lib/components/ui/button/index';
  import { buttonVariants } from '$lib/components/ui/button/index';
  import * as ImageCropper from '$lib/components/ui/image-cropper';
  import { getFileFromUrl } from '$lib/components/ui/image-cropper';
  import type { PageData } from '../../../routes/(main)/account/$types';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
  import { Edit } from 'lucide-svelte';

  const { data }: { data: PageData } = $props();
  let src = $state(data.user.image ?? `https://api.dicebear.com/9.x/identicon/svg?seed=${data.session?.user.id}`);
  let open: boolean = $state(false);

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
      bind:src
      onCropped={async (url) => {
        const file = await getFileFromUrl(url);
        submit(file);
      }}
    >
      <div class="relative">
        <ImageCropper.Preview class="rounded-md" />
        <ImageCropper.UploadTrigger>
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
  </fieldset>
</form>
