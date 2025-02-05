import { getChannels, client } from '$lib/server/db';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
  const rows = await getChannels(client);
  const channels: string[] = rows
    ? rows.map((value) => {
        return value.table_name;
      })
    : [];

  return {
    channels,
  };
};
