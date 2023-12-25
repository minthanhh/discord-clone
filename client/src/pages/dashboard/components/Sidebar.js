import {Button, Flex, Layout, Menu, Space, Typography} from 'antd'
import {TeamOutlined} from '@ant-design/icons'
import {useState} from 'react'
import AddFriendsModal from './AddFriendsModal'
import PendingInvitations from './PendingInvitations'

const {Sider} = Layout
const {Title} = Typography

function getItem(label, key, icon, children, type) {
	return {key, icon, children, label, type}
}

const items = [getItem('', '1', <TeamOutlined size={40} />)]

const Sidebar = () => {
	const [isModalOpen, setIsModalOpen] = useState(false)

	const handleShowModal = () => {
		setIsModalOpen(true)
	}
	const handleCancel = () => {
		setIsModalOpen(false)
	}

	return (
		<>
			<Sider
				theme='light'
				className='shadow-lg max-w-[250px] w-[250px] min-w-[250px]'
				style={{position: 'fixed', height: '100vh', left: 0, bottom: 0, top: 0, overflow: 'auto'}}
			>
				<Flex align='flex-start'>
					<Flex vertical className='bg-gray-300'>
						<Menu theme='light' mode='horizontal' defaultSelectedKeys={['1']} items={items} />
					</Flex>
					<Flex vertical className='w-full shadow p-2 h-screen flex flex-col flex-grow'>
						<Space direction='vertical' size='small' className='flex flex-col'>
							<Button onClick={handleShowModal} className='w-full'>
								Add Friends
							</Button>
							<Title level={5} className='text-left'>
								Private Friends
							</Title>

							<Title level={5} className='text-left'>
								Invitations
							</Title>
							<PendingInvitations />
						</Space>
					</Flex>
				</Flex>
			</Sider>

			<AddFriendsModal isModalOpen={isModalOpen} onCancel={handleCancel} onIsModalOpen={setIsModalOpen} />
		</>
	)
}

export default Sidebar
