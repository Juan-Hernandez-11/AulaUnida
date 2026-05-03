module.exports = [
"[project]/.next-internal/server/app/api/admin/promocion/route/actions.js [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__, module, exports) => {

}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/@prisma/client [external] (@prisma/client, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("@prisma/client", () => require("@prisma/client"));

module.exports = mod;
}),
"[project]/src/app/api/admin/promocion/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs)");
;
;
const prisma = new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__["PrismaClient"]();
async function GET(req) {
    try {
        const anio = req.nextUrl.searchParams.get('anio');
        if (!anio) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'anio es requerido (ej: 2026)'
            }, {
                status: 400
            });
        }
        const gradoNombre = req.nextUrl.searchParams.get('grado'); // opcional
        const seccion = req.nextUrl.searchParams.get('seccion'); // opcional
        // Obtener todos los ciclos del año
        const ciclosDelAnio = await prisma.ciclo.findMany({
            where: {
                nombre: {
                    contains: anio
                }
            }
        });
        if (ciclosDelAnio.length === 0) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: `No hay ciclos para el año ${anio}`
            }, {
                status: 404
            });
        }
        const cicloIds = ciclosDelAnio.map((c)=>c.id);
        // Construir where clause dinámico
        const whereClause = {
            cicloId: {
                in: cicloIds
            }
        };
        if (gradoNombre) {
            whereClause.nombre = gradoNombre;
        }
        if (seccion) {
            whereClause.seccion = seccion;
        }
        // Obtener grados (con filtros si existen)
        const grados = await prisma.grado.findMany({
            where: whereClause,
            include: {
                estudiantes: {
                    include: {
                        estudiante: {
                            select: {
                                id: true,
                                name: true,
                                documentNumber: true,
                                maxGradoAlcanzadoId: true
                            }
                        }
                    }
                }
            }
        });
        // Construir lista de estudiantes con sus promedios del año completo
        const estudiantesMap = new Map();
        for (const grado of grados){
            for (const matricula of grado.estudiantes){
                const estudiante = matricula.estudiante;
                const key = estudiante.id;
                if (!estudiantesMap.has(key)) {
                    // Calcular promedio general del estudiante para TODOS los ciclos del año
                    const notasDetalles = await prisma.notaDetalle.findMany({
                        where: {
                            estudianteId: estudiante.id,
                            periodo: {
                                cicloId: {
                                    in: cicloIds
                                }
                            }
                        }
                    });
                    // Calcular promedio ponderado general del año completo
                    let promedioGeneral = 0;
                    if (notasDetalles.length > 0) {
                        const totalPeso = notasDetalles.reduce((sum, n)=>sum + n.peso, 0);
                        const sumaValoresPeso = notasDetalles.reduce((sum, n)=>sum + n.valor * n.peso, 0);
                        promedioGeneral = totalPeso > 0 ? sumaValoresPeso / totalPeso / 100 : 0;
                    }
                    estudiantesMap.set(key, {
                        estudianteId: estudiante.id,
                        nombre: estudiante.name || 'Sin nombre',
                        documento: estudiante.documentNumber || 'N/A',
                        gradoActual: {
                            id: grado.id,
                            nombre: grado.nombre,
                            seccion: grado.seccion
                        },
                        promedioGeneral: parseFloat(promedioGeneral.toFixed(2)),
                        maxGradoAlcanzadoId: estudiante.maxGradoAlcanzadoId
                    });
                }
            }
        }
        const estudiantes = Array.from(estudiantesMap.values());
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(estudiantes);
    } catch (error) {
        console.error('Error en GET /api/admin/promocion:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Error al obtener estudiantes para promoción'
        }, {
            status: 500
        });
    }
}
async function POST(req) {
    try {
        const { estudianteId, accion } = await req.json();
        if (!estudianteId || typeof estudianteId !== 'number') {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'estudianteId inválido'
            }, {
                status: 400
            });
        }
        if (accion !== 'paso' && accion !== 'perdio') {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'accion debe ser "paso" o "perdio"'
            }, {
                status: 400
            });
        }
        // Obtener el estudiante
        const estudiante = await prisma.user.findUnique({
            where: {
                id: estudianteId
            },
            include: {
                estudianteGrados: {
                    include: {
                        grado: {
                            include: {
                                ciclo: true
                            }
                        }
                    }
                }
            }
        });
        if (!estudiante) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Estudiante no encontrado'
            }, {
                status: 404
            });
        }
        if (estudiante.role !== 'STUDENT') {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'El usuario no es estudiante'
            }, {
                status: 400
            });
        }
        // Obtener el grado actual
        if (estudiante.estudianteGrados.length === 0) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Estudiante no está matriculado en ningún grado'
            }, {
                status: 400
            });
        }
        const gradoActual = estudiante.estudianteGrados[0].grado;
        if (accion === 'paso') {
            // Obtener el siguiente grado (mismo ciclo, número superior)
            const siguienteGrado = await prisma.grado.findFirst({
                where: {
                    cicloId: gradoActual.cicloId,
                    id: {
                        gt: gradoActual.id
                    }
                },
                orderBy: {
                    id: 'asc'
                }
            });
            if (!siguienteGrado) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: 'No existe grado superior en este ciclo'
                }, {
                    status: 400
                });
            }
            // Desmatricular del grado actual
            await prisma.gradoEstudiante.deleteMany({
                where: {
                    estudianteId,
                    gradoId: gradoActual.id
                }
            });
            // Matricular en el siguiente grado (sin sección)
            // Buscar grado sin sección (sección vacía)
            const gradoSinSeccion = await prisma.grado.findFirst({
                where: {
                    id: siguienteGrado.id,
                    seccion: ''
                }
            });
            if (!gradoSinSeccion) {
                // Si no existe, crear uno o usar el existente
                // Por ahora, usamos el siguiente grado encontrado
                await prisma.gradoEstudiante.create({
                    data: {
                        estudianteId,
                        gradoId: siguienteGrado.id
                    }
                });
            } else {
                await prisma.gradoEstudiante.create({
                    data: {
                        estudianteId,
                        gradoId: gradoSinSeccion.id
                    }
                });
            }
            // Actualizar maxGradoAlcanzadoId
            await prisma.user.update({
                where: {
                    id: estudianteId
                },
                data: {
                    maxGradoAlcanzadoId: siguienteGrado.id
                }
            });
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                ok: true,
                mensaje: `Estudiante promovido a ${siguienteGrado.nombre}`
            });
        } else if (accion === 'perdio') {
            // El estudiante se queda en el mismo grado (sin cambios en la matrícula)
            // Podría limpiar notas o marcar algo, pero por ahora solo confirmamos
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                ok: true,
                mensaje: `Estudiante permanecerá en ${gradoActual.nombre}`
            });
        }
    } catch (error) {
        console.error('Error en POST /api/admin/promocion:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Error al procesar promoción'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0f930adc._.js.map