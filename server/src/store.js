function Store() {
	const _connectedUserIds = new Map()
	let _io

	const addNewConnectedUser = (socketId, userId) => {
		_connectedUserIds.set(socketId, {userId: userId.toString()})
		console.log(_connectedUserIds)
	}

	const removeConnectedUser = (socketId) => {
		if (_connectedUserIds.has(socketId)) {
			_connectedUserIds.delete(socketId)
			console.log(_connectedUserIds)
		}
	}

	const setSocketInstance = (io) => {
		_io = io
	}

	const getSocketInstance = () => _io

	const getActiveConnections = (userId) => {
		const activeConnections = []

		_connectedUserIds.forEach((value, key) => {
			if (value.userId === userId) activeConnections.push(key)
		})

		return activeConnections
	}

	return {addNewConnectedUser, removeConnectedUser, setSocketInstance, getActiveConnections, getSocketInstance}
}

export const SocketStore = Store()
