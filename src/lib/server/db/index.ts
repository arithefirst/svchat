import cassandra from 'cassandra-driver';

async function createChannel(client: cassandra.Client, channelName: string) {
  await client.execute(`
    CREATE TABLE IF NOT EXISTS channels.channel_${channelName} (
        id UUID PRIMARY KEY,
        message_content TEXT,
        timestamp TIMESTAMP,
        sender UUID
    );`);
}

async function storeMessage(client: cassandra.Client, channelName: string, content: string, sender: string, id: string) {
  const now = new Date();
  await client.execute(`INSERT INTO channels.channel_${channelName} (id, message_content, timestamp, sender)
               VALUES (${id}, '${content}', ${now.getTime()}, ${sender})`);
}

async function getMessages(client: cassandra.Client, channelName: string, limit: number) {
  try {
    const res = await client.execute(`SELECT * FROM channels.channel_${channelName} LIMIT ${limit}`);

    // We have to sort the rows within the function instead of an ORDER BY
    // because of a limitation within Cassandra requiring a partition key
    // to be specified by EQ or IN when using ORDER BY
    res.rows.sort((a, b) => a.timestamp - b.timestamp);

    return res.rows;
  } catch (e) {
    // @ts-expect-error I don't like this thing yelling at me
    // We all know it's gonna work
    console.log(`Error fetching messages: ${e.message}`);
  }
}

const client = new cassandra.Client({
  contactPoints: ['localhost'],
  localDataCenter: 'datacenter1',
});

// Connect to Cassandra/ScyllaDB and create
// the necessary tables, keyspaces, etc.
await client.connect();
await client.execute(`CREATE KEYSPACE IF NOT EXISTS users WITH REPLICATION = {'class': 'SimpleStrategy', 'replication_factor': 1};`);
await client.execute(`CREATE KEYSPACE IF NOT EXISTS channels WITH REPLICATION = {'class': 'SimpleStrategy', 'replication_factor': 1};`);

export { client, createChannel, getMessages, storeMessage };
