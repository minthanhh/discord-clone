import {Router} from 'express'
import {inviteValidator} from './validators/invite.validator.js'
import {invite, accept, reject} from './controllers'

const router = Router()

router.post('/invite', inviteValidator, invite)
router.post('/accept', inviteValidator, accept)
router.post('/reject', inviteValidator, reject)

export default router
