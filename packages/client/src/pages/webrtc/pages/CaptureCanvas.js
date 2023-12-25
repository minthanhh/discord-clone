import {useEffect, useRef} from 'react'

const CaptureCanvas = () => {
	const canvasRef = useRef(null)
	const videoRef = useRef(null)

	useEffect(() => {
		startCaptureCanvas()
	}, [])

	const startCaptureCanvas = async () => {
		const stream = canvasRef.current.captureStream(10)
		videoRef.current.srcObject = stream

		const context = canvasRef.current.getContext('2d')

		context.fillStyle = '#ccc'
		context.fillRect(0, 0, 320, 240)
		context.strokeStyle = '#ff000'

		canvasRef.current.addEventListener('mousedown', (e) => {
			context.beginPath()
			context.moveTo(e.offsetX, e.offsetY)
			context.stroke()

			canvasRef.current.addEventListener('mousemove', (e) => {
				context.lineTo(e.offsetX, e.offsetY)
				context.stroke()
			})
		})
		canvasRef.current.addEventListener('mouseup', (e) => {
			canvasRef.current.removeEventListener('mousemove', (e) => {
				context.lineTo(e.offsetX, e.offsetY)
				context.stroke()
			})
		})
	}

	return (
		<div className='container'>
			<h1>Capture Canvas</h1>
			<div className='small-canvas'>
				<canvas ref={canvasRef}></canvas>
			</div>
			<video className='small-video' ref={videoRef} playsInline autoPlay></video>
		</div>
	)
}

export default CaptureCanvas
