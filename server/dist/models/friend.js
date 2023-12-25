"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Friend = void 0;
var _mongoose = require("mongoose");
const friendSchema = new _mongoose.Schema({
  senderId: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  receiverId: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'users'
  }
});
const Friend = exports.Friend = (0, _mongoose.model)('friends', friendSchema);