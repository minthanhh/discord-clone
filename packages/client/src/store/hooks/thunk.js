import {createAsyncThunk} from '@reduxjs/toolkit'
import {withToastForError} from '../error/handling.error'

export const thunk = (typePrefix, callback) => {
	return createAsyncThunk(typePrefix, withToastForError(callback))
}
