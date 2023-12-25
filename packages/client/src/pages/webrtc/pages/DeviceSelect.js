import {useEffect, useRef, useState} from 'react'
import {Select} from 'antd'

const {Option} = Select

const DeviceSelect = () => {
	const videoRef = useRef(null)
	const [devices, setDeivices] = useState({
		selectedAudioDevice: '',
		selectedAudioOutputDevice: '',
		selectedVideoDevice: '',
		videoDevices: [],
		audioDevices: [],
		audioOutputDevices: [],
	})

	useEffect(() => {
		updateDevice().then((data) => {
			if (devices.selectedAudioDevice === '' && data.audioDevices.length > 0) {
				setDeivices({selectedAudioDevice: data.audioDevices[0].deviceId})
			}

			if (devices.selectedAudioOutputDevice === '' && data.audioOutputDevices.length > 0) {
				setDeivices({selectedAudioOutputDevice: data.audioOutputDevices[0].deviceId})
			}

			if (devices.selectedVideoDevice === '' && data.videoDevices.length > 0) {
				setDeivices({selectedVideoDevice: data.videoDevices[0].deviceId})
			}

			setDeivices({
				videoDevices: data.videoDevices,
				audioDevices: data.audioDevices,
				audioOutputDevices: data.audioOutputDevices,
			})
		})
	}, [devices])

	const updateDevice = () => {
		return new Promise((resolve, reject) => {
			let videoDevices = []
			let audioDevices = []
			let audioOutputDevices = []

			navigator.mediaDevices
				.enumerateDevices()
				.then((devices) => {
					console.log(devices)
					for (const device of devices) {
						if (device.kind === 'videoinput') {
							videoDevices.push(device)
						} else if (device.kind === 'audioinput') {
							audioDevices.push(device)
						} else {
							audioOutputDevices.push(device)
						}
					}
				})
				.then(() => {
					let data = {videoDevices, audioDevices, audioOutputDevices}
					resolve(data)
				})
		})
	}

	const handleAudioDeviceChange = (e) => {
		setDeivices({selectedAudioDevice: e})
		setTimeout(startTest, 100)
	}

	const handleVideoDeviceChange = (e) => {
		setDeivices({selectedVideoDevice: e})
		setTimeout(startTest, 100)
	}

	const handleAudioOutputDeviceChange = (e) => {
		setDeivices({selectedAudioOutputDevice: e})
		if (typeof videoRef.current.skinId !== 'undefined') {
			videoRef.current
				.setSinkId(e)
				.then(() => {
					console.log('set')
				})
				.catch((err) => console.log(err))
		}
	}

	const startTest = () => {
		let audioSource = devices.selectedAudioDevice
		let videoSource = devices.selectedVideoDevice

		let constraints = {
			audio: {deviceId: audioSource ? {exact: audioSource} : undefined},
			video: {deviceId: videoSource ? {exact: videoSource} : undefined},
		}

		navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
			videoRef.current.srcObject = stream
		})
	}

	return (
		<div className='container'>
			<h1>
				<span>Open Audio</span>
			</h1>

			<Select
				value={devices.selectedAudioDevice}
				style={{width: 150, marginRight: '10px'}}
				onChange={handleAudioDeviceChange}
			>
				{devices.audioDevices?.map((device) => (
					<Option value={device.deviceId} key={device.deviceId}>
						{device.label}
					</Option>
				))}
			</Select>

			<Select
				value={devices.selectedAudioOutputDevice}
				style={{width: 150, marginRight: '10px'}}
				onChange={handleAudioOutputDeviceChange}
			>
				{devices.audioOutputDevices?.map((device) => (
					<Option value={device.deviceId} key={device.deviceId}>
						{device.label}
					</Option>
				))}
			</Select>

			<Select
				value={devices.selectedVideoDevice}
				style={{width: 150, marginRight: '10px'}}
				onChange={handleVideoDeviceChange}
			>
				{devices.videoDevices?.map((device) => (
					<Option value={device.deviceId} key={device.deviceId}>
						{device.label}
					</Option>
				))}
			</Select>

			<video ref={videoRef} className='video' controls autoPlay style={{objectFit: 'contain', marginTop: '10px'}} />

			<button onClick={startTest}>Open</button>
		</div>
	)
}

export default DeviceSelect
