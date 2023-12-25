"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _jwt = require("./jwt");
Object.keys(_jwt).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _jwt[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _jwt[key];
    }
  });
});