import {useEffect, useRef} from 'react'
import {Select} from 'antd'
import {useLocation} from 'react-router-dom'
import './index.css'

const constraints = {audio: false, video: true}
const listFilterPresets = [
	{label: 'None', value: 'none'},
	{label: 'Blur Preset', value: 'blur'},
	{label: 'Grayscale Preset', value: 'grayscale'},
	{label: 'Invert Preset', value: 'invert'},
	{label: 'Sepia Preset', value: 'sepia'},
]

const VideoFilter = () => {
	const videoRef = useRef(null)
	const location = useLocation()

	useEffect(() => {
		navigator.mediaDevices
			.getUserMedia(constraints)
			.then((stream) => {
				const video = videoRef.current
				video.srcObject = stream
			})
			.catch(console.error)
	}, [location.pathname])

	const handleChangeFilter = (value) => {
		videoRef.current.className = value
	}

	return (
		<div className='container'>
			<h1>Video filter</h1>

			<video ref={videoRef} autoPlay playsInline></video>
			<Select defaultValue='none' style={{width: 150}} onChange={handleChangeFilter} options={listFilterPresets} />
		</div>
	)
}

export default VideoFilter
