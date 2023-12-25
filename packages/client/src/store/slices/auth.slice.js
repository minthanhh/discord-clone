import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {withToastForError} from '../error/handling.error'
import {authService} from '../../services'

class ThunkAuth {
	login = createAsyncThunk(
		'auth/login',
		withToastForError(async (credentials) => {
			return (await authService.login(credentials)).data
		}),
	)
}

export const thunkAuth = new ThunkAuth()
const initialState = {
	user: null,
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(thunkAuth.login.fulfilled, (state, action) => {
			if (action.payload) {
				const {user} = action.payload
				state.user = user
				localStorage.setItem('token', user.token)
			}
		})
	},
})

export const {login, setUser} = authSlice.actions
export default authSlice.reducer
