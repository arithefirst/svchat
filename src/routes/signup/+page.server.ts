import { signupSchema } from '$lib/types/schema';
import { message, setError, superValidate, fail } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions } from './$types';
import { auth } from '$lib/server/db/auth';
import { APIError } from 'better-auth/api';

export const load = async () => {
  const form = await superValidate(zod(signupSchema));
  return { form };
};

export const actions = {
  signup: async ({ request }) => {
    const form = await superValidate(request, zod(signupSchema));
    const email = form.data.email;
    const password = form.data.password;
    const name = form.data.username;

    if (!form.valid) {
      return fail(400, { form });
    }

    try {
      await auth.api.signUpEmail({
        body: {
          name,
          email,
          password,
        },
      });
    } catch (e) {
      if (e instanceof APIError) {
        if (e.message === 'API Error: UNAUTHORIZED Invalid email or password') {
          return setError(form, 'verify', 'Invalid email or password', {
            status: 401,
          });
        }
      }
    }

    return message(form, 'Successfuly signed in.');
  },
} satisfies Actions;
