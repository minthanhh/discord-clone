import {Layout} from 'antd'
import {Outlet, useNavigate} from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import {useEffect} from 'react'
import {socketService} from '../../../services'
import {useDispatch} from 'react-redux'
const {Header, Content} = Layout

const LayoutDashboard = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	useEffect(() => {
		const token = localStorage.getItem('token')
		if (!token) {
			navigate('/login')
		} else {
			socketService.connect(dispatch)
		}
	}, [navigate, dispatch])

	return (
		<Layout hasSider>
			<Sidebar />

			<Layout style={{marginLeft: 250}}>
				<Header style={{padding: 0}} />
				<Content style={{margin: '24px 16px 0', overflow: 'initial'}}>
					<Outlet />
				</Content>
			</Layout>
		</Layout>
	)
}

export default LayoutDashboard
