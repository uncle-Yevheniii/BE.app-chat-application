import mongoose from 'mongoose'
import Chat from '../models/chat'
import Massages from '../models/massages'
import { Request, Response, NextFunction } from 'express'

/** Create User Controller **/
const CreateChat = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.query
    const { firstName, lastName } = req.body

    const readUser = await Massages.findById({ _id: userId })
    !readUser && res.status(404).json({ message: 'Not found' })

    const chat = new Chat({
        _id: new mongoose.Types.ObjectId(),
        firstName,
        lastName,
        owner: readUser._id
    })

    return await chat
        .save()
        .then((chat) => res.status(201).json({ chat }))
        .catch((error) => res.status(500).json({ error }))
}
