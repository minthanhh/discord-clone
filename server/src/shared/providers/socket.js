import {Server} from 'socket.io'

export class Socket extends Server {
	static instance
	static options = {cors: 'http://localhost:3000'}
	constructor(http) {
		super(http, Socket.options)
	}
	static getInstance(http) {
		if (!Socket.instance) Socket.instance = new Socket(http)
		return Socket.instance
	}
}
