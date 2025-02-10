import { loginSchema } from '$lib/types/schema';
import { message, setError, superValidate, fail } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions } from './$types';
import { auth } from '$lib/server/db/auth';
import { APIError } from 'better-auth/api';

export const load = async () => {
  const form = await superValidate(zod(loginSchema));
  return { form };
};

export const actions = {
  login: async ({ request }) => {
    const form = await superValidate(request, zod(loginSchema));
    const email = form.data.email;
    const password = form.data.password;

    if (!form.valid) {
      return fail(400, { form });
    }

    try {
      await auth.api.signInEmail({
        body: {
          email,
          password,
        },
      });
    } catch (e) {
      if (e instanceof APIError) {
        if (e.message === 'API Error: UNAUTHORIZED Invalid email or password') {
          return setError(form, 'password', 'Invalid email or password', {
            status: 401,
          });
        }
      }
    }

    return message(form, 'Successfuly signed in.');
  },
} satisfies Actions;
