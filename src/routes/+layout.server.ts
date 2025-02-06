import { db } from '$lib/server/db';

export async function load() {
  const rows = await db.getChannels();
  const channels: string[] = rows
    ? rows.map((value) => {
        return value.table_name;
      })
    : [];

  return {
    channels,
  };
}
