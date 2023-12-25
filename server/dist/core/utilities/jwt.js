"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Token = void 0;
var _jsonwebtoken = require("jsonwebtoken");
var _constants = require("../constants");
function JsonWebToken() {
  const _options = {
    expiresIn: _constants.Env.PRIVATE_EXPIRES_IN
  };
  const generateToken = payload => {
    return (0, _jsonwebtoken.sign)(payload, _constants.Env.PRIVATE_JWT_SECRET, _options);
  };
  const verifyToken = token => {
    return (0, _jsonwebtoken.verify)(token, _constants.Env.PRIVATE_JWT_SECRET, _options);
  };
  return {
    generateToken,
    verifyToken
  };
}
const Token = exports.Token = JsonWebToken();