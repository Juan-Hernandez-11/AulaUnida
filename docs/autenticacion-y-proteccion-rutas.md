# Autenticación y Protección de Rutas en AulaUnida

## Flujo de Autenticación
- Se utiliza Firebase Auth únicamente para la autenticación de usuarios.
- Al iniciar sesión, el usuario obtiene un UID de Firebase.
- El estado de autenticación y el usuario actual se gestionan globalmente mediante un AuthProvider (React Context).

## Obtención del Rol del Usuario
- Los roles de usuario (admin, docente, estudiante) se almacenan en PostgreSQL y se gestionan con Prisma.
- El hook `useUserRole` obtiene el UID de Firebase del usuario autenticado y consulta el endpoint `/api/user-role?uid=FIREBASE_UID`.
- El endpoint busca el usuario en la base de datos y retorna su rol.

## Protección de Rutas por Rol
- El componente `ProtectedRoute` recibe un prop `allowedRoles` (array de roles permitidos).
- Utiliza el hook `useUserRole` para obtener el rol actual del usuario.
- Si el usuario no está autenticado, se redirige a `/login`.
- Si el usuario no tiene un rol permitido, se muestra un mensaje de acceso denegado.
- Ejemplo de uso:

```tsx
<ProtectedRoute allowedRoles={["admin"]}>
  <AdminDashboard />
</ProtectedRoute>
```

## Archivos Clave
- `src/context/authContext.tsx`: Contexto global de autenticación.
- `src/hooks/useUserRole.ts`: Hook para obtener el rol desde la API.
- `src/components/ProtectedRoute.tsx`: Componente para proteger rutas por autenticación y rol.
- `src/app/api/user-role/route.ts`: Endpoint API para obtener el rol desde PostgreSQL.

## Notas
- Toda la lógica de negocio y roles está centralizada en PostgreSQL para mayor flexibilidad y seguridad.
- El frontend nunca asume el rol del usuario, siempre lo consulta a través de la API.
- Las decisiones y arquitectura están documentadas en este archivo para referencia futura.
