import { auth } from '$lib/server/db/auth';
import { json } from '@sveltejs/kit';

export const GET = async ({ request }) => {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (session) {
    return json({ status: 200 });
  } else {
    return json({ status: 401 }, { status: 401 });
  }
};
