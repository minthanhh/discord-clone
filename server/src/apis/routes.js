import {Router} from 'express'
import {checkAuth} from '../shared/middlewares'
import authRoutes from './auth/routes.js'
import friendRoutes from './friend/routes.js'

const router = Router()

router.use('/auth', authRoutes)
router.use('/friend', checkAuth, friendRoutes)

export default router
