"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _routes = _interopRequireDefault(require("./auth/routes"));
const router = (0, _express.Router)();
router.get('/user', (req, res, next) => {
  res.send('Hello Wolrd!');
});
router.use('/auth', _routes.default);
var _default = exports.default = router;