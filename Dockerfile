# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copia dependencias
COPY package*.json ./
COPY prisma ./prisma

# Instala dependencias
RUN npm install

# Copia código fuente
COPY . .

# Genera cliente de Prisma
RUN npx prisma generate

# Build de Next.js
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Instala solo dependencias de producción
COPY package*.json ./
COPY prisma ./prisma

RUN npm install --omit=dev

# Copia archivos construidos del builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# Expone puerto
EXPOSE 3000

# Ejecutar migraciones y arrancar app
CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]
