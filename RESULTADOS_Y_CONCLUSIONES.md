# 6. Resultados Esperados / Prototipo

## Descripción del prototipo desarrollado
AulaUnida es un sistema modular de gestión escolar que permite administrar usuarios, asignaturas, grados, horarios, matrículas, sedes, ciclos y aulas. El sistema está construido con Next.js, Prisma ORM y Firebase Auth, garantizando seguridad y escalabilidad. Incluye roles diferenciados (admin, docente, estudiante) y acceso protegido a los endpoints mediante tokens JWT.

El prototipo implementa:
- Registro y gestión de usuarios con validaciones robustas.
- Asignación de grados y materias a estudiantes y docentes.
- Creación y consulta de horarios, aulas, sedes y ciclos.
- Endpoints protegidos y testables vía Postman.
- Interfaz moderna y funcional para cada rol.

## Explicación de los beneficios del sistema
- **Seguridad:** Autenticación con Firebase y protección de endpoints por roles.
- **Modularidad:** Cada entidad (usuario, grado, materia, aula, etc.) tiene su propio endpoint y lógica.
- **Escalabilidad:** Arquitectura preparada para crecer y adaptarse a nuevas necesidades escolares.
- **Facilidad de pruebas:** Todos los endpoints pueden ser probados fácilmente con Postman.
- **Automatización:** Permite automatizar procesos administrativos y académicos, reduciendo errores manuales.
- **Acceso diferenciado:** Cada usuario accede solo a la información y acciones permitidas por su rol.

# 7. Conclusiones y Recomendaciones

## Reflexión sobre lo aprendido
El desarrollo de AulaUnida permitió aplicar buenas prácticas de arquitectura web, seguridad y validación de datos. Se aprendió a integrar Next.js con Prisma y Firebase Auth, y a diseñar APIs RESTful seguras y eficientes. El uso de Postman facilitó la validación y documentación de los endpoints.

## Limitaciones del proyecto
- El sistema depende de la correcta configuración de Firebase y la base de datos.
- Algunas funcionalidades avanzadas (reportes, notificaciones, etc.) no se implementaron en el prototipo.
- La interfaz puede mejorar en experiencia de usuario y diseño visual.
- No se incluyó integración con sistemas externos (pagos, mensajería, etc.).

## Posibles mejoras futuras
- Implementar reportes académicos y administrativos.
- Mejorar la interfaz gráfica y experiencia de usuario.
- Agregar notificaciones y comunicación interna.
- Integrar pagos y otros servicios externos.
- Optimizar el rendimiento y la escalabilidad para grandes volúmenes de datos.
- Añadir pruebas automatizadas y CI/CD para despliegue continuo.
