import {useRef} from 'react'
const constraints = {
	audio: false,
	video: true,
}
const ScreenShare = () => {
	const videoRef = useRef(null)

	const handleStartShareScreen = async () => {
		try {
			const stream = await navigator.mediaDevices.getDisplayMedia(constraints)
			const audio = videoRef.current
			audio.srcObject = stream
		} catch (error) {
			console.log(error)
		}
	}
	return (
		<div className='container'>
			<h1 className='webrtc'>
				<span>Open Audio</span>
			</h1>

			<video className='video' ref={videoRef} controls autoPlay></video>
			<button onClick={handleStartShareScreen}>Open video</button>
		</div>
	)
}

export default ScreenShare
