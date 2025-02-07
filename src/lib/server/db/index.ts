import cassandra from 'cassandra-driver';

interface Messages {
  messages: cassandra.types.Row[] | null;
  error: Error | null;
}

function sanitizeChannelName(channelName: string) {
  return channelName
    .toLowerCase()
    .replaceAll(' ', '-')
    .replaceAll(/[^a-z-]+/g, '')
    .replaceAll('-', '_');
}

class Db {
  private client: cassandra.Client = new cassandra.Client({
    contactPoints: ['localhost'],
    localDataCenter: 'datacenter1',
  });

  // Initalize and connect
  async init() {
    try {
      await this.client.connect();
    } catch (e) {
      console.log(`Error connecting to DB: ${e as Error}`);
      process.exit(1);
    }

    try {
      await this.client.execute(`CREATE KEYSPACE IF NOT EXISTS users WITH REPLICATION = {'class': 'SimpleStrategy', 'replication_factor': 1};`);
      await this.client.execute(`CREATE KEYSPACE IF NOT EXISTS channels WITH REPLICATION = {'class': 'SimpleStrategy', 'replication_factor': 1};`);
    } catch (e) {
      console.log(`Error generating keyspaces: ${e as Error}`);
      process.exit(1);
    }
  }

  // Create Channel Method
  async createChannel(channelName: string) {
    try {
      channelName = sanitizeChannelName(channelName);
      await this.client.execute(`
      CREATE TABLE IF NOT EXISTS channels.${channelName} (
          id UUID,
          message_content TEXT,
          channel_name TEXT,
          timestamp TIMESTAMP,
          sender UUID,
          PRIMARY KEY (channel_name, timestamp)
      ) WITH CLUSTERING ORDER BY (timestamp DESC);`);
    } catch (e) {
      console.log(`Error creating new channel: ${e as Error}`);
    }
  }

  // Send message method
  async sendMessage(channelName: string, content: string, sender: string, id: string) {
    try {
      const now = new Date();
      channelName = sanitizeChannelName(channelName);
      await this.client.execute(`INSERT INTO channels.${channelName} (id, message_content, channel_name, timestamp, sender) VALUES (?, ?, ?, ?, ?)`, {
        id,
        message_content: content,
        channel_name: channelName,
        timestamp: now.getTime(),
        sender,
      });
    } catch (e) {
      console.log(`Error storing messages: ${e as Error}`);
    }
  }

  async checkChannel(channel: string): Promise<boolean> {
    try {
      const res = await this.client.execute(`SELECT table_name FROM system_schema.tables WHERE keyspace_name = 'channels' AND table_name = ?`, [
        channel.toLowerCase(),
      ]);

      return res.rowLength !== 0;
    } catch (e) {
      console.log(`Error checking channel existance: ${e as Error}`);
      return false;
    }
  }

  // Get Channels method
  async getChannels(): Promise<cassandra.types.Row[] | undefined> {
    try {
      const res = await this.client.execute(`SELECT table_name FROM system_schema.tables WHERE keyspace_name = 'channels'`);
      return res.rows;
    } catch (e) {
      console.log(`Error fetching channels: ${e as Error}`);
      return;
    }
  }

  // Get messages method
  async getMessages(channelName: string, limit: number): Promise<Messages> {
    try {
      channelName = sanitizeChannelName(channelName);
      const res = await this.client.execute(`SELECT * FROM channels.${channelName} WHERE channel_name = ? ORDER BY timestamp DESC LIMIT ${limit}`, {
        channel_name: channelName,
      });
      return {
        messages: res.rows,
        error: null,
      };
    } catch (e) {
      console.log(`Error fetching messages: ${(e as Error).message}`);
      return {
        messages: null,
        error: e as Error,
      };
    }
  }
}

const db = new Db();
await db.init();
await db.createChannel('general');

export { db, type Messages };
