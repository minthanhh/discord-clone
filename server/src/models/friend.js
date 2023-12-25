import {Schema, model} from 'mongoose'

const friendSchema = new Schema({
	senderId: {
		type: Schema.Types.ObjectId,
		ref: 'users',
	},
	receiverId: {
		type: Schema.Types.ObjectId,
		ref: 'users',
	},
})

export const Friend = model('friends', friendSchema)
