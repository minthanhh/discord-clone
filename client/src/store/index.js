import {configureStore} from '@reduxjs/toolkit'
import authReducer from './slices/auth.slice'
import friendSlice from './slices/friend.slice'

const store = configureStore({
	reducer: {
		auth: authReducer,
		friend: friendSlice,
	},
})

export default store
