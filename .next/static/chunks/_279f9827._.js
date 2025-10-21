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
"[project]/src/components/ui/Button.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "ghost": "Button-module__8RiFmG__ghost",
  "icon": "Button-module__8RiFmG__icon",
  "primary": "Button-module__8RiFmG__primary",
});
}),
"[project]/src/components/ui/Button.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Button
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/ui/Button.module.css [app-client] (css module)");
;
;
function Button(param) {
    let { variant = 'primary', icon, children, className, ...rest } = param;
    const cls = "".concat(variant === 'primary' ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].primary : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].ghost, " ").concat(className || '').trim();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        ...rest,
        className: cls,
        children: [
            icon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].icon,
                children: icon
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Button.tsx",
                lineNumber: 13,
                columnNumber: 16
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: children
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Button.tsx",
                lineNumber: 14,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/Button.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
}
_c = Button;
var _c;
__turbopack_context__.k.register(_c, "Button");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/icons/TriangleIcon.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TriangleIcon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
function TriangleIcon(param) {
    let { size = 16 } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: size,
        height: size,
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        viewBox: "0 0 24 24",
        "aria-hidden": true,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M15 19l-7-7 7-7"
        }, void 0, false, {
            fileName: "[project]/src/components/icons/TriangleIcon.tsx",
            lineNumber: 4,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/icons/TriangleIcon.tsx",
        lineNumber: 3,
        columnNumber: 5
    }, this);
}
_c = TriangleIcon;
var _c;
__turbopack_context__.k.register(_c, "TriangleIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$icons$2f$TriangleIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/icons/TriangleIcon.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginBottom: 18
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    variant: "ghost",
                    onClick: ()=>router.back(),
                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$icons$2f$TriangleIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/src/app/docente/notas/page.tsx",
                        lineNumber: 117,
                        columnNumber: 69
                    }, void 0),
                    children: "Volver"
                }, void 0, false, {
                    fileName: "[project]/src/app/docente/notas/page.tsx",
                    lineNumber: 117,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/docente/notas/page.tsx",
                lineNumber: 116,
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
                lineNumber: 119,
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
                                lineNumber: 122,
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
                                    lineNumber: 124,
                                    columnNumber: 13
                                }, this)),
                            Array.isArray(asignaciones) && asignaciones.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                disabled: true,
                                value: -1,
                                children: "No tienes asignaciones disponibles"
                            }, void 0, false, {
                                fileName: "[project]/src/app/docente/notas/page.tsx",
                                lineNumber: 127,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/docente/notas/page.tsx",
                        lineNumber: 121,
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
                                lineNumber: 131,
                                columnNumber: 11
                            }, this),
                            periodos.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: p.id,
                                    children: p.nombre
                                }, p.id, false, {
                                    fileName: "[project]/src/app/docente/notas/page.tsx",
                                    lineNumber: 133,
                                    columnNumber: 13
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/docente/notas/page.tsx",
                        lineNumber: 130,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/docente/notas/page.tsx",
                lineNumber: 120,
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
                                    lineNumber: 141,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$admin$2d$horarios$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].horarioHeader,
                                    children: "Nota"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/docente/notas/page.tsx",
                                    lineNumber: 142,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/docente/notas/page.tsx",
                            lineNumber: 140,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/docente/notas/page.tsx",
                        lineNumber: 139,
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
                                        lineNumber: 148,
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
                                                border: '2px solid var(--color-primary)',
                                                background: '#181A1B',
                                                color: '#fff',
                                                fontWeight: 600,
                                                fontSize: 15,
                                                outline: 'none',
                                                boxShadow: '0 2px 8px #0002'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/docente/notas/page.tsx",
                                            lineNumber: 150,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/docente/notas/page.tsx",
                                        lineNumber: 149,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, e.id, true, {
                                fileName: "[project]/src/app/docente/notas/page.tsx",
                                lineNumber: 147,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/app/docente/notas/page.tsx",
                        lineNumber: 145,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/docente/notas/page.tsx",
                lineNumber: 138,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: 'flex',
                    gap: 16,
                    marginTop: 28
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        variant: "primary",
                        onClick: handleGuardar,
                        disabled: saving || !periodoId || estudiantes.length === 0 || Object.keys(notas).length === 0,
                        children: saving ? 'Guardando...' : 'Guardar Notas'
                    }, void 0, false, {
                        fileName: "[project]/src/app/docente/notas/page.tsx",
                        lineNumber: 179,
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
                        lineNumber: 186,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/docente/notas/page.tsx",
                lineNumber: 178,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/docente/notas/page.tsx",
        lineNumber: 115,
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

//# sourceMappingURL=_279f9827._.js.map