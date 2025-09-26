# Imagen base oficial de Node.js
FROM node:18

# Directorio de trabajo
WORKDIR /app

# Copia archivos de dependencias
COPY package*.json ./
COPY prisma ./prisma

# Instala dependencias
RUN npm install

# Copia el resto del código
COPY . .

# Genera el cliente de Prisma
RUN npx prisma generate

# Expone el puerto de Next.js
EXPOSE 3000

# Comando para desarrollo (puedes cambiar a 'npm run build && npm start' para producción)
CMD ["npm", "run", "dev"]
