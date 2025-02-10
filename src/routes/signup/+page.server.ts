import { dev } from '$app/environment';
import { auth } from '$lib/server/db/auth';
import { signupSchema } from '$lib/types/schema';
import { redirect } from '@sveltejs/kit';
import { fail, message, setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions } from './$types';

export async function load({ request }) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (session) {
    redirect(307, '/channel/general');
  }

  const form = await superValidate(zod(signupSchema));
  return { form };
}

export const actions = {
  signup: async ({ request, cookies }) => {
    const form = await superValidate(request, zod(signupSchema));
    const email = form.data.email;
    const password = form.data.password;
    const name = form.data.username;

    if (!form.valid) {
      return fail(400, { form });
    }

    const signup = await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
      asResponse: true,
    });

    const setCookieHeader = signup.headers.get('set-cookie');
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
    } else {
      return setError(form, 'verify', 'Invalid email or password', {
        status: 401,
      });
    }

    return message(form, 'Successfuly signed in.');
  },
} satisfies Actions;
