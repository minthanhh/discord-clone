import Joi from 'joi'

export const friendInvitationSchema = Joi.object({
	targetEmailAddress: Joi.string().email().required(),
})
