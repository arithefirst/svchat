import cassandra from 'cassandra-driver';
import 'dotenv/config';

interface Messages {
  messages: cassandra.types.Row[] | null;
  error: Error | null;
}

interface CassandraTimestamp {
  low: number;
  high: number;
  unsigned: boolean;
}

function createDelay(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

function sanitizeChannelName(channelName: string) {
  return channelName
    .toLowerCase()
    .replaceAll(' ', '-')
    .replaceAll(/[^a-z-0-9]+/g, '')
    .replaceAll('-', '_');
}

class Db {
  private clientUrl: string = process.env.NODE_ENV === 'docker_production' ? 'cassandra' : 'localhost';
  private client: cassandra.Client = new cassandra.Client({
    contactPoints: [this.clientUrl],
    localDataCenter: 'datacenter1',
    authProvider: new cassandra.auth.PlainTextAuthProvider(process.env.CASSANDRA_USER!, process.env.CASSANDRA_PASSWORD!),
  });

  // Initalize and connect
  async init() {
    if (!process.env.CASSANDRA_USER || !process.env.CASSANDRA_PASSWORD) {
      console.error('Missing Cassandra username or password. Exiting.');
      process.exit(1);
    }
    while (true) {
      try {
        await this.client.connect();
        break;
      } catch {
        console.error(`Error communicating with DB. Retrying...`);
        await createDelay(1000);
      }
    }

    try {
      await this.client.execute(`CREATE KEYSPACE IF NOT EXISTS channels WITH REPLICATION = {'class': 'SimpleStrategy', 'replication_factor': 1};`);
    } catch (e) {
      console.error(`Error generating keyspace: ${e as Error}`);
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
          sender TEXT,
          PRIMARY KEY (channel_name, timestamp)
      ) WITH CLUSTERING ORDER BY (timestamp DESC);`);
    } catch (e) {
      console.error(`Error creating new channel: ${e as Error}`);
    }
  }

  // Send message method
  async sendMessage(channelName: string, content: string, sender: string, id: string, timestamp: Date) {
    try {
      channelName = sanitizeChannelName(channelName);
      await this.client.execute(`INSERT INTO channels.${channelName} (id, message_content, channel_name, sender, timestamp) VALUES (?, ?, ?, ?, ?)`, {
        id,
        message_content: content,
        channel_name: channelName,
        sender,
        timestamp,
      });
    } catch (e) {
      console.error(`Error storing message: ${e as Error}`);
    }
  }

  // Check channel method
  async checkChannel(channel: string): Promise<boolean> {
    try {
      channel = sanitizeChannelName(channel);
      const res = await this.client.execute(`SELECT table_name FROM system_schema.tables WHERE keyspace_name = 'channels' AND table_name = ?`, [
        channel.toLowerCase(),
      ]);

      return res.rowLength !== 0;
    } catch (e) {
      console.error(`Error checking channel existance: ${e as Error}`);
      return false;
    }
  }

  // Get Channels method
  async getChannels(): Promise<cassandra.types.Row[] | undefined> {
    try {
      const res = await this.client.execute(`SELECT table_name FROM system_schema.tables WHERE keyspace_name = 'channels'`);
      return res.rows;
    } catch (e) {
      console.error(`Error fetching channels: ${e as Error}`);
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
      console.error(`Error fetching messages: ${(e as Error).message}`);
      return {
        messages: null,
        error: e as Error,
      };
    }
  }

  // Timestamp to Epoch method
  tsEpoch(ts: CassandraTimestamp) {
    const low = ts.low >>> 0;
    const high = ts.high >>> 0;
    return high * 2 ** 32 + low;
  }
}

const db = new Db();

if (process.env.BUILDING !== 'true') {
  await db.init();
  await db.createChannel('general');
}

export { db, type Messages };
