# Resumen del Proyecto: Aula Unida

## Descripción General
Aula Unida es un sistema web para la gestión académica en instituciones educativas pequeñas y medianas. Busca unificar procesos que actualmente se hacen con herramientas dispersas (hojas de cálculo, correos, etc.), facilitando la administración de cursos, inscripciones, asignaciones, calificaciones y comunicación.

## Objetivo General
Diseñar e implementar una plataforma unificada que facilite la interacción entre estudiantes, docentes y administradores, asegurando calidad mediante buenas prácticas de documentación, pruebas y una base de datos normalizada.

## Alcance (MVP)
- Autenticación con roles: Estudiante, Docente, Administrador.
- Gestión de cursos: CRUD de cursos (crear, editar, eliminar, listar).
- Inscripción a cursos: Estudiantes pueden inscribirse/darse de baja.
- Gestión de asignaciones: Docentes crean tareas con fecha de entrega y archivos adjuntos.
- Entrega y recepción de trabajos: Estudiantes entregan, docentes descargan y comentan.
- Panel de administrador: Gestión de usuarios, métricas básicas, restaurar datos.
- Anuncios académicos.

No incluye: integraciones externas, pagos, autenticación institucional, analítica avanzada (posibles mejoras futuras).

## Requerimientos Funcionales (RF)
- RF-01: Autenticación y gestión de usuarios (roles, login, perfil, cambio de rol).
- RF-02: Gestión de cursos (CRUD, validaciones, cupos).
- RF-03: Inscripción a cursos (control de cupos, estado visible).
- RF-04: Gestión de asignaciones (CRUD, archivos adjuntos).
- RF-05: Entrega y recepción de trabajos (historial, límites de archivo, comentarios).
- RF-06: Panel de administrador (gestión de usuarios, métricas, restaurar datos).

## Requerimientos No Funcionales (RNF)
- Seguridad: Hashing de contraseñas, protección CSRF/XSS, validaciones.
- Disponibilidad: 99% en horario académico.
- Rendimiento: Páginas principales <2s con 50 usuarios concurrentes.
- Escalabilidad: Arquitectura por capas, escalable.
- Mantenibilidad: Linters, pruebas unitarias, CI, documentación mínima.
- Privacidad: Solo datos necesarios, protección de contraseñas y archivos.
- Usabilidad: Interfaz usable y responsive, flujos claros.

## Tecnologías Clave
- Frontend: React o Next.js
- Backend: Node.js
- Base de datos: PostgreSQL
- Contenedores: Docker
- Correo: SMTP/SendGrid
