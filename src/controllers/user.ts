import mongoose from 'mongoose'
import User from '../models/user'
import { Request, Response, NextFunction } from 'express'

/** Create User Controller **/
const CreateUser = async (req: Request, res: Response, next: NextFunction) => {
    const { firstName, lastName } = req.body

    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        firstName,
        lastName
    })

    return await user
        .save()
        .then((user) => res.status(201).json({ user }))
        .catch((error) => res.status(500).json({ error }))
}

/** Read User Controller **/
const ReadUser = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params

    return await User.findById(userId)
        .then((user) => {
            user ? res.status(200).json({ user }) : res.status(404).json({ message: 'Not found' })
        })
        .catch((error) => res.status(500).json({ error }))
}

/** Update User Controller **/
const UpdateUser = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params

    return await User.findById(userId)
        .then((user) => {
            if (!user) return res.status(404).json({ message: 'Not found' })
            user.set(req.body)
            return user
                .save()
                .then((user) => res.status(201).json({ user }))
                .catch((error) => res.status(500).json({ error }))
        })
        .catch((error) => res.status(500).json({ error }))
}

/** Delete User Controller **/
const DeleteUser = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params

    return await User.findByIdAndDelete({ _id: userId })
        .then((user) => {
            user ? res.status(201).json({ massage: 'Deleted' }) : res.status(404).json({ message: 'Not found' })
        })
        .catch((error) => res.status(500).json({ error }))
}

/** Read All User Controller **/
const ReadAll = async (req: Request, res: Response, next: NextFunction) => {
    return await User.find()
        .then((users) => res.status(200).json({ users }))
        .catch((error) => res.status(500).json({ error }))
}

export default { CreateUser, ReadUser, UpdateUser, DeleteUser, ReadAll }
