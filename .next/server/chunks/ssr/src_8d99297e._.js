module.exports = [
"[project]/src/app/api/config.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "firebaseConfig",
    ()=>firebaseConfig
]);
const firebaseConfig = {
    apiKey: ("TURBOPACK compile-time value", "AIzaSyBwIoJmTpxDk1k7Oe74Msru0Vv_TbEL5fo"),
    authDomain: ("TURBOPACK compile-time value", "aulaunida-58506.firebaseapp.com"),
    projectId: ("TURBOPACK compile-time value", "aulaunida-58506"),
    storageBucket: ("TURBOPACK compile-time value", "aulaunida-58506.firebasestorage.app"),
    messagingSenderId: ("TURBOPACK compile-time value", "109632574576"),
    appId: ("TURBOPACK compile-time value", "1:109632574576:web:3b1e2f0"),
    measurementId: ("TURBOPACK compile-time value", "G-80F5JCMZQD")
};
}),
"[project]/src/lib/firebaseClient.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "app",
    ()=>app
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$app$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/app/dist/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/app/dist/esm/index.esm.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$config$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/api/config.tsx [app-ssr] (ecmascript)");
'use client';
;
;
// Inicializa y exporta la instancia de la app de Firebase
let app;
if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApps"])().length) {
    app = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["initializeApp"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$config$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["firebaseConfig"]);
} else {
    app = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApp"])();
}
;
}),
];

//# sourceMappingURL=src_8d99297e._.js.map