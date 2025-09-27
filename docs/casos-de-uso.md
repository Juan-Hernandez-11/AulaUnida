# Especificaciones de Casos de Uso

Este documento describe los casos de uso principales implementados hasta la fecha en el sistema AulaUnida, basados en los módulos administrativos y rutas API presentes en el proyecto.

---

## 1. Gestión de Usuarios

**Actor:** Administrador

**Descripción:** Permite al administrador crear, consultar, modificar y eliminar usuarios del sistema.

**Flujo principal:**
1. El administrador accede al módulo de usuarios.
2. Visualiza el listado de usuarios registrados.
3. Puede crear un nuevo usuario, editar información de un usuario existente o eliminarlo.

**Precondiciones:**
- El administrador debe estar autenticado.

**Postcondiciones:**
- El usuario es creado, modificado o eliminado en la base de datos.

---

## 2. Gestión de Asignaturas

**Actor:** Administrador

**Descripción:** Permite administrar las asignaturas disponibles en la institución.

**Flujo principal:**
1. El administrador accede al módulo de asignaturas.
2. Visualiza el listado de asignaturas.
3. Puede crear, editar o eliminar asignaturas.

**Precondiciones:**
- El administrador debe estar autenticado.

**Postcondiciones:**
- La asignatura es creada, modificada o eliminada en la base de datos.

---

## 3. Gestión de Matrícula

**Actor:** Administrador

**Descripción:** Permite gestionar el proceso de matrícula de los estudiantes.

**Flujo principal:**
1. El administrador accede al módulo de matrícula.
2. Visualiza los estudiantes y su estado de matrícula.
3. Puede matricular estudiantes en asignaturas o periodos.

**Precondiciones:**
- El administrador debe estar autenticado.

**Postcondiciones:**
- El estado de matrícula del estudiante es actualizado.

---

## 4. Dashboard Administrativo

**Actor:** Administrador

**Descripción:** Permite visualizar estadísticas y datos relevantes del sistema.

**Flujo principal:**
1. El administrador accede al dashboard.
2. Visualiza gráficos, métricas y reportes generales.

**Precondiciones:**
- El administrador debe estar autenticado.

**Postcondiciones:**
- No aplica (solo consulta).

---

## 5. Gestión de Grados

**Actor:** Administrador

**Descripción:** Permite administrar los grados académicos de la institución.

**Flujo principal:**
1. El administrador accede al módulo de grados.
2. Visualiza, crea, edita o elimina grados.

**Precondiciones:**
- El administrador debe estar autenticado.

**Postcondiciones:**
- El grado es creado, modificado o eliminado en la base de datos.

---

## 6. Gestión de Estudiantes

**Actor:** Administrador

**Descripción:** Permite consultar y administrar la información de los estudiantes.

**Flujo principal:**
1. El administrador accede al módulo de estudiantes.
2. Visualiza el listado y detalles de los estudiantes.
3. Puede editar información relevante.

**Precondiciones:**
- El administrador debe estar autenticado.

**Postcondiciones:**
- La información del estudiante es actualizada.

---

## 7. Gestión de Anuncios

**Actor:** Administrador

**Descripción:** Permite publicar y administrar anuncios institucionales.

**Flujo principal:**
1. El administrador accede al módulo de anuncios.
2. Publica, edita o elimina anuncios.

**Precondiciones:**
- El administrador debe estar autenticado.

**Postcondiciones:**
- El anuncio es publicado, editado o eliminado.

---

## 8. Gestión de Bitácora

**Actor:** Administrador

**Descripción:** Permite consultar el registro de actividades del sistema.

**Flujo principal:**
1. El administrador accede al módulo de bitácora.
2. Visualiza el historial de acciones realizadas en el sistema.

**Precondiciones:**
- El administrador debe estar autenticado.

**Postcondiciones:**
- No aplica (solo consulta).

---

## 9. Gestión de Ciclos

**Actor:** Administrador

**Descripción:** Permite administrar los ciclos académicos.

**Flujo principal:**
1. El administrador accede al módulo de ciclos.
2. Visualiza, crea, edita o elimina ciclos.

**Precondiciones:**
- El administrador debe estar autenticado.

**Postcondiciones:**
- El ciclo es creado, modificado o eliminado.

---

## 10. Configuración del Sistema

**Actor:** Administrador

**Descripción:** Permite modificar parámetros generales del sistema.

**Flujo principal:**
1. El administrador accede al módulo de configuración.
2. Modifica parámetros y preferencias del sistema.

**Precondiciones:**
- El administrador debe estar autenticado.

**Postcondiciones:**
- Los parámetros del sistema son actualizados.

---

## 11. Gestión de FAQs

**Actor:** Administrador

**Descripción:** Permite administrar las preguntas frecuentes del sistema.

**Flujo principal:**
1. El administrador accede al módulo de FAQs.
2. Crea, edita o elimina preguntas frecuentes.

**Precondiciones:**
- El administrador debe estar autenticado.

**Postcondiciones:**
- Las FAQs son actualizadas.

---

## 12. Gestión de Horarios

**Actor:** Administrador

**Descripción:** Permite administrar los horarios académicos.

**Flujo principal:**
1. El administrador accede al módulo de horarios.
2. Crea, edita o elimina horarios.

**Precondiciones:**
- El administrador debe estar autenticado.

**Postcondiciones:**
- Los horarios son actualizados.

---

## 13. Gestión de Mensajes

**Actor:** Administrador

**Descripción:** Permite enviar y administrar mensajes internos.

**Flujo principal:**
1. El administrador accede al módulo de mensajes.
2. Envía, edita o elimina mensajes.

**Precondiciones:**
- El administrador debe estar autenticado.

**Postcondiciones:**
- Los mensajes son enviados o actualizados.

---

## 14. Gestión de Reportes

**Actor:** Administrador

**Descripción:** Permite generar y consultar reportes del sistema.

**Flujo principal:**
1. El administrador accede al módulo de reportes.
2. Genera y visualiza reportes.

**Precondiciones:**
- El administrador debe estar autenticado.

**Postcondiciones:**
- Los reportes son generados y/o descargados.

---

## 15. Gestión de Sedes

**Actor:** Administrador

**Descripción:** Permite administrar las sedes de la institución.

**Flujo principal:**
1. El administrador accede al módulo de sedes.
2. Crea, edita o elimina sedes.

**Precondiciones:**
- El administrador debe estar autenticado.

**Postcondiciones:**
- Las sedes son actualizadas.

---

## 16. Gestión de Backup

**Actor:** Administrador

**Descripción:** Permite realizar copias de seguridad y restaurar información.

**Flujo principal:**
1. El administrador accede al módulo de backup.
2. Realiza o programa copias de seguridad.

**Precondiciones:**
- El administrador debe estar autenticado.

**Postcondiciones:**
- Se genera una copia de seguridad o se restaura información.

---

## 17. Soporte Técnico

**Actor:** Administrador

**Descripción:** Permite gestionar solicitudes de soporte técnico.

**Flujo principal:**
1. El administrador accede al módulo de soporte.
2. Visualiza y gestiona solicitudes de soporte.

**Precondiciones:**
- El administrador debe estar autenticado.

**Postcondiciones:**
- Las solicitudes de soporte son gestionadas.

---

> Documento generado automáticamente a partir de la estructura actual del proyecto (septiembre 2025).