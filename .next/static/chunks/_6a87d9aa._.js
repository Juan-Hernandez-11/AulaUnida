(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/styles/admin-dashboard.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "activityAction": "admin-dashboard-module__5BnUYq__activityAction",
  "activityCard": "admin-dashboard-module__5BnUYq__activityCard",
  "activityDate": "admin-dashboard-module__5BnUYq__activityDate",
  "activityTable": "admin-dashboard-module__5BnUYq__activityTable",
  "activityTitle": "admin-dashboard-module__5BnUYq__activityTitle",
  "activityUser": "admin-dashboard-module__5BnUYq__activityUser",
  "avatar": "admin-dashboard-module__5BnUYq__avatar",
  "card": "admin-dashboard-module__5BnUYq__card",
  "dashboardContainer": "admin-dashboard-module__5BnUYq__dashboardContainer",
  "logo": "admin-dashboard-module__5BnUYq__logo",
  "logoutBtn": "admin-dashboard-module__5BnUYq__logoutBtn",
  "mainContent": "admin-dashboard-module__5BnUYq__mainContent",
  "menu": "admin-dashboard-module__5BnUYq__menu",
  "menuItem": "admin-dashboard-module__5BnUYq__menuItem",
  "menuItemActive": "admin-dashboard-module__5BnUYq__menuItemActive",
  "metricCard": "admin-dashboard-module__5BnUYq__metricCard",
  "metricLabel": "admin-dashboard-module__5BnUYq__metricLabel",
  "metricValue": "admin-dashboard-module__5BnUYq__metricValue",
  "metricsGrid": "admin-dashboard-module__5BnUYq__metricsGrid",
  "primaryBtn": "admin-dashboard-module__5BnUYq__primaryBtn",
  "quickAccessBtn": "admin-dashboard-module__5BnUYq__quickAccessBtn",
  "quickAccessCard": "admin-dashboard-module__5BnUYq__quickAccessCard",
  "sidebar": "admin-dashboard-module__5BnUYq__sidebar",
  "spin": "admin-dashboard-module__5BnUYq__spin",
  "subtitle": "admin-dashboard-module__5BnUYq__subtitle",
  "title": "admin-dashboard-module__5BnUYq__title",
});
}),
"[project]/src/app/docente/tareas/[id]/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>VerEntregasPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$authContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/authContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module '@heroicons/react/24/outline'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$admin$2d$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/styles/admin-dashboard.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
const COLORS = {
    primary: '#10b981',
    secondary: '#06b6d4',
    accent: '#f59e0b',
    danger: '#ef4444',
    success: '#10b981',
    warning: '#f59e0b',
    bg: '#0f0f0f',
    surface: '#1b1b1b',
    text: '#ffffff',
    textMuted: '#9ca3af'
};
function VerEntregasPage() {
    var _entregaSeleccionada_calificacion;
    _s();
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$authContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const tareaId = params.id;
    const [tarea, setTarea] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [entregas, setEntregas] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [estudiantes, setEstudiantes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [modalOpen, setModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [modalEntregaOpen, setModalEntregaOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [entregaSeleccionada, setEntregaSeleccionada] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [modalData, setModalData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        entregaId: 0,
        estudiante: '',
        calificacion: 0,
        retroalimentacion: ''
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "VerEntregasPage.useEffect": ()=>{
            if (!user || !tareaId) return;
            loadTareaAndEntregas();
        }
    }["VerEntregasPage.useEffect"], [
        user,
        tareaId
    ]);
    const loadTareaAndEntregas = async ()=>{
        try {
            setLoading(true);
            const idToken = await (user === null || user === void 0 ? void 0 : user.getIdToken());
            let tareaEncontrada = null;
            let entregasData = [];
            // Cargar tarea y entregas
            const response = await fetch("/api/docente/tareas?tareaId=".concat(tareaId), {
                headers: {
                    Authorization: "Bearer ".concat(idToken)
                }
            });
            if (response.ok) {
                const data = await response.json();
                const tareasEncontradas = data.tareas || [];
                tareaEncontrada = tareasEncontradas.find((t)=>t.id === parseInt(tareaId));
                if (tareaEncontrada) {
                    entregasData = tareaEncontrada.entregas || [];
                    setTarea(tareaEncontrada);
                    setEntregas(entregasData);
                } else {
                    setError('Tarea no encontrada');
                }
            } else {
                setError('Error al cargar tarea');
            }
            // Cargar estudiantes del grado
            if (tareaEncontrada) {
                const responseEstudiantes = await fetch("/api/docente/tareas/".concat(tareaId, "/estudiantes"), {
                    headers: {
                        Authorization: "Bearer ".concat(idToken)
                    }
                });
                if (responseEstudiantes.ok) {
                    const dataEst = await responseEstudiantes.json();
                    const entregasMap = new Map(entregasData.map((e)=>[
                            e.estudianteId,
                            e
                        ]));
                    const estudiantesConEntrega = (dataEst.estudiantes || []).map((est)=>({
                            ...est,
                            entrega: entregasMap.get(est.id)
                        }));
                    setEstudiantes(estudiantesConEntrega);
                }
            }
        } catch (err) {
            console.error('Error cargando tarea:', err);
            setError('Error al cargar tarea');
        } finally{
            setLoading(false);
        }
    };
    const handleCalificar = (entrega)=>{
        var _entrega_calificacion, _entrega_calificacion1;
        setModalData({
            entregaId: entrega.id,
            estudiante: entrega.estudiante.name,
            calificacion: ((_entrega_calificacion = entrega.calificacion) === null || _entrega_calificacion === void 0 ? void 0 : _entrega_calificacion.valor) || 0,
            retroalimentacion: ((_entrega_calificacion1 = entrega.calificacion) === null || _entrega_calificacion1 === void 0 ? void 0 : _entrega_calificacion1.retroalimentacion) || ''
        });
        setModalOpen(true);
    };
    const handleVerEntrega = (entrega)=>{
        setEntregaSeleccionada(entrega);
        setModalEntregaOpen(true);
    };
    const handleGuardarCalificacion = async ()=>{
        try {
            const idToken = await (user === null || user === void 0 ? void 0 : user.getIdToken());
            const response = await fetch("/api/docente/entregas/calificar", {
                method: 'POST',
                headers: {
                    Authorization: "Bearer ".concat(idToken),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    entregaId: modalData.entregaId,
                    calificacion: parseFloat(String(modalData.calificacion)),
                    retroalimentacion: modalData.retroalimentacion
                })
            });
            if (response.ok) {
                setModalOpen(false);
                await loadTareaAndEntregas();
            } else {
                setError('Error al guardar calificación');
            }
        } catch (err) {
            console.error('Error guardando calificación:', err);
            setError('Error al guardar calificación');
        }
    };
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$admin$2d$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].dashboardContainer,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$admin$2d$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].mainContent,
                style: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        color: COLORS.textMuted,
                        fontSize: '1.125rem'
                    },
                    children: "⏳ Cargando..."
                }, void 0, false, {
                    fileName: "[project]/src/app/docente/tareas/[id]/page.tsx",
                    lineNumber: 189,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/docente/tareas/[id]/page.tsx",
                lineNumber: 188,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/docente/tareas/[id]/page.tsx",
            lineNumber: 187,
            columnNumber: 7
        }, this);
    }
    if (!tarea) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$admin$2d$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].dashboardContainer,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$admin$2d$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].mainContent,
                style: {
                    padding: '2rem'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>router.back(),
                        style: {
                            padding: '8px 16px',
                            backgroundColor: COLORS.primary,
                            color: COLORS.bg,
                            border: 'none',
                            borderRadius: '0.5rem',
                            cursor: 'pointer',
                            marginBottom: '2rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ArrowLeftIcon, {
                                style: {
                                    width: 20,
                                    height: 20
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/app/docente/tareas/[id]/page.tsx",
                                lineNumber: 214,
                                columnNumber: 13
                            }, this),
                            "Volver"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/docente/tareas/[id]/page.tsx",
                        lineNumber: 199,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            color: COLORS.danger
                        },
                        children: [
                            "❌ ",
                            error || 'Tarea no encontrada'
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/docente/tareas/[id]/page.tsx",
                        lineNumber: 217,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/docente/tareas/[id]/page.tsx",
                lineNumber: 198,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/docente/tareas/[id]/page.tsx",
            lineNumber: 197,
            columnNumber: 7
        }, this);
    }
    const entregadas = entregas.filter((e)=>e.estado === 'entregada').length;
    const noEntregadas = estudiantes.length - entregadas;
    const conCalificacion = entregas.filter((e)=>e.calificacion).length;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$admin$2d$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].dashboardContainer,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$admin$2d$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].mainContent,
                style: {
                    padding: '2rem'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>router.back(),
                        style: {
                            padding: '8px 16px',
                            backgroundColor: COLORS.primary,
                            color: COLORS.bg,
                            border: 'none',
                            borderRadius: '0.5rem',
                            cursor: 'pointer',
                            marginBottom: '2rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            transition: 'all 0.3s ease'
                        },
                        onMouseEnter: (e)=>{
                            e.currentTarget.style.transform = 'scale(1.05)';
                        },
                        onMouseLeave: (e)=>{
                            e.currentTarget.style.transform = 'scale(1)';
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ArrowLeftIcon, {
                                style: {
                                    width: 20,
                                    height: 20
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/app/docente/tareas/[id]/page.tsx",
                                lineNumber: 253,
                                columnNumber: 11
                            }, this),
                            "Volver a Tareas"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/docente/tareas/[id]/page.tsx",
                        lineNumber: 231,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            backgroundColor: COLORS.surface,
                            border: "1px solid ".concat(COLORS.primary, "20"),
                            padding: '2rem',
                            borderRadius: '0.75rem',
                            marginBottom: '2rem'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                style: {
                                    margin: 0,
                                    color: COLORS.text,
                                    marginBottom: '0.5rem',
                                    fontSize: '2rem'
                                },
                                children: tarea.titulo
                            }, void 0, false, {
                                fileName: "[project]/src/app/docente/tareas/[id]/page.tsx",
                                lineNumber: 267,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    margin: '0.5rem 0 1.5rem 0',
                                    color: COLORS.textMuted
                                },
                                children: tarea.descripcion
                            }, void 0, false, {
                                fileName: "[project]/src/app/docente/tareas/[id]/page.tsx",
                                lineNumber: 270,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                                    gap: '1rem',
                                    marginBottom: '2rem'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            backgroundColor: "".concat(COLORS.success, "20"),
                                            border: "1px solid ".concat(COLORS.success),
                                            padding: '1rem',
                                            borderRadius: '0.5rem',
                                            textAlign: 'center'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: '2rem',
                                                    fontWeight: 700,
                                                    color: COLORS.success
                                                },
                                                children: entregadas
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/docente/tareas/[id]/page.tsx",
                                                lineNumber: 292,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: '0.875rem',
                                                    color: COLORS.textMuted
                                                },
                                                children: "Entregadas"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/docente/tareas/[id]/page.tsx",
                                                lineNumber: 295,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/docente/tareas/[id]/page.tsx",
                                        lineNumber: 283,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            backgroundColor: "".concat(COLORS.warning, "20"),
                                            border: "1px solid ".concat(COLORS.warning),
                                            padding: '1rem',
                                            borderRadius: '0.5rem',
                                            textAlign: 'center'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: '2rem',
                                                    fontWeight: 700,
                                                    color: COLORS.warning
                                                },
                                                children: noEntregadas
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/docente/tareas/[id]/page.tsx",
                                                lineNumber: 309,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: '0.875rem',
                                                    color: COLORS.textMuted
                                                },
                                                children: "Pendientes"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/docente/tareas/[id]/page.tsx",
                                                lineNumber: 312,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/docente/tareas/[id]/page.tsx",
                                        lineNumber: 300,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            backgroundColor: "".concat(COLORS.secondary, "20"),
                                            border: "1px solid ".concat(COLORS.secondary),
                                            padding: '1rem',
                                            borderRadius: '0.5rem',
                                            textAlign: 'center'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: '2rem',
                                                    fontWeight: 700,
                                                    color: COLORS.secondary
                                                },
                                                children: conCalificacion
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/docente/tareas/[id]/page.tsx",
                                                lineNumber: 326,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: '0.875rem',
                                                    color: COLORS.textMuted
                                                },
                                                children: "Calificadas"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/docente/tareas/[id]/page.tsx",
                                                lineNumber: 329,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/docente/tareas/[id]/page.tsx",
                                        lineNumber: 317,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            backgroundColor: "".concat(COLORS.accent, "20"),
                                            border: "1px solid ".concat(COLORS.accent),
                                            padding: '1rem',
                                            borderRadius: '0.5rem',
                                            textAlign: 'center'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: '2rem',
                                                    fontWeight: 700,
                                                    color: COLORS.accent
                                                },
                                                children: estudiantes.length
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/docente/tareas/[id]/page.tsx",
                                                lineNumber: 343,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: '0.875rem',
                                                    color: COLORS.textMuted
                                                },
                                                children: "Total Estudiantes"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/docente/tareas/[id]/page.tsx",
                                                lineNumber: 346,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/docente/tareas/[id]/page.tsx",
                                        lineNumber: 334,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/docente/tareas/[id]/page.tsx",
                                lineNumber: 275,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 1fr',
                                    gap: '1rem'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    margin: 0,
                                                    color: COLORS.textMuted,
                                                    fontSize: '0.875rem'
                                                },
                                                children: "📅 Fecha de Entrega"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/docente/tareas/[id]/page.tsx",
                                                lineNumber: 355,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    margin: '0.5rem 0 0 0',
                                                    color: COLORS.text,
                                                    fontSize: '1rem',
                                                    fontWeight: 600
                                                },
                                                children: tarea.fechaEntrega ? new Date(tarea.fechaEntrega).toLocaleDateString('es-ES', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                }) : 'No definida'
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/docente/tareas/[id]/page.tsx",
                                                lineNumber: 358,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/docente/tareas/[id]/page.tsx",
                                        lineNumber: 354,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    margin: 0,
                                                    color: COLORS.textMuted,
                                                    fontSize: '0.875rem'
                                                },
                                                children: "⏰ Hora de Entrega"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/docente/tareas/[id]/page.tsx",
                                                lineNumber: 369,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    margin: '0.5rem 0 0 0',
                                                    color: COLORS.text,
                                                    fontSize: '1rem',
                                                    fontWeight: 600
                                                },
                                                children: tarea.horaEntrega || 'No definida'
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/docente/tareas/[id]/page.tsx",
                                                lineNumber: 372,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/docente/tareas/[id]/page.tsx",
                                        lineNumber: 368,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/docente/tareas/[id]/page.tsx",
                                lineNumber: 353,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/docente/tareas/[id]/page.tsx",
                        lineNumber: 258,
                        columnNumber: 9
                    }, this),
                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            backgroundColor: "".concat(COLORS.danger, "20"),
                            border: "1px solid ".concat(COLORS.danger),
                            color: COLORS.danger,
                            padding: '1rem',
                            borderRadius: '0.5rem',
                            marginBottom: '1.5rem'
                        },
                        children: [
                            "❌ ",
                            error
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/docente/tareas/[id]/page.tsx",
                        lineNumber: 381,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginTop: '2rem'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                style: {
                                    color: COLORS.text,
                                    marginBottom: '1.5rem',
                                    fontSize: '1.5rem'
                                },
                                children: "📋 Entregas de Estudiantes"
                            }, void 0, false, {
                                fileName: "[project]/src/app/docente/tareas/[id]/page.tsx",
                                lineNumber: 397,
                                columnNumber: 11
                            }, this),
                            estudiantes.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    backgroundColor: COLORS.surface,
                                    border: "1px dashed ".concat(COLORS.textMuted),
                                    padding: '2rem',
                                    borderRadius: '0.75rem',
                                    textAlign: 'center',
                                    color: COLORS.textMuted
                                },
                                children: "Sin estudiantes inscritos en este grado"
                            }, void 0, false, {
                                fileName: "[project]/src/app/docente/tareas/[id]/page.tsx",
                                lineNumber: 402,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'grid',
                                    gap: '1rem'
                                },
                                children: estudiantes.map((estudiante)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            backgroundColor: COLORS.surface,
                                            border: "1px solid ".concat(COLORS.primary, "20"),
                                            padding: '1.5rem',
                                            borderRadius: '0.75rem',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            transition: 'all 0.3s ease',
                                            cursor: estudiante.entrega ? 'pointer' : 'default',
                                            opacity: estudiante.entrega ? 1 : 0.7
                                        },
                                        onMouseEnter: (e)=>{
                                            if (estudiante.entrega) {
                                                e.currentTarget.style.backgroundColor = "".concat(COLORS.primary, "10");
                                                e.currentTarget.style.borderColor = "".concat(COLORS.primary, "40");
                                            }
                                        },
                                        onMouseLeave: (e)=>{
                                            e.currentTarget.style.backgroundColor = COLORS.surface;
                                            e.currentTarget.style.borderColor = "".concat(COLORS.primary, "20");
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    flex: 1
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '1rem',
                                                        marginBottom: '0.5rem'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                width: '48px',
                                                                height: '48px',
                                                                borderRadius: '50%',
                                                                backgroundColor: estudiante.entrega ? COLORS.success : COLORS.danger,
                                                                color: COLORS.bg,
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                fontWeight: 700,
                                                                fontSize: '1.25rem'
                                                            },
                                                            children: estudiante.entrega ? '✓' : '✗'
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/docente/tareas/[id]/page.tsx",
                                                            lineNumber: 452,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    style: {
                                                                        margin: 0,
                                                                        color: COLORS.text,
                                                                        fontWeight: 600
                                                                    },
                                                                    children: estudiante.name
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/docente/tareas/[id]/page.tsx",
                                                                    lineNumber: 469,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    style: {
                                                                        margin: '0.25rem 0 0 0',
                                                                        color: COLORS.textMuted,
                                                                        fontSize: '0.875rem'
                                                                    },
                                                                    children: estudiante.email
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/docente/tareas/[id]/page.tsx",
                                                                    lineNumber: 472,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/docente/tareas/[id]/page.tsx",
                                                            lineNumber: 468,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/docente/tareas/[id]/page.tsx",
                                                    lineNumber: 443,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/docente/tareas/[id]/page.tsx",
                                                lineNumber: 442,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    textAlign: 'right'
                                                },
                                                children: estudiante.entrega ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                marginBottom: '0.75rem'
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    style: {
                                                                        margin: 0,
                                                                        color: COLORS.success,
                                                                        fontWeight: 600,
                                                                        fontSize: '0.95rem'
                                                                    },
                                                                    children: "✓ Entregado"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/docente/tareas/[id]/page.tsx",
                                                                    lineNumber: 483,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    style: {
                                                                        margin: '0.25rem 0 0 0',
                                                                        color: COLORS.textMuted,
                                                                        fontSize: '0.8rem'
                                                                    },
                                                                    children: new Date(estudiante.entrega.entregadaAt).toLocaleDateString('es-ES')
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/docente/tareas/[id]/page.tsx",
                                                                    lineNumber: 486,
                                                                    columnNumber: 27
                                                                }, this),
                                                                estudiante.entrega.calificacion && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    style: {
                                                                        margin: '0.25rem 0 0 0',
                                                                        color: COLORS.secondary,
                                                                        fontSize: '0.85rem',
                                                                        fontWeight: 600
                                                                    },
                                                                    children: [
                                                                        "⭐ ",
                                                                        estudiante.entrega.calificacion.valor,
                                                                        "/5.0"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/docente/tareas/[id]/page.tsx",
                                                                    lineNumber: 490,
                                                                    columnNumber: 29
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/docente/tareas/[id]/page.tsx",
                                                            lineNumber: 482,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                display: 'flex',
                                                                gap: '0.5rem'
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>handleVerEntrega(estudiante.entrega),
                                                                    style: {
                                                                        padding: '8px 16px',
                                                                        backgroundColor: COLORS.secondary,
                                                                        color: COLORS.bg,
                                                                        border: 'none',
                                                                        borderRadius: '0.5rem',
                                                                        cursor: 'pointer',
                                                                        fontWeight: 600,
                                                                        fontSize: '0.875rem',
                                                                        transition: 'all 0.3s ease',
                                                                        flex: 1
                                                                    },
                                                                    onMouseEnter: (e)=>{
                                                                        e.currentTarget.style.transform = 'scale(1.05)';
                                                                    },
                                                                    onMouseLeave: (e)=>{
                                                                        e.currentTarget.style.transform = 'scale(1)';
                                                                    },
                                                                    children: "👁️ Ver"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/docente/tareas/[id]/page.tsx",
                                                                    lineNumber: 496,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>handleCalificar(estudiante.entrega),
                                                                    style: {
                                                                        padding: '8px 16px',
                                                                        backgroundColor: estudiante.entrega.calificacion ? COLORS.secondary : COLORS.accent,
                                                                        color: COLORS.bg,
                                                                        border: 'none',
                                                                        borderRadius: '0.5rem',
                                                                        cursor: 'pointer',
                                                                        fontWeight: 600,
                                                                        fontSize: '0.875rem',
                                                                        transition: 'all 0.3s ease',
                                                                        flex: 1
                                                                    },
                                                                    onMouseEnter: (e)=>{
                                                                        e.currentTarget.style.transform = 'scale(1.05)';
                                                                    },
                                                                    onMouseLeave: (e)=>{
                                                                        e.currentTarget.style.transform = 'scale(1)';
                                                                    },
                                                                    children: estudiante.entrega.calificacion ? '✏️ Editar' : '⭐ Calificar'
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/docente/tareas/[id]/page.tsx",
                                                                    lineNumber: 519,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/docente/tareas/[id]/page.tsx",
                                                            lineNumber: 495,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            style: {
                                                                margin: 0,
                                                                color: COLORS.danger,
                                                                fontWeight: 600,
                                                                fontSize: '0.95rem'
                                                            },
                                                            children: "✗ Pendiente"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/docente/tareas/[id]/page.tsx",
                                                            lineNumber: 546,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            style: {
                                                                margin: '0.25rem 0 0 0',
                                                                color: COLORS.textMuted,
                                                                fontSize: '0.8rem'
                                                            },
                                                            children: "Sin entregar"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/docente/tareas/[id]/page.tsx",
                                                            lineNumber: 549,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/docente/tareas/[id]/page.tsx",
                                                lineNumber: 479,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, estudiante.id, true, {
                                        fileName: "[project]/src/app/docente/tareas/[id]/page.tsx",
                                        lineNumber: 417,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/app/docente/tareas/[id]/page.tsx",
                                lineNumber: 415,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/docente/tareas/[id]/page.tsx",
                        lineNumber: 396,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/docente/tareas/[id]/page.tsx",
                lineNumber: 229,
                columnNumber: 7
            }, this),
            modalOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        backgroundColor: COLORS.surface,
                        border: "1px solid ".concat(COLORS.primary, "20"),
                        padding: '2rem',
                        borderRadius: '0.75rem',
                        maxWidth: '600px',
                        width: '90%',
                        maxHeight: '90vh',
                        overflow: 'auto'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            style: {
                                marginTop: 0,
                                color: COLORS.text,
                                marginBottom: '1.5rem'
                            },
                            children: [
                                "⭐ Calificar a ",
                                modalData.estudiante
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/docente/tareas/[id]/page.tsx",
                            lineNumber: 590,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                marginBottom: '1.5rem'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    style: {
                                        display: 'block',
                                        marginBottom: '0.75rem',
                                        color: COLORS.text,
                                        fontWeight: 600
                                    },
                                    children: "Calificación (0 - 5.0) *"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/docente/tareas/[id]/page.tsx",
                                    lineNumber: 595,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "number",
                                    min: "0",
                                    max: "5",
                                    step: "0.1",
                                    value: modalData.calificacion,
                                    onChange: (e)=>setModalData({
                                            ...modalData,
                                            calificacion: parseFloat(e.target.value) || 0
                                        }),
                                    style: {
                                        width: '100%',
                                        padding: '12px',
                                        border: "1px solid ".concat(COLORS.primary, "40"),
                                        borderRadius: '0.5rem',
                                        background: COLORS.bg,
                                        color: COLORS.text,
                                        fontSize: '1rem',
                                        boxSizing: 'border-box'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/app/docente/tareas/[id]/page.tsx",
                                    lineNumber: 598,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/docente/tareas/[id]/page.tsx",
                            lineNumber: 594,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                marginBottom: '1.5rem'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    style: {
                                        display: 'block',
                                        marginBottom: '0.75rem',
                                        color: COLORS.text,
                                        fontWeight: 600
                                    },
                                    children: "Retroalimentación (opcional)"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/docente/tareas/[id]/page.tsx",
                                    lineNumber: 619,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                    value: modalData.retroalimentacion,
                                    onChange: (e)=>setModalData({
                                            ...modalData,
                                            retroalimentacion: e.target.value
                                        }),
                                    placeholder: "Escribe tu feedback para el estudiante...",
                                    style: {
                                        width: '100%',
                                        padding: '12px',
                                        border: "1px solid ".concat(COLORS.primary, "40"),
                                        borderRadius: '0.5rem',
                                        background: COLORS.bg,
                                        color: COLORS.text,
                                        fontSize: '1rem',
                                        minHeight: '150px',
                                        fontFamily: 'inherit',
                                        resize: 'vertical',
                                        boxSizing: 'border-box'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/app/docente/tareas/[id]/page.tsx",
                                    lineNumber: 622,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/docente/tareas/[id]/page.tsx",
                            lineNumber: 618,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                gap: '1rem',
                                justifyContent: 'flex-end'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setModalOpen(false),
                                    style: {
                                        padding: '12px 24px',
                                        backgroundColor: COLORS.textMuted,
                                        color: COLORS.bg,
                                        border: 'none',
                                        borderRadius: '0.5rem',
                                        cursor: 'pointer',
                                        fontWeight: 600,
                                        transition: 'all 0.3s ease'
                                    },
                                    onMouseEnter: (e)=>{
                                        e.currentTarget.style.transform = 'scale(1.05)';
                                    },
                                    onMouseLeave: (e)=>{
                                        e.currentTarget.style.transform = 'scale(1)';
                                    },
                                    children: "Cancelar"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/docente/tareas/[id]/page.tsx",
                                    lineNumber: 643,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleGuardarCalificacion,
                                    style: {
                                        padding: '12px 24px',
                                        backgroundColor: COLORS.primary,
                                        color: COLORS.bg,
                                        border: 'none',
                                        borderRadius: '0.5rem',
                                        cursor: 'pointer',
                                        fontWeight: 600,
                                        transition: 'all 0.3s ease'
                                    },
                                    onMouseEnter: (e)=>{
                                        e.currentTarget.style.transform = 'scale(1.05)';
                                    },
                                    onMouseLeave: (e)=>{
                                        e.currentTarget.style.transform = 'scale(1)';
                                    },
                                    children: "✅ Guardar Calificación"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/docente/tareas/[id]/page.tsx",
                                    lineNumber: 664,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/docente/tareas/[id]/page.tsx",
                            lineNumber: 642,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/docente/tareas/[id]/page.tsx",
                    lineNumber: 578,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/docente/tareas/[id]/page.tsx",
                lineNumber: 564,
                columnNumber: 9
            }, this),
            modalEntregaOpen && entregaSeleccionada && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        backgroundColor: COLORS.surface,
                        border: "1px solid ".concat(COLORS.primary, "20"),
                        padding: '2rem',
                        borderRadius: '0.75rem',
                        maxWidth: '600px',
                        width: '90%',
                        maxHeight: '90vh',
                        overflow: 'auto'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '1.5rem'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    style: {
                                        margin: 0,
                                        color: COLORS.text
                                    },
                                    children: [
                                        "📬 Entrega de ",
                                        entregaSeleccionada.estudiante.name
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/docente/tareas/[id]/page.tsx",
                                    lineNumber: 719,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setModalEntregaOpen(false),
                                    style: {
                                        background: 'none',
                                        border: 'none',
                                        color: COLORS.textMuted,
                                        fontSize: '1.5rem',
                                        cursor: 'pointer'
                                    },
                                    children: "✕"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/docente/tareas/[id]/page.tsx",
                                    lineNumber: 722,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/docente/tareas/[id]/page.tsx",
                            lineNumber: 718,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                backgroundColor: "".concat(COLORS.success, "20"),
                                border: "1px solid ".concat(COLORS.success),
                                padding: '1rem',
                                borderRadius: '0.5rem',
                                marginBottom: '1.5rem'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        margin: 0,
                                        color: COLORS.textMuted,
                                        fontSize: '0.875rem'
                                    },
                                    children: "📅 Fecha de Entrega"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/docente/tareas/[id]/page.tsx",
                                    lineNumber: 746,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        margin: '0.5rem 0 0 0',
                                        color: COLORS.text,
                                        fontSize: '1rem',
                                        fontWeight: 600
                                    },
                                    children: new Date(entregaSeleccionada.entregadaAt).toLocaleString('es-ES')
                                }, void 0, false, {
                                    fileName: "[project]/src/app/docente/tareas/[id]/page.tsx",
                                    lineNumber: 749,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/docente/tareas/[id]/page.tsx",
                            lineNumber: 737,
                            columnNumber: 13
                        }, this),
                        entregaSeleccionada.calificacion && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                backgroundColor: "".concat(COLORS.secondary, "20"),
                                border: "1px solid ".concat(COLORS.secondary),
                                padding: '1rem',
                                borderRadius: '0.5rem',
                                marginBottom: '1.5rem'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        margin: 0,
                                        color: COLORS.textMuted,
                                        fontSize: '0.875rem'
                                    },
                                    children: "⭐ Calificación"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/docente/tareas/[id]/page.tsx",
                                    lineNumber: 765,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        margin: '0.5rem 0 0 0',
                                        color: COLORS.text,
                                        fontSize: '1.25rem',
                                        fontWeight: 700
                                    },
                                    children: [
                                        entregaSeleccionada.calificacion.valor,
                                        " / 5.0"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/docente/tareas/[id]/page.tsx",
                                    lineNumber: 768,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/docente/tareas/[id]/page.tsx",
                            lineNumber: 756,
                            columnNumber: 15
                        }, this),
                        entregaSeleccionada.texto && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                backgroundColor: "".concat(COLORS.primary, "10"),
                                border: "1px solid ".concat(COLORS.primary, "40"),
                                padding: '1rem',
                                borderRadius: '0.5rem',
                                marginBottom: '1.5rem'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        margin: 0,
                                        color: COLORS.textMuted,
                                        fontSize: '0.875rem'
                                    },
                                    children: "📝 Mensaje del Estudiante"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/docente/tareas/[id]/page.tsx",
                                    lineNumber: 785,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        margin: '0.5rem 0 0 0',
                                        color: COLORS.text,
                                        whiteSpace: 'pre-wrap',
                                        wordBreak: 'break-word'
                                    },
                                    children: entregaSeleccionada.texto
                                }, void 0, false, {
                                    fileName: "[project]/src/app/docente/tareas/[id]/page.tsx",
                                    lineNumber: 788,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/docente/tareas/[id]/page.tsx",
                            lineNumber: 776,
                            columnNumber: 15
                        }, this),
                        ((_entregaSeleccionada_calificacion = entregaSeleccionada.calificacion) === null || _entregaSeleccionada_calificacion === void 0 ? void 0 : _entregaSeleccionada_calificacion.retroalimentacion) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                backgroundColor: "".concat(COLORS.accent, "10"),
                                border: "1px solid ".concat(COLORS.accent, "40"),
                                padding: '1rem',
                                borderRadius: '0.5rem',
                                marginBottom: '1.5rem'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        margin: 0,
                                        color: COLORS.textMuted,
                                        fontSize: '0.875rem'
                                    },
                                    children: "💬 Retroalimentación"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/docente/tareas/[id]/page.tsx",
                                    lineNumber: 805,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        margin: '0.5rem 0 0 0',
                                        color: COLORS.text,
                                        whiteSpace: 'pre-wrap',
                                        wordBreak: 'break-word'
                                    },
                                    children: entregaSeleccionada.calificacion.retroalimentacion
                                }, void 0, false, {
                                    fileName: "[project]/src/app/docente/tareas/[id]/page.tsx",
                                    lineNumber: 808,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/docente/tareas/[id]/page.tsx",
                            lineNumber: 796,
                            columnNumber: 15
                        }, this),
                        entregaSeleccionada.archivoUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                backgroundColor: "".concat(COLORS.warning, "10"),
                                border: "1px solid ".concat(COLORS.warning, "40"),
                                padding: '1rem',
                                borderRadius: '0.5rem',
                                marginBottom: '1.5rem'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        margin: 0,
                                        color: COLORS.textMuted,
                                        fontSize: '0.875rem'
                                    },
                                    children: "📎 Archivo Adjunto"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/docente/tareas/[id]/page.tsx",
                                    lineNumber: 825,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: entregaSeleccionada.archivoUrl,
                                    target: "_blank",
                                    rel: "noopener noreferrer",
                                    style: {
                                        display: 'inline-block',
                                        marginTop: '0.75rem',
                                        padding: '8px 16px',
                                        backgroundColor: COLORS.warning,
                                        color: COLORS.bg,
                                        textDecoration: 'none',
                                        borderRadius: '0.5rem',
                                        fontWeight: 600,
                                        transition: 'all 0.3s ease'
                                    },
                                    onMouseEnter: (e)=>{
                                        e.currentTarget.style.transform = 'scale(1.05)';
                                    },
                                    onMouseLeave: (e)=>{
                                        e.currentTarget.style.transform = 'scale(1)';
                                    },
                                    children: "⬇️ Descargar Archivo"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/docente/tareas/[id]/page.tsx",
                                    lineNumber: 828,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/docente/tareas/[id]/page.tsx",
                            lineNumber: 816,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                justifyContent: 'flex-end',
                                marginTop: '1.5rem'
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setModalEntregaOpen(false),
                                style: {
                                    padding: '12px 24px',
                                    backgroundColor: COLORS.primary,
                                    color: COLORS.bg,
                                    border: 'none',
                                    borderRadius: '0.5rem',
                                    cursor: 'pointer',
                                    fontWeight: 600,
                                    transition: 'all 0.3s ease'
                                },
                                onMouseEnter: (e)=>{
                                    e.currentTarget.style.transform = 'scale(1.05)';
                                },
                                onMouseLeave: (e)=>{
                                    e.currentTarget.style.transform = 'scale(1)';
                                },
                                children: "✅ Cerrar"
                            }, void 0, false, {
                                fileName: "[project]/src/app/docente/tareas/[id]/page.tsx",
                                lineNumber: 857,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/docente/tareas/[id]/page.tsx",
                            lineNumber: 856,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/docente/tareas/[id]/page.tsx",
                    lineNumber: 706,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/docente/tareas/[id]/page.tsx",
                lineNumber: 692,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/docente/tareas/[id]/page.tsx",
        lineNumber: 228,
        columnNumber: 5
    }, this);
}
_s(VerEntregasPage, "XxPVW58j0MX3MNq8YEnFKDX+3+s=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$authContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"]
    ];
});
_c = VerEntregasPage;
var _c;
__turbopack_context__.k.register(_c, "VerEntregasPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/next/navigation.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/navigation.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=_6a87d9aa._.js.map