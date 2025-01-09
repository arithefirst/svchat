import type { PageLoad } from './$types';
import type { TypeMessage } from '$lib';
import { getMessages, client } from '../lib/server/db';

export const load: PageLoad = async () => {
  const rows = await getMessages(client, '000', 5);
  const messages: TypeMessage[] = rows
    ? rows.map((value) => {
        return { message: value.message_content, user: value.sender.toString(), imageSrc: 'https://thispersondoesnotexist.com' };
      })
    : [];
  return {
    serverMessages: messages,
  };
};
