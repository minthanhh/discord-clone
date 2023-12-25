import React, {useRef} from 'react'

const CaptureVideo = () => {
	const sourceVideoRef = useRef(null)
	const playerVideoRef = useRef(null)

	const handleCanPlay = () => {
		const fps = 0

		let stream

		stream = sourceVideoRef.current.captureStream(fps)
		playerVideoRef.current.srcObject = stream
	}

	return (
		<div className='container'>
			<h1>Capture video</h1>
			<video className='video' ref={sourceVideoRef} onCanPlay={handleCanPlay} playsInline loop muted autoPlay controls>
				<source src='./webrtc.mp4'></source>
			</video>
			<video className='video' ref={playerVideoRef} playsInline autoPlay></video>
		</div>
	)
}

export default CaptureVideo
