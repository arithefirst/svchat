<script lang="ts">
  import { generateStream } from '$lib/functions/generateReadableStream';
  import { Button } from '$lib/components/ui/button/index';

  let files: FileList;

  function submit() {
    if (files.length === 0) return;
    generateStream(files[0]);
  }
</script>

<form class="grid w-full items-start gap-3" onsubmit={submit}>
  <fieldset class="grid w-full gap-3 rounded-lg border p-4">
    <legend class="-ml-1 px-1 text-sm font-medium"> Upload Profile Image </legend>
    <input
      class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0
      file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1
      focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
      type="file"
      accept="image/jpeg, image/png"
      bind:files
    />
    <Button type="submit">Update Profile Photo</Button>
  </fieldset>
</form>
