import mongoose, { Document, Schema } from 'mongoose'

export interface IMassages {
    massages: {
        user_text: string
        quotation_text: string
        date: Date
    }
    owner: {
        type: Schema.Types.ObjectId
        ref: 'User'
        required: true
    }
}

export interface IMassagesModel extends IMassages, Document {}

const UserSchema: Schema = new Schema(
    {
        massages: {
            user_text: { type: String },
            quotation_text: { type: String },
            date: { type: Date }
        },
        ownerChat: {
            type: Schema.Types.ObjectId,
            ref: 'Chat',
            required: true
        }
    },

    {
        versionKey: false
    }
)

export default mongoose.model<IMassagesModel>('Massages', UserSchema)
