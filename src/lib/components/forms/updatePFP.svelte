<script lang="ts">
  import { Button } from '$lib/components/ui/button/index';
  import { Input } from '$lib/components/ui/input/index';
</script>

<form class="grid w-full items-start gap-3">
  <fieldset class="grid w-full gap-3 rounded-lg border p-4">
    <legend class="-ml-1 px-1 text-sm font-medium"> Upload Profile Image </legend>
    <Input type="file" accept="image/jpeg, image/png" />
    <Button type="submit">Update Profile Photo</Button>
  </fieldset>
</form>
