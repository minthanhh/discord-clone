"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _inviteController = require("./controllers/invite.controller.js");
var _inviteValidator = require("./validators/invite.validator.js");
const router = (0, _express.Router)();
router.post('/invite', _inviteValidator.inviteValidator, _inviteController.invite);
var _default = exports.default = router;