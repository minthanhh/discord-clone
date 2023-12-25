import 'dotenv/config'
import mongoose from 'mongoose'
import express from 'express'
import {createServer} from 'http'
import {Env} from './core/constants'
import initialRoutes from './apis/routes'
import cors from 'cors'
import {SocketService} from './shared/services/socket'

const PORT = 3001
const app = express()
const http = createServer(app)
SocketService.initializer(http)

app.use(express.json())
app.use(cors())
app.use('/api/v1', initialRoutes)

mongoose
	.connect(Env.MONGODB_URL)
	.then(() => console.log('Connected'))
	.catch(console.error)

http.listen(PORT, () => console.log(`App listening on uri http://localhost:${PORT}`))
