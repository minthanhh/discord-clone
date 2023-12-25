import {Token} from '../../../core/utilities'
import {User} from '../../../models'
import bcrypt from 'bcryptjs'

export const login = async (req, res) => {
	try {
		const {email, password} = req.body

		const user = await User.findOne({email})

		const passwordMatched = bcrypt.compare(password, user.password)

		if (!user && !passwordMatched)
			return res.status(400).json({message: 'Invalids credentials. Please try again', success: false})

		const token = Token.generateToken({userId: user._id, email: user.email})

		return res.status(200).json({user: {_id: user._id, username: user.username, email: user.email, token}})
	} catch (error) {
		return res.status(500).send('Something went wrong. Please try again')
	}
}

export const register = async (req, res) => {
	try {
		const {username, email, password} = req.body

		const userExists = await User.exists({email})
		if (userExists) return res.status(409).send('E-mail already in use.')

		const hashPassword = await bcrypt.hash(password, 10)
		const createdUser = await User.create({username, email, password: hashPassword})
		const token = Token.generateToken({userId: createdUser._id, email: createdUser.email})

		return res.status(201).json({
			user: {
				email: createdUser.email,
				username: createdUser.username,
				password: createdUser.password,
				_id: createdUser._id,
				token,
			},
		})
	} catch (error) {
		return res.status(500).send('Error occurred. Please try again')
	}
}
