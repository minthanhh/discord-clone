"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.inviteSchema = void 0;
var _joi = _interopRequireDefault(require("joi"));
const inviteSchema = exports.inviteSchema = _joi.default.object({
  targetEmailAddress: _joi.default.string().email().required()
});