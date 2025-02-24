ARG NODE_VERSION=23.8.0
FROM node:${NODE_VERSION} AS base
WORKDIR /app

###############
#  Dep Stage  #
###############
FROM base AS deps
COPY package.json .

RUN npm install --omit-dev

###############
# Build Stage #
###############
FROM deps AS build
COPY . .

# Run DB migrations for SQLite
RUN npm run migrate

RUN npm install
RUN npm run build

###############
# Application #
###############
FROM base AS final

COPY package.json .

# Stuff needed by the app
COPY --from=build /app/build build/
COPY --from=build /app/prodServer.ts .
COPY --from=build /app/package.json .
COPY --from=build /app/src/lib/server/db src/lib/server/db
COPY --from=deps /app/node_modules node_modules/

ENV NODE_ENV=production

# Link to GitHub Repo & Other Metadata
LABEL org.opencontainers.image.source https://github.com/arithefirst/svchat
LABEL org.opencontainers.image.licenses GPL-3.0-only
LABEL org.opencontainers.image.description A simple chat app built with SvelteKit and Apache Cassandra 

EXPOSE 3000
CMD ["npm", "run", "production"]