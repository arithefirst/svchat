import { db } from '$lib/server/db';
import { newChannelSchema } from '$lib/types/schema';
import { fail, redirect } from '@sveltejs/kit';
import { message, setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions } from './$types';

export function load(): void {
  redirect(308, '/channel/general');
}

export const actions = {
  newchannel: async ({ request }) => {
    const form = await superValidate(request, zod(newChannelSchema));
    const channel = form.data.channelName;

    if (!form.valid) {
      return fail(400, { form });
    }

    if (await db.checkChannel(channel)) {
      return setError(form, 'channelName', 'Channel already exists.');
    }

    db.createChannel(channel);

    return message(form, 'Channel created!');
  },
} satisfies Actions;
