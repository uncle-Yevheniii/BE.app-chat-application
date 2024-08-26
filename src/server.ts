import express from 'express'
import http from 'http'
import mongoose from 'mongoose'
import cors from 'cors'

import { config } from './configure/configure'
import { Logger } from './helpers/Logger'
import { router as userRouters } from './routers/user'
import { router as chatRouters } from './routers/chat'

const application = express()

/** CORS Configuration **/
application.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true
    })
)

/** Connect to MongoDB **/
mongoose.Promise = global.Promise
mongoose
    .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
        Logger.info('Connected to MongoDB')
        ServerStarter()
    })
    .catch((error) => {
        Logger.error(error)
    })

/** Server Starter if connected to MongoDB ***/
const ServerStarter = () => {
    application.use((req, res, next) => {
        /** Log incoming request **/
        Logger.info(`INFO incoming -> METHOD:[${req.method}] | URL:[${req.url}]`)

        res.on('finish', () => {
            /** Log outgoing response **/
            Logger.info(`INFO incoming -> METHOD:[${req.method}] | URL:[${req.url}] | STATUS:[${res.statusCode}] | IP:[${req.socket.remoteAddress}]`)
        })

        next()
    })

    application.use(express.json())
    application.use(express.urlencoded({ extended: true }))

    /** Routes **/
    application.use('/users', userRouters)
    application.use('/chats', chatRouters)

    /** Health Check **/
    application.get('/ping', (req, res, next) => res.status(200).json({ message: 'pong' }))

    /** Error Handler **/
    application.use((req, res, next) => {
        const error = new Error('Not Found')
        Logger.error(error)

        return res.status(404).json({ message: error.message })
    })

    http.createServer(application).listen(config.server.port, () => Logger.info(`Server running on port ${config.server.port}.`))
}
