module.exports = [
"[project]/.next-internal/server/app/api/admin/asignaturas/route/actions.js [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__, module, exports) => {

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
"[project]/src/app/api/admin/asignaturas/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DELETE",
    ()=>DELETE,
    "GET",
    ()=>GET,
    "POST",
    ()=>POST,
    "PUT",
    ()=>PUT
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs)");
;
;
const prisma = new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__["PrismaClient"]();
async function GET() {
    try {
        const materias = await prisma.materia.findMany({
            select: {
                id: true,
                nombre: true,
                area: true,
                codigo: true,
                materiaGrados: {
                    select: {
                        id: true,
                        grado: {
                            select: {
                                id: true,
                                nombre: true,
                                seccion: true
                            }
                        },
                        materiaGradoDocentes: {
                            select: {
                                id: true,
                                docente: {
                                    select: {
                                        id: true,
                                        name: true
                                    }
                                },
                                periodo: {
                                    select: {
                                        id: true,
                                        nombre: true
                                    }
                                }
                            }
                        }
                    }
                }
            },
            orderBy: {
                nombre: 'asc'
            }
        });
        // Formatear para frontend: grados y docentes por grado
        const result = materias.map((m)=>({
                id: m.id,
                nombre: m.nombre,
                area: m.area,
                codigo: m.codigo,
                grados: m.materiaGrados.map((mg)=>({
                        id: mg.grado.id,
                        nombre: mg.grado.nombre,
                        seccion: mg.grado.seccion,
                        docentes: mg.materiaGradoDocentes.map((mgd)=>({
                                id: mgd.docente.id,
                                name: mgd.docente.name,
                                periodo: mgd.periodo ? {
                                    id: mgd.periodo.id,
                                    nombre: mgd.periodo.nombre
                                } : null
                            }))
                    }))
            }));
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(result);
    } catch (error) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Error al obtener asignaturas'
        }, {
            status: 500
        });
    }
}
async function POST(request) {
    try {
        const { nombre, area, codigo, gradoIds, asignaciones } = await request.json();
        if (!nombre || !area || !codigo || !Array.isArray(gradoIds) || gradoIds.length === 0) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Faltan campos obligatorios'
            }, {
                status: 400
            });
        }
        // Crear materia y grados
        const materia = await prisma.materia.create({
            data: {
                nombre,
                area,
                codigo,
                materiaGrados: {
                    create: gradoIds.map((gradoId)=>({
                            grado: {
                                connect: {
                                    id: gradoId
                                }
                            }
                        }))
                }
            },
            include: {
                materiaGrados: {
                    select: {
                        id: true,
                        grado: {
                            select: {
                                id: true,
                                nombre: true,
                                seccion: true
                            }
                        },
                        materiaGradoDocentes: true
                    }
                }
            }
        });
        // Asignar docentes por grado y periodo
        if (Array.isArray(asignaciones)) {
            for (const asig of asignaciones){
                // Buscar el id de MateriaGrado para el grado
                const mg = materia.materiaGrados.find((mg)=>mg.grado.id === asig.gradoId);
                if (mg) {
                    await prisma.materiaGradoDocente.create({
                        data: {
                            materiaGradoId: mg.id,
                            docenteId: asig.docenteId,
                            periodoId: asig.periodoId || null
                        }
                    });
                }
            }
        }
        // Obtener materia con grados y docentes
        const materiaFull = await prisma.materia.findUnique({
            where: {
                id: materia.id
            },
            select: {
                id: true,
                nombre: true,
                area: true,
                codigo: true,
                materiaGrados: {
                    select: {
                        id: true,
                        grado: {
                            select: {
                                id: true,
                                nombre: true,
                                seccion: true
                            }
                        },
                        materiaGradoDocentes: {
                            select: {
                                docente: {
                                    select: {
                                        id: true,
                                        name: true
                                    }
                                },
                                periodo: {
                                    select: {
                                        id: true,
                                        nombre: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(materiaFull);
    } catch (error) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Error al crear asignatura'
        }, {
            status: 500
        });
    }
}
async function PUT(request) {
    try {
        const { id, nombre, area, codigo, gradoIds, asignaciones } = await request.json();
        if (!id || !nombre || !area || !codigo || !Array.isArray(gradoIds) || gradoIds.length === 0) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Faltan campos obligatorios'
            }, {
                status: 400
            });
        }
        // Actualizar materia
        const materia = await prisma.materia.update({
            where: {
                id: Number(id)
            },
            data: {
                nombre,
                area,
                codigo
            }
        });
        // Actualizar grados asociados (MateriaGrado)
        await prisma.materiaGrado.deleteMany({
            where: {
                materiaId: materia.id
            }
        });
        const nuevosMG = await Promise.all(gradoIds.map(async (gradoId)=>{
            return await prisma.materiaGrado.create({
                data: {
                    materiaId: materia.id,
                    gradoId
                }
            });
        }));
        // Limpiar asignaciones previas de docentes
        for (const mg of nuevosMG){
            await prisma.materiaGradoDocente.deleteMany({
                where: {
                    materiaGradoId: mg.id
                }
            });
        }
        // Asignar docentes por grado y periodo
        if (Array.isArray(asignaciones)) {
            for (const asig of asignaciones){
                const mg = nuevosMG.find((mg)=>mg.gradoId === asig.gradoId);
                if (mg) {
                    await prisma.materiaGradoDocente.create({
                        data: {
                            materiaGradoId: mg.id,
                            docenteId: asig.docenteId,
                            periodoId: asig.periodoId || null
                        }
                    });
                }
            }
        }
        // Obtener materia actualizada con grados y docentes
        const materiaFull = await prisma.materia.findUnique({
            where: {
                id: materia.id
            },
            select: {
                id: true,
                nombre: true,
                area: true,
                codigo: true,
                materiaGrados: {
                    select: {
                        id: true,
                        grado: {
                            select: {
                                id: true,
                                nombre: true,
                                seccion: true
                            }
                        },
                        materiaGradoDocentes: {
                            select: {
                                docente: {
                                    select: {
                                        id: true,
                                        name: true
                                    }
                                },
                                periodo: {
                                    select: {
                                        id: true,
                                        nombre: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(materiaFull);
    } catch (error) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Error al editar asignatura'
        }, {
            status: 500
        });
    }
}
async function DELETE(request) {
    try {
        const { id } = await request.json();
        if (!id) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Falta el id'
            }, {
                status: 400
            });
        }
        await prisma.materiaGrado.deleteMany({
            where: {
                materiaId: Number(id)
            }
        });
        await prisma.materiaDocente.deleteMany({
            where: {
                materiaId: Number(id)
            }
        });
        await prisma.materia.delete({
            where: {
                id: Number(id)
            }
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true
        });
    } catch (error) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Error al eliminar asignatura'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__bc1bb1aa._.js.map