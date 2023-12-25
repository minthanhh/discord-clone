"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SocketStore = void 0;
function Store() {
  const _connectedUserIds = new Map();
  const addNewConnectedUser = (socketId, userId) => {
    _connectedUserIds.set(socketId, {
      userId: userId.toString()
    });
    console.log(_connectedUserIds);
  };
  const removeConnectedUser = socketId => {
    if (_connectedUserIds.has(socketId)) {
      _connectedUserIds.delete(socketId);
      console.log(_connectedUserIds);
    }
  };
  return {
    addNewConnectedUser,
    removeConnectedUser
  };
}
const SocketStore = exports.SocketStore = Store();