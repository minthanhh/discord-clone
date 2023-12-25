"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _routes = _interopRequireDefault(require("./auth/routes.js"));
var _routes2 = _interopRequireDefault(require("./friend/routes.js"));
var _index = require("../shared/middlewares/index.js");
const router = (0, _express.Router)();
router.use('/auth', _routes.default);
router.use('/friend', _index.checkAuth, _routes2.default);
var _default = exports.default = router;