"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.socketCheckAuth = exports.checkAuth = void 0;
var _utilities = require("../../core/utilities");
var _models = require("../../models");
const checkAuth = async (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({
    message: 'A token is required for authentication!',
    success: false
  });
  try {
    const {
      userId,
      exp,
      iat
    } = _utilities.Token.verifyToken(token.split(' ')[1]);
    const user = await _models.User.findById({
      _id: userId
    });
    req.user = {
      _id: user._id,
      username: user.username,
      email: user.email,
      iat,
      exp
    };
  } catch (error) {
    return res.status(401).json({
      message: 'Invalid Token',
      success: false
    });
  }
  return next();
};
exports.checkAuth = checkAuth;
const socketCheckAuth = async (socket, next) => {
  const token = socket.handshake.auth?.token;
  try {
    const {
      userId,
      exp,
      iat
    } = _utilities.Token.verifyToken(token);
    const user = await _models.User.findById({
      _id: userId
    });
    socket.user = {
      _id: user._id,
      username: user.username,
      email: user.email,
      iat,
      exp
    };
  } catch (error) {
    return next(new Error('Not Authorized'));
  }
  next();
};
exports.socketCheckAuth = socketCheckAuth;