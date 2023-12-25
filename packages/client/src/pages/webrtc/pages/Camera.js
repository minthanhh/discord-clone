import {useRef} from 'react'

const constraints = {
	audio: false,
	video: true,
}

const Camera = () => {
	const videoRef = useRef(null)

	const handleOpenCamera = async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia(constraints)
			const video = videoRef.current
			video.srcObject = stream
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className='container'>
			<h1>
				<span>Open Camera</span>
			</h1>

			<video className='video' ref={videoRef} autoPlay playsInline></video>
			<button onClick={handleOpenCamera}>Open Camera</button>
		</div>
	)
}

export default Camera
