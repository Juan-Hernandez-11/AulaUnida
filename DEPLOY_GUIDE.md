# 🚀 Guía de Despliegue: Railway + Vercel

## Arquitectura Final
```
VERCEL                          RAILWAY
┌──────────────────┐            ┌──────────────────┐
│  Frontend Next.js│            │  Backend Next.js │
│  - React UI      │────API────▶│  - API Routes    │
│  - Vercel Deploy │            │  - PostgreSQL DB │
└──────────────────┘            └──────────────────┘
```

---

## 📋 PASO 1: Preparar Variables de Entorno

### 1.1 Obtener credenciales Firebase
Necesitas (de Firebase Console):
- `FIREBASE_PROJECT_ID`
- `FIREBASE_PRIVATE_KEY` (clave privada JSON)
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_API_KEY`
- `FIREBASE_AUTH_DOMAIN`
- `FIREBASE_STORAGE_BUCKET`
- `FIREBASE_MESSAGING_SENDER_ID`
- `FIREBASE_APP_ID`

### 1.2 Generar JWT_SECRET
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 1.3 Generar Database URL
Railroad proporciona `DATABASE_URL` automáticamente. Será algo como:
```
postgresql://user:pass@railway.railway.internal:5432/aulaunida
```

---

## 🚂 PASO 2: Deploy en Railway

### 2.1 Crear Proyecto en Railway
1. Ve a https://railway.app
2. Login/Signup
3. New Project → Import from GitHub
4. Selecciona tu repo `aulaunida`
5. Railway detectará el Dockerfile automáticamente ✨

### 2.2 Agregar PostgreSQL
1. En Railway Dashboard → Add Service → PostgreSQL
2. Railway crear automáticamente `DATABASE_URL`
3. Se conectan automáticamente al mismo proyecto

### 2.3 Configurar Variables de Entorno en Railway
En el servicio Node.js (Backend), agrega todas las vars de `.env.example`:

```
DATABASE_URL = [AUTO - Railway lo proporciona]
FIREBASE_PROJECT_ID = tu_proyecto_id
FIREBASE_PRIVATE_KEY = tu_clave_privada
FIREBASE_CLIENT_EMAIL = tu_email_firebase
FIREBASE_API_KEY = tu_api_key
FIREBASE_AUTH_DOMAIN = tu_dominio
FIREBASE_STORAGE_BUCKET = tu_bucket
FIREBASE_MESSAGING_SENDER_ID = tu_sender_id
FIREBASE_APP_ID = tu_app_id
JWT_SECRET = [Generado en paso 1.2]
NODE_ENV = production
API_URL = [Railway te da URL automáticamente al deployar]
NEXT_PUBLIC_API_URL = [Misma que API_URL]
NEXT_PUBLIC_BASE_URL = https://aulaunida.vercel.app
```

### 2.4 Deploy
Railway deployará automáticamente. Espera a que termine. Tendrás una URL como:
```
https://aulaunida-api-production.up.railway.app
```

**Copia esta URL, la necesitas en Vercel.**

---

## ▲ PASO 3: Deploy en Vercel

### 3.1 Conectar Repo a Vercel
1. Ve a https://vercel.com
2. Import Project → GitHub
3. Selecciona `aulaunida`
4. Vercel detectará Next.js automáticamente

### 3.2 Configurar Variables de Entorno en Vercel
Agrega estas vars (solo lo que necesita el FRONTEND):

```
NEXT_PUBLIC_API_URL = https://aulaunida-api-production.up.railway.app
NEXT_PUBLIC_BASE_URL = https://aulaunida.vercel.app
FIREBASE_API_KEY = tu_api_key
FIREBASE_AUTH_DOMAIN = tu_dominio
FIREBASE_PROJECT_ID = tu_proyecto_id
FIREBASE_STORAGE_BUCKET = tu_bucket
FIREBASE_MESSAGING_SENDER_ID = tu_sender_id
FIREBASE_APP_ID = tu_app_id
```

**Importante:** En Vercel NO necesitas:
- ✗ `FIREBASE_PRIVATE_KEY` (solo en backend)
- ✗ `DATABASE_URL` (solo en Railway)
- ✗ `JWT_SECRET` (solo en backend)

### 3.3 Deploy
Vercel deployará automáticamente. Tendrás URL:
```
https://aulaunida.vercel.app
```

---

## ✅ PASO 4: Validaciones Post-Deploy

### 4.1 Verificar Backend en Railway
```bash
curl https://aulaunida-api-production.up.railway.app/api/me
# Debe retornar: { error: "..." } o datos si está autenticado
```

### 4.2 Verificar Frontend en Vercel
```bash
https://aulaunida.vercel.app
# Debe cargar la página de login
```

### 4.3 Probar un Endpoint Real
En Postman:
```
POST https://aulaunida-api-production.up.railway.app/api/me
Headers: Authorization: Bearer {token}
```

### 4.4 Verificar Logs en Railway
```
Dashboard → Services → Node.js → Logs
```

---

## 🔍 Checklist Final

- [ ] Dockerfile actualizado (build + production)
- [ ] `.env.example` con todas las vars
- [ ] Variables Firebase configuradas
- [ ] JWT_SECRET generado
- [ ] Railway: PostgreSQL creada y conectada
- [ ] Railway: Todas las vars de entorno configuradas
- [ ] Railway: Deploy completado sin errores
- [ ] Vercel: Repo conectado
- [ ] Vercel: Variables configuradas (solo frontend)
- [ ] Vercel: Deploy completado sin errores
- [ ] Endpoint `/api/me` respondiendo
- [ ] Frontend cargando sin errores de CORS
- [ ] Login funcionando end-to-end

---

## 🆘 Troubleshooting

### Error: "DATABASE_URL no existe"
**Solución:** En Railway, asegúrate que PostgreSQL esté conectado al servicio Node.js

### Error: "CORS blocked"
**Solución:** En Vercel, verifica que `NEXT_PUBLIC_API_URL` sea correcto

### Error: "Firebase auth failed"
**Solución:** Verifica que `FIREBASE_PRIVATE_KEY` esté correctamente escapado (con `\n`)

### Error: "Prisma migration failed"
**Solución:** En Railway logs, verifica:
```bash
DATABASE_URL está correcto
PostgreSQL está iniciado
Migraciones están aplicadas
```

---

## 📞 URLs Finales
- **Frontend:** https://aulaunida.vercel.app
- **Backend API:** https://aulaunida-api-production.up.railway.app
- **Admin:** https://aulaunida.vercel.app/admin
- **Docente:** https://aulaunida.vercel.app/docente
- **Estudiante:** https://aulaunida.vercel.app/estudiante

