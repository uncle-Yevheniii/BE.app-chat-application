import mongoose from 'mongoose'
import Chat from '../models/chat'
import User from '../models/user'
import { Request, Response, NextFunction } from 'express'

/** Get all Chat Controller **/
const StartChat = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.query
    const chat = Chat.find({ owner: userId })

    chat.then((chat) => {
        chat ? res.status(200).json({ chat }) : res.status(404).json({ message: 'Not found' })
    }).catch((error) => res.status(500).json({ error }))
}

/** Create User Controller **/
const CreateChat = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.query
    const { firstName, lastName } = req.body

    const readUser = await User.findById({ _id: userId })
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

/** Get all Chat Controller **/
const GetAllChat = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.query
    const chat = Chat.find({ owner: userId })

    return await chat
        .then((chat) => {
            chat ? res.status(200).json({ chat }) : res.status(404).json({ message: 'Not found' })
        })
        .catch((error) => res.status(500).json({ error }))
}

/** Get Chat Controller **/
const GetChat = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.query
    const { chatId } = req.params
    const chat = Chat.findOne({ owner: userId, _id: chatId })

    return await chat
        .then((chat) => {
            chat ? res.status(200).json({ chat }) : res.status(404).json({ message: 'Not found' })
        })
        .catch((error) => res.status(500).json({ error }))
}

/** Update Chat Controller **/
const UpdateChat = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.query
    const { chatId } = req.params

    return await Chat.findOne({ owner: userId, _id: chatId })
        .then((chat) => {
            if (!chat) return res.status(404).json({ message: 'Not found' })
            chat.set(req.body)
            return chat
                .save()
                .then((chat) => res.status(201).json({ chat }))
                .catch((error) => res.status(500).json({ error }))
        })
        .catch((error) => res.status(500).json({ error }))
}

/** Delete Chat Controller **/
const DeleteChat = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.query
    const { chatId } = req.params

    return await Chat.findOneAndDelete({ owner: userId, _id: chatId })
        .then((chat) => {
            chat ? res.status(201).json({ massage: 'Deleted' }) : res.status(404).json({ message: 'Not found' })
        })
        .catch((error) => res.status(500).json({ error }))
}
export default { StartChat, CreateChat, GetAllChat, GetChat, UpdateChat, DeleteChat }
