# Diagrama de Servicios - Sistema de Login AulaUnida

## Arquitectura del Sistema de Autenticación

```mermaid
graph TD
    A[Cliente Web React/Next.js] --> B[Componente Página Login]
    B --> C[Proveedor Contexto Auth]
    C --> D[Cliente Auth Firebase]
    D --> E[Servicio Autenticación Firebase]
    C --> F[Hook useUserRole]
    F --> G[Ruta API user-role]
    G --> H[Cliente Prisma]
    H --> I[Base de Datos PostgreSQL]
    J[Rutas Protegidas] --> C
    J --> F
    K[Enrutamiento por Rol] --> L[Panel Administrador]
    K --> M[Panel Docente] 
    K --> N[Panel Estudiante]
    F --> K
    O[Estados de Carga] --> C
    O --> F
```

## Flujo de Autenticación Detallado

### 1. **Inicio de Sesión**

```mermaid
sequenceDiagram
    participant U as Usuario
    participant LP as Página de Login
    participant FC as Cliente Firebase
    participant FS as Servicio Firebase
    participant AC as Contexto Auth
    participant UR as Hook useUserRole
    participant API as API user-role
    participant BD as PostgreSQL

    U->>LP: Ingresa email/contraseña
    LP->>FC: iniciarSesionConEmailYContraseña()
    FC->>FS: Autenticar credenciales
    FS-->>FC: Token JWT + Objeto Usuario
    FC-->>LP: Usuario Firebase
    LP->>AC: Actualizar estado de usuario
    AC->>UR: Activar búsqueda de rol
    UR->>API: GET /api/user-role?uid={firebase_uid}
    API->>BD: SELECT role FROM users WHERE firebaseUid
    BD-->>API: Rol del usuario
    API-->>UR: {role: "ADMIN|DOCENTE|STUDENT"}
    UR-->>AC: Rol actualizado
    AC->>LP: Usuario y rol disponibles
    LP->>LP: Redirigir según rol
```

### 2. **Componentes del Sistema**

#### **Componentes del Frontend:**
- `PáginaLogin` - Formulario de autenticación
- `ContextoAuth` - Manejo global del estado de autenticación
- `useAuth()` - Hook para acceder al estado de autenticación
- `useUserRole()` - Hook para obtener el rol del usuario
- `RutaProtegida` - Componente para rutas protegidas

#### **Servicios del Backend:**
- `Autenticación Firebase` - Servicio de autenticación
- `/api/user-role` - API para obtener roles desde PostgreSQL
- `Cliente Prisma` - ORM para base de datos
- `PostgreSQL` - Base de datos principal

#### **Archivos de Configuración:**
- `firebaseClient.ts` - Configuración de Firebase para cliente
- `firebaseAdmin.ts` - Configuración de Firebase para servidor
- `authContext.tsx` - Contexto de React para autenticación

### 3. **Estados de la Aplicación**

```mermaid
stateDiagram-v2
    [*] --> Cargando
    Cargando --> No_Autenticado: Sin usuario
    Cargando --> Autenticado: Usuario existe
    No_Autenticado --> Formulario_Login: Mostrar login
    Formulario_Login --> Autenticando: Enviar credenciales
    Autenticando --> Autenticado: Éxito
    Autenticando --> Error_Login: Fallo
    Error_Login --> Formulario_Login: Reintentar
    Autenticado --> Cargando_Rol: Buscar rol
    Cargando_Rol --> Panel_Admin: rol = ADMIN
    Cargando_Rol --> Panel_Docente: rol = DOCENTE
    Cargando_Rol --> Panel_Estudiante: rol = STUDENT
    Panel_Admin --> [*]: Cerrar sesión
    Panel_Docente --> [*]: Cerrar sesión
    Panel_Estudiante --> [*]: Cerrar sesión
```

### 4. **Tecnologías Utilizadas**

| Componente | Tecnología | Propósito |
|------------|------------|-----------|
| **Frontend** | Next.js 15 + React | Framework web principal |
| **Autenticación** | Firebase Auth | Gestión de identidades |
| **Estado Global** | React Context | Manejo de estado de usuario |
| **Base de Datos** | PostgreSQL | Almacenamiento de datos |
| **ORM** | Prisma | Acceso a base de datos |
| **API Routes** | Next.js API Routes | Endpoints del servidor |
| **Estilos** | CSS Modules | Estilos componentes |

### 5. **Flujo de Datos**

```mermaid
flowchart TD
    A[Usuario ingresa credenciales] --> B[Firebase Auth valida]
    B --> C[Se genera token JWT]
    C --> D[ContextoAuth actualiza estado]
    D --> E[useUserRole consulta API]
    E --> F[API consulta PostgreSQL]
    F --> G[Retorna rol del usuario]
    G --> H[Frontend redirige según rol]
    H --> I[Panel Administrador]
    H --> J[Panel Docente]
    H --> K[Panel Estudiante]
```

### 6. **Seguridad**

- **Tokens JWT**: Firebase genera tokens seguros para cada sesión
- **Verificación server-side**: Los tokens se verifican en el servidor
- **Roles en BD**: Los permisos están almacenados en PostgreSQL
- **Rutas protegidas**: Middleware de autenticación en componentes sensibles
- **Logout seguro**: Limpieza completa del estado al cerrar sesión

### 7. **Puntos de Extensión**

- **Autenticación social**: Agregar login con Google/Facebook
- **Autenticación de dos factores (2FA)**: Implementar seguridad adicional
- **Gestión avanzada de sesiones**: Manejo mejorado de sesiones
- **Permisos granulares**: Sistema de permisos por funcionalidad
- **Registros de auditoría**: Registro detallado de actividades de login

---

*Diagrama generado para AulaUnida - Sistema de Gestión Académica*
*Fecha: Noviembre 2025*