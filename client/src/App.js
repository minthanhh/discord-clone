import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import {Login, Register} from './pages/auth'
import {Dashboard, LayoutDashboard} from './pages/dashboard'
import {Webrtc} from './pages/webrtc'
import Camera from './pages/webrtc/pages/Camera'
import MicroPhone from './pages/webrtc/pages/MicroPhone'
import Canvas from './pages/webrtc/pages/Canvas'
import ScreenShare from './pages/webrtc/pages/ScreenShare'
import AudioVolume from './pages/webrtc/pages/volume/AudioVolume'
import DeviceSelect from './pages/webrtc/pages/DeviceSelect'
import MediaSettings from './pages/webrtc/pages/MediaSettings/MediaSettings'
import {Resolution, VideoFilter} from './pages/webrtc/pages'
import MediaStreamApi from './pages/webrtc/pages/MediaStreamApi'
import CaptureVideo from './pages/webrtc/pages/CaptureVideo'
import CaptureCanvas from './pages/webrtc/pages/CaptureCanvas'
import RecordAudio from './pages/webrtc/pages/RecordAudio'
import RecordVideo from './pages/webrtc/pages/RecordVideo'
import RecordScreen from './pages/webrtc/pages/RecordScreen'
import PeerConnection from './pages/webrtc/pages/PeerConnection'

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='login' Component={Login} />
				<Route path='register' Component={Register} />
				<Route Component={LayoutDashboard}>
					<Route path='dashboard' Component={Dashboard} />
				</Route>
				<Route path='webrtc' Component={Webrtc}>
					<Route path='camera' Component={Camera} />
					<Route path='microphone' Component={MicroPhone} />
					<Route path='canvas' Component={Canvas} />
					<Route path='screen-share' Component={ScreenShare} />
					<Route path='audio-volume' Component={AudioVolume} />
					<Route path='device-select' Component={DeviceSelect} />
					<Route path='media-settings' Component={MediaSettings} />
					<Route path='video-filter-presets' Component={VideoFilter} />
					<Route path='resolution' Component={Resolution} />
					<Route path='media-stream-api' Component={MediaStreamApi} />
					<Route path='capture-video' Component={CaptureVideo} />
					<Route path='capture-canvas' Component={CaptureCanvas} />
					<Route path='record-audio' Component={RecordAudio} />
					<Route path='record-video' Component={RecordVideo} />
					<Route path='record-screen' Component={RecordScreen} />
					<Route path='peer-connection' Component={PeerConnection} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default App
