import {Select, Modal, Button} from 'antd'
import './index.css'
import {useEffect, useRef, useState} from 'react'
import SoundMeter from './SoundMeter'

const mediaSettingsInitalState = {
	visible: false,
	videoDevices: [],
	audioDevices: [],
	audioOutputDevices: [],
	resolution: 'vga',
	selectedAudioDevice: '',
	selectedVideoDevice: '',
	audioLevel: 0,
}

const MediaSettings = () => {
	const videoRef = useRef(null)
	const progressBar = useRef(null)
	const [mediaSettings, setMediaSettings] = useState(mediaSettingsInitalState)

	useEffect(() => {
		if (localStorage.getItem('deviceInfomation')) {
			const deviceInfomation = JSON.parse(localStorage.getItem('deviceInfomation'))
			setMediaSettings((prev) => ({
				...prev,
				selectedAudioDevice: deviceInfomation.audioDevice,
				selectedVideoDevice: deviceInfomation.videoDevice,
				resolution: deviceInfomation.resolution,
			}))
		}
	}, [])

	useEffect(() => {
		;(async () => {
			const devices = await navigator.mediaDevices.enumerateDevices()

			let videoDevices = [],
				audioDevices = [],
				audioOutputDevices = []

			for (const device of devices) {
				if (device.kind === 'videoinput') {
					videoDevices.push(device)
				} else if (device.kind === 'audioinput') {
					audioDevices.push(device)
				} else {
					audioOutputDevices.push(device)
				}
			}

			setMediaSettings((prev) => ({...prev, audioDevices, videoDevices, audioOutputDevices}))
		})()
	}, [mediaSettings.selectedVideoDevice, mediaSettings.selectedAudioDevice])

	const closeMediaStream = (stream) => {
		if (!stream) return

		let tracks
		if (stream.getTracks) {
			tracks = stream.getTracks()
			for (let i = 0; i < tracks.length; i++) {
				tracks[i].stop()
			}
		} else {
			tracks = stream.getAudioTracks()
			for (let i = 0; i < tracks.length; i++) {
				tracks[i].stop()
			}

			tracks = stream.getVideoTracks()
			for (let i = 0; i < tracks.length; i++) {
				tracks[i].stop()
			}
		}
	}

	const startPreview = async () => {
		if (window.stream) {
			closeMediaStream()
		}
		window.AudioContext = window.AudioContext || window.webkitAudioContext
		window.audioContext = new AudioContext()
		window.soundMeter = new SoundMeter(window.audioContext)

		const constraints = {
			audio: {deviceId: mediaSettings.selectedAudioDevice},
			video: {deviceId: mediaSettings.selectedVideoDevice},
		}

		const stream = await navigator.mediaDevices.getUserMedia(constraints)
		videoRef.current.srcObject = stream
		window.stream = stream
		window.soundMeter.connectToSource(stream)
		setTimeout(soundMeterProcess, 100)
		return navigator.mediaDevices.enumerateDevices()
	}

	const stopPreview = async () => {
		if (window.stream) closeMediaStream(window.stream)
	}

	const showModal = () => {
		setMediaSettings((prev) => ({...prev, visible: true}))
		setTimeout(startPreview, 100)
	}

	const handleOk = () => {
		setMediaSettings((prev) => ({...prev, visible: false}))

		localStorage.setItem(
			'deviceInfomation',
			JSON.stringify({
				audioDevice: mediaSettings.selectedAudioDevice,
				videoDevice: mediaSettings.selectedVideoDevice,
				resolution: mediaSettings.resolution,
			}),
		)
	}

	const handleCancel = () => {
		setMediaSettings((prev) => ({...prev, visible: false}))
		stopPreview()
	}

	const soundMeterProcess = () => {
		const value = window.soundMeter.instant.toFixed(2) * 348 + 1
		setMediaSettings((prev) => ({...prev, audioLevel: value}))
		if (mediaSettings.visible) setTimeout(soundMeterProcess, 100)
	}

	const handleDevicesChange = (value, audio) => {
		setMediaSettings((prev) => ({...prev, [audio === 'audio' ? 'selectedAudioDevice' : 'selectedVideoDevice']: value}))
		setTimeout(startPreview, 100)
	}

	const handleResolutionChange = (value) => {
		setMediaSettings((prev) => ({...prev, resolution: value}))
	}

	return (
		<div className='container'>
			<Button onClick={showModal}>Show Modal</Button>
			<Modal
				title='Modal Title'
				onOk={handleOk}
				onCancel={handleCancel}
				okText='oke'
				cancelText='cancel'
				open={mediaSettings.visible}
			>
				<div className='item'>
					<span className='item-left'>Audio</span>

					<div className='item-right'>
						<Select
							value={
								mediaSettings.selectedAudioDevice
									? mediaSettings.selectedAudioDevice
									: mediaSettings.audioDevices[0]?.deviceId
							}
							style={{width: '150px', marginRight: '10px'}}
							onChange={(value) => handleDevicesChange(value, 'audio')}
						>
							{mediaSettings.audioDevices.map((device) => (
								<Select.Option key={device.deviceId} value={device.deviceId}>
									{device.label}
								</Select.Option>
							))}
						</Select>

						<div
							ref={progressBar}
							style={{
								width: mediaSettings.audioLevel + 'px',
								height: '10px',
								backgroundColor: '#8dc63f',
								marginTop: '20px',
							}}
						></div>
					</div>
				</div>

				<div className='item'>
					<span className='item-left'>Video</span>

					<div className='item-right'>
						<Select
							value={
								mediaSettings.selectedVideoDevice
									? mediaSettings.selectedVideoDevice
									: mediaSettings.videoDevices[0]?.deviceId
							}
							style={{width: '150px', marginRight: '10px'}}
							onChange={(value) => handleDevicesChange(value, 'video')}
						>
							{mediaSettings.videoDevices.map((device) => (
								<Select.Option key={device.deviceId} value={device.deviceId}>
									{device.label}
								</Select.Option>
							))}
						</Select>

						<div className='video-container'>
							<video
								ref={videoRef}
								className='video'
								id='previewVideo'
								style={{width: '100%', height: '100%'}}
								autoPlay
								playsInline
							></video>
						</div>
					</div>
				</div>

				<div className='item'>
					<span className='item-left'>Size</span>

					<div className='item-right'>
						<Select value={mediaSettings.resolution} style={{width: 350}} onChange={handleResolutionChange}>
							<Select.Option value='qvga'>(320x240)</Select.Option>
							<Select.Option value='vga'>(640x360)</Select.Option>
							<Select.Option value='hd'>(1280x720)</Select.Option>
							<Select.Option value='fullhd'>(1920x1080)</Select.Option>
						</Select>
					</div>
				</div>
			</Modal>
		</div>
	)
}

export default MediaSettings
