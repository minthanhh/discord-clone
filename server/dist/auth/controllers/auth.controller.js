"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.register = exports.login = void 0;
const login = (req, res) => {
  res.send({
    success: true,
    message: 'Successfully'
  });
};
exports.login = login;
const register = (req, res) => {
  res.send({
    success: true,
    message: 'Successfully'
  });
};
exports.register = register;