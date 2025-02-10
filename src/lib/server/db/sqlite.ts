import Database from 'better-sqlite3';

interface Profile {
  username: string;
  image: string;
}

class AuthDb {
  private client = new Database('./src/lib/server/db/users.db');

  init() {
    // Set WAL pragma for preformance reasons
    this.client.pragma('journal_mode = WAL');
  }

  getUser(userId: string): Profile {
    const row = this.client.prepare('SELECT username, image FROM user WHERE id = ?').get(userId);
    return {
      username: (row as Profile).username,
      image: (row as Profile).image ?? `https://api.dicebear.com/9.x/identicon/svg?seed=${userId}`,
    };
  }
}

const authdb = new AuthDb();
authdb.init();

export { authdb };
