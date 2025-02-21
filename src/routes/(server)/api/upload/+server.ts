import { error } from '@sveltejs/kit';
import { auth } from '$lib/server/db/auth';

export const POST = async ({ request }) => {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    return error(401, 'Not authorized. Please sign up at /sign-up');
  }

  return new Response(undefined, { status: 204 });
};
