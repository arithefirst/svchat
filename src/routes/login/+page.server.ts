import { dev } from '$app/environment';
import { auth } from '$lib/server/db/auth';
import { loginSchema } from '$lib/types/schema';
import { redirect } from '@sveltejs/kit';
import { fail, message, setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions } from './$types';
import type { APIError } from 'better-auth/api';

export async function load({ request }) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (session) {
    redirect(307, '/channel/general');
  }

  const form = await superValidate(zod(loginSchema));
  return { form };
}

export const actions = {
  login: async ({ request, cookies }) => {
    const form = await superValidate(request, zod(loginSchema));
    const email = form.data.email;
    const password = form.data.password;

    try {
      if (!form.valid) {
        return fail(400, { form });
      }

      const signin: Response = await auth.api.signInEmail({
        body: {
          email,
          password,
        },
        asResponse: true,
      });

      const setCookieHeader = signin.headers.get('set-cookie');
      if (setCookieHeader) {
        const parsedCookie = setCookieHeader.split(';')[0];
        const [name, encodedValue] = parsedCookie.split('=');
        // need to decode it first
        const decodedValue = decodeURIComponent(encodedValue);
        cookies.set(name, decodedValue, {
          path: '/',
          httpOnly: true,
          sameSite: 'lax',
          maxAge: 604800,
          secure: !dev,
        });
      }
    } catch (e) {
      if ((e as APIError).body.code === 'INVALID_EMAIL_OR_PASSWORD') {
        return setError(form, 'password', 'Invalid email or password', {
          status: 401,
        });
      } else {
        return setError(form, 'password', (e as APIError).message as string);
      }
    }

    return message(form, 'Successfuly signed in.');
  },
} satisfies Actions;
