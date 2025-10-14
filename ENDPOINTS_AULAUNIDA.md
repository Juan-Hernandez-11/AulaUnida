# Endpoints AulaUnida

## Endpoints ADMIN

| Método | Ruta                                      | Descripción                                 |
|--------|-------------------------------------------|---------------------------------------------|
| GET    | /api/admin/usuarios                       | Listar todos los usuarios                   |
| POST   | /api/admin/usuarios                       | Crear un nuevo usuario                      |
| GET    | /api/admin/asignaturas                    | Listar todas las asignaturas                |
| POST   | /api/admin/asignaturas                    | Crear una nueva asignatura                  |
| GET    | /api/admin/sedes                          | Listar todas las sedes                      |
| POST   | /api/admin/sedes                          | Crear una nueva sede                        |
| GET    | /api/admin/horarios                       | Listar todos los horarios                   |
| POST   | /api/admin/horarios                       | Crear un nuevo horario                      |
| GET    | /api/admin/matricula                      | Listar matrículas                           |
| POST   | /api/admin/matricula                      | Crear matrícula                             |
| GET    | /api/admin/periodos                       | Listar periodos                             |
| POST   | /api/admin/periodos                       | Crear periodo                               |
| GET    | /api/admin/materias                       | Listar materias                             |
| POST   | /api/admin/materias                       | Crear materia                               |
| GET    | /api/admin/grados                         | Listar grados                               |
| POST   | /api/admin/grados                         | Crear grado                                 |
| GET    | /api/admin/dashboard                      | Datos del dashboard                         |
| GET    | /api/admin/docentes                       | Listar docentes                             |
| POST   | /api/admin/docentes                       | Crear docente                               |
| GET    | /api/admin/estudiantes                    | Listar estudiantes                          |
| POST   | /api/admin/estudiantes                    | Crear estudiante                            |
| GET    | /api/admin/aulas                          | Listar aulas                                |
| POST   | /api/admin/aulas                          | Crear aula                                  |
| GET    | /api/admin/docentes/[id]/asignaciones     | Ver asignaciones de un docente              |
| GET    | /api/admin/ciclos                         | Listar ciclos                               |
| POST   | /api/admin/ciclos                         | Crear ciclo                                 |

---

## Endpoints DOCENTE (Profesor)

| Método | Ruta                          | Descripción                                 |
|--------|-------------------------------|---------------------------------------------|
| GET    | /api/docente/estudiantes      | Listar estudiantes asignados                |
| GET    | /api/docente/asignaciones     | Listar asignaciones del docente             |
| POST   | /api/docente/notas            | Asignar notas a estudiantes                 |
| GET    | /api/docente/notas            | Ver notas asignadas                         |

---

## Endpoints ESTUDIANTE

| Método | Ruta                    | Descripción                                 |
|--------|-------------------------|---------------------------------------------|
| GET    | /api/estudiante/notas   | Ver notas del estudiante                    |

---

## Endpoints GENERALES

| Método | Ruta                | Descripción                                 |
|--------|---------------------|---------------------------------------------|
| GET    | /api/me             | Ver información del usuario autenticado     |
| GET    | /api/user-role      | Ver el rol del usuario autenticado          |

---

## Autenticación

Todos los endpoints protegidos requieren el header:

```
Authorization: Bearer TU_TOKEN_AQUI
```
Donde `TU_TOKEN_AQUI` es el token JWT de Firebase Auth.

---

## Ejemplo en Postman

- URL: `http://localhost:3000/api/admin/usuarios`
- Método: GET
- Headers:
  - Authorization: Bearer TU_TOKEN_AQUI

---

Puedes agregar ejemplos de body para los métodos POST según lo necesites.
