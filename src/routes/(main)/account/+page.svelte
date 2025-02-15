<script lang="ts">
  import { Input } from '$lib/components/ui/input/index';
  import { Label } from '$lib/components/ui/label/index';
  import { Button } from '$lib/components/ui/button/index';
  import * as Dialog from '$lib/components/ui/dialog';

  let open: boolean = $state(false);
</script>

<main class="abs-center w-2/3">
  <div class="relative grid w-full grid-cols-1 gap-3 md:grid-cols-2">
    <!-- Update Password -->
    <form class="grid w-full items-start gap-3">
      <fieldset class="grid w-full gap-3 rounded-lg border p-4">
        <legend class="-ml-1 px-1 text-sm font-medium"> Update Password </legend>
        <div class="grid gap-3">
          <Label for="temperature">Current Password</Label>
          <Input id="current" type="password" placeholder="Current Password" />
        </div>
        <div class="grid gap-3">
          <Label for="temperature">New Password</Label>
          <Input id="new" type="password" placeholder="New Password" />
        </div>
        <Button type="submit">Update Password</Button>
      </fieldset>
    </form>
    <!-- Change Username -->
    <form class="grid w-full items-start gap-3">
      <fieldset class="grid w-full gap-3 rounded-lg border p-4">
        <legend class="-ml-1 px-1 text-sm font-medium"> Update Username </legend>
        <div class="grid gap-3">
          <Label for="temperature">New Username</Label>
          <Input id="newUsername" type="password" placeholder="New Username" />
        </div>
        <div class="grid gap-3">
          <Label for="temperature">Password</Label>
          <Input id="password" type="password" placeholder="Password" />
        </div>
        <Button type="submit">Update Username</Button>
      </fieldset>
    </form>
    <!-- Upload Profile Photo -->
    <form class="grid w-full items-start gap-3">
      <fieldset class="grid w-full gap-3 rounded-lg border p-4">
        <legend class="-ml-1 px-1 text-sm font-medium"> Upload Profile Image </legend>
        <Input type="file" accept="image/jpeg, image/png" />
        <Button type="submit">Update Profile Photo</Button>
      </fieldset>
    </form>
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
        <div class="mt-2 flex gap-2">
          <Button class="w-1/2" onclick={() => (open = !open)}>I changed my mind!</Button>
          <Button variant="destructive" class="w-1/2" type="submit">Delete Account</Button>
        </div>
      </Dialog.Description>
    </Dialog.Header>
  </Dialog.Content>
</Dialog.Root>
