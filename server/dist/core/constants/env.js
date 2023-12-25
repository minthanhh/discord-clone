"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Env = void 0;
class Env {
  static PRIVATE_JWT_SECRET = process.env.PRIVATE_JWT_SECRET;
  static PRIVATE_EXPIRES_IN = process.env.PRIVATE_EXPIRES_IN;
  static MONGODB_URL = process.env.MONGODB_URL;
}
exports.Env = Env;