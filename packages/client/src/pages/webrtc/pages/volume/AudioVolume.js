import React, {useCallback, useEffect, useState} from 'react'
import SoundMeter from './SoundMeter'

const constraints = {audio: true, video: false}

const AudioVolume = () => {
	const [audioLevel, setAudioLevel] = useState(0)

	const soundMeterProccess = useCallback(async () => {
		const value = window.soundMeter.instant.toFixed(2) * 348 + 1
		setAudioLevel(value)
		setTimeout(soundMeterProccess, 100)
	}, [])

	useEffect(() => {
		try {
			window.AudioContext = window.AudioContext || window.webkitAudioContext
			window.audioContext = new AudioContext()
		} catch (err) {
			console.log(err)
		}

		window.soundMeter = new SoundMeter(window.audioContext)

		navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
			window.soundMeter.connectToSource(stream)
			setTimeout(soundMeterProccess, 100)
		})
	}, [soundMeterProccess])

	return (
		<div className='container'>
			<h1>Audio Level</h1>

			<div style={{width: audioLevel + 'px', height: '10px', backgroundColor: '#8dc63f', marginTop: '20px'}}></div>
		</div>
	)
}

export default AudioVolume
