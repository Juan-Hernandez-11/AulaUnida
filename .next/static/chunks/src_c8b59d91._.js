(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/app/estudiante/boletin/BoletinPDF.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BoletinPDF
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2f$dist$2f$jspdf$2e$es$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jspdf/dist/jspdf.es.min.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$authContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/authContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function BoletinPDF(param) {
    let { estudianteId, estudianteUid, cicloId } = param;
    _s();
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$authContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const generarPDF = async ()=>{
        setLoading(true);
        try {
            var _data_estudiante_estudianteGrados_, _data_estudiante_estudianteGrados, _grado_sede, _grado_ciclo;
            const token = user ? await user.getIdToken() : null;
            const params = new URLSearchParams();
            // Solo necesitamos cicloId; el backend usa el token para identificar al estudiante
            params.set('cicloId', String(cicloId));
            const res = await fetch("/api/estudiante/boletin?".concat(params.toString()), {
                headers: {
                    ...token ? {
                        Authorization: "Bearer ".concat(token)
                    } : {}
                }
            });
            const data = await res.json();
            if (!data.estudiante || !Array.isArray(data.notas)) {
                setLoading(false);
                alert("No se encontraron datos para el boletín");
                return;
            }
            const doc = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2f$dist$2f$jspdf$2e$es$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]();
            // Encabezado
            doc.setFontSize(16);
            doc.text("Boletín Académico", 20, 20);
            doc.setFontSize(12);
            doc.text("Nombre: ".concat(data.estudiante.name || "-"), 20, 35);
            doc.text("Documento: ".concat(data.estudiante.documentNumber || "-"), 20, 42);
            const grado = (_data_estudiante_estudianteGrados = data.estudiante.estudianteGrados) === null || _data_estudiante_estudianteGrados === void 0 ? void 0 : (_data_estudiante_estudianteGrados_ = _data_estudiante_estudianteGrados[0]) === null || _data_estudiante_estudianteGrados_ === void 0 ? void 0 : _data_estudiante_estudianteGrados_.grado;
            doc.text("Grado: ".concat((grado === null || grado === void 0 ? void 0 : grado.nombre) || "-", " ").concat((grado === null || grado === void 0 ? void 0 : grado.seccion) || ""), 20, 49);
            doc.text("Sede: ".concat((grado === null || grado === void 0 ? void 0 : (_grado_sede = grado.sede) === null || _grado_sede === void 0 ? void 0 : _grado_sede.nombre) || "-"), 20, 56);
            doc.text("Ciclo: ".concat((grado === null || grado === void 0 ? void 0 : (_grado_ciclo = grado.ciclo) === null || _grado_ciclo === void 0 ? void 0 : _grado_ciclo.nombre) || "-"), 20, 63);
            // Tabla de notas
            doc.text("Materia", 20, 75);
            doc.text("Periodo", 80, 75);
            doc.text("Nota", 140, 75);
            let y = 85;
            data.notas.forEach((n)=>{
                doc.text(n.materia.nombre, 20, y);
                doc.text(n.periodo.nombre, 80, y);
                doc.text(String(n.valor), 140, y);
                y += 8;
            });
            doc.save("boletin.pdf");
            setLoading(false);
        } catch (err) {
            console.error('Error generando PDF', err);
            setLoading(false);
            alert('Error al generar el boletín');
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: generarPDF,
        disabled: loading,
        style: {
            marginTop: 20
        },
        children: loading ? "Generando PDF..." : "Descargar Boletín PDF"
    }, void 0, false, {
        fileName: "[project]/src/app/estudiante/boletin/BoletinPDF.tsx",
        lineNumber: 60,
        columnNumber: 5
    }, this);
}
_s(BoletinPDF, "y0Na2gzk1LgNV72vBZPL4fEi+8k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$authContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = BoletinPDF;
var _c;
__turbopack_context__.k.register(_c, "BoletinPDF");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/styles/estudiante-notas.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "container": "estudiante-notas-module__OWwLgG__container",
  "empty": "estudiante-notas-module__OWwLgG__empty",
  "smallButton": "estudiante-notas-module__OWwLgG__smallButton",
  "table": "estudiante-notas-module__OWwLgG__table",
  "title": "estudiante-notas-module__OWwLgG__title",
});
}),
"[project]/src/app/estudiante/boletin/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BoletinPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$estudiante$2f$boletin$2f$BoletinPDF$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/estudiante/boletin/BoletinPDF.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$authContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/authContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$estudiante$2d$notas$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/styles/estudiante-notas.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function BoletinPage() {
    _s();
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$authContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const cicloId = 1; // por ahora fijo, podría venir de user/selección
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$estudiante$2d$notas$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].container,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$estudiante$2d$notas$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].title,
                children: "Boletín"
            }, void 0, false, {
                fileName: "[project]/src/app/estudiante/boletin/page.tsx",
                lineNumber: 15,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: "Descarga tu boletín académico en PDF."
            }, void 0, false, {
                fileName: "[project]/src/app/estudiante/boletin/page.tsx",
                lineNumber: 16,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginTop: 12
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$estudiante$2f$boletin$2f$BoletinPDF$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    cicloId: cicloId,
                    estudianteUid: user === null || user === void 0 ? void 0 : user.uid
                }, void 0, false, {
                    fileName: "[project]/src/app/estudiante/boletin/page.tsx",
                    lineNumber: 18,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/estudiante/boletin/page.tsx",
                lineNumber: 17,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginTop: 20
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>router.push('/estudiante'),
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$estudiante$2d$notas$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].smallButton,
                    children: "Volver al panel"
                }, void 0, false, {
                    fileName: "[project]/src/app/estudiante/boletin/page.tsx",
                    lineNumber: 21,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/estudiante/boletin/page.tsx",
                lineNumber: 20,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/estudiante/boletin/page.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
_s(BoletinPage, "/ipm2DYjne/lfnn1P5PW8H/SkGk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$authContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = BoletinPage;
var _c;
__turbopack_context__.k.register(_c, "BoletinPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_c8b59d91._.js.map