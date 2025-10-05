(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/styles/admin-horarios.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "fadeInBlock": "admin-horarios-module__y66LRG__fadeInBlock",
  "horarioCell": "admin-horarios-module__y66LRG__horarioCell",
  "horarioCellDroppable": "admin-horarios-module__y66LRG__horarioCellDroppable",
  "horarioContainer": "admin-horarios-module__y66LRG__horarioContainer",
  "horarioGrid": "admin-horarios-module__y66LRG__horarioGrid",
  "horarioHeader": "admin-horarios-module__y66LRG__horarioHeader",
  "horarioMateria": "admin-horarios-module__y66LRG__horarioMateria",
  "horarioRowLabel": "admin-horarios-module__y66LRG__horarioRowLabel",
  "materiaDraggable": "admin-horarios-module__y66LRG__materiaDraggable",
  "removeBtn": "admin-horarios-module__y66LRG__removeBtn",
  "selectModern": "admin-horarios-module__y66LRG__selectModern",
});
}),
"[project]/src/app/docente/notas/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DocenteNotasPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$authContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/authContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$admin$2d$horarios$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/styles/admin-horarios.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function DocenteNotasPage() {
    _s();
    const [asignaciones, setAsignaciones] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$authContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const [selected, setSelected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [estudiantes, setEstudiantes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [periodos, setPeriodos] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [periodoId, setPeriodoId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [notas, setNotas] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [saving, setSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [msg, setMsg] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    // Cargar asignaciones del docente
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DocenteNotasPage.useEffect": ()=>{
            if (!user) return;
            user.getIdToken().then({
                "DocenteNotasPage.useEffect": (idToken)=>{
                    fetch("/api/docente/asignaciones", {
                        headers: {
                            Authorization: "Bearer ".concat(idToken)
                        }
                    }).then({
                        "DocenteNotasPage.useEffect": (r)=>r.json()
                    }["DocenteNotasPage.useEffect"]).then({
                        "DocenteNotasPage.useEffect": (data)=>{
                            setAsignaciones(Array.isArray(data) ? data : []);
                        }
                    }["DocenteNotasPage.useEffect"]);
                }
            }["DocenteNotasPage.useEffect"]);
        }
    }["DocenteNotasPage.useEffect"], [
        user
    ]);
    // Cargar estudiantes y periodos al seleccionar grupo/materia
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DocenteNotasPage.useEffect": ()=>{
            if (selected) {
                fetch("/api/docente/estudiantes?gradoId=".concat(selected.gradoId, "&materiaId=").concat(selected.materiaId)).then({
                    "DocenteNotasPage.useEffect": (r)=>r.json()
                }["DocenteNotasPage.useEffect"]).then(setEstudiantes);
                fetch("/api/admin/periodos?cicloId=".concat(selected.cicloId)).then({
                    "DocenteNotasPage.useEffect": (r)=>r.json()
                }["DocenteNotasPage.useEffect"]).then(setPeriodos);
            } else {
                setEstudiantes([]);
                setPeriodos([]);
            }
        }
    }["DocenteNotasPage.useEffect"], [
        selected
    ]);
    // Cargar notas existentes al seleccionar grupo/materia y periodo
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DocenteNotasPage.useEffect": ()=>{
            if (selected && periodoId && user) {
                const fetchNotas = {
                    "DocenteNotasPage.useEffect.fetchNotas": async ()=>{
                        const idToken = await user.getIdToken();
                        const res = await fetch("/api/docente/notas?gradoId=".concat(selected.gradoId, "&materiaId=").concat(selected.materiaId, "&periodoId=").concat(periodoId), {
                            headers: {
                                Authorization: "Bearer ".concat(idToken)
                            }
                        });
                        const data = await res.json();
                        if (Array.isArray(data)) {
                            const notasObj = {};
                            data.forEach({
                                "DocenteNotasPage.useEffect.fetchNotas": (n)=>{
                                    notasObj[n.estudianteId] = n.valor;
                                }
                            }["DocenteNotasPage.useEffect.fetchNotas"]);
                            setNotas(notasObj);
                        }
                    }
                }["DocenteNotasPage.useEffect.fetchNotas"];
                fetchNotas();
            }
        }
    }["DocenteNotasPage.useEffect"], [
        selected,
        periodoId,
        user
    ]);
    // Handler para seleccionar grupo/materia
    const handleSelect = (e)=>{
        const idx = Number(e.target.value);
        if (idx >= 0) {
            const a = asignaciones[idx];
            setSelected({
                gradoId: a.gradoId,
                materiaId: a.materiaId,
                cicloId: a.cicloId
            });
            setNotas({});
            setPeriodoId(null);
        }
    };
    // Handler para cambiar nota
    const handleNota = (estudianteId, valor)=>{
        setNotas((prev)=>({
                ...prev,
                [estudianteId]: valor
            }));
    };
    // Guardar notas
    const handleGuardar = async ()=>{
        if (!selected || !periodoId) return;
        setSaving(true);
        setMsg("");
        const notasArr = Object.entries(notas).filter((param)=>{
            let [_, valor] = param;
            return typeof valor === 'number' && !isNaN(valor);
        }).map((param)=>{
            let [estudianteId, valor] = param;
            return {
                estudianteId: Number(estudianteId),
                valor: Number(valor)
            };
        });
        if (notasArr.length === 0) {
            setMsg("No hay notas para guardar");
            setSaving(false);
            return;
        }
        const res = await fetch("/api/docente/notas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...user ? {
                    Authorization: "Bearer ".concat(await user.getIdToken())
                } : {}
            },
            body: JSON.stringify({
                gradoId: selected.gradoId,
                materiaId: selected.materiaId,
                periodoId,
                notas: notasArr
            })
        });
        if (res.ok) setMsg("Notas guardadas correctamente");
        else setMsg("Error al guardar notas");
        setSaving(false);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$admin$2d$horarios$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].horarioContainer,
        style: {
            maxWidth: 900,
            margin: '40px auto'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>router.back(),
                style: {
                    marginBottom: 18,
                    background: '#232527',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 8,
                    padding: '8px 18px',
                    fontWeight: 600,
                    cursor: 'pointer'
                },
                children: "← Volver"
            }, void 0, false, {
                fileName: "[project]/src/app/docente/notas/page.tsx",
                lineNumber: 114,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                style: {
                    fontWeight: 700,
                    fontSize: 26,
                    marginBottom: 24,
                    color: '#fff'
                },
                children: "Asignación de Notas"
            }, void 0, false, {
                fileName: "[project]/src/app/docente/notas/page.tsx",
                lineNumber: 117,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: 'flex',
                    gap: 16,
                    marginBottom: 24
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$admin$2d$horarios$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].selectModern,
                        onChange: handleSelect,
                        defaultValue: -1,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: -1,
                                children: "Selecciona grupo y materia"
                            }, void 0, false, {
                                fileName: "[project]/src/app/docente/notas/page.tsx",
                                lineNumber: 120,
                                columnNumber: 11
                            }, this),
                            Array.isArray(asignaciones) && asignaciones.length > 0 && asignaciones.map((a, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: i,
                                    children: [
                                        a.grado.nombre,
                                        " ",
                                        a.grado.seccion,
                                        " - ",
                                        a.materia.nombre,
                                        " (",
                                        a.ciclo.nombre,
                                        ")"
                                    ]
                                }, i, true, {
                                    fileName: "[project]/src/app/docente/notas/page.tsx",
                                    lineNumber: 122,
                                    columnNumber: 13
                                }, this)),
                            Array.isArray(asignaciones) && asignaciones.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                disabled: true,
                                value: -1,
                                children: "No tienes asignaciones disponibles"
                            }, void 0, false, {
                                fileName: "[project]/src/app/docente/notas/page.tsx",
                                lineNumber: 125,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/docente/notas/page.tsx",
                        lineNumber: 119,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$admin$2d$horarios$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].selectModern,
                        value: periodoId || '',
                        onChange: (e)=>setPeriodoId(Number(e.target.value)),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "",
                                children: "Selecciona periodo"
                            }, void 0, false, {
                                fileName: "[project]/src/app/docente/notas/page.tsx",
                                lineNumber: 129,
                                columnNumber: 11
                            }, this),
                            periodos.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: p.id,
                                    children: p.nombre
                                }, p.id, false, {
                                    fileName: "[project]/src/app/docente/notas/page.tsx",
                                    lineNumber: 131,
                                    columnNumber: 13
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/docente/notas/page.tsx",
                        lineNumber: 128,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/docente/notas/page.tsx",
                lineNumber: 118,
                columnNumber: 7
            }, this),
            estudiantes.length > 0 && periodoId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$admin$2d$horarios$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].horarioGrid,
                style: {
                    marginTop: 18
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$admin$2d$horarios$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].horarioHeader,
                                    children: "Estudiante"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/docente/notas/page.tsx",
                                    lineNumber: 139,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$admin$2d$horarios$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].horarioHeader,
                                    children: "Nota"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/docente/notas/page.tsx",
                                    lineNumber: 140,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/docente/notas/page.tsx",
                            lineNumber: 138,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/docente/notas/page.tsx",
                        lineNumber: 137,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                        children: estudiantes.map((e)=>{
                            var _notas_e_id;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$admin$2d$horarios$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].horarioRowLabel,
                                        style: {
                                            textAlign: 'left',
                                            fontWeight: 500
                                        },
                                        children: [
                                            e.nombres,
                                            " ",
                                            e.apellidos
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/docente/notas/page.tsx",
                                        lineNumber: 146,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$admin$2d$horarios$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].horarioCell,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "number",
                                            min: 0,
                                            max: 100,
                                            value: (_notas_e_id = notas[e.id]) !== null && _notas_e_id !== void 0 ? _notas_e_id : '',
                                            onChange: (ev)=>{
                                                const valor = Number(ev.target.value);
                                                if (valor >= 0 && valor <= 100) handleNota(e.id, valor);
                                            },
                                            style: {
                                                width: 80,
                                                padding: '7px 10px',
                                                borderRadius: 7,
                                                border: '2px solid #2563eb',
                                                background: '#181A1B',
                                                color: '#fff',
                                                fontWeight: 600,
                                                fontSize: 15,
                                                outline: 'none',
                                                boxShadow: '0 2px 8px #0002'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/docente/notas/page.tsx",
                                            lineNumber: 148,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/docente/notas/page.tsx",
                                        lineNumber: 147,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, e.id, true, {
                                fileName: "[project]/src/app/docente/notas/page.tsx",
                                lineNumber: 145,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/app/docente/notas/page.tsx",
                        lineNumber: 143,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/docente/notas/page.tsx",
                lineNumber: 136,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: 'flex',
                    gap: 16,
                    marginTop: 28
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleGuardar,
                        disabled: saving || !periodoId || estudiantes.length === 0 || Object.keys(notas).length === 0,
                        style: {
                            background: '#2563eb',
                            color: '#fff',
                            border: '2px solid #1d4ed8',
                            borderRadius: 8,
                            padding: '10px 32px',
                            fontWeight: 700,
                            fontSize: 17,
                            boxShadow: '0 2px 8px #2563eb44',
                            cursor: saving ? 'not-allowed' : 'pointer',
                            opacity: saving ? 0.7 : 1,
                            marginTop: 8
                        },
                        children: saving ? 'Guardando...' : 'Guardar Notas'
                    }, void 0, false, {
                        fileName: "[project]/src/app/docente/notas/page.tsx",
                        lineNumber: 177,
                        columnNumber: 9
                    }, this),
                    msg && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            color: msg.startsWith('Error') ? '#dc2626' : '#22c55e',
                            fontWeight: 600,
                            fontSize: 16
                        },
                        children: msg
                    }, void 0, false, {
                        fileName: "[project]/src/app/docente/notas/page.tsx",
                        lineNumber: 194,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/docente/notas/page.tsx",
                lineNumber: 176,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/docente/notas/page.tsx",
        lineNumber: 113,
        columnNumber: 5
    }, this);
}
_s(DocenteNotasPage, "vP5GxM4A6K7W/OEhbZMJhjHAQbE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$authContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = DocenteNotasPage;
var _c;
__turbopack_context__.k.register(_c, "DocenteNotasPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/next/navigation.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/navigation.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=_c0d692f1._.js.map