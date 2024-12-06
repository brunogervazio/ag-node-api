FROM node:20 AS builder

RUN apt-get update && apt-get install -y openssl

WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install @prisma/client

COPY . .
RUN npx prisma generate

RUN npm run build

FROM node:20
WORKDIR /app
COPY --from=builder /app/dist ./dist

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/src/main.js"]
