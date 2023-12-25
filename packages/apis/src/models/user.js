import {Schema, model} from 'mongoose'

const userSchema = new Schema({
	email: {type: String, unique: true},
	username: {type: String},
	password: {type: String},
	friends: [{type: Schema.Types.ObjectId, ref: 'users'}],
})

export const User = model('users', userSchema)
