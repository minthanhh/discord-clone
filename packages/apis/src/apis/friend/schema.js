import Joi from 'joi'

export const inviteSchema = Joi.object({
	targetEmailAddress: Joi.string().email().required(),
})

export const acceptSchema = Joi.object({})

export const rejectSchema = Joi.object({})
