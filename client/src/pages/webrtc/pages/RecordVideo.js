import {useRef, useState} from 'react'
import './record.css'

const RecordVideo = () => {
	const videoPreviewRef = useRef(null)
	const videoPlayerRef = useRef(null)
	const [status, setStatus] = useState('start')
	const [mediaRecorder, setMediaRecorder] = useState(null)
	const [stream, setStream] = useState(null)
	const [recordBlobs, setRecordBlobs] = useState([])

	const handleStartVideo = async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				audio: true,
				video: {width: 1280, height: 720},
			})
			videoPreviewRef.current.srcObject = stream
			setStream(stream)
			setStatus('startRecord')
		} catch (error) {
			console.error(error)
		}
	}
	const hanldeStartRecordVideo = () => {
		const recordedBlobs = []
		let options = {mineType: 'video/webm;codecs=vp9'}

		if (!MediaRecorder.isTypeSupported(options.mineType)) {
			options = {mineType: 'video/webm;codecs=vp8'}
			if (!MediaRecorder.isTypeSupported(options.mineType)) {
				options = {mineType: 'video/webm'}
				if (!MediaRecorder.isTypeSupported(options.mineType)) {
					options = {mineType: ''}
				}
			}
		}

		const mediaRecorder = new MediaRecorder(stream, options)

		mediaRecorder.ondataavailable = (e) => {
			if (e.data && e.data.size > 0) {
				console.log(e.data)
				recordedBlobs.push(e.data)
			}
		}

		mediaRecorder.start(10)
		setStatus('stopRecord')
		setRecordBlobs(recordedBlobs)
		setMediaRecorder(mediaRecorder)
	}
	const handleStopRecordVideo = () => {
		mediaRecorder.stop()
		setStatus('play')
	}
	const handlePlayRecord = () => {
		const blob = new Blob(recordBlobs, {type: 'video/webm'})
		videoPlayerRef.current.src = null
		videoPlayerRef.current.src = URL.createObjectURL(blob)
		videoPlayerRef.current.controls = true
		videoPlayerRef.current.play()
		setStatus('download')
	}
	const handleDownloadRecord = () => {
		const blob = new Blob(recordBlobs, {type: 'video/webm'})
		const url = URL.createObjectURL(blob)

		const a = document.createElement('a')
		a.style.display = 'none'
		a.href = url
		a.download = 'test.ogg'
		document.body.appendChild(a)
		a.click()
		setTimeout(() => {
			document.body.removeChild(a)
			URL.revokeObjectURL(url)
		}, 100)
		setStatus('start')
	}

	return (
		<div className='container'>
			<h1>Record Video</h1>
			<video className='small-video' ref={videoPreviewRef} playsInline autoPlay muted></video>
			<video className='small-video' ref={videoPlayerRef} playsInline autoPlay muted></video>
			<div>
				<button className='button' onClick={handleStartVideo} disabled={status !== 'start'}>
					Start
				</button>

				<button className='button' onClick={hanldeStartRecordVideo} disabled={status !== 'startRecord'}>
					Start Record
				</button>

				<button className='button' onClick={handleStopRecordVideo} disabled={status !== 'stopRecord'}>
					Stop Record
				</button>
				<button className='button' onClick={handlePlayRecord} disabled={status !== 'play'}>
					Play Record
				</button>
				<button className='button' onClick={handleDownloadRecord} disabled={status !== 'download'}>
					Download Record
				</button>
			</div>
		</div>
	)
}

export default RecordVideo
