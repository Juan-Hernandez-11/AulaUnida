# Estructura de Carpetas Sugerida — AulaUnida

## src/app/
- admin/
  - dashboard/
  - usuarios/
  - grados/
  - asignaturas/
  - horarios/
  - matricula/
  - ciclos/
  - reportes/
  - anuncios/
  - configuracion/
  - sedes/
  - respaldo/
  - bitacora/
  - soporte/
- docente/
  - dashboard/
  - asignaturas/
  - tareas/
  - asistencia/
  - anuncios/
  - incidencias/
  - horario/
  - perfil/
  - soporte/
- estudiante/
  - dashboard/
  - asignaturas/
  - tareas/
  - notas/
  - boletin/
  - anuncios/
  - perfil/
- login/
- dashboard/ (si hay uno general)

## src/components/
- common/ (botones, inputs, modales, tablas, etc.)
- admin/
- docente/
- estudiante/

## src/context/
- authContext.tsx
- userContext.tsx
- notificationContext.tsx

## src/hooks/
- useAuth.ts
- useFetch.ts
- useRole.ts

## src/lib/
- prisma.ts
- firebaseClient.ts
- firebaseAdmin.ts
- apiHelpers.ts

## src/styles/
- landingpage.css
- (otros estilos globales o por módulo)

## src/types/
- user.ts
- curso.ts
- asignatura.ts
- tarea.ts
- asistencia.ts
- anuncio.ts

---

Esta estructura te permitirá escalar y mantener el proyecto de forma ordenada, separando vistas, componentes y lógica por rol y funcionalidad.
