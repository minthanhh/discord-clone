import {Button, Select} from 'antd'
import {useRef, useState} from 'react'

const qvgaConstraints = {
	video: {width: {exact: 320}, height: {exact: 240}},
}

const vgaConstraints = {
	video: {width: {exact: 640}, height: {exact: 480}},
}

const hdConstraints = {
	video: {width: {exact: 1280}, height: {exact: 720}},
}

const fullhdConstraints = {
	video: {width: {exact: 1920}, height: {exact: 1080}},
}

const twoKConstraints = {
	video: {width: {exact: 2560}, height: {exact: 1440}},
}

const fourKConstraints = {
	video: {width: {exact: 4096}, height: {exact: 2160}},
}

const eightKConstraints = {
	video: {width: {exact: 7680}, height: {exact: 4320}},
}

const listResolutions = [
	{label: '320', value: 'qvga'},
	{label: '640', value: 'vga'},
	{label: 'HD', value: 'hd'},
	{label: 'Full HD', value: 'fullhd'},
	{label: '2K', value: '2k'},
	{label: '4K', value: '4k'},
	{label: '8K', value: '8k'},
]

const Resolution = () => {
	const videoRef = useRef(null)
	const [mediaStream, setMediaStream] = useState(null)

	const getMedia = async (constraints) => {
		if (mediaStream) mediaStream.getTracks().forEach((track) => track.stop())

		const stream = await navigator.mediaDevices.getUserMedia(constraints)
		setMediaStream(stream)
		videoRef.current.srcObject = stream
	}

	const dynamicChange = (e) => {
		if (mediaStream) {
			const track = mediaStream.getVideoTracks()[0]
			let constraints = vgaConstraints
			console.log(mediaStream.getVideoTracks())
			track.applyConstraints(constraints)
		}
	}

	const handleChangeResolution = (resolution) => {
		switch (resolution) {
			case 'qvga':
				getMedia(qvgaConstraints)
				break
			case 'vga':
				getMedia(vgaConstraints)
				break
			case 'hd':
				getMedia(hdConstraints)
				break
			case 'fullhd':
				getMedia(fullhdConstraints)
				break
			case '2k':
				getMedia(twoKConstraints)
				break
			case '4k':
				getMedia(fourKConstraints)
				break
			case '8k':
				getMedia(eightKConstraints)
				break
			default:
				getMedia(vgaConstraints)
				break
		}
	}

	return (
		<div className='container'>
			<h1>Resolution</h1>
			<video className='video' ref={videoRef} autoPlay playsInline></video>
			<Select
				defaultValue='vga'
				style={{width: 100, marginLeft: 20}}
				onChange={handleChangeResolution}
				options={listResolutions}
			/>

			<Button onClick={dynamicChange}>Dynamic Change</Button>
		</div>
	)
}

export default Resolution
