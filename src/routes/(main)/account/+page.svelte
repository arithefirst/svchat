<script lang="ts">
  import { Button } from '$lib/components/ui/button/index';
  import * as Dialog from '$lib/components/ui/dialog';

  let { data } = $props();

  import UpdatePassword from '$lib/components/forms/updatePassword.svelte';
  import UpdateUsername from '$lib/components/forms/updateUsername.svelte';
  import UpdatePfp from '$lib/components/forms/updatePFP.svelte';

  let open: boolean = $state(false);
</script>

<main class="abs-center w-2/3">
  <div class="relative grid w-full grid-cols-1 gap-3 md:grid-cols-2">
    <UpdatePassword data={data.newpassForm} />
    <UpdateUsername data={data.newuserForm} />
    <UpdatePfp />

    <!-- Account Actions -->
    <div class="grid w-full items-start gap-3">
      <fieldset class="grid w-full gap-3 rounded-lg border p-4">
        <legend class="-ml-1 px-1 text-sm font-medium"> Account Actions </legend>
        <form>
          <Button type="submit" class="w-full">Sign Out</Button>
        </form>
        <Button variant="destructive" class="w-full" onclick={() => (open = !open)}>Delete Account</Button>
      </fieldset>
    </div>
  </div>
</main>

<Dialog.Root bind:open>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>Are you sure absolutely sure?</Dialog.Title>
      <Dialog.Description>
        This action cannot be undone. This will permanently delete your account and remove your data from our database.
        <form class="mt-2 flex gap-2" method="POST" action="?/deleteAccount">
          <Button class="w-1/2" onclick={() => (open = !open)}>I changed my mind!</Button>
          <Button variant="destructive" class="w-1/2" type="submit">Delete Account</Button>
        </form>
      </Dialog.Description>
    </Dialog.Header>
  </Dialog.Content>
</Dialog.Root>
