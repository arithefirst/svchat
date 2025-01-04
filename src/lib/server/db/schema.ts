import { pgTable, uuid, text } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').primaryKey(),
  username: text('username'),
  displayname: text('display_name'),
  salt: text('salt'),
  hash: text('hash'),
});
