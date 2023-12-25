"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Socket = void 0;
var _socket = require("socket.io");
class Socket extends _socket.Server {
  static instance;
  static options = {
    cors: 'http://localhost:3000'
  };
  constructor(http) {
    super(http, Socket.options);
  }
  static getInstance(http) {
    if (!Socket.instance) Socket.instance = new Socket(http);
    return Socket.instance;
  }
}
exports.Socket = Socket;