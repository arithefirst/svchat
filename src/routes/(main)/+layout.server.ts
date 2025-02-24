import { db } from '$lib/server/db';
import { auth } from '$lib/server/db/auth';
import { authdb } from '$lib/server/db/sqlite.js';
import { newChannelSchema } from '$lib/types/misc';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

interface Profile {
  username: string;
  image: string;
}

export async function load({ request }) {
  const form = await superValidate(zod(newChannelSchema));
  const rows = await db.getChannels();
  const channels: string[] = rows
    ? rows.map((value) => {
        return value.table_name.replaceAll('_', '-');
      })
    : [];

  const session = await auth.api.getSession({
    headers: request.headers,
  });

  let user: Profile;

  if (session?.user.id) {
    user = authdb.getUser(session.user.id);
  } else {
    throw new Error('No user ID found.');
  }

  return {
    session,
    user,
    channels,
    form,
  };
}
