import { auth } from '$lib/server/db/auth';
import { redirect } from '@sveltejs/kit';

export async function load({ request }): Promise<void> {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    redirect(307, '/signup');
  }
}
