# AULA UNIDA - Documentación Completa del Sistema

## 📋 Tabla de Contenidos

1. [Visión General](#visión-general)
2. [Arquitectura del Sistema](#arquitectura-del-sistema)
3. [Stack Tecnológico](#stack-tecnológico)
4. [Descripción de Módulos](#descripción-de-módulos)
5. [Modelo de Datos](#modelo-de-datos)
6. [API Endpoints](#api-endpoints)
7. [Flujos Principales](#flujos-principales)
8. [Configuración y Despliegue](#configuración-y-despliegue)
9. [Seguridad](#seguridad)
10. [Requisitos para Kubernetes](#requisitos-para-kubernetes)

---

## 🎯 Visión General

**AulaUnida** es un **Sistema de Gestión Académica Integral** diseñado para instituciones educativas. Permite gestionar:

- **Usuarios**: Administradores, docentes y estudiantes
- **Estructura académica**: Sedes, grados, ciclos, periodos, aulas
- **Materias y asignaturas**: Gestión de áreas y códigos únicos
- **Matriculación**: Gestión de estudiantes en grados
- **Calificaciones**: Sistema de notas por periodo
- **Tareas y entregas**: Seguimiento de trabajos estudiantiles
- **Asistencia**: Control de presencia en clase
- **Horarios**: Gestión de calendarios académicos
- **Incidencias**: Reportes de problemas disciplinarios
- **Anuncios**: Comunicaciones institucionales
- **Boletines**: Generación de reportes finales

El sistema utiliza **autenticación basada en Firebase** combinada con una **base de datos PostgreSQL** para almacenar información académica.

---

## 🏗️ Arquitectura del Sistema

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENTE (NAVEGADOR)                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                      │
│  │  Admin   │  │ Docente  │  │Estudiante│                      │
│  └──────────┘  └──────────┘  └──────────┘                      │
└─────────────────────────────────────────────────────────────────┘
                            ↓↑
┌─────────────────────────────────────────────────────────────────┐
│           NEXT.JS + REACT (Frontend Layer)                      │
│  ┌────────────────────────────────────────────────────────┐    │
│  │  Pages (Admin, Docente, Estudiante)                    │    │
│  │  Components (UI, Forms, Tables)                        │    │
│  │  Hooks (useAuth, useUserRole)                          │    │
│  │  Context (AuthContext)                                 │    │
│  │  Styles (CSS Modules, Bootstrap)                       │    │
│  └────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
                            ↓↑
┌─────────────────────────────────────────────────────────────────┐
│      NEXT.JS API ROUTES (Backend Layer)                         │
│  ┌────────────────────────────────────────────────────────┐    │
│  │  Authentication Endpoints (/api/auth/*)               │    │
│  │  Admin Endpoints (/api/admin/*)                        │    │
│  │  Docente Endpoints (/api/docente/*)                    │    │
│  │  Estudiante Endpoints (/api/estudiante/*)             │    │
│  │  User Role Endpoint (/api/user-role)                  │    │
│  │  Me Endpoint (/api/me)                                 │    │
│  └────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
                            ↓↑
┌─────────────────────────────────────────────────────────────────┐
│              FIREBASE AUTHENTICATION                            │
│  - Autenticación de usuarios (email/password)                  │
│  - Generación de tokens JWT                                     │
│  - Gestión de sesiones                                          │
└─────────────────────────────────────────────────────────────────┘
                            ↓↑
┌─────────────────────────────────────────────────────────────────┐
│      PRISMA ORM (Data Access Layer)                             │
│  - Mapeo de modelos a BD                                        │
│  - Migraciones de schema                                        │
│  - Validación de datos                                          │
└─────────────────────────────────────────────────────────────────┘
                            ↓↑
┌─────────────────────────────────────────────────────────────────┐
│      POSTGRESQL DATABASE                                        │
│  - Almacenamiento de datos académicos                           │
│  - Integridad referencial                                       │
│  - Transacciones ACID                                           │
└─────────────────────────────────────────────────────────────────┘
```

---

## 💻 Stack Tecnológico

### Frontend
- **Next.js 15.5.2**: Framework React moderno con renderizado server-side
- **React 19.1.0**: Librería de componentes UI
- **React Bootstrap 2.10.10**: Componentes preestilizados
- **React Hook Form 7.62.0**: Gestión de formularios
- **React Icons 5.5.0**: Librería de iconos
- **React Toastify 11.0.5**: Notificaciones emergentes
- **React Dropzone 14.3.8**: Carga de archivos
- **CSS Modules**: Estilos locales por componente
- **Axios 1.11.0**: Cliente HTTP
- **jsPDF 3.0.2**: Generación de PDFs
- **date-fns 4.1.0**: Manipulación de fechas
- **Zod 4.1.5**: Validación de esquemas

### Backend
- **Next.js API Routes**: Endpoints serverless
- **Prisma 6.15.0**: ORM y migraciones
- **Firebase Admin SDK 13.5.0**: Autenticación server-side
- **Firebase Client SDK 12.2.1**: Autenticación client-side

### Base de Datos
- **PostgreSQL 15**: Base de datos relacional
- **Prisma Migrations**: Control de versiones de schema

### DevOps
- **Docker**: Containerización
- **Docker Compose**: Orquestación local
- **Node.js 18**: Runtime JavaScript

---

## 📦 Descripción de Módulos

### 1. **Módulo de Autenticación y Login**

**Ubicación**: `/src/app/login/`

**Funcionalidades**:
- Formulario de inicio de sesión con email y contraseña
- Integración con Firebase Authentication
- Redirección automática según rol del usuario
- Gestión de errores y validación de credenciales
- Estados de carga durante autenticación

**Componentes clave**:
- `LoginPage`: Página principal de login
- `AuthContext`: Contexto global de autenticación
- `useAuth()`: Hook para acceder al estado de usuario
- `useUserRole()`: Hook para obtener el rol del usuario

**Flujo de autenticación**:
```
Usuario ingresa credenciales
    ↓
Firebase Client valida credenciales
    ↓
Firebase genera JWT token
    ↓
AuthContext actualiza estado
    ↓
API /api/user-role obtiene rol desde BD
    ↓
Frontend redirige según rol
    ↓
Dashboard correspondiente (Admin/Docente/Estudiante)
```

---

### 2. **Módulo Administrativo**

**Ubicación**: `/src/app/admin/`

**Funcionalidades principales**:

#### 2.1 Gestión de Usuarios
- Crear, editar, eliminar usuarios
- Asignar roles (ADMIN, DOCENTE, STUDENT)
- Activar/desactivar usuarios
- Ver listado de todo el personal y estudiantes

**Rutas**:
- `/admin/usuarios` - Listado y gestión
- `/admin/usuarios/listado` - Vista detallada

**API Endpoints**:
- `POST /api/admin/usuarios` - Crear usuario
- `GET /api/admin/usuarios` - Listar usuarios
- `PUT /api/admin/usuarios/:id` - Actualizar usuario
- `DELETE /api/admin/usuarios/:id` - Eliminar usuario

#### 2.2 Gestión de Grados
- Crear grados académicos
- Asociar grados con ciclos y sedes
- Asignar aulas a grados
- Gestionar secciones

**Rutas**:
- `/admin/grados` - Gestión de grados

**API Endpoints**:
- `POST /api/admin/grados` - Crear grado
- `GET /api/admin/grados` - Listar grados
- `PUT /api/admin/grados/:id` - Actualizar grado
- `DELETE /api/admin/grados/:id` - Eliminar grado

#### 2.3 Gestión de Asignaturas
- Crear materias/asignaturas
- Definir códigos únicos
- Asociar áreas académicas
- Gestionar relaciones con grados

**Rutas**:
- `/admin/asignaturas` - Gestión de asignaturas

**API Endpoints**:
- `POST /api/admin/asignaturas` - Crear asignatura
- `GET /api/admin/asignaturas` - Listar asignaturas
- `PUT /api/admin/asignaturas/:id` - Actualizar asignatura
- `DELETE /api/admin/asignaturas/:id` - Eliminar asignatura

#### 2.4 Gestión de Matriculación
- Matricular estudiantes en grados
- Gestionar GradoEstudiante
- Validar duplicados
- Administrar cambios de grado

**Rutas**:
- `/admin/matricula` - Gestión de matriculación

**API Endpoints**:
- `POST /api/admin/matricula` - Matricular estudiante
- `GET /api/admin/matricula` - Listar matrículas
- `DELETE /api/admin/matricula/:id` - Cancelar matrícula

#### 2.5 Gestión de Ciclos Académicos
- Crear ciclos escolares
- Definir fechas de inicio y fin
- Marcar ciclos como cerrados
- Gestionar periodos dentro de ciclos

**Rutas**:
- `/admin/ciclos` - Gestión de ciclos

#### 2.6 Gestión de Sedes
- Crear sedes de la institución
- Definir direcciones
- Organizar usuarios por sede
- Gestionar aulas por sede

**Rutas**:
- `/admin/sedes` - Gestión de sedes

#### 2.7 Dashboard Administrativo
- Resumen de estadísticas
- Gráficos de desempeño
- Indicadores clave (KPI)
- Quick actions para acciones comunes

**Rutas**:
- `/admin/dashboard` - Dashboard principal

**API Endpoints**:
- `GET /api/admin/dashboard` - Obtener datos del dashboard

#### 2.8 Otros módulos administrativos
- **Anuncios**: Crear anuncios institucionales
- **FAQs**: Gestionar preguntas frecuentes
- **Bitácora**: Registro de cambios en el sistema
- **Reportes**: Generación de reportes académicos
- **Soporte**: Gestión de tickets de soporte
- **Backup**: Copias de seguridad
- **Respaldo**: Almacenamiento de respaldos
- **Mensajes**: Sistema de mensajería interna
- **Horarios**: Gestión de calendarios académicos
- **Configuración**: Parámetros globales del sistema

---

### 3. **Módulo de Docentes**

**Ubicación**: `/src/app/docente/`

**Funcionalidades principales**:

#### 3.1 Dashboard de Docente
- Resumen de asignaturas asignadas
- Estudiantes por asignatura
- Pendientes de calificación
- Últimas actividades

#### 3.2 Calificación de Estudiantes (CRÍTICO)
- Interfaz para ingresar notas por estudiante
- Soporte para hasta 3 notas por periodo
- Validación de rangos de calificación
- Historial de cambios

**Rutas**:
- `/docente/notas` - Panel de calificación

**API Endpoints**:
- `GET /api/docente/notas` - Obtener notas del periodo
- `POST /api/docente/notas` - Guardar notas
- `GET /api/docente/estudiantes` - Lista de estudiantes asignados
- `GET /api/docente/asignaciones` - Asignaturas del docente
- `GET /api/docente/info` - Información del docente
- `GET /docente/periodos` - Periodos disponibles

#### 3.3 Gestión de Tareas
- Crear tareas/deberes
- Asignar fechas de entrega
- Ver entregas de estudiantes
- Calificar entregas

#### 3.4 Asistencia
- Marcar asistencia por clase
- Registro histórico
- Reportes de asistencia

#### 3.5 Incidencias
- Reportar incidencias disciplinarias
- Documentar evidencias
- Seguimiento de casos

#### 3.6 Horarios
- Ver horario personal
- Aulas asignadas
- Cronograma de clases

#### 3.7 Anuncios
- Publicar anuncios por asignatura
- Comunicación con estudiantes

#### 3.8 Perfil y Soporte
- Actualizar información personal
- Consultar soporte técnico

---

### 4. **Módulo de Estudiantes**

**Ubicación**: `/src/app/estudiante/`

**Funcionalidades principales**:

#### 4.1 Dashboard de Estudiante
- Resumen de calificaciones
- Asignaturas inscritas
- Horarios de clase
- Anuncios relevantes

#### 4.2 Consulta de Calificaciones
- Ver notas por asignatura
- Cálculo de promedios
- Histórico de calificaciones

**API Endpoints**:
- `GET /api/estudiante/notas` - Obtener notas del estudiante
- `GET /api/estudiante/horario` - Horario de clases

#### 4.3 Consulta de Tareas
- Ver tareas pendientes
- Fecha de entrega
- Entregas realizadas
- Retroalimentación del docente

#### 4.4 Revisión de Boletas/Boletines
- Descarga de boletines finales
- Historial de periodos anteriores

#### 4.5 Asistencia
- Visualizar registro de asistencia
- Porcentaje de inasistencias

#### 4.6 Visualización de Anuncios
- Anuncios por asignatura
- Anuncios globales de la institución

#### 4.7 Perfil
- Ver información personal
- Actualizar datos de contacto

---

## 📊 Modelo de Datos

### Tablas Principales

#### **User (Usuarios)**
```sql
Fields:
- id (PK)
- name
- email (UNIQUE)
- firebaseUid (UNIQUE)
- passwordHash
- role (ADMIN, DOCENTE, STUDENT)
- sedeId (FK)
- active (Boolean)
- documentType, documentNumber (UNIQUE)
- birthDate, phone, address, gender
- photoUrl
- createdAt, updatedAt

Relations:
- Sede (N:1)
- Anuncio (1:N)
- Asistencia (1:N)
- Boletin (1:N)
- Cambio (1:N)
- Entrega (1:N)
- GradoEstudiante (1:N)
- Horario (1:N) as HorarioDocente
- Incidencia (1:N) as IncidenciasDocente/Estudiante
- MateriaDocente (1:N)
- MateriaGradoDocente (1:N)
- NotaMateriaPeriodo (1:N)
```

#### **Sede (Sedes)**
```sql
Fields:
- id (PK)
- nombre
- direccion

Relations:
- Aula (1:N)
- Grado (1:N)
- User (1:N)
```

#### **Grado (Grados Académicos)**
```sql
Fields:
- id (PK)
- nombre (ej: Primero, Segundo, Tercero)
- seccion (ej: A, B, C)
- sedeId (FK)
- cicloId (FK)
- aulaId (FK, opcional)
- createdAt

Relations:
- Aula (N:1)
- Ciclo (N:1)
- Sede (N:1)
- GradoEstudiante (1:N)
- Horario (1:N)
- MateriaGrado (1:N)
```

#### **Ciclo (Ciclos Académicos)**
```sql
Fields:
- id (PK)
- nombre (ej: 2025-A, 2025-B)
- fechaInicio, fechaFin
- cerrado (Boolean)

Relations:
- Boletin (1:N)
- Grado (1:N)
- Periodo (1:N)
- Horario (1:N)
```

#### **Periodo (Periodos Académicos)**
```sql
Fields:
- id (PK)
- nombre (ej: Primer Trimestre)
- cicloId (FK)
- fechaInicio, fechaFin

Relations:
- Ciclo (N:1)
- Calificacion (1:N)
- NotaMateriaPeriodo (1:N)
- MateriaGradoDocente (1:N)
```

#### **Materia (Asignaturas)**
```sql
Fields:
- id (PK)
- nombre
- area (ej: Matemáticas, Lenguaje)
- codigo (UNIQUE, ej: MAT101)
- createdAt

Relations:
- Anuncio (1:N)
- Asistencia (1:N)
- Horario (1:N)
- Incidencia (1:N)
- MateriaDocente (1:N)
- Tarea (1:N)
- NotaMateriaPeriodo (1:N)
- MateriaGrado (1:N)
```

#### **NotaMateriaPeriodo (Calificaciones)**
```sql
Fields:
- id (PK)
- estudianteId (FK)
- materiaId (FK)
- periodoId (FK)
- numeroNota (1, 2, 3) // Identifica cuál de las 3 notas
- valor (Float)
- descripcion
- fechaCreacion

Constraints:
- UNIQUE(estudianteId, materiaId, periodoId, numeroNota)

Relations:
- User (N:1)
- Materia (N:1)
- Periodo (N:1)
```

#### **Tarea (Tareas/Deberes)**
```sql
Fields:
- id (PK)
- materiaId (FK)
- titulo
- descripcion
- fechaEntrega
- createdAt

Relations:
- Materia (N:1)
- Entrega (1:N)
```

#### **Entrega (Entregas de Tareas)**
```sql
Fields:
- id (PK)
- tareaId (FK)
- estudianteId (FK)
- archivoUrl
- texto
- entregadaAt
- estado (entregada, atrasada, faltante)

Relations:
- Tarea (N:1)
- User (N:1)
- Calificacion (1:1)
```

#### **Calificacion (Calificación de Entregas)**
```sql
Fields:
- id (PK)
- entregaId (FK, UNIQUE)
- valor (Float)
- retroalimentacion
- calificadaAt
- periodoId (FK)

Relations:
- Entrega (1:1)
- Periodo (N:1)
```

#### **Asistencia (Asistencia en Clase)**
```sql
Fields:
- id (PK)
- fecha
- materiaId (FK)
- estudianteId (FK)
- presente (Boolean)

Relations:
- User (N:1)
- Materia (N:1)
```

#### **Horario (Horarios de Clase)**
```sql
Fields:
- id (PK)
- gradoId (FK)
- materiaId (FK)
- docenteId (FK)
- cicloId (FK)
- dia (Monday, Tuesday, etc.)
- horaInicio, horaFin
- aulaId (FK, opcional)

Relations:
- Aula (N:1)
- User (N:1) as HorarioDocente
- Grado (N:1)
- Materia (N:1)
- Ciclo (N:1)
```

#### **Incidencia (Incidencias Disciplinarias)**
```sql
Fields:
- id (PK)
- estudianteId (FK)
- materiaId (FK)
- docenteId (FK)
- tipo (falta, comportamiento, etc.)
- descripcion
- fecha
- evidenciaUrl

Relations:
- User (N:1) as IncidenciasDocente/Estudiante
- Materia (N:1)
```

#### **MateriaGrado (Relación Materia-Grado)**
```sql
Fields:
- id (PK)
- materiaId (FK)
- gradoId (FK)

Constraints:
- UNIQUE(materiaId, gradoId)

Relations:
- Materia (N:1)
- Grado (N:1)
- MateriaGradoDocente (1:N)
```

#### **MateriaGradoDocente (Asignación Docente-Materia-Grado-Periodo)**
```sql
Fields:
- id (PK)
- materiaGradoId (FK)
- docenteId (FK)
- periodoId (FK, opcional)

Constraints:
- UNIQUE(materiaGradoId, docenteId, periodoId)

Relations:
- MateriaGrado (N:1)
- User (N:1)
- Periodo (N:1)
```

#### **GradoEstudiante (Matriculación)**
```sql
Fields:
- id (PK)
- gradoId (FK)
- estudianteId (FK)

Constraints:
- UNIQUE(gradoId, estudianteId)

Relations:
- Grado (N:1)
- User (N:1)
```

#### **Anuncio (Anuncios)**
```sql
Fields:
- id (PK)
- materiaId (FK, opcional)
- autorId (FK)
- mensaje
- fecha
- tipo

Relations:
- Materia (N:1)
- User (N:1)
```

#### **Boletin (Boletines/Reportes Finales)**
```sql
Fields:
- id (PK)
- estudianteId (FK)
- cicloId (FK)
- archivoUrl

Relations:
- User (N:1)
- Ciclo (N:1)
```

---

## 🔌 API Endpoints

### Authentication Endpoints

```
POST   /api/auth/register          - Registrar nuevo usuario (Admin only)
POST   /api/auth/login             - Login (Frontend maneja con Firebase)
POST   /api/auth/logout            - Logout
```

### User Role Endpoints

```
GET    /api/user-role?uid={uid}    - Obtener rol del usuario por Firebase UID
GET    /api/me                     - Obtener información del usuario autenticado
```

### Admin Endpoints

```
// Usuarios
POST   /api/admin/usuarios         - Crear usuario
GET    /api/admin/usuarios         - Listar usuarios (con paginación)
PUT    /api/admin/usuarios/:id     - Actualizar usuario
DELETE /api/admin/usuarios/:id     - Eliminar usuario
GET    /api/admin/usuarios/:id     - Obtener usuario específico

// Grados
POST   /api/admin/grados           - Crear grado
GET    /api/admin/grados           - Listar grados
PUT    /api/admin/grados/:id       - Actualizar grado
DELETE /api/admin/grados/:id       - Eliminar grado

// Asignaturas
POST   /api/admin/asignaturas      - Crear asignatura
GET    /api/admin/asignaturas      - Listar asignaturas
PUT    /api/admin/asignaturas/:id  - Actualizar asignatura
DELETE /api/admin/asignaturas/:id  - Eliminar asignatura

// Estudiantes (General)
POST   /api/admin/estudiantes      - Crear estudiante
GET    /api/admin/estudiantes      - Listar estudiantes
PUT    /api/admin/estudiantes/:id  - Actualizar estudiante

// Matriculación
POST   /api/admin/matricula        - Matricular estudiante
GET    /api/admin/matricula        - Listar matrículas
DELETE /api/admin/matricula/:id    - Cancelar matrícula

// Dashboard
GET    /api/admin/dashboard        - Datos del dashboard

// Ciclos
POST   /api/admin/ciclos           - Crear ciclo
GET    /api/admin/ciclos           - Listar ciclos
PUT    /api/admin/ciclos/:id       - Actualizar ciclo

// Periodos
POST   /api/admin/periodos         - Crear periodo
GET    /api/admin/periodos?cicloId={id} - Listar periodos por ciclo

// Sedes
POST   /api/admin/sedes            - Crear sede
GET    /api/admin/sedes            - Listar sedes
PUT    /api/admin/sedes/:id        - Actualizar sede

// Horarios
POST   /api/admin/horarios         - Crear horario
GET    /api/admin/horarios         - Listar horarios
DELETE /api/admin/horarios/:id     - Eliminar horario

// Anuncios
POST   /api/admin/anuncios         - Crear anuncio
GET    /api/admin/anuncios         - Listar anuncios
DELETE /api/admin/anuncios/:id     - Eliminar anuncio
```

### Docente Endpoints

```
// Notas (Calificaciones)
GET    /api/docente/notas?gradoId={}&materiaId={}&periodoId={}
                                   - Obtener notas del periodo
POST   /api/docente/notas          - Guardar/actualizar notas

// Estudiantes Asignados
GET    /api/docente/estudiantes?gradoId={}&materiaId={}
                                   - Listar estudiantes del grupo

// Asignaciones
GET    /api/docente/asignaciones   - Obtener asignaturas asignadas

// Información
GET    /api/docente/info           - Información personal del docente
GET    /api/docente/periodos       - Periodos disponibles

// Tareas
POST   /api/docente/tareas         - Crear tarea
GET    /api/docente/tareas         - Listar tareas
PUT    /api/docente/tareas/:id     - Actualizar tarea

// Calificación de Entregas
PUT    /api/docente/entregas/:id   - Calificar entrega
```

### Estudiante Endpoints

```
// Notas
GET    /api/estudiante/notas       - Obtener notas del estudiante
GET    /api/estudiante/notas?estudianteId={}&materiaId={}&periodoId={}
                                   - Calcular promedio por asignatura

// Horario
GET    /api/estudiante/horario     - Obtener horario de clases

// Tareas
GET    /api/estudiante/tareas      - Listar tareas disponibles
POST   /api/estudiante/entregas    - Entregar tarea

// Asistencia
GET    /api/estudiante/asistencia  - Obtener registro de asistencia

// Anuncios
GET    /api/estudiante/anuncios    - Obtener anuncios relevantes

// Boletines
GET    /api/estudiante/boletines   - Descargar boleta/boletín
```

---

## 🔄 Flujos Principales

### Flujo 1: Registro e Inicio de Sesión

```
1. Usuario accede a /login
2. Ingresa email y contraseña
3. Frontend llama a Firebase Authentication
4. Firebase valida credenciales
5. Si es válido:
   a. Firebase genera JWT token
   b. AuthContext actualiza estado global
   c. Frontend obtiene uid de Firebase
   d. Llama a GET /api/user-role?uid={uid}
   e. Backend busca usuario en PostgreSQL por firebaseUid
   f. Retorna rol del usuario
6. Frontend redirige según rol:
   - ADMIN → /admin/dashboard
   - DOCENTE → /docente/dashboard
   - STUDENT → /estudiante/dashboard
```

### Flujo 2: Calificación de Estudiantes (Docente)

```
1. Docente accede a /docente/notas
2. Selecciona:
   - Asignatura (de sus asignaciones)
   - Grado (del grupo que enseña)
   - Periodo (del ciclo activo)
3. Frontend llama GET /api/docente/estudiantes?gradoId={}&materiaId={}
4. Backend retorna lista de estudiantes matriculados
5. Docente ingresa notas (hasta 3 por estudiante)
6. Frontend llama POST /api/docente/notas
7. Backend:
   - Valida asignación docente
   - Verifica estudiante está matriculado
   - Crea/actualiza registros en NotaMateriaPeriodo
8. Sistema retorna confirmación
9. Notas se guardan y son visibles para estudiantes
```

### Flujo 3: Consulta de Calificaciones (Estudiante)

```
1. Estudiante accede a /estudiante/dashboard
2. Frontend carga:
   - GET /api/estudiante/notas → Lista de notas por asignatura
   - GET /api/estudiante/horario → Horario de clases
3. Backend retorna datos desde PostgreSQL
4. Frontend muestra:
   - Asignaturas inscritas
   - Notas por periodo
   - Promedio por asignatura
   - Horario de clases
```

### Flujo 4: Matriculación de Estudiante

```
1. Admin accede a /admin/matricula
2. Selecciona:
   - Estudiante
   - Grado
   - Ciclo académico
3. Frontend valida:
   - Estudiante no esté ya matriculado en ese grado
   - Grado y ciclo sean válidos
4. Si es válido, llama POST /api/admin/matricula
5. Backend:
   - Crea registro en GradoEstudiante
   - Valida constraint UNIQUE(gradoId, estudianteId)
6. Estudiante aparece en el grado automáticamente
7. Docentes ven estudiante en sus grupos
8. Estudiante ve asignaturas del grado
```

### Flujo 5: Generación de Horario de Clases

```
1. Admin accede a /admin/horarios
2. Define para cada clase:
   - Grado
   - Asignatura
   - Docente
   - Ciclo
   - Día de la semana
   - Hora inicio y fin
   - Aula (opcional)
3. Frontend valida:
   - No haya conflictos de aula
   - No haya conflictos de docente
4. Sistema guarda en tabla Horario
5. Estudiantes ven horario en /estudiante/dashboard
6. Docentes ven su horario en /docente/dashboard
```

---

## ⚙️ Configuración y Despliegue

### Variables de Entorno (.env)

```env
# Base de Datos
DATABASE_URL="postgresql://usuario:contraseña@host:5432/aulaunida"

# Firebase Client
NEXT_PUBLIC_API_KEY_FIREBASE=AIzaSyBwIoJmTpxDk1k7Oe74Msru0Vv_TbEL5fo
NEXT_PUBLIC_AUTHDOMAIN=aulaunida-58506.firebaseapp.com
NEXT_PUBLIC_PROJECTID=aulaunida-58506
NEXT_PUBLIC_STORAGEBUCKET=aulaunida-58506.firebasestorage.app
NEXT_PUBLIC_MESSAGINGSENDERID=109632574576
NEXT_PUBLIC_APPID=1:109632574576:web:3b1e2f0
NEXT_PUBLIC_MEASUREMENTID=G-80F5JCMZQD

# Firebase Admin
FIREBASE_PROJECT_ID=aulaunida-58506
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-fbsvc@aulaunida-58506.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

### Docker Compose Local

```yaml
version: '3.8'
services:
  db:
    image: postgres:15
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: aulaunida
    ports:
      - "5432:5432"

  app:
    build: .
    depends_on:
      - db
    environment:
      DATABASE_URL: "postgresql://postgres:postgres@db:5432/aulaunida"
    ports:
      - "3000:3000"
```

### Scripts NPM

```bash
# Desarrollo
npm run dev              # Inicia servidor desarrollo con Turbopack

# Producción
npm run build           # Compila Next.js
npm start              # Inicia servidor producción

# Linting
npm run lint           # Ejecuta eslint

# Prisma
npx prisma migrate dev --name "nombre_migracion"
npx prisma generate
npx prisma db push
```

---

## 🔐 Seguridad

### Autenticación
- **Firebase Authentication**: Gestión segura de identidades
- **Tokens JWT**: Validación de sesiones
- **firebaseUid**: Identificador único de Firebase para cada usuario

### Autorización
- **Roles basados en acceso (RBAC)**:
  - ADMIN: Acceso total del sistema
  - DOCENTE: Acceso a calificación y tareas
  - STUDENT: Acceso solo a información personal

### Protección de Rutas
- Middleware de autenticación en componentes sensibles
- Validación de roles en endpoints API
- Verificación de tokens en servidor

### Validación de Datos
- Validación client-side con React Hook Form
- Validación server-side en Prisma
- Esquemas Zod para validación de tipos

### Protección de Base de Datos
- Constraints de integridad referencial
- Transacciones ACID en Prisma
- Backups automáticos

---

## 📦 Requisitos para Kubernetes

### Archivos necesarios a crear:

#### 1. **Dockerfile optimizado para Kubernetes**
```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/.next ./.next
COPY prisma ./prisma
EXPOSE 3000
CMD ["npm", "start"]
```

#### 2. **Deployment Kubernetes**
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: aulaunida-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: aulaunida
  template:
    metadata:
      labels:
        app: aulaunida
    spec:
      containers:
      - name: app
        image: aulaunida:latest
        ports:
        - containerPort: 3000
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: db-secret
              key: url
        - name: FIREBASE_PROJECT_ID
          valueFrom:
            configMapKeyRef:
              name: firebase-config
              key: project-id
        livenessProbe:
          httpGet:
            path: /api/health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
```

#### 3. **Service Kubernetes**
```yaml
apiVersion: v1
kind: Service
metadata:
  name: aulaunida-service
spec:
  selector:
    app: aulaunida
  ports:
  - protocol: TCP
    port: 80
    targetPort: 3000
  type: LoadBalancer
```

#### 4. **ConfigMap y Secrets**
```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: firebase-config
data:
  project-id: "aulaunida-58506"
  auth-domain: "aulaunida-58506.firebaseapp.com"

---
apiVersion: v1
kind: Secret
metadata:
  name: db-secret
type: Opaque
data:
  url: cG9zdGdyZXM6Ly9wb3N0Z3JlczpwYXNzd29yZEBkYi1wb3N0Z3Jlczo1NDMyL2F1bGF1bmlkYQ==
```

#### 5. **StatefulSet para PostgreSQL**
```yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: postgres
spec:
  serviceName: postgres
  replicas: 1
  selector:
    matchLabels:
      app: postgres
  template:
    metadata:
      labels:
        app: postgres
    spec:
      containers:
      - name: postgres
        image: postgres:15
        ports:
        - containerPort: 5432
        env:
        - name: POSTGRES_PASSWORD
          valueFrom:
            secretKeyRef:
              name: db-secret
              key: password
        volumeMounts:
        - name: postgres-storage
          mountPath: /var/lib/postgresql/data
  volumeClaimTemplates:
  - metadata:
      name: postgres-storage
    spec:
      accessModes: ["ReadWriteOnce"]
      resources:
        requests:
          storage: 10Gi
```

### Pasos para migrar a Kubernetes:

1. **Preparar imagen Docker multi-etapa**
   - Build optimizado
   - Tamaño reducido (Alpine)
   - Liveness probes

2. **Configurar base de datos**
   - PostgreSQL en StatefulSet
   - Persistent Volumes para datos
   - Secretos para credenciales

3. **Crear ConfigMaps y Secrets**
   - Variables de entorno seguras
   - Configuraciones de Firebase
   - Credenciales de BD

4. **Deploy de aplicación**
   - Múltiples réplicas para alta disponibilidad
   - Load Balancer para distribuir tráfico
   - Horizontal Pod Autoscaler (HPA)

5. **Monitoreo y logging**
   - Prometheus para métricas
   - ELK/Loki para logs
   - Health checks

6. **Backup y recuperación**
   - Backups automáticos de BD
   - Snapshots de volúmenes
   - Plan de recuperación ante desastres

---

## 📋 Casos de Uso Implementados

1. ✅ Gestión de Usuarios (CRUD completo)
2. ✅ Autenticación y Login
3. ✅ Matriculación de Estudiantes
4. ✅ Calificación de Estudiantes por Docente
5. ✅ Consulta de Calificaciones por Estudiante
6. ✅ Gestión de Horarios
7. ✅ Gestión de Ciclos y Periodos
8. ✅ Gestión de Tareas y Entregas
9. ✅ Control de Asistencia
10. ✅ Reportes y Boletines
11. ✅ Sistema de Anuncios
12. ✅ Registro de Incidencias

---

## 🔄 Integración de Servicios Externos

### Firebase
- Autenticación de usuarios
- Gestión de identidades
- Tokens JWT para sesiones

### PostgreSQL
- Almacenamiento de datos académicos
- Gestión de relaciones complejas
- ACID compliance

### Prisma
- ORM para acceso a datos
- Migraciones de schema
- Validación de modelos

---

## 📝 Notas Importantes

1. **Autenticación distribuida**: Firebase maneja usuarios, PostgreSQL maneja roles/permisos
2. **Validación de notas**: Máximo 3 notas por estudiante/asignatura/periodo
3. **Restricciones de grados**: Un estudiante solo puede estar matriculado una vez por grado
4. **Asignaciones de docentes**: Requieren validación de MateriaGrado y MateriaGradoDocente
5. **Ciclos cerrados**: Los ciclos cerrados no permiten nuevas operaciones

---

*Documento generado: Marzo 2026*
*Sistema: AulaUnida v0.1.0*
*Equipo de Desarrollo: Juan Hernández*