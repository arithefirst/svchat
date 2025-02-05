import type { TypeMessage } from '$lib';
import { getMessages, client } from '$lib/server/db';

export async function load(): Promise<{ messages: TypeMessage[] }> {
  const rows = await getMessages(client, '000', 50);
  const messages: TypeMessage[] = rows
    ? rows.map((value) => {
        return {
          message: value.message_content,
          user: value.sender.toString(),
          imageSrc: `https://api.dicebear.com/9.x/identicon/svg?seed=${value.sender.toString()}`,
        };
      })
    : [];

  return {
    messages: messages ?? [],
  };
}
