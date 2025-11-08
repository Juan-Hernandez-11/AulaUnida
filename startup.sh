#!/bin/sh
set -e

echo "🚀 Iniciando AulaUnida..."

echo "⏳ Esperando a que la base de datos esté lista..."
sleep 10

echo "🔄 Aplicando migraciones de Prisma..."
npx prisma db push --skip-generate || echo "⚠️ Error en migraciones - continuando..."

echo "✅ Iniciando servidor Next.js..."
exec node server.js