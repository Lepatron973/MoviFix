/*! For license information please see src_pages_Profile_js.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunkmovifix=self.webpackChunkmovifix||[]).push([["src_pages_Profile_js"],{"./src/app/AppProfile.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");\n/* harmony import */ var _components_HeaderBlock__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/HeaderBlock */ "./src/components/HeaderBlock.js");\n/* harmony import */ var _components_Block__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/Block */ "./src/components/Block.js");\n/* harmony import */ var _components_Form__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/Form */ "./src/components/Form.js");\n/* harmony import */ var _components_ImageForm__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/ImageForm */ "./src/components/ImageForm.js");\n/* harmony import */ var _components_Input__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/Input */ "./src/components/Input.js");\n/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utilities */ "./src/utilities.js");\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\n\n\n\n\n\n\n\n\nvar AppProfile = function AppProfile() {\n  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),\n      _useState2 = _slicedToArray(_useState, 2),\n      firstname = _useState2[0],\n      setFirstName = _useState2[1];\n\n  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),\n      _useState4 = _slicedToArray(_useState3, 2),\n      lastname = _useState4[0],\n      setLastName = _useState4[1];\n\n  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),\n      _useState6 = _slicedToArray(_useState5, 2),\n      email = _useState6[0],\n      setEmail = _useState6[1];\n\n  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),\n      _useState8 = _slicedToArray(_useState7, 2),\n      password = _useState8[0],\n      setPassword = _useState8[1];\n\n  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),\n      _useState10 = _slicedToArray(_useState9, 2),\n      password2 = _useState10[0],\n      setPassword2 = _useState10[1];\n\n  var _useState11 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),\n      _useState12 = _slicedToArray(_useState11, 2),\n      status = _useState12[0],\n      setStatus = _useState12[1];\n\n  var _useState13 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),\n      _useState14 = _slicedToArray(_useState13, 2),\n      file = _useState14[0],\n      setFile = _useState14[1];\n\n  var _useState15 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),\n      _useState16 = _slicedToArray(_useState15, 2),\n      profile = _useState16[0],\n      setProfile = _useState16[1];\n\n  var _useState17 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"),\n      _useState18 = _slicedToArray(_useState17, 2),\n      img = _useState18[0],\n      setimg = _useState18[1];\n\n  var handleSubmit = function handleSubmit(e) {\n    // console.log(checkRegistrationPasswordIsOk(password,password2))\n    console.log((0,_utilities__WEBPACK_IMPORTED_MODULE_6__.checkValidEmail)(email));\n  };\n\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {\n    var req = (0,_utilities__WEBPACK_IMPORTED_MODULE_6__.AjaxRequest)("getProfile");\n    fetch(req).then(function (res) {\n      return res.json();\n    }).then(function (res) {\n      setFirstName(res.firstname);\n      setLastName(res.lastname);\n      setEmail(res.email);\n      setimg("/public/ressources/uploads/".concat(res.image));\n    });\n  }, []);\n  console.log(profile);\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_HeaderBlock__WEBPACK_IMPORTED_MODULE_1__["default"], {\n    title: "Profile"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_Block__WEBPACK_IMPORTED_MODULE_2__["default"], {\n    blockNumber: "2",\n    className: "block-profil-content container",\n    children: [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_Form__WEBPACK_IMPORTED_MODULE_3__["default"], {\n      method: "POST",\n      action: "/profile/update",\n      enctype: "multipart/form-data",\n      children: [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_ImageForm__WEBPACK_IMPORTED_MODULE_4__["default"], {\n        image: img\n      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {\n        className: "title"\n      }, " Modification du profile"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {\n        className: "input-icon"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("i", {\n        className: "fas fa-user"\n      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_Input__WEBPACK_IMPORTED_MODULE_5__["default"], {\n        type: "text",\n        name: "firstname",\n        placeHolder: "Nom",\n        value: firstname,\n        setValue: setFirstName\n      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {\n        className: "input-icon"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("i", {\n        className: "fas fa-user"\n      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_Input__WEBPACK_IMPORTED_MODULE_5__["default"], {\n        type: "text",\n        name: "lastname",\n        placeHolder: "Pr\\xE9nom",\n        value: lastname,\n        setValue: setLastName\n      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {\n        className: "input-icon"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("i", {\n        className: "fas fa-envelope"\n      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_Input__WEBPACK_IMPORTED_MODULE_5__["default"], {\n        type: "email",\n        name: "email",\n        placeHolder: "E-mail",\n        value: email,\n        setValue: setEmail\n      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {\n        className: "input-icon"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("i", {\n        className: "fas fa-lock"\n      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_Input__WEBPACK_IMPORTED_MODULE_5__["default"], {\n        customClass: "password",\n        name: "password",\n        type: status ? "text" : "password",\n        placeHolder: "Password",\n        value: password,\n        setValue: setPassword\n      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("i", {\n        className: status ? "fas fa-eye" : "fas fa-eye-slash",\n        onClick: function onClick() {\n          setStatus(!status);\n        }\n      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {\n        className: "input-icon"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("i", {\n        className: "fas fa-lock"\n      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_Input__WEBPACK_IMPORTED_MODULE_5__["default"], {\n        customClass: "password",\n        name: "confirm-password",\n        type: status ? "text" : "password",\n        placeHolder: "Confirmer Password",\n        value: password2,\n        setValue: setPassword2\n      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("i", {\n        className: status ? "fas fa-eye" : "fas fa-eye-slash",\n        onClick: function onClick() {\n          setStatus(!status);\n        }\n      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {\n        className: "input-icon"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_Input__WEBPACK_IMPORTED_MODULE_5__["default"], {\n        type: "file",\n        name: "image",\n        value: file,\n        setValue: setFile,\n        accept: ".jpg, .jpeg, .png, .svg"\n      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {\n        className: "input-icon"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_Input__WEBPACK_IMPORTED_MODULE_5__["default"], {\n        type: "submit",\n        name: "submit",\n        value: "Enregistrer"\n      }))]\n    })]\n  }));\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AppProfile);\n\n//# sourceURL=webpack://movifix/./src/app/AppProfile.js?')},"./src/components/Block.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");\n\n\nvar Block = function Block(props) {\n  var i = 0;\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("section", {\n    className: "block block-".concat(props.blockNumber)\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {\n    className: "block-".concat(props.blockNumber, "-content container ").concat(props.customClass)\n  }, props.children.map(function (elementDOM) {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.StrictMode, {\n      key: i++\n    }, elementDOM);\n  })));\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Block);\n\n//# sourceURL=webpack://movifix/./src/components/Block.js?')},"./src/components/Form.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");\n\n\nvar Form = function Form(props) {\n  var i = 0;\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("form", {\n    method: props.method,\n    action: props.action,\n    onSubmit: props.onSubmit,\n    encType: "multipart/form-data"\n  }, props.children.map(function (input) {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.StrictMode, {\n      key: i++\n    }, input);\n  }));\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Form);\n\n//# sourceURL=webpack://movifix/./src/components/Form.js?')},"./src/components/HeaderBlock.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");\n\n\nvar HeaderBlock = function HeaderBlock(props) {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("section", {\n    className: "block block-1 header-block"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {\n    className: "block-1-content container"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h1", null, props.title)));\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HeaderBlock);\n\n//# sourceURL=webpack://movifix/./src/components/HeaderBlock.js?')},"./src/components/ImageForm.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");\n\n\nvar ImageForm = function ImageForm(props) {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {\n    className: "form-image"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("img", {\n    src: props.image,\n    alt: "image du formulaire"\n  }));\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ImageForm);\n\n//# sourceURL=webpack://movifix/./src/components/ImageForm.js?')},"./src/components/Input.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");\n\n\nvar Input = function Input(props) {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", {\n    className: props.customClass,\n    type: props.type,\n    name: props.name,\n    placeholder: props.placeHolder,\n    value: props.value,\n    accept: props.accept,\n    onChange: function onChange(e) {\n      return props.setValue(e.target.value);\n    }\n  }));\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Input);\n\n//# sourceURL=webpack://movifix/./src/components/Input.js?')},"./src/pages/Profile.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");\n/* harmony import */ var _app_AppProfile__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../app/AppProfile */ "./src/app/AppProfile.js");\n\n\n\nreact_dom__WEBPACK_IMPORTED_MODULE_1__.render( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_app_AppProfile__WEBPACK_IMPORTED_MODULE_2__["default"], null), document.querySelector(".root"));\n\n//# sourceURL=webpack://movifix/./src/pages/Profile.js?')}}]);