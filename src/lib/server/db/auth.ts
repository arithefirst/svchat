import { betterAuth } from 'better-auth';
import Database from 'better-sqlite3';

export const auth = betterAuth({
  database: new Database('./src/lib/server/db/users.db'),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
});
