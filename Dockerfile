# -------- build deps (si compilas TS, etc.) --------
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev

# -------- runtime --------
FROM node:18-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY . .
EXPOSE 8080
# Ajusta si tu app inicia distinto
CMD ["node", "server.js"]
