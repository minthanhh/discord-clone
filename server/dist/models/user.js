"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = void 0;
var _mongoose = require("mongoose");
const userSchema = new _mongoose.Schema({
  email: {
    type: String,
    unique: true
  },
  username: {
    type: String
  },
  password: {
    type: String
  },
  friends: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'users'
  }]
});
const User = exports.User = (0, _mongoose.model)('users', userSchema);