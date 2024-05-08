FROM node:20.13.0-slim AS base

FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runner
WORKDIR /app
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 remix
COPY --from=builder /app .
USER remix
EXPOSE 3000
ENV HOST "0.0.0.0"
ENV PORT 7000
ENV NODE_TLS_REJECT_UNAUTHORIZED 0
ENV NPM_CONFIG_LOGLEVEL "error"
CMD ["npm", "start"]
