import {Button} from 'antd'
import {useRef, useState} from 'react'

const RecordScreen = () => {
	const videoRef = useRef(null)
	const [stream, setStream] = useState(null)
	const [mediaRecorder, setMediaRecorder] = useState(null)
	const [recordBlobs, setRecordBlobs] = useState([])

	const handleStartCaptureScreen = () => {
		navigator.mediaDevices
			.getDisplayMedia({video: {width: 2880, height: 1800}})
			.then((stream) => {
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
		a.download = 'screen.webm'
		document.body.appendChild(a)
		a.click()
		setTimeout(() => {
			document.body.removeChild(a)
			URL.revokeObjectURL(url)
		}, 100)
	}

	return (
		<div className='container'>
			<h1>Record Screen</h1>
			<video className='video' ref={videoRef} playsInline autoPlay></video>
			<Button onClick={handleStartCaptureScreen}>Start Capture Screen</Button>
			<Button onClick={handleStopRecordCapture}>Stop Capture Screen</Button>
		</div>
	)
}

export default RecordScreen
