"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _user = require("./user");
Object.keys(_user).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _user[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _user[key];
    }
  });
});
var _friend = require("./friend");
Object.keys(_friend).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _friend[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _friend[key];
    }
  });
});