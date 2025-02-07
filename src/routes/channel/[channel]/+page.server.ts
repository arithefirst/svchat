import type { TypeMessage } from '$lib/types';
import { error } from '@sveltejs/kit';
import { db } from '$lib/server/db';

export async function load({ params }): Promise<{ messages: TypeMessage[] }> {
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
