import {useRef, useState} from 'react'

const PeerConnection = () => {
	const localRef = useRef(null)
	const remoteRef = useRef(null)
	let peerConnectionA
	let peerConnectionB
	const [localStream, setLocalStream] = useState(null)

	const start = () => {
		navigator.mediaDevices
			.getUserMedia({audio: true, video: true})
			.then((stream) => {
				localRef.current.srcObject = stream
				setLocalStream(stream)
			})
			.catch(console.error)
	}

	const call = async () => {
		const configuaration = {iceServers: [{url: 'stun:stun.l.google.com:19302'}]}
		peerConnectionA = new RTCPeerConnection(configuaration)
		peerConnectionB = new RTCPeerConnection(configuaration)

		peerConnectionA.addEventListener('icecandidate', async (e) => {
			if (e.candidate) {
				await peerConnectionB.addIceCandidate(e.candidate)
			}
		})

		peerConnectionB.addEventListener('icecandidate', async (e) => {
			if (e.candidate) {
				await peerConnectionA.addIceCandidate(e.candidate)
			}
		})

		peerConnectionA.addEventListener('iceconnectionstatechange', () => {})
		peerConnectionB.addEventListener('iceconnectionstatechange', () => {})

		peerConnectionB.addEventListener('track', (e) => {
			if (remoteRef.current.srcObject !== e.streams[0]) {
				remoteRef.current.srcObject = e.streams[0]
			}
		})

		localStream.getTracks().forEach((track) => {
			peerConnectionA.addTrack(track, localStream)
		})

		try {
			const offer = await peerConnectionA.createOffer()
			await peerConnectionA.setLocalDescription(offer)
			await peerConnectionB.setRemoteDescription(offer)
			const answer = await peerConnectionB.createAnswer()
			await peerConnectionB.setLocalDescription(answer)
			await peerConnectionA.setRemoteDescription(answer)
		} catch (error) {}
	}

	const hangup = () => {
		peerConnectionA?.close()
		peerConnectionB?.close()
		peerConnectionA = null
		peerConnectionB = null
	}

	return (
		<div className='container'>
			<h1>
				<span>Open Camera</span>
			</h1>

			<video ref={localRef} autoPlay playsInline muted></video>
			<video ref={remoteRef} autoPlay playsInline></video>
			<button onClick={start}>Remote</button>
			<button onClick={call}>Remote</button>
			<button onClick={hangup}>Remote</button>
		</div>
	)
}

export default PeerConnection
