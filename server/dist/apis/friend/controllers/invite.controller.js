"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.invite = void 0;
var _models = require("../../../models");
const invite = async (req, res) => {
  const {
    targetEmailAddress
  } = req.body;
  if (req.user.email === targetEmailAddress) return res.status(409).json({
    success: false,
    message: 'Sorry. You can become friend with yourself!'
  });
  const targetUser = await _models.User.findOne({
    email: targetEmailAddress
  });
  if (!targetUser) return res.status(404).json({
    success: false,
    message: `Friend of ${targetEmailAddress} has not been found. Plase check email address.`
  });
  const invitationAlreadyReceived = await _models.Friend.findOne({
    senderId: req.user._id,
    receiverId: targetUser._id
  });
  if (invitationAlreadyReceived) return res.status(409).json({
    success: false,
    message: 'Invitation has been already sent'
  });
  const usersAlreadyExists = targetUser.friends.find(f => f._id.equals(req.user._id));
  if (usersAlreadyExists) return res.status(409).json({
    success: false,
    message: 'Friend already added. Please check friends list'
  });
  const createInvitation = await _models.Friend.create({
    senderId: req.user._id,
    receiverId: targetUser._id
  });
  return res.status(201).json({
    success: true,
    message: 'Invitation has been sent',
    invite: createInvitation
  });
};
exports.invite = invite;