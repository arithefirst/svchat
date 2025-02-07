import { db } from '$lib/server/db';
import { zod } from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms';
import { newChannelSchema } from '$lib/types/schema';

export async function load() {
  const form = await superValidate(zod(newChannelSchema));
  const rows = await db.getChannels();
  const channels: string[] = rows
    ? rows.map((value) => {
        return value.table_name;
      })
    : [];

  return {
    channels,
    form,
  };
}
