import { redirect, fail } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import { setError, superValidate, message } from 'sveltekit-superforms';
import { newChannelSchema } from '$lib/types/schema';
import type { Actions } from './$types';
import { db } from '$lib/server/db';

export function load(): void {
  redirect(308, '/channel/general');
}

export const actions = {
  default: async ({ request }) => {
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
