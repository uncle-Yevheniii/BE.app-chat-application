import express from 'express'
import http from 'http'
import mongoose from 'mongoose'

import { config } from './configure/configure'
import { Logger } from './helpers/Logger'

const application = express()

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
            Logger.info(`INFO incoming -> METHOD:[${req.method}] | URL:[${req.url}] - STATUS:[${res.statusCode}]`)
        })

        next()
    })

    application.use(express.json())
    application.use(express.urlencoded({ extended: true }))

    /** Routes **/

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
