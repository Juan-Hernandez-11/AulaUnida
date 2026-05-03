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
"[project]/src/app/docente/notas/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DocenteNotasPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$authContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/authContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$admin$2d$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/styles/admin-dashboard.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
// Colores
const COLORS = {
    primary: '#10b981',
    secondary: '#06b6d4',
    accent: '#f59e0b',
    danger: '#ef4444',
    success: '#10b981',
    bg: '#0f0f0f',
    surface: '#1b1b1b',
    text: '#ffffff',
    textMuted: '#9ca3af'
};
function DocenteNotasPage() {
    var _user_displayName_charAt, _user_displayName;
    _s();
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$authContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    // Estados principales
    const [asignaciones, setAsignaciones] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [estudiantes, setEstudiantes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [periodos, setPeriodos] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selected, setSelected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [periodoId, setPeriodoId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [notasEstudiantes, setNotasEstudiantes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [expandedStudent, setExpandedStudent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [nuevaNota, setNuevaNota] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        descripcion: '',
        valor: 3.0,
        peso: 10
    });
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [saving, setSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [msg, setMsg] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [docenteInfo, setDocenteInfo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const fetchWithAuth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DocenteNotasPage.useCallback[fetchWithAuth]": async (url, options)=>{
            if (!user) throw new Error('Usuario no autenticado');
            const idToken = await user.getIdToken();
            return fetch(url, {
                ...options,
                headers: {
                    ...options === null || options === void 0 ? void 0 : options.headers,
                    Authorization: "Bearer ".concat(idToken)
                }
            });
        }
    }["DocenteNotasPage.useCallback[fetchWithAuth]"], [
        user
    ]);
    // Cargar asignaciones
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DocenteNotasPage.useEffect": ()=>{
            if (!user) return;
            ({
                "DocenteNotasPage.useEffect": async ()=>{
                    try {
                        const res = await fetchWithAuth("/api/docente/asignaciones");
                        const data = await res.json();
                        setAsignaciones(Array.isArray(data) ? data : []);
                    } catch (error) {
                        console.error('Error cargando asignaciones:', error);
                    }
                }
            })["DocenteNotasPage.useEffect"]();
        }
    }["DocenteNotasPage.useEffect"], [
        user,
        fetchWithAuth
    ]);
    // Cargar doctente info
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DocenteNotasPage.useEffect": ()=>{
            if (!user) return;
            ({
                "DocenteNotasPage.useEffect": async ()=>{
                    try {
                        const res = await fetchWithAuth('/api/docente/info');
                        const data = await res.json();
                        setDocenteInfo(data.docente);
                    } catch (error) {
                        console.error('Error cargando info:', error);
                    }
                }
            })["DocenteNotasPage.useEffect"]();
        }
    }["DocenteNotasPage.useEffect"], [
        user,
        fetchWithAuth
    ]);
    // Cargar estudiantes y períodos
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DocenteNotasPage.useEffect": ()=>{
            if (!selected) {
                setEstudiantes([]);
                setPeriodos([]);
                return;
            }
            ({
                "DocenteNotasPage.useEffect": async ()=>{
                    setLoading(true);
                    try {
                        const [estudiantesRes, periodosRes] = await Promise.all([
                            fetchWithAuth("/api/docente/estudiantes?gradoId=".concat(selected.gradoId, "&materiaId=").concat(selected.materiaId)),
                            fetchWithAuth("/api/admin/periodos?cicloId=".concat(selected.cicloId))
                        ]);
                        const [estData, perData] = await Promise.all([
                            estudiantesRes.json(),
                            periodosRes.json()
                        ]);
                        setEstudiantes(Array.isArray(estData) ? estData : []);
                        setPeriodos(Array.isArray(perData) ? perData : []);
                    } catch (error) {
                        console.error('Error cargando datos:', error);
                    } finally{
                        setLoading(false);
                    }
                }
            })["DocenteNotasPage.useEffect"]();
        }
    }["DocenteNotasPage.useEffect"], [
        selected,
        fetchWithAuth
    ]);
    // Cargar notas del período
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DocenteNotasPage.useEffect": ()=>{
            if (!selected || !periodoId) {
                setNotasEstudiantes({});
                return;
            }
            ({
                "DocenteNotasPage.useEffect": async ()=>{
                    setLoading(true);
                    try {
                        const notasObj = {};
                        for (const est of estudiantes){
                            try {
                                const res = await fetchWithAuth("/api/docente/notas/detalles?estudianteId=".concat(est.id, "&materiaId=").concat(selected.materiaId, "&periodoId=").concat(periodoId));
                                const data = await res.json();
                                notasObj[est.id] = data;
                            } catch (error) {
                                notasObj[est.id] = {
                                    notas: [],
                                    promedioPonderado: 0,
                                    totalPeso: 0
                                };
                            }
                        }
                        setNotasEstudiantes(notasObj);
                    } catch (error) {
                        console.error('Error cargando notas:', error);
                    } finally{
                        setLoading(false);
                    }
                }
            })["DocenteNotasPage.useEffect"]();
        }
    }["DocenteNotasPage.useEffect"], [
        selected,
        periodoId,
        estudiantes,
        fetchWithAuth
    ]);
    // Agregar nota
    const handleAgregarNota = async (estudianteId)=>{
        if (!nuevaNota.descripcion || nuevaNota.valor < 0 || nuevaNota.valor > 5 || nuevaNota.peso <= 0) {
            setMsg("Verifica los datos: descripción, nota (0-5) y peso (>0)");
            return;
        }
        if (!selected || !periodoId) return;
        setSaving(true);
        try {
            const idToken = await user.getIdToken();
            const res = await fetch('/api/docente/notas/detalles', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: "Bearer ".concat(idToken)
                },
                body: JSON.stringify({
                    estudianteId,
                    materiaId: selected.materiaId,
                    periodoId,
                    descripcion: nuevaNota.descripcion,
                    valor: nuevaNota.valor,
                    peso: nuevaNota.peso
                })
            });
            if (res.ok) {
                setMsg("Nota agregada correctamente");
                setNuevaNota({
                    descripcion: '',
                    valor: 3.0,
                    peso: 10
                });
                setExpandedStudent(null);
                // Recargar notas
                const reloadRes = await fetchWithAuth("/api/docente/notas/detalles?estudianteId=".concat(estudianteId, "&materiaId=").concat(selected.materiaId, "&periodoId=").concat(periodoId));
                const data = await reloadRes.json();
                setNotasEstudiantes((prev)=>({
                        ...prev,
                        [estudianteId]: data
                    }));
            } else {
                setMsg("Error al agregar nota");
            }
        } catch (error) {
            setMsg("Error al agregar nota");
            console.error(error);
        } finally{
            setSaving(false);
        }
    };
    // Eliminar nota
    const handleEliminarNota = async (notaId, estudianteId)=>{
        if (!confirm('¿Eliminar esta nota?')) return;
        setSaving(true);
        try {
            const idToken = await user.getIdToken();
            const res = await fetch("/api/docente/notas/detalles?notaId=".concat(notaId), {
                method: 'DELETE',
                headers: {
                    Authorization: "Bearer ".concat(idToken)
                }
            });
            if (res.ok) {
                setMsg("Nota eliminada correctamente");
                // Actualizar state
                if (selected && periodoId) {
                    const reloadRes = await fetchWithAuth("/api/docente/notas/detalles?estudianteId=".concat(estudianteId, "&materiaId=").concat(selected.materiaId, "&periodoId=").concat(periodoId));
                    const data = await reloadRes.json();
                    setNotasEstudiantes((prev)=>({
                            ...prev,
                            [estudianteId]: data
                        }));
                }
            } else {
                setMsg("Error al eliminar nota");
            }
        } catch (error) {
            setMsg("Error al eliminar nota");
            console.error(error);
        } finally{
            setSaving(false);
        }
    };
    const handleLogout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DocenteNotasPage.useCallback[handleLogout]": async ()=>{
            await logout();
            router.push('/login');
        }
    }["DocenteNotasPage.useCallback[handleLogout]"], [
        logout,
        router
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$admin$2d$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].dashboardContainer,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$admin$2d$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sidebar,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: '3rem'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    background: "linear-gradient(135deg, ".concat(COLORS.primary, ", ").concat(COLORS.secondary, ")"),
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 'bold',
                                    color: '#000',
                                    marginRight: '0.75rem'
                                },
                                children: "A"
                            }, void 0, false, {
                                fileName: "[project]/src/app/docente/notas/page.tsx",
                                lineNumber: 272,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontSize: '1.25rem',
                                    fontWeight: 'bold',
                                    color: COLORS.primary
                                },
                                children: "AulaUnida"
                            }, void 0, false, {
                                fileName: "[project]/src/app/docente/notas/page.tsx",
                                lineNumber: 286,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/docente/notas/page.tsx",
                        lineNumber: 271,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            backgroundColor: "".concat(COLORS.secondary, "20"),
                            border: "1px solid ".concat(COLORS.secondary, "30"),
                            borderRadius: '0.75rem',
                            padding: '0.75rem',
                            marginBottom: '2rem'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '50%',
                                    backgroundColor: COLORS.secondary,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#000',
                                    fontWeight: 'bold',
                                    marginBottom: '0.5rem'
                                },
                                children: (user === null || user === void 0 ? void 0 : (_user_displayName = user.displayName) === null || _user_displayName === void 0 ? void 0 : (_user_displayName_charAt = _user_displayName.charAt(0)) === null || _user_displayName_charAt === void 0 ? void 0 : _user_displayName_charAt.toUpperCase()) || 'T'
                            }, void 0, false, {
                                fileName: "[project]/src/app/docente/notas/page.tsx",
                                lineNumber: 296,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    margin: '0.25rem 0 0',
                                    fontWeight: 600,
                                    fontSize: '0.9rem',
                                    color: COLORS.text
                                },
                                children: (user === null || user === void 0 ? void 0 : user.displayName) || 'Docente'
                            }, void 0, false, {
                                fileName: "[project]/src/app/docente/notas/page.tsx",
                                lineNumber: 310,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'inline-block',
                                    backgroundColor: COLORS.secondary,
                                    color: '#000',
                                    padding: '0.2rem 0.5rem',
                                    borderRadius: '0.25rem',
                                    fontSize: '0.65rem',
                                    fontWeight: 700,
                                    marginTop: '0.25rem'
                                },
                                children: "DOCENTE"
                            }, void 0, false, {
                                fileName: "[project]/src/app/docente/notas/page.tsx",
                                lineNumber: 313,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/docente/notas/page.tsx",
                        lineNumber: 289,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        style: {
                            marginBottom: '2rem'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                            style: {
                                listStyle: 'none',
                                padding: 0,
                                margin: 0,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.5rem'
                            },
                            children: [
                                {
                                    label: 'Dashboard',
                                    href: '/docente'
                                },
                                {
                                    label: 'Mis Tareas',
                                    href: '/docente/tareas'
                                },
                                {
                                    label: 'Asistencia',
                                    href: '/docente/asistencia'
                                },
                                {
                                    label: 'Asignar Notas',
                                    href: '/docente/notas'
                                }
                            ].map((link)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: link.href,
                                        style: {
                                            display: 'flex',
                                            alignItems: 'center',
                                            padding: '0.75rem 1rem',
                                            borderRadius: '0.5rem',
                                            color: link.href === '/docente/notas' ? COLORS.primary : COLORS.textMuted,
                                            textDecoration: 'none',
                                            backgroundColor: link.href === '/docente/notas' ? "".concat(COLORS.primary, "15") : 'transparent',
                                            fontWeight: link.href === '/docente/notas' ? 600 : 400,
                                            transition: 'all 0.2s',
                                            borderLeft: link.href === '/docente/notas' ? "3px solid ".concat(COLORS.primary) : '3px solid transparent'
                                        },
                                        children: link.label
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/docente/notas/page.tsx",
                                        lineNumber: 336,
                                        columnNumber: 17
                                    }, this)
                                }, link.href, false, {
                                    fileName: "[project]/src/app/docente/notas/page.tsx",
                                    lineNumber: 335,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/app/docente/notas/page.tsx",
                            lineNumber: 328,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/docente/notas/page.tsx",
                        lineNumber: 327,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleLogout,
                        style: {
                            width: '100%',
                            padding: '0.75rem',
                            backgroundColor: "".concat(COLORS.danger, "20"),
                            color: COLORS.danger,
                            border: "1px solid ".concat(COLORS.danger, "40"),
                            borderRadius: '0.5rem',
                            fontWeight: 600,
                            cursor: 'pointer'
                        },
                        children: "⎋ Cerrar sesión"
                    }, void 0, false, {
                        fileName: "[project]/src/app/docente/notas/page.tsx",
                        lineNumber: 355,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/docente/notas/page.tsx",
                lineNumber: 270,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$admin$2d$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].mainContent,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$admin$2d$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].title,
                        children: "Asignación de Notas"
                    }, void 0, false, {
                        fileName: "[project]/src/app/docente/notas/page.tsx",
                        lineNumber: 371,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$admin$2d$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].subtitle,
                        children: docenteInfo ? "Gestiona las notas de tus estudiantes, ".concat(docenteInfo.name) : 'Sistema de notas con pesos y porcentajes'
                    }, void 0, false, {
                        fileName: "[project]/src/app/docente/notas/page.tsx",
                        lineNumber: 372,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$admin$2d$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].activityCard,
                        style: {
                            backgroundColor: COLORS.surface,
                            border: "1px solid ".concat(COLORS.primary, "20")
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                style: {
                                    color: COLORS.text,
                                    marginBottom: '1.5rem',
                                    fontSize: '1.25rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                },
                                children: "📋 Seleccionar Grupo y Período"
                            }, void 0, false, {
                                fileName: "[project]/src/app/docente/notas/page.tsx",
                                lineNumber: 377,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 1fr',
                                    gap: '1.5rem',
                                    marginBottom: '2rem'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                style: {
                                                    display: 'block',
                                                    marginBottom: '0.5rem',
                                                    fontWeight: 600,
                                                    color: COLORS.text
                                                },
                                                children: "Grupo y Materia:"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/docente/notas/page.tsx",
                                                lineNumber: 383,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                value: selected ? "".concat(selected.gradoId, "-").concat(selected.materiaId) : '',
                                                onChange: (e)=>{
                                                    const [gradoId, materiaId] = e.target.value.split('-');
                                                    const a = asignaciones.find((x)=>x.gradoId === parseInt(gradoId) && x.materiaId === parseInt(materiaId));
                                                    setSelected(a || null);
                                                    setPeriodoId(null);
                                                },
                                                style: {
                                                    width: '100%',
                                                    padding: '0.75rem',
                                                    borderRadius: '0.5rem',
                                                    border: "1px solid ".concat(COLORS.primary, "40"),
                                                    background: COLORS.bg,
                                                    color: COLORS.text,
                                                    cursor: 'pointer'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "",
                                                        children: "Selecciona grupo y materia..."
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/docente/notas/page.tsx",
                                                        lineNumber: 404,
                                                        columnNumber: 17
                                                    }, this),
                                                    asignaciones.map((a)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "".concat(a.gradoId, "-").concat(a.materiaId),
                                                            children: [
                                                                a.grado.nombre,
                                                                " ",
                                                                a.grado.seccion,
                                                                " - ",
                                                                a.materia.nombre
                                                            ]
                                                        }, "".concat(a.gradoId, "-").concat(a.materiaId), true, {
                                                            fileName: "[project]/src/app/docente/notas/page.tsx",
                                                            lineNumber: 406,
                                                            columnNumber: 19
                                                        }, this))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/docente/notas/page.tsx",
                                                lineNumber: 386,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/docente/notas/page.tsx",
                                        lineNumber: 382,
                                        columnNumber: 13
                                    }, this),
                                    selected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                style: {
                                                    display: 'block',
                                                    marginBottom: '0.5rem',
                                                    fontWeight: 600,
                                                    color: COLORS.text
                                                },
                                                children: "Período:"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/docente/notas/page.tsx",
                                                lineNumber: 415,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                value: periodoId || '',
                                                onChange: (e)=>setPeriodoId(e.target.value ? parseInt(e.target.value) : null),
                                                style: {
                                                    width: '100%',
                                                    padding: '0.75rem',
                                                    borderRadius: '0.5rem',
                                                    border: "1px solid ".concat(COLORS.secondary, "40"),
                                                    background: COLORS.bg,
                                                    color: COLORS.text,
                                                    cursor: 'pointer'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "",
                                                        children: "Selecciona período..."
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/docente/notas/page.tsx",
                                                        lineNumber: 431,
                                                        columnNumber: 19
                                                    }, this),
                                                    periodos.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: p.id,
                                                            children: p.nombre
                                                        }, p.id, false, {
                                                            fileName: "[project]/src/app/docente/notas/page.tsx",
                                                            lineNumber: 433,
                                                            columnNumber: 21
                                                        }, this))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/docente/notas/page.tsx",
                                                lineNumber: 418,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/docente/notas/page.tsx",
                                        lineNumber: 414,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/docente/notas/page.tsx",
                                lineNumber: 381,
                                columnNumber: 11
                            }, this),
                            selected && periodoId && !loading && estudiantes.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            marginBottom: '1.5rem',
                                            paddingBottom: '1rem',
                                            borderBottom: "2px solid ".concat(COLORS.primary, "40")
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                style: {
                                                    color: COLORS.text,
                                                    fontSize: '1.15rem',
                                                    margin: 0
                                                },
                                                children: [
                                                    "👥 Estudiantes de ",
                                                    selected.grado.nombre,
                                                    " ",
                                                    selected.grado.seccion
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/docente/notas/page.tsx",
                                                lineNumber: 446,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    color: COLORS.textMuted,
                                                    fontSize: '0.9rem'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            color: COLORS.primary
                                                        },
                                                        children: "●"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/docente/notas/page.tsx",
                                                        lineNumber: 450,
                                                        columnNumber: 19
                                                    }, this),
                                                    " ",
                                                    estudiantes.length,
                                                    " estudiantes"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/docente/notas/page.tsx",
                                                lineNumber: 449,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/docente/notas/page.tsx",
                                        lineNumber: 445,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '1rem'
                                        },
                                        children: estudiantes.map((est)=>{
                                            const notasData = notasEstudiantes[est.id] || {
                                                notas: [],
                                                promedioPonderado: 0,
                                                totalPeso: 0
                                            };
                                            const isExpanded = expandedStudent === est.id;
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    backgroundColor: COLORS.bg,
                                                    border: "1px solid ".concat(COLORS.primary, "20"),
                                                    borderRadius: '0.75rem',
                                                    padding: '1.25rem',
                                                    transition: 'all 0.2s'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            display: 'grid',
                                                            gridTemplateColumns: '2fr 1.5fr 1fr',
                                                            gap: '1rem',
                                                            alignItems: 'center',
                                                            marginBottom: isExpanded ? '1rem' : 0
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        style: {
                                                                            color: COLORS.text,
                                                                            fontWeight: 600,
                                                                            fontSize: '1rem',
                                                                            marginBottom: '0.25rem'
                                                                        },
                                                                        children: est.name
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/docente/notas/page.tsx",
                                                                        lineNumber: 473,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        style: {
                                                                            color: COLORS.textMuted,
                                                                            fontSize: '0.85rem'
                                                                        },
                                                                        children: est.email
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/docente/notas/page.tsx",
                                                                        lineNumber: 476,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/docente/notas/page.tsx",
                                                                lineNumber: 472,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    display: 'flex',
                                                                    flexWrap: 'wrap',
                                                                    gap: '0.5rem'
                                                                },
                                                                children: notasData.notas.length > 0 ? notasData.notas.map((nota)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        style: {
                                                                            backgroundColor: "".concat(COLORS.secondary, "20"),
                                                                            border: "1px solid ".concat(COLORS.secondary, "40"),
                                                                            borderRadius: '0.5rem',
                                                                            padding: '0.4rem 0.6rem',
                                                                            fontSize: '0.8rem',
                                                                            color: COLORS.secondary,
                                                                            fontWeight: 600
                                                                        },
                                                                        children: [
                                                                            nota.valor.toFixed(1),
                                                                            " (",
                                                                            nota.peso,
                                                                            "%)"
                                                                        ]
                                                                    }, nota.id, true, {
                                                                        fileName: "[project]/src/app/docente/notas/page.tsx",
                                                                        lineNumber: 485,
                                                                        columnNumber: 31
                                                                    }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    style: {
                                                                        color: COLORS.textMuted,
                                                                        fontSize: '0.9rem'
                                                                    },
                                                                    children: "Sin notas"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/docente/notas/page.tsx",
                                                                    lineNumber: 498,
                                                                    columnNumber: 29
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/docente/notas/page.tsx",
                                                                lineNumber: 482,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    textAlign: 'center',
                                                                    padding: '0.5rem',
                                                                    backgroundColor: notasData.promedioPonderado > 0 ? "".concat(COLORS.primary, "15") : "".concat(COLORS.textMuted, "10"),
                                                                    borderRadius: '0.5rem',
                                                                    border: "1px solid ".concat(notasData.promedioPonderado > 0 ? COLORS.primary : COLORS.textMuted, "20")
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        style: {
                                                                            fontSize: '0.75rem',
                                                                            color: COLORS.textMuted
                                                                        },
                                                                        children: "Promedio"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/docente/notas/page.tsx",
                                                                        lineNumber: 510,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        style: {
                                                                            color: notasData.promedioPonderado >= 3.0 ? COLORS.primary : notasData.promedioPonderado > 0 ? COLORS.accent : COLORS.textMuted,
                                                                            fontWeight: 700,
                                                                            fontSize: '1.25rem'
                                                                        },
                                                                        children: notasData.promedioPonderado > 0 ? notasData.promedioPonderado.toFixed(2) : '--'
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/docente/notas/page.tsx",
                                                                        lineNumber: 511,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/docente/notas/page.tsx",
                                                                lineNumber: 503,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/docente/notas/page.tsx",
                                                        lineNumber: 471,
                                                        columnNumber: 23
                                                    }, this),
                                                    notasData.notas.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            marginTop: '1rem',
                                                            borderTop: "1px solid ".concat(COLORS.primary, "20"),
                                                            paddingTop: '1rem'
                                                        },
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>setExpandedStudent(isExpanded ? null : est.id),
                                                            style: {
                                                                background: 'none',
                                                                border: 'none',
                                                                color: COLORS.secondary,
                                                                cursor: 'pointer',
                                                                fontWeight: 600,
                                                                fontSize: '0.9rem'
                                                            },
                                                            children: isExpanded ? '▼ Contraer' : '▶ Ver detalles'
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/docente/notas/page.tsx",
                                                            lineNumber: 524,
                                                            columnNumber: 27
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/docente/notas/page.tsx",
                                                        lineNumber: 523,
                                                        columnNumber: 25
                                                    }, this),
                                                    isExpanded && notasData.notas.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            marginTop: '1rem',
                                                            paddingTop: '1rem',
                                                            borderTop: "1px solid ".concat(COLORS.primary, "20")
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                style: {
                                                                    color: COLORS.text,
                                                                    margin: '0 0 0.75rem',
                                                                    fontSize: '0.95rem'
                                                                },
                                                                children: "Notas detalladas:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/docente/notas/page.tsx",
                                                                lineNumber: 543,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    display: 'flex',
                                                                    flexDirection: 'column',
                                                                    gap: '0.5rem'
                                                                },
                                                                children: notasData.notas.map((nota)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        style: {
                                                                            display: 'flex',
                                                                            justifyContent: 'space-between',
                                                                            alignItems: 'center',
                                                                            padding: '0.75rem',
                                                                            backgroundColor: "".concat(COLORS.surface, "80"),
                                                                            borderRadius: '0.5rem',
                                                                            border: "1px solid ".concat(COLORS.primary, "20")
                                                                        },
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                style: {
                                                                                    flex: 1
                                                                                },
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        style: {
                                                                                            color: COLORS.text,
                                                                                            fontWeight: 600,
                                                                                            fontSize: '0.9rem'
                                                                                        },
                                                                                        children: nota.descripcion
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/app/docente/notas/page.tsx",
                                                                                        lineNumber: 559,
                                                                                        columnNumber: 35
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        style: {
                                                                                            color: COLORS.textMuted,
                                                                                            fontSize: '0.8rem'
                                                                                        },
                                                                                        children: [
                                                                                            "Nota: ",
                                                                                            nota.valor.toFixed(1),
                                                                                            "/5.0 • Peso: ",
                                                                                            nota.peso,
                                                                                            "%"
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/src/app/docente/notas/page.tsx",
                                                                                        lineNumber: 562,
                                                                                        columnNumber: 35
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/src/app/docente/notas/page.tsx",
                                                                                lineNumber: 558,
                                                                                columnNumber: 33
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                onClick: ()=>handleEliminarNota(nota.id, est.id),
                                                                                disabled: saving,
                                                                                style: {
                                                                                    padding: '0.4rem 0.8rem',
                                                                                    backgroundColor: "".concat(COLORS.danger, "20"),
                                                                                    color: COLORS.danger,
                                                                                    border: "1px solid ".concat(COLORS.danger, "40"),
                                                                                    borderRadius: '0.4rem',
                                                                                    cursor: 'pointer',
                                                                                    fontSize: '0.8rem',
                                                                                    fontWeight: 600
                                                                                },
                                                                                children: "Eliminar"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/docente/notas/page.tsx",
                                                                                lineNumber: 566,
                                                                                columnNumber: 33
                                                                            }, this)
                                                                        ]
                                                                    }, nota.id, true, {
                                                                        fileName: "[project]/src/app/docente/notas/page.tsx",
                                                                        lineNumber: 546,
                                                                        columnNumber: 31
                                                                    }, this))
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/docente/notas/page.tsx",
                                                                lineNumber: 544,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/docente/notas/page.tsx",
                                                        lineNumber: 542,
                                                        columnNumber: 25
                                                    }, this),
                                                    isExpanded || notasData.notas.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            marginTop: '1rem',
                                                            paddingTop: '1rem',
                                                            borderTop: "1px solid ".concat(COLORS.primary, "20")
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                style: {
                                                                    color: COLORS.text,
                                                                    margin: '0 0 1rem',
                                                                    fontSize: '0.95rem'
                                                                },
                                                                children: "+ Agregar Nueva Nota"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/docente/notas/page.tsx",
                                                                lineNumber: 591,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    display: 'grid',
                                                                    gridTemplateColumns: '2fr 1fr 1fr auto',
                                                                    gap: '0.75rem',
                                                                    alignItems: 'flex-end'
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "text",
                                                                        placeholder: "Descripción (ej: Quiz 1, Evaluación Final)",
                                                                        value: nuevaNota.descripcion,
                                                                        onChange: (e)=>setNuevaNota({
                                                                                ...nuevaNota,
                                                                                descripcion: e.target.value
                                                                            }),
                                                                        style: {
                                                                            padding: '0.6rem',
                                                                            borderRadius: '0.5rem',
                                                                            border: "1px solid ".concat(COLORS.primary, "40"),
                                                                            background: COLORS.surface,
                                                                            color: COLORS.text,
                                                                            fontSize: '0.9rem'
                                                                        }
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/docente/notas/page.tsx",
                                                                        lineNumber: 595,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "number",
                                                                        min: "0",
                                                                        max: "5",
                                                                        step: "0.1",
                                                                        placeholder: "Nota (0-5)",
                                                                        value: nuevaNota.valor,
                                                                        onChange: (e)=>setNuevaNota({
                                                                                ...nuevaNota,
                                                                                valor: parseFloat(e.target.value) || 0
                                                                            }),
                                                                        style: {
                                                                            padding: '0.6rem',
                                                                            borderRadius: '0.5rem',
                                                                            border: "1px solid ".concat(COLORS.primary, "40"),
                                                                            background: COLORS.surface,
                                                                            color: COLORS.text,
                                                                            fontSize: '0.9rem'
                                                                        }
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/docente/notas/page.tsx",
                                                                        lineNumber: 609,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "number",
                                                                        min: "0",
                                                                        max: "100",
                                                                        placeholder: "Peso %",
                                                                        value: nuevaNota.peso,
                                                                        onChange: (e)=>setNuevaNota({
                                                                                ...nuevaNota,
                                                                                peso: parseFloat(e.target.value) || 0
                                                                            }),
                                                                        style: {
                                                                            padding: '0.6rem',
                                                                            borderRadius: '0.5rem',
                                                                            border: "1px solid ".concat(COLORS.primary, "40"),
                                                                            background: COLORS.surface,
                                                                            color: COLORS.text,
                                                                            fontSize: '0.9rem'
                                                                        }
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/docente/notas/page.tsx",
                                                                        lineNumber: 626,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        onClick: ()=>handleAgregarNota(est.id),
                                                                        disabled: saving,
                                                                        style: {
                                                                            padding: '0.6rem 1rem',
                                                                            backgroundColor: COLORS.primary,
                                                                            color: '#000',
                                                                            border: 'none',
                                                                            borderRadius: '0.5rem',
                                                                            fontWeight: 600,
                                                                            cursor: saving ? 'not-allowed' : 'pointer',
                                                                            opacity: saving ? 0.6 : 1
                                                                        },
                                                                        children: saving ? '...' : 'Agregar'
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/docente/notas/page.tsx",
                                                                        lineNumber: 642,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/docente/notas/page.tsx",
                                                                lineNumber: 594,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/docente/notas/page.tsx",
                                                        lineNumber: 590,
                                                        columnNumber: 25
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            marginTop: '1rem',
                                                            paddingTop: '1rem',
                                                            borderTop: "1px solid ".concat(COLORS.primary, "20")
                                                        },
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>setExpandedStudent(est.id),
                                                            style: {
                                                                padding: '0.6rem 1rem',
                                                                backgroundColor: "".concat(COLORS.primary, "20"),
                                                                color: COLORS.primary,
                                                                border: "1px solid ".concat(COLORS.primary, "40"),
                                                                borderRadius: '0.5rem',
                                                                fontWeight: 600,
                                                                cursor: 'pointer',
                                                                fontSize: '0.9rem'
                                                            },
                                                            children: "+ Agregar Nota"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/docente/notas/page.tsx",
                                                            lineNumber: 662,
                                                            columnNumber: 27
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/docente/notas/page.tsx",
                                                        lineNumber: 661,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, est.id, true, {
                                                fileName: "[project]/src/app/docente/notas/page.tsx",
                                                lineNumber: 460,
                                                columnNumber: 21
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/docente/notas/page.tsx",
                                        lineNumber: 454,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/docente/notas/page.tsx",
                                lineNumber: 444,
                                columnNumber: 13
                            }, this),
                            loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    textAlign: 'center',
                                    padding: '2rem',
                                    color: COLORS.textMuted
                                },
                                children: "⏳ Cargando..."
                            }, void 0, false, {
                                fileName: "[project]/src/app/docente/notas/page.tsx",
                                lineNumber: 686,
                                columnNumber: 23
                            }, this),
                            !loading && selected && periodoId && estudiantes.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    textAlign: 'center',
                                    padding: '2rem',
                                    color: COLORS.textMuted
                                },
                                children: "No hay estudiantes en este grupo"
                            }, void 0, false, {
                                fileName: "[project]/src/app/docente/notas/page.tsx",
                                lineNumber: 689,
                                columnNumber: 13
                            }, this),
                            msg && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    marginTop: '1.5rem',
                                    padding: '1rem',
                                    backgroundColor: msg.includes('Error') ? "".concat(COLORS.danger, "15") : "".concat(COLORS.success, "15"),
                                    border: "1px solid ".concat(msg.includes('Error') ? COLORS.danger : COLORS.success, "30"),
                                    color: msg.includes('Error') ? COLORS.danger : COLORS.success,
                                    borderRadius: '0.5rem',
                                    fontSize: '0.9rem'
                                },
                                children: [
                                    msg.includes('Error') ? '❌' : '✅',
                                    " ",
                                    msg
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/docente/notas/page.tsx",
                                lineNumber: 695,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    marginTop: '1.5rem',
                                    padding: '1rem',
                                    backgroundColor: "".concat(COLORS.secondary, "10"),
                                    borderLeft: "3px solid ".concat(COLORS.secondary),
                                    borderRadius: '0.25rem',
                                    fontSize: '0.85rem',
                                    color: COLORS.textMuted
                                },
                                children: [
                                    "💡 ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: "Consejos:"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/docente/notas/page.tsx",
                                        lineNumber: 717,
                                        columnNumber: 16
                                    }, this),
                                    " Puedes agregar ilimitadas notas por periodo. El promedio se calcula automáticamente según los pesos. Los pesos indican el porcentaje que aporta cada nota al promedio final."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/docente/notas/page.tsx",
                                lineNumber: 708,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/docente/notas/page.tsx",
                        lineNumber: 376,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/docente/notas/page.tsx",
                lineNumber: 370,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/docente/notas/page.tsx",
        lineNumber: 268,
        columnNumber: 5
    }, this);
}
_s(DocenteNotasPage, "PJmrTEE4nuAFNmWfHcJidJCSYlE=", false, function() {
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

//# sourceMappingURL=_3ea4b069._.js.map