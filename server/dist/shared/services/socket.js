"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SocketService = void 0;
var _store = require("../../store");
var _middlewares = require("../middlewares");
var _providers = require("../providers");
class SocketService {
  static initializer(http) {
    const io = _providers.Socket.getInstance(http);
    io.use(_middlewares.socketCheckAuth);
    io.on('connection', socket => {
      _store.SocketStore.addNewConnectedUser(socket.id, socket.user._id);
      socket.on('disconnect', () => {
        _store.SocketStore.removeConnectedUser(socket.id);
      });
    });
  }
}
exports.SocketService = SocketService;