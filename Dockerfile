# Dockerfile simple para AulaUnida
FROM node:20-alpine

WORKDIR /app

# Install system dependencies
RUN apk add --no-cache libc6-compat curl

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build application
RUN npm run build

# Create startup script inline
RUN echo '#!/bin/sh\n\
set -e\n\
echo "🚀 Starting AulaUnida..."\n\
sleep 5\n\
echo "🔄 Running Prisma migrations..."\n\
npx prisma db push --skip-generate || echo "Migration failed, continuing..."\n\
echo "✅ Starting Next.js server..."\n\
exec npm start' > /app/start.sh && chmod +x /app/start.sh

EXPOSE 3000

CMD ["/app/start.sh"]
