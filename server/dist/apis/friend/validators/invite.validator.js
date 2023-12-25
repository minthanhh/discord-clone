"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.inviteValidator = void 0;
var _expressJoiValidation = require("express-joi-validation");
var _invite = require("../schemas/invite.schema");
const validator = (0, _expressJoiValidation.createValidator)({});
const inviteValidator = exports.inviteValidator = validator.body(_invite.inviteSchema);