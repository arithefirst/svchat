import { db } from '$lib/server/db';
import type { TypeMessage } from '$lib/types';
import { error, redirect } from '@sveltejs/kit';
import { auth } from '$lib/server/db/auth';

export async function load({ params, request }): Promise<{ messages: TypeMessage[] }> {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    redirect(307, '/signup');
  }

  let messages: TypeMessage[];
  const rows = await db.getMessages(params.channel, 50);

  if (rows.messages !== null) {
    messages = rows
      ? rows.messages.map((value) => {
          return {
            message: value.message_content,
            user: value.sender.toString(),
            imageSrc: `https://api.dicebear.com/9.x/identicon/svg?seed=${value.sender.toString()}`,
            channel: value.channel,
          };
        })
      : [];
  } else {
    return error(404, `Channel '${params.channel}' does not exist`);
  }

  return {
    messages: messages ?? [],
  };
}
