import mongoose, { Document, Schema } from 'mongoose'

export interface IChat {
    firstName: string
    lastName: string

    owner: {
        type: Schema.Types.ObjectId
        ref: 'User'
        required: true
    }
}

export interface IChatModel extends IChat, Document {}

const UserSchema: Schema = new Schema(
    {
        firstName: { type: String },
        lastName: { type: String },

        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },

    {
        versionKey: false
    }
)

export default mongoose.model<IChatModel>('Chat', UserSchema)
