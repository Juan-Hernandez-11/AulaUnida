module.exports = [
"[project]/.next-internal/server/app/api/admin/grados/route/actions.js [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__, module, exports) => {

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
"[project]/src/app/api/admin/grados/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
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
        const grados = await prisma.grado.findMany({
            select: {
                id: true,
                nombre: true,
                seccion: true
            },
            orderBy: {
                nombre: 'asc'
            }
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(grados);
    } catch (error) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Error al obtener grados'
        }, {
            status: 500
        });
    }
}
async function POST(request) {
    try {
        const { nombre, seccion, sedeId, cicloId, aulaId } = await request.json();
        if (typeof nombre !== 'string' || !nombre.trim() || typeof seccion !== 'string' || !seccion.trim() || typeof sedeId !== 'number' || isNaN(sedeId) || typeof cicloId !== 'number' || isNaN(cicloId)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Faltan campos obligatorios o tipos incorrectos'
            }, {
                status: 400
            });
        }
        // Validar existencia de sede
        const sede = await prisma.sede.findUnique({
            where: {
                id: sedeId
            }
        });
        if (!sede) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'La sede especificada no existe'
            }, {
                status: 400
            });
        }
        // Validar existencia de ciclo
        const ciclo = await prisma.ciclo.findUnique({
            where: {
                id: cicloId
            }
        });
        if (!ciclo) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'El ciclo especificado no existe'
            }, {
                status: 400
            });
        }
        // Validar existencia de aula si se envía
        let aula = null;
        if (aulaId !== undefined && aulaId !== null) {
            if (typeof aulaId !== 'number' || isNaN(aulaId)) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: 'El aulaId debe ser un número válido'
                }, {
                    status: 400
                });
            }
            aula = await prisma.aula.findUnique({
                where: {
                    id: aulaId
                }
            });
            if (!aula) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: 'El aula especificada no existe'
                }, {
                    status: 400
                });
            }
        }
        // Validar unicidad de nombre+seccion+sede+ciclo
        const existe = await prisma.grado.findFirst({
            where: {
                nombre: nombre.trim(),
                seccion: seccion.trim(),
                sedeId,
                cicloId
            }
        });
        if (existe) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Ya existe un grado con ese nombre, sección, sede y ciclo.'
            }, {
                status: 409
            });
        }
        const grado = await prisma.grado.create({
            data: {
                nombre: nombre.trim(),
                seccion: seccion.trim(),
                sedeId,
                cicloId,
                aulaId: aulaId ?? undefined
            },
            select: {
                id: true,
                nombre: true,
                seccion: true
            }
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(grado);
    } catch (error) {
        if (error.code && error.code.startsWith('P')) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Error de base de datos: ' + error.message
            }, {
                status: 500
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Error al crear grado'
        }, {
            status: 500
        });
    }
}
async function PUT(request) {
    try {
        const { id, nombre, seccion, sedeId, cicloId, aulaId } = await request.json();
        if (typeof id !== 'number' || isNaN(id) || typeof nombre !== 'string' || !nombre.trim() || typeof seccion !== 'string' || !seccion.trim() || typeof sedeId !== 'number' || isNaN(sedeId) || typeof cicloId !== 'number' || isNaN(cicloId)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Faltan campos obligatorios o tipos incorrectos'
            }, {
                status: 400
            });
        }
        // Validar existencia de sede
        const sede = await prisma.sede.findUnique({
            where: {
                id: sedeId
            }
        });
        if (!sede) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'La sede especificada no existe'
            }, {
                status: 400
            });
        }
        // Validar existencia de ciclo
        const ciclo = await prisma.ciclo.findUnique({
            where: {
                id: cicloId
            }
        });
        if (!ciclo) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'El ciclo especificado no existe'
            }, {
                status: 400
            });
        }
        // Validar existencia de aula si se envía
        let aula = null;
        if (aulaId !== undefined && aulaId !== null) {
            if (typeof aulaId !== 'number' || isNaN(aulaId)) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: 'El aulaId debe ser un número válido'
                }, {
                    status: 400
                });
            }
            aula = await prisma.aula.findUnique({
                where: {
                    id: aulaId
                }
            });
            if (!aula) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: 'El aula especificada no existe'
                }, {
                    status: 400
                });
            }
        }
        // Validar unicidad de nombre+seccion+sede+ciclo (excluyendo el propio grado)
        const existe = await prisma.grado.findFirst({
            where: {
                nombre: nombre.trim(),
                seccion: seccion.trim(),
                sedeId,
                cicloId,
                NOT: {
                    id
                }
            }
        });
        if (existe) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Ya existe un grado con ese nombre, sección, sede y ciclo.'
            }, {
                status: 409
            });
        }
        const grado = await prisma.grado.update({
            where: {
                id
            },
            data: {
                nombre: nombre.trim(),
                seccion: seccion.trim(),
                sedeId,
                cicloId,
                aulaId: aulaId ?? undefined
            },
            select: {
                id: true,
                nombre: true,
                seccion: true
            }
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(grado);
    } catch (error) {
        if (error.code && error.code.startsWith('P')) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Error de base de datos: ' + error.message
            }, {
                status: 500
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Error al editar grado'
        }, {
            status: 500
        });
    }
}
async function DELETE(request) {
    try {
        const { id } = await request.json();
        if (typeof id !== 'number' || isNaN(id)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Falta el id o el id no es válido'
            }, {
                status: 400
            });
        }
        await prisma.grado.delete({
            where: {
                id
            }
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true
        });
    } catch (error) {
        if (error.code && error.code.startsWith('P')) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Error de base de datos: ' + error.message
            }, {
                status: 500
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Error al eliminar grado'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__27d44507._.js.map