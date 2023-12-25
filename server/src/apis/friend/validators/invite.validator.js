import {createValidator} from 'express-joi-validation'
import {inviteSchema} from '../schema'

const validator = createValidator({})

export const inviteValidator = validator.body(inviteSchema)
