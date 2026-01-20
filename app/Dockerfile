FROM node:18-alpine AS builder

WORKDIR /app

# Install pnpm and dependencies
RUN npm install -g pnpm@latest

# Copy package files first for better caching
COPY package.json pnpm-lock.yaml ./

# Copy source
COPY . ./

# Install and build
RUN pnpm install --frozen-lockfile
RUN pnpm run build

FROM node:18-alpine AS runner

WORKDIR /app

# Copy built site (server + client) from builder
COPY --from=builder /app/dist ./dist

ENV HOST=0.0.0.0
ENV PORT=4321

# Expose the port the Astro standalone server uses (default in build: 4321)
EXPOSE 4321

# Start the Node server (entrypoint produced by Astro standalone adapter)
CMD ["node", "./dist/server/entry.mjs"]
