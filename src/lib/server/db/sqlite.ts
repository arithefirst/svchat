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

  setUserName(userId: string, newUsername: string) {
    this.client.prepare('UPDATE user SET username = ? WHERE id = ?').run(newUsername, userId);
    console.log('wam bam');
  }

  setUserImage(userId: string, image: string) {
    this.client.prepare('UPDATE user SET image = ? WHERE id = ?').run(image, userId);
  }

  getUser(userId: string): Profile {
    const row = this.client.prepare('SELECT username, image FROM user WHERE id = ?').get(userId);
    return {
      // If user is deleted, UID gets truncated to 7 to that the displayed name for the
      // deleted user won't go above 15 characters long.
      username: (row as Profile)?.username ?? `DELETED-${userId.slice(0, 7)}`,
      image: (row as Profile)?.image ?? `https://api.dicebear.com/9.x/identicon/svg?seed=${userId}`,
    };
  }
}

const authdb = new AuthDb();
authdb.init();

export { authdb };
