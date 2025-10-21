(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/hooks/useUserRole.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useUserRole",
    ()=>useUserRole
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$authContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/authContext.tsx [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function useUserRole() {
    _s();
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$authContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const [role, setRole] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useUserRole.useEffect": ()=>{
            if (!user) {
                setRole(null);
                setLoading(false);
                return;
            }
            // Llama a tu API interna para obtener el rol por UID de Firebase
            const fetchRole = {
                "useUserRole.useEffect.fetchRole": async ()=>{
                    setLoading(true);
                    try {
                        const res = await fetch("/api/user-role?uid=".concat(user.uid));
                        const data = await res.json();
                        setRole(data.role || null);
                    } catch (err) {
                        setRole(null);
                    } finally{
                        setLoading(false);
                    }
                }
            }["useUserRole.useEffect.fetchRole"];
            fetchRole();
        }
    }["useUserRole.useEffect"], [
        user
    ]);
    return {
        role,
        loading
    };
}
_s(useUserRole, "fgX2P2ci7E+4cETiao1CbJ8pQJ4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$authContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ProtectedRoute.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProtectedRoute
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$authContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/authContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useUserRole$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useUserRole.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function ProtectedRoute(param) {
    let { children, allowedRoles } = param;
    _s();
    const { user, loading: authLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$authContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const { role, loading: roleLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useUserRole$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUserRole"])();
    if (authLoading || roleLoading) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: "Cargando..."
    }, void 0, false, {
        fileName: "[project]/src/components/ProtectedRoute.tsx",
        lineNumber: 11,
        columnNumber: 42
    }, this);
    if (!user) {
        if ("TURBOPACK compile-time truthy", 1) {
            window.location.href = '/login';
        }
        return null;
    }
    if (allowedRoles && (!role || !allowedRoles.includes(role))) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: "No tienes permiso para acceder a esta página."
        }, void 0, false, {
            fileName: "[project]/src/components/ProtectedRoute.tsx",
            lineNumber: 20,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: children
    }, void 0, false);
}
_s(ProtectedRoute, "a/jGz3kxVnroYv6cFlJ/COK3SEU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$authContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useUserRole$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUserRole"]
    ];
});
_c = ProtectedRoute;
var _c;
__turbopack_context__.k.register(_c, "ProtectedRoute");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/styles/admin-dashboard.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "activityAction": "admin-dashboard-module__5BnUYq__activityAction",
  "activityCard": "admin-dashboard-module__5BnUYq__activityCard",
  "activityDate": "admin-dashboard-module__5BnUYq__activityDate",
  "activityTable": "admin-dashboard-module__5BnUYq__activityTable",
  "activityTitle": "admin-dashboard-module__5BnUYq__activityTitle",
  "activityUser": "admin-dashboard-module__5BnUYq__activityUser",
  "avatar": "admin-dashboard-module__5BnUYq__avatar",
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
  "sidebar": "admin-dashboard-module__5BnUYq__sidebar",
  "subtitle": "admin-dashboard-module__5BnUYq__subtitle",
  "title": "admin-dashboard-module__5BnUYq__title",
});
}),
"[project]/src/styles/admin-user-form.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "adminFormButton": "admin-user-form-module__4EYx6G__adminFormButton",
  "adminFormError": "admin-user-form-module__4EYx6G__adminFormError",
  "adminFormField": "admin-user-form-module__4EYx6G__adminFormField",
  "adminFormInput": "admin-user-form-module__4EYx6G__adminFormInput",
  "adminFormLabel": "admin-user-form-module__4EYx6G__adminFormLabel",
  "adminFormPhotoPreview": "admin-user-form-module__4EYx6G__adminFormPhotoPreview",
  "adminFormSelect": "admin-user-form-module__4EYx6G__adminFormSelect",
});
}),
"[project]/src/components/NextLink.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
;
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
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
"[project]/src/app/admin/usuarios/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminUsuariosPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProtectedRoute$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ProtectedRoute.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$admin$2d$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/styles/admin-dashboard.module.css [app-client] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$admin$2d$user$2d$form$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/styles/admin-user-form.module.css [app-client] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$UserCircleIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserCircleIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/@heroicons/react/24/outline/esm/UserCircleIcon.js [app-client] (ecmascript) <export default as UserCircleIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$AcademicCapIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AcademicCapIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/@heroicons/react/24/outline/esm/AcademicCapIcon.js [app-client] (ecmascript) <export default as AcademicCapIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ClipboardIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ClipboardIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/@heroicons/react/24/outline/esm/ClipboardIcon.js [app-client] (ecmascript) <export default as ClipboardIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NextLink$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/NextLink.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Button.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
// Botón de volver reutilizable
function BackToDashboardButton() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            marginBottom: 24
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NextLink$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            href: "/admin",
            style: {
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                color: 'var(--color-primary)',
                fontWeight: 500
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    width: "20",
                    height: "20",
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: "2",
                    viewBox: "0 0 24 24",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        d: "M15 19l-7-7 7-7"
                    }, void 0, false, {
                        fileName: "[project]/src/app/admin/usuarios/page.tsx",
                        lineNumber: 19,
                        columnNumber: 107
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/admin/usuarios/page.tsx",
                    lineNumber: 19,
                    columnNumber: 9
                }, this),
                "Volver al Dashboard"
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/admin/usuarios/page.tsx",
            lineNumber: 18,
            columnNumber: 3
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/admin/usuarios/page.tsx",
        lineNumber: 17,
        columnNumber: 3
    }, this);
}
_c = BackToDashboardButton;
const sidebarLinks = [
    {
        label: 'Crear Usuario',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$UserCircleIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserCircleIcon$3e$__["UserCircleIcon"],
        href: '/admin/usuarios',
        active: true
    },
    {
        label: 'Listado de usuarios',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$UserCircleIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserCircleIcon$3e$__["UserCircleIcon"],
        href: '/admin/usuarios/listado'
    },
    {
        label: 'Grados/Secciones',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$AcademicCapIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AcademicCapIcon$3e$__["AcademicCapIcon"],
        href: '/admin/grados'
    },
    {
        label: 'Matrícula',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ClipboardIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ClipboardIcon$3e$__["ClipboardIcon"],
        href: '/admin/matricula'
    }
];
function AdminUsuariosPage() {
    var _users_find;
    _s();
    const [users, setUsers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        name: '',
        email: '',
        role: 'admin',
        documentType: '',
        documentNumber: '',
        birthDate: '',
        phone: '',
        address: '',
        gender: '',
        photoUrl: ''
    });
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    //    firebaseUid: '', // Solo para edición, no para creación
    const [photoFile, setPhotoFile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [photoPreview, setPhotoPreview] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [editingId, setEditingId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [creating, setCreating] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    // Estado para errores de validación en tiempo real
    const [fieldErrors, setFieldErrors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    // Obtener usuarios al cargar
    // Cargar usuarios manualmente cuando sea necesario (ejemplo: con un botón o tras crear/editar)
    // Manejar cambios en el formulario
    // Validación en tiempo real
    const validateField = (name, value)=>{
        let error = '';
        if (name === 'name') {
            if (!value.trim()) error = 'El nombre es obligatorio.';
            else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]{3,}$/.test(value.trim())) error = 'El nombre debe tener solo letras y al menos 3 caracteres.';
        }
        if (name === 'email') {
            var _users_find;
            if (!value.trim()) error = 'El correo es obligatorio.';
            else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)) error = 'Correo inválido.';
            else if (users.some((u)=>u.email.toLowerCase() === value.toLowerCase()) && (!editingId || ((_users_find = users.find((u)=>u.id === editingId)) === null || _users_find === void 0 ? void 0 : _users_find.email) !== value)) error = 'Este correo ya está registrado.';
        }
        if (name === 'documentType') {
            if (!value.trim()) error = 'Tipo de documento obligatorio.';
        }
        if (name === 'documentNumber') {
            var _users_find1;
            if (!value.trim()) error = 'Número de documento obligatorio.';
            else if (!/^\d{5,}$/.test(value)) error = 'El número de documento debe ser numérico y mínimo 5 dígitos.';
            else if (users.some((u)=>u.documentNumber === value) && (!editingId || ((_users_find1 = users.find((u)=>u.id === editingId)) === null || _users_find1 === void 0 ? void 0 : _users_find1.documentNumber) !== value)) error = 'Este número de documento ya está registrado.';
        }
        if (name === 'birthDate') {
            if (!value.trim()) error = 'Fecha de nacimiento obligatoria.';
            else {
                const birth = new Date(value);
                const now = new Date();
                if (birth > now) error = 'La fecha de nacimiento no puede ser futura.';
                const age = now.getFullYear() - birth.getFullYear() - (now < new Date(now.getFullYear(), birth.getMonth(), birth.getDate()) ? 1 : 0);
                if (age < 5) error = 'La edad mínima es 5 años.';
            }
        }
        if (name === 'phone') {
            if (!value.trim()) error = 'Teléfono obligatorio.';
            else if (!/^\d{7,10}$/.test(value)) error = 'El teléfono debe tener entre 7 y 10 dígitos.';
            else if (value.startsWith('0')) error = 'El teléfono no debe empezar por 0.';
        }
        if (name === 'address') {
            if (!value.trim() || value.trim().length < 5) error = 'La dirección debe tener al menos 5 caracteres.';
        }
        if (name === 'gender') {
            if (![
                'M',
                'F',
                'O'
            ].includes(value)) error = 'Selecciona un género válido.';
        }
        if (name === 'photoUrl' && value) {
            if (!/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(value)) error = 'La foto debe ser una URL de imagen válida.';
        }
        return error;
    };
    const handleChange = (e)=>{
        const { name, value, type } = e.target;
        if (type === 'file' && name === 'photo') {
            var _files;
            const file = ((_files = e.target.files) === null || _files === void 0 ? void 0 : _files[0]) || null;
            setPhotoFile(file);
            if (file) {
                const reader = new FileReader();
                reader.onloadend = ()=>setPhotoPreview(reader.result);
                reader.readAsDataURL(file);
            } else {
                setPhotoPreview(null);
            }
        } else {
            setForm({
                ...form,
                [name]: value
            });
            setFieldErrors((prev)=>({
                    ...prev,
                    [name]: validateField(name, value)
                }));
        }
    };
    // Crear o editar usuario
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setCreating(true);
        setError('');
        // Validación global antes de enviar
        const newErrors = {
            name: validateField('name', form.name),
            email: validateField('email', form.email)
        };
        // No validar firebaseUid en creación
        setFieldErrors(newErrors);
        if (newErrors.name || newErrors.email) {
            setError('Por favor corrige los errores antes de guardar.');
            setCreating(false);
            return;
        }
        try {
            if (editingId) {
                const res = await fetch('/api/admin/usuarios', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: editingId,
                        name: form.name,
                        email: form.email,
                        role: form.role
                    })
                });
                if (!res.ok) {
                    const data = await res.json();
                    setError(data.error || 'Error al editar usuario');
                } else {
                    const updatedUser = await res.json();
                    setUsers((prev)=>prev.map((u)=>u.id === updatedUser.id ? updatedUser : u));
                    setForm({
                        name: '',
                        email: '',
                        role: 'admin',
                        documentType: '',
                        documentNumber: '',
                        birthDate: '',
                        phone: '',
                        address: '',
                        gender: '',
                        photoUrl: ''
                    });
                    setEditingId(null);
                }
            } else {
                const res = await fetch('/api/admin/usuarios', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(form)
                });
                if (!res.ok) {
                    const data = await res.json();
                    setError(data.error || 'Error al crear usuario');
                } else {
                    const newUser = await res.json();
                    setUsers((prev)=>[
                            ...prev,
                            newUser
                        ]);
                    setForm({
                        name: '',
                        email: '',
                        role: 'admin',
                        documentType: '',
                        documentNumber: '',
                        birthDate: '',
                        phone: '',
                        address: '',
                        gender: '',
                        photoUrl: ''
                    });
                }
            }
        } catch (err) {
            setError('Error de red');
        }
        setCreating(false);
    };
    // Eliminar usuario
    const handleDelete = async (id)=>{
        if (!window.confirm('¿Seguro que deseas eliminar este usuario?')) return;
        try {
            const res = await fetch('/api/admin/usuarios', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id
                })
            });
            if (!res.ok) {
                const data = await res.json();
                setError(data.error || 'Error al eliminar usuario');
            } else {
                setUsers((prev)=>prev.filter((u)=>u.id !== id));
            }
        } catch (err) {
            setError('Error de red');
        }
    };
    // Editar usuario (cargar datos en el formulario)
    const handleEdit = (user)=>{
        setForm({
            name: user.name || '',
            email: user.email,
            role: user.role,
            documentType: user.documentType || '',
            documentNumber: user.documentNumber || '',
            birthDate: user.birthDate ? user.birthDate.split('T')[0] : '',
            phone: user.phone || '',
            address: user.address || '',
            gender: user.gender || '',
            photoUrl: user.photoUrl || ''
        });
        setEditingId(user.id);
        setError('');
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProtectedRoute$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        allowedRoles: [
            "ADMIN"
        ],
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: "/favicon.ico",
                                    alt: "Admin",
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$admin$2d$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].avatar
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/usuarios/page.tsx",
                                    lineNumber: 274,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$admin$2d$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].logo,
                                    children: "AulaUnida"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/usuarios/page.tsx",
                                    lineNumber: 275,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/admin/usuarios/page.tsx",
                            lineNumber: 273,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$admin$2d$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].menu,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                style: {
                                    listStyle: 'none',
                                    padding: 0,
                                    margin: 0
                                },
                                children: sidebarLinks.map((link)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NextLink$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: link.href,
                                            className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$admin$2d$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].menuItem, " ").concat(pathname === link.href ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$admin$2d$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].menuItemActive : ''),
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(link.icon, {
                                                    style: {
                                                        width: 24,
                                                        height: 24,
                                                        marginRight: 16
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/admin/usuarios/page.tsx",
                                                    lineNumber: 282,
                                                    columnNumber: 21
                                                }, this),
                                                link.label
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/admin/usuarios/page.tsx",
                                            lineNumber: 281,
                                            columnNumber: 19
                                        }, this)
                                    }, link.label, false, {
                                        fileName: "[project]/src/app/admin/usuarios/page.tsx",
                                        lineNumber: 280,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/usuarios/page.tsx",
                                lineNumber: 278,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/admin/usuarios/page.tsx",
                            lineNumber: 277,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/admin/usuarios/page.tsx",
                    lineNumber: 272,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$admin$2d$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].mainContent,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BackToDashboardButton, {}, void 0, false, {
                            fileName: "[project]/src/app/admin/usuarios/page.tsx",
                            lineNumber: 292,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$admin$2d$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].title,
                            children: "Gestión de Usuarios"
                        }, void 0, false, {
                            fileName: "[project]/src/app/admin/usuarios/page.tsx",
                            lineNumber: 293,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$admin$2d$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].activityCard,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$admin$2d$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].activityTitle,
                                    children: editingId ? 'Editar Usuario' : 'Crear Usuario'
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/usuarios/page.tsx",
                                    lineNumber: 295,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                    className: "grid grid-cols-1 gap-6 bg-[#232734] p-8 rounded-xl shadow-lg",
                                    style: {
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(1, 1fr)',
                                        gap: '1.5rem'
                                    },
                                    onSubmit: handleSubmit,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'grid',
                                                gridTemplateColumns: 'repeat(3, 1fr)',
                                                gap: '1.5rem'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$admin$2d$user$2d$form$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].adminFormField,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$admin$2d$user$2d$form$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].adminFormLabel,
                                                            children: "Nombre completo"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/admin/usuarios/page.tsx",
                                                            lineNumber: 310,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$admin$2d$user$2d$form$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].adminFormInput,
                                                            placeholder: "Nombre completo",
                                                            name: "name",
                                                            value: form.name || '',
                                                            onChange: handleChange,
                                                            disabled: creating,
                                                            autoComplete: "off"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/admin/usuarios/page.tsx",
                                                            lineNumber: 311,
                                                            columnNumber: 19
                                                        }, this),
                                                        fieldErrors.name && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$admin$2d$user$2d$form$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].adminFormError,
                                                            children: fieldErrors.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/admin/usuarios/page.tsx",
                                                            lineNumber: 312,
                                                            columnNumber: 40
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/admin/usuarios/page.tsx",
                                                    lineNumber: 309,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$admin$2d$user$2d$form$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].adminFormField,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$admin$2d$user$2d$form$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].adminFormLabel,
                                                            children: "Correo electrónico"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/admin/usuarios/page.tsx",
                                                            lineNumber: 315,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$admin$2d$user$2d$form$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].adminFormInput,
                                                            placeholder: "Correo electrónico",
                                                            name: "email",
                                                            value: form.email || '',
                                                            onChange: handleChange,
                                                            disabled: creating,
                                                            type: "email",
                                                            autoComplete: "off"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/admin/usuarios/page.tsx",
                                                            lineNumber: 316,
                                                            columnNumber: 19
                                                        }, this),
                                                        fieldErrors.email && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$admin$2d$user$2d$form$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].adminFormError,
                                                            children: fieldErrors.email
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/admin/usuarios/page.tsx",
                                                            lineNumber: 317,
                                                            columnNumber: 41
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/admin/usuarios/page.tsx",
                                                    lineNumber: 314,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$admin$2d$user$2d$form$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].adminFormField,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$admin$2d$user$2d$form$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].adminFormLabel,
                                                            children: "Rol"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/admin/usuarios/page.tsx",
                                                            lineNumber: 320,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$admin$2d$user$2d$form$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].adminFormSelect,
                                                            name: "role",
                                                            value: form.role || '',
                                                            onChange: handleChange,
                                                            disabled: creating,
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "admin",
                                                                    children: "admin"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/admin/usuarios/page.tsx",
                                                                    lineNumber: 322,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "docente",
                                                                    children: "docente"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/admin/usuarios/page.tsx",
                                                                    lineNumber: 323,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "estudiante",
                                                                    children: "estudiante"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/admin/usuarios/page.tsx",
                                                                    lineNumber: 324,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/admin/usuarios/page.tsx",
                                                            lineNumber: 321,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/admin/usuarios/page.tsx",
                                                    lineNumber: 319,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/admin/usuarios/page.tsx",
                                            lineNumber: 304,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'grid',
                                                gridTemplateColumns: 'repeat(3, 1fr)',
                                                gap: '1.5rem'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$admin$2d$user$2d$form$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].adminFormField,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$admin$2d$user$2d$form$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].adminFormLabel,
                                                            children: "Tipo de documento"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/admin/usuarios/page.tsx",
                                                            lineNumber: 334,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$admin$2d$user$2d$form$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].adminFormSelect,
                                                            name: "documentType",
                                                            value: form.documentType || '',
                                                            onChange: handleChange,
                                                            disabled: creating,
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "",
                                                                    children: "Tipo de documento"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/admin/usuarios/page.tsx",
                                                                    lineNumber: 336,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "CC",
                                                                    children: "Cédula de ciudadanía"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/admin/usuarios/page.tsx",
                                                                    lineNumber: 337,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "TI",
                                                                    children: "Tarjeta de identidad"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/admin/usuarios/page.tsx",
                                                                    lineNumber: 338,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "CE",
                                                                    children: "Cédula de extranjería"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/admin/usuarios/page.tsx",
                                                                    lineNumber: 339,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "PAS",
                                                                    children: "Pasaporte"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/admin/usuarios/page.tsx",
                                                                    lineNumber: 340,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/admin/usuarios/page.tsx",
                                                            lineNumber: 335,
                                                            columnNumber: 19
                                                        }, this),
                                                        fieldErrors.documentType && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$admin$2d$user$2d$form$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].adminFormError,
                                                            children: fieldErrors.documentType
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/admin/usuarios/page.tsx",
                                                            lineNumber: 342,
                                                            columnNumber: 48
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/admin/usuarios/page.tsx",
                                                    lineNumber: 333,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$admin$2d$user$2d$form$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].adminFormField,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$admin$2d$user$2d$form$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].adminFormLabel,
                                                            children: "Número de documento"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/admin/usuarios/page.tsx",
                                                            lineNumber: 345,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$admin$2d$user$2d$form$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].adminFormInput,
                                                            placeholder: "Número de documento",
                                                            name: "documentNumber",
                                                            value: form.documentNumber || '',
                                                            onChange: handleChange,
                                                            disabled: creating,
                                                            autoComplete: "off"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/admin/usuarios/page.tsx",
                                                            lineNumber: 346,
                                                            columnNumber: 19
                                                        }, this),
                                                        fieldErrors.documentNumber && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$admin$2d$user$2d$form$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].adminFormError,
                                                            children: fieldErrors.documentNumber
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/admin/usuarios/page.tsx",
                                                            lineNumber: 347,
                                                            columnNumber: 50
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/admin/usuarios/page.tsx",
                                                    lineNumber: 344,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$admin$2d$user$2d$form$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].adminFormField,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$admin$2d$user$2d$form$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].adminFormLabel,
                                                            children: "Fecha de nacimiento"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/admin/usuarios/page.tsx",
                                                            lineNumber: 350,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$admin$2d$user$2d$form$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].adminFormInput,
                                                            type: "date",
                                                            name: "birthDate",
                                                            value: form.birthDate || '',
                                                            onChange: handleChange,
                                                            disabled: creating
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/admin/usuarios/page.tsx",
                                                            lineNumber: 351,
                                                            columnNumber: 19
                                                        }, this),
                                                        fieldErrors.birthDate && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$admin$2d$user$2d$form$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].adminFormError,
                                                            children: fieldErrors.birthDate
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/admin/usuarios/page.tsx",
                                                            lineNumber: 352,
                                                            columnNumber: 45
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/admin/usuarios/page.tsx",
                                                    lineNumber: 349,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/admin/usuarios/page.tsx",
                                            lineNumber: 328,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'grid',
                                                gridTemplateColumns: 'repeat(3, 1fr)',
                                                gap: '1.5rem'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$admin$2d$user$2d$form$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].adminFormField,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$admin$2d$user$2d$form$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].adminFormLabel,
                                                            children: "Teléfono"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/admin/usuarios/page.tsx",
                                                            lineNumber: 361,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$admin$2d$user$2d$form$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].adminFormInput,
                                                            placeholder: "Teléfono",
                                                            name: "phone",
                                                            value: form.phone || '',
                                                            onChange: handleChange,
                                                            disabled: creating,
                                                            autoComplete: "off"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/admin/usuarios/page.tsx",
                                                            lineNumber: 362,
                                                            columnNumber: 19
                                                        }, this),
                                                        fieldErrors.phone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$admin$2d$user$2d$form$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].adminFormError,
                                                            children: fieldErrors.phone
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/admin/usuarios/page.tsx",
                                                            lineNumber: 363,
                                                            columnNumber: 41
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/admin/usuarios/page.tsx",
                                                    lineNumber: 360,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$admin$2d$user$2d$form$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].adminFormField,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$admin$2d$user$2d$form$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].adminFormLabel,
                                                            children: "Dirección"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/admin/usuarios/page.tsx",
                                                            lineNumber: 366,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$admin$2d$user$2d$form$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].adminFormInput,
                                                            placeholder: "Dirección",
                                                            name: "address",
                                                            value: form.address || '',
                                                            onChange: handleChange,
                                                            disabled: creating,
                                                            autoComplete: "off"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/admin/usuarios/page.tsx",
                                                            lineNumber: 367,
                                                            columnNumber: 19
                                                        }, this),
                                                        fieldErrors.address && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$admin$2d$user$2d$form$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].adminFormError,
                                                            children: fieldErrors.address
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/admin/usuarios/page.tsx",
                                                            lineNumber: 368,
                                                            columnNumber: 43
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/admin/usuarios/page.tsx",
                                                    lineNumber: 365,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$admin$2d$user$2d$form$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].adminFormField,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$admin$2d$user$2d$form$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].adminFormLabel,
                                                            children: "Género"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/admin/usuarios/page.tsx",
                                                            lineNumber: 371,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$admin$2d$user$2d$form$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].adminFormSelect,
                                                            name: "gender",
                                                            value: form.gender || '',
                                                            onChange: handleChange,
                                                            disabled: creating,
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "",
                                                                    children: "Género"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/admin/usuarios/page.tsx",
                                                                    lineNumber: 373,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "M",
                                                                    children: "Masculino"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/admin/usuarios/page.tsx",
                                                                    lineNumber: 374,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "F",
                                                                    children: "Femenino"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/admin/usuarios/page.tsx",
                                                                    lineNumber: 375,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "O",
                                                                    children: "Otro"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/admin/usuarios/page.tsx",
                                                                    lineNumber: 376,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/admin/usuarios/page.tsx",
                                                            lineNumber: 372,
                                                            columnNumber: 19
                                                        }, this),
                                                        fieldErrors.gender && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$admin$2d$user$2d$form$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].adminFormError,
                                                            children: fieldErrors.gender
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/admin/usuarios/page.tsx",
                                                            lineNumber: 378,
                                                            columnNumber: 42
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/admin/usuarios/page.tsx",
                                                    lineNumber: 370,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/admin/usuarios/page.tsx",
                                            lineNumber: 355,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'grid',
                                                gridTemplateColumns: '1fr 2fr',
                                                gap: '1.5rem'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$admin$2d$user$2d$form$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].adminFormField,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$admin$2d$user$2d$form$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].adminFormLabel,
                                                            children: "Foto de perfil"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/admin/usuarios/page.tsx",
                                                            lineNumber: 387,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "file",
                                                            accept: "image/*",
                                                            name: "photo",
                                                            onChange: handleChange,
                                                            disabled: creating,
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$admin$2d$user$2d$form$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].adminFormInput
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/admin/usuarios/page.tsx",
                                                            lineNumber: 388,
                                                            columnNumber: 19
                                                        }, this),
                                                        photoPreview && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                            src: photoPreview,
                                                            alt: "Preview",
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$admin$2d$user$2d$form$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].adminFormPhotoPreview
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/admin/usuarios/page.tsx",
                                                            lineNumber: 390,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/admin/usuarios/page.tsx",
                                                    lineNumber: 386,
                                                    columnNumber: 17
                                                }, this),
                                                editingId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$admin$2d$user$2d$form$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].adminFormField,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$admin$2d$user$2d$form$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].adminFormLabel,
                                                            children: "Firebase UID"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/admin/usuarios/page.tsx",
                                                            lineNumber: 395,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$admin$2d$user$2d$form$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].adminFormInput,
                                                            placeholder: "Firebase UID",
                                                            name: "firebaseUid",
                                                            value: ((_users_find = users.find((u)=>u.id === editingId)) === null || _users_find === void 0 ? void 0 : _users_find.firebaseUid) || '',
                                                            disabled: true,
                                                            readOnly: true,
                                                            autoComplete: "off"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/admin/usuarios/page.tsx",
                                                            lineNumber: 396,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/admin/usuarios/page.tsx",
                                                    lineNumber: 394,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/admin/usuarios/page.tsx",
                                            lineNumber: 381,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "col-span-1 md:col-span-3 flex gap-2 mt-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    variant: "primary",
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$admin$2d$user$2d$form$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].adminFormButton + ' flex-1',
                                                    type: "submit",
                                                    disabled: creating || Object.values(fieldErrors).some(Boolean),
                                                    children: creating ? 'Creando...' : editingId ? 'Guardar' : 'Crear usuario'
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/admin/usuarios/page.tsx",
                                                    lineNumber: 401,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    variant: "ghost",
                                                    type: "button",
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$admin$2d$user$2d$form$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].adminFormButton + ' flex-1',
                                                    style: {
                                                        background: '#888',
                                                        color: '#fff'
                                                    },
                                                    onClick: ()=>{
                                                        setEditingId(null);
                                                        setForm({
                                                            name: '',
                                                            email: '',
                                                            role: 'admin',
                                                            documentType: '',
                                                            documentNumber: '',
                                                            birthDate: '',
                                                            phone: '',
                                                            address: '',
                                                            gender: '',
                                                            photoUrl: ''
                                                        });
                                                        setError('');
                                                    },
                                                    disabled: creating,
                                                    children: "Cancelar"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/admin/usuarios/page.tsx",
                                                    lineNumber: 404,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/admin/usuarios/page.tsx",
                                            lineNumber: 400,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/admin/usuarios/page.tsx",
                                    lineNumber: 296,
                                    columnNumber: 13
                                }, this),
                                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        color: 'red',
                                        marginTop: 12
                                    },
                                    children: error
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/usuarios/page.tsx",
                                    lineNumber: 409,
                                    columnNumber: 23
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/admin/usuarios/page.tsx",
                            lineNumber: 294,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/admin/usuarios/page.tsx",
                    lineNumber: 291,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/admin/usuarios/page.tsx",
            lineNumber: 270,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/admin/usuarios/page.tsx",
        lineNumber: 269,
        columnNumber: 5
    }, this);
}
_s(AdminUsuariosPage, "bi+XjWne7tom4DjIZgvP3+CL/DA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c1 = AdminUsuariosPage;
var _c, _c1;
__turbopack_context__.k.register(_c, "BackToDashboardButton");
__turbopack_context__.k.register(_c1, "AdminUsuariosPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_170f700d._.js.map