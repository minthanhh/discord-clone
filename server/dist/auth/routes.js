"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _auth = require("./controllers/auth.controller");
var _express = require("express");
const router = (0, _express.Router)();
router.get('/login', _auth.login);
router.post('/register', _auth.register);
var _default = exports.default = router;