(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./build/sudokuweb.js":
/*!****************************!*\
  !*** ./build/sudokuweb.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nexports.__wbg_alert_3d854bb2a868d813 = __wbg_alert_3d854bb2a868d813;\nexports.greet = greet;\nexports.get_puzzle = get_puzzle;\n\nvar _sudokuweb_bg = __webpack_require__(/*! ./sudokuweb_bg */ \"./build/sudokuweb_bg.wasm\");\n\nvar wasm = _interopRequireWildcard(_sudokuweb_bg);\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nvar cachedTextDecoder = new TextDecoder('utf-8'); /* tslint:disable */\n\n\nvar cachegetUint8Memory = null;\nfunction getUint8Memory() {\n    if (cachegetUint8Memory === null || cachegetUint8Memory.buffer !== wasm.memory.buffer) {\n        cachegetUint8Memory = new Uint8Array(wasm.memory.buffer);\n    }\n    return cachegetUint8Memory;\n}\n\nfunction getStringFromWasm(ptr, len) {\n    return cachedTextDecoder.decode(getUint8Memory().subarray(ptr, ptr + len));\n}\n\nfunction __wbg_alert_3d854bb2a868d813(arg0, arg1) {\n    var varg0 = getStringFromWasm(arg0, arg1);\n    alert(varg0);\n}\n/**\n* @returns {void}\n*/\nfunction greet() {\n    return wasm.greet();\n}\n\nfunction getArrayU8FromWasm(ptr, len) {\n    return getUint8Memory().subarray(ptr / 1, ptr / 1 + len);\n}\n\nvar cachedGlobalArgumentPtr = null;\nfunction globalArgumentPtr() {\n    if (cachedGlobalArgumentPtr === null) {\n        cachedGlobalArgumentPtr = wasm.__wbindgen_global_argument_ptr();\n    }\n    return cachedGlobalArgumentPtr;\n}\n\nvar cachegetUint32Memory = null;\nfunction getUint32Memory() {\n    if (cachegetUint32Memory === null || cachegetUint32Memory.buffer !== wasm.memory.buffer) {\n        cachegetUint32Memory = new Uint32Array(wasm.memory.buffer);\n    }\n    return cachegetUint32Memory;\n}\n/**\n* @returns {Uint8Array}\n*/\nfunction get_puzzle() {\n    var retptr = globalArgumentPtr();\n    wasm.get_puzzle(retptr);\n    var mem = getUint32Memory();\n    var rustptr = mem[retptr / 4];\n    var rustlen = mem[retptr / 4 + 1];\n\n    var realRet = getArrayU8FromWasm(rustptr, rustlen).slice();\n    wasm.__wbindgen_free(rustptr, rustlen * 1);\n    return realRet;\n}\n\n//# sourceURL=webpack:///./build/sudokuweb.js?");

/***/ }),

/***/ "./build/sudokuweb_bg.wasm":
/*!*********************************!*\
  !*** ./build/sudokuweb_bg.wasm ***!
  \*********************************/
/*! exports provided: memory, __wbindgen_global_argument_ptr, greet, get_puzzle, __wbindgen_free */
/***/ (function(module, exports, __webpack_require__) {

eval("\"use strict\";\n// Instantiate WebAssembly module\nvar wasmExports = __webpack_require__.w[module.i];\n__webpack_require__.r(exports);\n// export exports from WebAssembly module\nfor(var name in wasmExports) if(name != \"__webpack_init__\") exports[name] = wasmExports[name];\n// exec imports from WebAssembly module (for esm order)\n/* harmony import */ var m0 = __webpack_require__(/*! ./sudokuweb */ \"./build/sudokuweb.js\");\n/* harmony import */ var m0_default = /*#__PURE__*/__webpack_require__.n(m0);\n\n\n// exec wasm module\nwasmExports[\"__webpack_init__\"]()\n\n//# sourceURL=webpack:///./build/sudokuweb_bg.wasm?");

/***/ })

}]);