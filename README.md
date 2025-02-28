# SVChat

A simple chat app built with SvelteKit and Apache Cassandra<br>

[![Prettier](https://github.com/arithefirst/sv-chat/actions/workflows/prettier.yml/badge.svg)](https://github.com/arithefirst/sv-chat/actions/workflows/prettier.yml)
[![ESLint](https://github.com/arithefirst/sv-chat/actions/workflows/eslint.yml/badge.svg)](https://github.com/arithefirst/sv-chat/actions/workflows/eslint.yml)
[![Playwright](https://github.com/arithefirst/sv-chat/actions/workflows/playwright.yml/badge.svg)](https://github.com/arithefirst/sv-chat/actions/workflows/playwright.yml)

## 💻 Techstack

![Techstack](https://go-skill-icons.vercel.app/api/icons?i=cassandra,docker,socketio,sqlite,svelte,tailwindcss,ts)

- Cassandra and SQLite for storing messages and user data respectively
- Docker for easier deployments
- SvelteKit and TypeScript for backend
- TailwindCSS and ShadCN Svelte for frontend
- SocketIO for communication between connected clients

## 🐋 Deploying (Docker)

To deploy with Docker, you will need to have both `docker` and `docker-compose` installed.

1. **Pull down the `compose.yaml` file**

   ```bash
   curl https://raw.githubusercontent.com/arithefirst/svchat/refs/heads/master/compose.yaml -o compose.yml
   ```

2. **Edit the service details**<br>
   Open `compose.yaml` in the editor of your choice and replace the following enviroment variables:

   - `ORIGIN`: The URL of your production deployment (no trailing slash)
   - `CASSANDRA_USER`: Database Username
   - `CASSANDRA_PASSWORD`: Database Password
   - `MINIO_ROOT_USER`: S3 Bucket Username
   - `MINIO_ROOT_PASSWORD`: S3 Bucket Password

3. **Start the stack**
   ```bash
       docker-compose up -d # Starts detatched
       docker-compose up # Starts attatched
   ```
4. **Done!**<br>
   Yes, it's really that easy! You can now access your deployment at `http://hostname:3000`, where hostname is the hostname or IP Address of your machine.

## 🚀 Deploying (Manual)

> [!TIP]
> This installation method is not reccomended. Unless you have a specific reason not to use Docker, we suggest you do so! Our docker image is kept fully up-to-date and gets re-built on every push to the repository.

1. [**Setup Apache Cassandra**](https://cassandra.apache.org/doc/latest/cassandra/getting-started/cassandra-quickstart.html)
2. [**Setup Minio**](https://charts.min.io/)
3. **Clone the repo**
   ```bash
   git clone https://github.com/arithefirst/svchat
   ```
4. **Install deps**<br>
   In this example, I use [`bun`](https://bun.sh), but any NPM compatible package manager should work just fine!
   ```bash
   bun install
   ```
5. **Run DB Migrations**<br>
   Running the DB Migrations sets up the tables in the SQLite users DB, and allows for functional user authenticaton.

   ```bash
   bun run migrate
   ```

6. **Set Enviroment Variables**<br>
   In order for the server to connect to Cassandra and Minio, the credentials need to be set in `.env`. You will also need to set the production URL of your instance, to make sure CORS dosen't throw a fit.

   ```ini
   # Example '.env' file
   CASSANDRA_USER=admin
   CASSANDRA_PASSWORD=admin
   MINIO_ROOT_USER=minioadmin
   MINIO_ROOT_PASSWORD=minioadmin
   ORIGIN=http://localhost:3000
   ```

> [!WARNING]
> The above DB and S3 credentials are just for example, and it is highly reccomended that you change them for security purposes.

7. **Build**

   ```bash
   bun run build
   ```

8. **Start the server**

   ```bash
   bun run production
   ```

9. **Done!**<br>
   You can now access your deployment at `http://hostname:3000`, where hostname is the hostname or IP Address of your machine.
