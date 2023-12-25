import {List} from 'antd'
import {Link, Outlet} from 'react-router-dom'

const data = [
	{title: 'test', path: '/'},
	{title: 'camera', path: 'camera'},
	{title: 'microphone', path: 'microphone'},
	{title: 'canvas', path: 'canvas'},
	{title: 'screenshare', path: 'screen-share'},
	{title: 'Audio Volume', path: 'audio-volume'},
	{title: 'Devices', path: 'device-select'},
	{title: 'Media Settings', path: 'media-settings'},
	{title: 'Video Filter Presets', path: 'video-filter-presets'},
	{title: 'Change Resolution', path: 'resolution'},
	{title: 'Media Stream API', path: 'media-stream-api'},
	{title: 'Capture Video', path: 'capture-video'},
	{title: 'Capture Canvas', path: 'capture-canvas'},
	{title: 'Record Audio', path: 'record-audio'},
	{title: 'Record Video', path: 'record-video'},
	{title: 'Record Screen', path: 'record-screen'},
	{title: 'Peer Connection', path: 'peer-connection'},
]

const Webrtc = () => {
	return (
		<div style={{display: 'flex'}}>
			<List
				style={{height: '100vh'}}
				bordered
				dataSource={data}
				renderItem={(item) => (
					<List.Item>
						<Link to={item['path']}>{item['title']}</Link>
					</List.Item>
				)}
			/>
			<Outlet />
		</div>
	)
}

export default Webrtc
