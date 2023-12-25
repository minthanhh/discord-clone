import React, {useEffect, useRef} from 'react'
const constraints = {
	audio: false,
	video: true,
}
const Canvas = () => {
	const videoRef = useRef(null)
	const canvasRef = useRef(null)

	useEffect(() => {
		handleOpenCamera()
	}, [])

	const handleOpenCamera = async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia(constraints)
			const video = videoRef.current
			video.srcObject = stream
		} catch (error) {
			console.log(error)
		}
	}

	const takeSnap = async () => {
		canvasRef.current.width = videoRef.current.clientWidth
		canvasRef.current.height = videoRef.current.clientHeight
		await canvasRef.current
			.getContext('2d')
			.drawImage(videoRef.current, 0, 0, canvasRef.current?.width, canvasRef.current?.height)
	}

	return (
		<div className='container'>
			<h1>
				<span>Open Audio</span>
			</h1>

			<div style={{display: 'flex', gap: 10}}>
				<video className='small-video' ref={videoRef} autoPlay playsInline></video>
				<canvas className='small-canvas' ref={canvasRef} autoPlay playsInline></canvas>
			</div>
			<button onClick={takeSnap}>Open</button>
		</div>
	)
}

export default Canvas
