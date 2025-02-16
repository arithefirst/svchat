import { redirect } from '@sveltejs/kit';
import type { Actions } from '@sveltejs/kit';
import { fail, message, setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { auth } from '$lib/server/db/auth';
import { changeUsernameSchema, changePasswordSchema } from '$lib/types/schema.js';

export async function load({ request }) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    redirect(307, '/signup');
  }

  return {
    newuserForm: await superValidate(zod(changeUsernameSchema)),
    newpassForm: await superValidate(zod(changePasswordSchema)),
  };
}

export const actions = {
  updatePassword: async ({ request }) => {
    const newpassForm = await superValidate(request, zod(changePasswordSchema));

    if (!newpassForm.valid) {
      return fail(400, { newpassForm });
    }

    return message(newpassForm, 'Password updated.');
  },
  updateUsername: async ({ request }) => {
    const newuserForm = await superValidate(request, zod(changeUsernameSchema));

    if (!newuserForm.valid) {
      return fail(400, { newuserForm });
    }

    return message(newuserForm, 'Username updated.');
  },
  updateProfilePhoto: async () => {},
  deleteAccount: async ({ request }) => {
    auth.api.deleteUser({
      headers: request.headers,
      body: {},
    });

    redirect(303, '/goodbye');
  },
  signOut: async () => {},
} satisfies Actions;
