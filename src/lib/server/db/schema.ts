import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const users = pgTable('users', {
  id: uuid('id').primaryKey(),
  username: text('username'),
  displayName: text('display_name'),
  salt: text('salt'),
  hash: text('hash'),
});

export const messages = pgTable('messages', {
  id: uuid('id').primaryKey(),
  user_id: uuid('user_id').references(() => users.id),
  channel_id: uuid('channel_id'),
  message: text('message'),
  timestamp: timestamp('timestamp', { mode: 'date' }).default(sql`now()`),
});
