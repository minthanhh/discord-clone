import React, {useEffect, useRef} from 'react'
const constraints = {
	audio: true,
	video: false,
}
const MicroPhone = () => {
	const audioRef = useRef(null)

	useEffect(() => {
		handleOpenAudio()
	}, [])

	const handleOpenAudio = async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia(constraints)
			const audioTracks = stream.getAudioTracks()
			console.log(audioTracks)
			const audio = audioRef.current
			audio.srcObject = stream
		} catch (error) {
			console.log(error)
		}
	}
	return (
		<div className='container'>
			<h1>
				<span>Open Audio</span>
			</h1>

			<audio ref={audioRef} controls autoPlay></audio>
		</div>
	)
}

export default MicroPhone
