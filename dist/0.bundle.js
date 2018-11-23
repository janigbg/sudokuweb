(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./build/sudokuweb.js":
/*!****************************!*\
  !*** ./build/sudokuweb.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"]) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError(\"Invalid attempt to destructure non-iterable instance\"); } }; }(); /* tslint:disable */\n\n\nexports.get_puzzle = get_puzzle;\nexports.is_valid = is_valid;\n\nvar _sudokuweb_bg = __webpack_require__(/*! ./sudokuweb_bg */ \"./build/sudokuweb_bg.wasm\");\n\nvar wasm = _interopRequireWildcard(_sudokuweb_bg);\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nvar cachegetUint8Memory = null;\nfunction getUint8Memory() {\n    if (cachegetUint8Memory === null || cachegetUint8Memory.buffer !== wasm.memory.buffer) {\n        cachegetUint8Memory = new Uint8Array(wasm.memory.buffer);\n    }\n    return cachegetUint8Memory;\n}\n\nfunction getArrayU8FromWasm(ptr, len) {\n    return getUint8Memory().subarray(ptr / 1, ptr / 1 + len);\n}\n\nvar cachedGlobalArgumentPtr = null;\nfunction globalArgumentPtr() {\n    if (cachedGlobalArgumentPtr === null) {\n        cachedGlobalArgumentPtr = wasm.__wbindgen_global_argument_ptr();\n    }\n    return cachedGlobalArgumentPtr;\n}\n\nvar cachegetUint32Memory = null;\nfunction getUint32Memory() {\n    if (cachegetUint32Memory === null || cachegetUint32Memory.buffer !== wasm.memory.buffer) {\n        cachegetUint32Memory = new Uint32Array(wasm.memory.buffer);\n    }\n    return cachegetUint32Memory;\n}\n/**\n* @returns {Uint8Array}\n*/\nfunction get_puzzle() {\n    var retptr = globalArgumentPtr();\n    wasm.get_puzzle(retptr);\n    var mem = getUint32Memory();\n    var rustptr = mem[retptr / 4];\n    var rustlen = mem[retptr / 4 + 1];\n\n    var realRet = getArrayU8FromWasm(rustptr, rustlen).slice();\n    wasm.__wbindgen_free(rustptr, rustlen * 1);\n    return realRet;\n}\n\nfunction passArray8ToWasm(arg) {\n    var ptr = wasm.__wbindgen_malloc(arg.length * 1);\n    getUint8Memory().set(arg, ptr / 1);\n    return [ptr, arg.length];\n}\n/**\n* @param {Uint8Array} arg0\n* @returns {boolean}\n*/\nfunction is_valid(arg0) {\n    var _passArray8ToWasm = passArray8ToWasm(arg0),\n        _passArray8ToWasm2 = _slicedToArray(_passArray8ToWasm, 2),\n        ptr0 = _passArray8ToWasm2[0],\n        len0 = _passArray8ToWasm2[1];\n\n    return wasm.is_valid(ptr0, len0) !== 0;\n}\n\n//# sourceURL=webpack:///./build/sudokuweb.js?");

/***/ }),

/***/ "./build/sudokuweb_bg.wasm":
/*!*********************************!*\
  !*** ./build/sudokuweb_bg.wasm ***!
  \*********************************/
/*! exports provided: memory, __wbindgen_global_argument_ptr, get_puzzle, is_valid, __wbindgen_malloc, __wbindgen_free */
/***/ (function(module, exports, __webpack_require__) {

eval("\"use strict\";\n// Instantiate WebAssembly module\nvar wasmExports = __webpack_require__.w[module.i];\n__webpack_require__.r(exports);\n// export exports from WebAssembly module\nfor(var name in wasmExports) if(name != \"__webpack_init__\") exports[name] = wasmExports[name];\n// exec imports from WebAssembly module (for esm order)\n\n\n// exec wasm module\nwasmExports[\"__webpack_init__\"]()\n\n//# sourceURL=webpack:///./build/sudokuweb_bg.wasm?");

/***/ })

}]);