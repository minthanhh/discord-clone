import {io} from 'socket.io-client'

class Socket {
	static instance
	static _uri = 'http://localhost:3001'
	static options = {transports: ['websocket'], autoConnect: true, reconnection: true}

	static getInstance(token) {
		if (!Socket.instance) {
			Socket.instance = io(Socket._uri, {...Socket.options, auth: {token}})
		}
		return Socket.instance
	}
}
export const socket = Socket.getInstance(localStorage.getItem('token') ? localStorage.getItem('token') : null)
