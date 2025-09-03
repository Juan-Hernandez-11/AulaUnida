This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.


# Instalación base para colaboradores de AulaUnida

## 1. **Node.js**  
Instala la versión recomendada (18.x o superior).  
[Descargar Node.js](https://nodejs.org/)

## 2. **PostgreSQL**  
Instala el servidor de base de datos PostgreSQL.  
- [Windows/Mac/Linux](https://www.postgresql.org/download/)
- Recuerda crear una base de datos y anotar el usuario/contraseña para la configuración local.

## 3. **Clonar el repositorio**
```bash
git clone <URL-del-repositorio>
cd aulaunida
```

## 4. **Instalar dependencias del proyecto**
```bash
npm install
```

## 5. **Instalar Prisma CLI (si no se instala globalmente)**
```bash
npm install prisma --save-dev
```

## 6. **Configurar variables de entorno**
Crea un archivo `.env` en la raíz del proyecto y agrega:
```
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/nombre_db"
FIREBASE_API_KEY="tu-api-key"
FIREBASE_AUTH_DOMAIN="tu-auth-domain"
FIREBASE_PROJECT_ID="tu-project-id"
FIREBASE_PRIVATE_KEY="tu-private-key"
FIREBASE_CLIENT_EMAIL="tu-client-email"
```
(Pide a quien administre el proyecto que comparta estos datos de Firebase)

## 7. **Ejecutar migraciones Prisma**
```bash
npx prisma migrate dev
```

## 8. **Arrancar el servidor de desarrollo**
```bash
npm run dev
```

## 9. **Instalar extensiones recomendadas en VS Code**
- **ESLint**
- **Prettier**
- **TypeScript**
- **PostgreSQL**

---

## 10. **Instalación de dependencias extra (si hace falta)**
Si hay algún error por dependencias, ejecuta:
```bash
npm install @types/react @types/react-dom @types/node
npm install --save-dev typescript
```

---

## **Resumen de dependencias incluidas en el proyecto**
- Next.js  
- React  
- TypeScript  
- Prisma + @prisma/client  
- Bootstrap + react-bootstrap  
- firebase + firebase-admin  
- axios, zod, react-hook-form, react-toastify, clsx, date-fns, react-table, react-icons  

(No es necesario instalarlas manualmente si ya ejecutaste `npm install`)

---

## **Notas**
- Si tienes problemas con la base de datos, asegúrate de que PostgreSQL esté corriendo y la cadena de conexión sea correcta.
- Si tienes problemas con Firebase, consulta al admin por las credenciales.
- Ante cualquier error, consulta el README o pregunta al equipo.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
