"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _socket = require("./socket");
Object.keys(_socket).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _socket[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _socket[key];
    }
  });
});