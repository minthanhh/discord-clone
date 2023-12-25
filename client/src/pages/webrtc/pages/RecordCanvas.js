import {Button} from 'antd'
import {useEffect, useRef, useState} from 'react'
import './record-canvas'

const RecordCanvas = () => {
	const videoRef = useRef(null)
	const canvasRef = useRef(null)
	const [stream, setStream] = useState(null)
	const [mediaRecorder, setMediaRecorder] = useState(null)
	const [recordBlobs, setRecordBlobs] = useState([])

	useEffect(() => {
		drawline()
	}, [])

	const drawline = () => {
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

	const handleStartCaptureCanvas = () => {
		navigator.mediaDevices
			.getDisplayMedia({video: {width: 2880, height: 1800}})
			.then((stream) => {
				stream
				videoRef.current.srcObject = stream
				setStream(stream)
				handleStartRecordCapture()
			})
			.catch(console.error)
	}

	const handleStartRecordCapture = () => {
		const recordedBlobs = []
		stream?.addEventListener('inactive', () => {
			handleStopRecordCapture()
		})
		const mediaRecorder = new MediaRecorder(stream, {mineType: 'video/webm'})

		mediaRecorder.ondataavailable = (e) => {
			if (e.data && e.data.size > 0) {
				recordedBlobs.push(e.data)
			}
		}
		mediaRecorder.start(10)
		setMediaRecorder(mediaRecorder)
		setRecordBlobs(recordBlobs)
	}

	const handleStopRecordCapture = () => {
		mediaRecorder?.stop()
		stream.getTracks().forEach((track) => track.stop())
		setStream(null)

		const blob = new Blob(recordBlobs, {type: 'video/webm'})
		const url = URL.createObjectURL(blob)

		const a = document.createElement('a')
		a.style.display = 'none'
		a.href = url
		a.download = 'canvas.webm'
		document.body.appendChild(a)
		a.click()
		setTimeout(() => {
			document.body.removeChild(a)
			URL.revokeObjectURL(url)
		}, 100)
	}

	return (
		<div className='container'>
			<h1>Record Canvas</h1>
			<video className='video' ref={videoRef} playsInline autoPlay></video>
			<div className='small-canvas'>
				<canvas ref={canvasRef}></canvas>
			</div>
			<Button onClick={handleStartCaptureCanvas}>Start Capture</Button>
			<Button onClick={handleStopRecordCapture}>Stop Capture Screen</Button>
		</div>
	)
}

export default RecordCanvas
