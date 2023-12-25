import {useEffect, useRef, useState} from 'react'

const MediaStreamApi = () => {
	const videoRef = useRef(null)
	const [stream, setStream] = useState(null)

	useEffect(() => {
		openDevice()
	}, [])

	const openDevice = async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({video: true, audio: true})
			videoRef.current.srcObject = stream
			setStream(stream)
		} catch (error) {
			console.log(error)
		}
	}

	const handleGetTracks = () => {
		console.log(stream.getTracks())
	}

	const handleGetAudioTracks = () => {
		console.log(stream.getAudioTracks())
	}
	const handleGetVideoTracks = () => {
		console.log(stream.getVideoTracks())
	}
	const handleGetRemoveTracks = () => {
		setStream(stream.removeTrack(stream.getAudioTracks()[0]))
	}

	return (
		<div className='container'>
			<h1>Media Stream API</h1>
			<video className='video' ref={videoRef} playsInline autoPlay></video>
			<button onClick={handleGetTracks}>Get Tracks</button>
			<button onClick={handleGetAudioTracks}>Audio Tracks</button>
			<button onClick={handleGetVideoTracks}>Video Tracks</button>
			<button onClick={handleGetRemoveTracks}>Remove Tracks</button>
		</div>
	)
}

export default MediaStreamApi
