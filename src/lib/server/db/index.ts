import cassandra from 'cassandra-driver';

class Db {
  private client: cassandra.Client;

  constructor(client: cassandra.Client) {
    this.client = client;
  }

  // Create Channel Method
  async createChannel(channelName: string) {
    try {
      await this.client.execute(`
      CREATE TABLE IF NOT EXISTS channels.channel_${channelName} (
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
      await this.client.execute(`INSERT INTO channels.channel_${channelName} (id, message_content, channel_name, timestamp, sender)
                   VALUES (${id}, '${content}', '${channelName}', ${now.getTime()}, ${sender})`);
    } catch (e) {
      console.log(`Error storing messages: ${e as Error}`);
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
  async getMessages(channelName: string, limit: number): Promise<cassandra.types.Row[] | undefined> {
    try {
      const res = await this.client.execute(
        `SELECT * FROM channels.channel_${channelName} WHERE channel_name = '${channelName}' ORDER BY timestamp DESC LIMIT ${limit}`,
      );
      return res.rows;
    } catch (e) {
      console.log(`Error fetching messages: ${(e as Error).message}`);
      return;
    }
  }
}

const client = new cassandra.Client({
  contactPoints: ['localhost'],
  localDataCenter: 'datacenter1',
});

// Connect to Cassandra/ScyllaDB and create
// the necessary tables, keyspaces, etc.
try {
  await client.connect();
} catch (e) {
  console.log(`Error connecting to DB: ${e as Error}`);
  process.exit(1);
}

try {
  await client.execute(`CREATE KEYSPACE IF NOT EXISTS users WITH REPLICATION = {'class': 'SimpleStrategy', 'replication_factor': 1};`);
  await client.execute(`CREATE KEYSPACE IF NOT EXISTS channels WITH REPLICATION = {'class': 'SimpleStrategy', 'replication_factor': 1};`);
} catch (e) {
  console.log(`Error generating keyspaces: ${e as Error}`);
  process.exit(1);
}

const db = new Db(client);

export { db };
