"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.register = exports.login = void 0;
var _utilities = require("../../../core/utilities");
var _models = require("../../../models");
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
const login = async (req, res) => {
  try {
    const {
      email,
      password
    } = req.body;
    const user = await _models.User.findOne({
      email
    });
    const passwordMatched = _bcryptjs.default.compare(password, user.password);
    if (!user && !passwordMatched) return res.status(400).json({
      message: 'Invalids credentials. Please try again',
      success: false
    });
    const token = _utilities.Token.generateToken({
      userId: user._id,
      email: user.email
    });
    return res.status(200).json({
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        token
      }
    });
  } catch (error) {
    return res.status(500).send('Something went wrong. Please try again');
  }
};
exports.login = login;
const register = async (req, res) => {
  try {
    const {
      username,
      email,
      password
    } = req.body;
    const userExists = await _models.User.exists({
      email
    });
    if (userExists) return res.status(409).send('E-mail already in use.');
    const hashPassword = await _bcryptjs.default.hash(password, 10);
    const createdUser = await _models.User.create({
      username,
      email,
      password: hashPassword
    });
    const token = _utilities.Token.generateToken({
      userId: createdUser._id,
      email: createdUser.email
    });
    return res.status(201).json({
      user: {
        email: createdUser.email,
        username: createdUser.username,
        password: createdUser.password,
        _id: createdUser._id,
        token
      }
    });
  } catch (error) {
    return res.status(500).send('Error occurred. Please try again');
  }
};
exports.register = register;