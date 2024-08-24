import Joi, { ObjectSchema } from 'joi'
import { Request, Response, NextFunction } from 'express'
import { Logger } from '../helpers/Logger'
import { IUser } from '../models/user'

export const ValidationSchema = (schema: ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validateAsync(req.body)

            next()
        } catch (error) {
            Logger.error(error)
            return res.status(422).json({ error })
        }
    }
}

export const Schema = {
    user: {
        create: Joi.object<IUser>({
            firstName: Joi.string().min(3).required(),
            lastName: Joi.string().min(3).required()
        }),
        update: Joi.object<IUser>({
            firstName: Joi.string().min(3).required(),
            lastName: Joi.string().min(3).required()
        })
    }
}
