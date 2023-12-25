import {createSlice} from '@reduxjs/toolkit'
import {thunk} from '../hooks/thunk'
import {friendService} from '../../services'

export const sendFriendInvitations = thunk('friend/sendFriendInvitations', async (data) => {
	return await friendService.invite({targetEmailAddress: data.email})
})

export const acceptFriendInvitation = thunk('friend/acceptFriendInvitation', async (data) => {})
export const rejectFriendInvitation = thunk('friend/rejectFriendInvitation', async (data) => {})

const initialState = {
	listFriends: [],
	listOnlineUsers: [],
	pendingFriendsInvitations: [],
}

const friendSlice = createSlice({
	name: 'friend',
	initialState,
	reducers: {
		setListFriends: (state, action) => {
			state.listFriends = action.payload
		},
		setListOnlineUsers: (state, action) => {
			state.listOnlineUsers = action.payload
		},
		setPendingFriendsInvitations: (state, action) => {
			state.pendingFriendsInvitations = action.payload
		},
	},
	extraReducers: (builder) => {
		builder.addCase(sendFriendInvitations.fulfilled, (state, action) => {})
	},
})

export const PendingFriendsInvitations = (state) => state.friend.pendingFriendsInvitations
export const ListOnlineUsers = (state) => state.friend.listOnlineUsers
export const ListFriends = (state) => state.friend.listFriends

export const {setListFriends, setListOnlineUsers, setPendingFriendsInvitations} = friendSlice.actions
export default friendSlice.reducer
