import './index.css'
import {useRef, useState} from 'react'

const RecordAudio = () => {
	const audioRef = useRef(null)
	const [status, setStatus] = useState('start')
	const [stream, setStream] = useState(null)
	const [recordBlobs, setRecordBlobs] = useState([])
	let mediaRecorder

	const handleStartClick = async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({audio: true})
			setStream(stream)
			setStatus('startRecord')
		} catch (error) {
			console.error(error)
		}
	}
	const handleRecordAudio = () => {
		const recordBlobs = []
		try {
			const mediaRecorder = new MediaRecorder(stream, {mineType: 'audio/ogg;'})

			console.log(mediaRecorder)
		} catch (error) {
			console.error(error)
			return
		}

		mediaRecorder.onstop = (e) => {
			console.log(recordBlobs, e)
		}
		mediaRecorder.ondataavailable = (e) => {
			if (e.data && e.data.size > 0) {
				recordBlobs.push(e.data)
			}
		}
		mediaRecorder.start(10)
		setStatus('stopRecord')
		setRecordBlobs(recordBlobs)
	}

	const handleStopRecord = () => {
		console.log(mediaRecorder)
		mediaRecorder.stop()
		setStatus('play')
	}

	const handlePlay = () => {
		const blob = new Blob(recordBlobs, {type: 'audio/ogg'})
		audioRef.current.src = null
		audioRef.current.src = URL.createObjectURL(blob)
		audioRef.current.play()
		setStatus('download')
	}
	const handleDownloadRecord = () => {
		const blob = new Blob(recordBlobs, {type: 'audio/ogg'})
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
			<h1>Record Audio</h1>
			<audio ref={audioRef} autoPlay playsInline></audio>
			<div>
				<button className='button' onClick={handleStartClick} disabled={status !== 'start'}>
					Start
				</button>

				<button className='button' onClick={handleRecordAudio} disabled={status !== 'startRecord'}>
					Start Record
				</button>

				<button className='button' onClick={handleStopRecord} disabled={status !== 'stopRecord'}>
					Stop Record
				</button>

				<button className='button' onClick={handlePlay} disabled={status !== 'play'}>
					Open Camera
				</button>

				<button className='button' onClick={handleDownloadRecord} disabled={status !== 'download'}>
					Open Camera
				</button>
			</div>
		</div>
	)
}

export default RecordAudio
