import {useSelector} from 'react-redux'
import {PendingFriendsInvitations} from '../../../store/slices'
import {Button, List, Typography} from 'antd'
import {CloseOutlined, CheckOutlined} from '@ant-design/icons'
import {useCallback} from 'react'

const PendingInvitations = () => {
	const pendingFriendsInvitations = useSelector(PendingFriendsInvitations)

	const handleAcceptInvitation = useCallback(() => {}, [])

	return (
		<List
			dataSource={pendingFriendsInvitations}
			renderItem={(invitation) => (
				<List.Item key={invitation._id} className='pt-0'>
					<List.Item.Meta
						avatar={
							<div className='rounded-full bg-gray-200 w-10 h-10 flex items-center justify-center'>
								{invitation.senderId.username.substring(0, 2)}
							</div>
						}
						title={<Typography.Text>{invitation.senderId.username}</Typography.Text>}
						className='items-center'
					/>
					<div className='flex items-center gap-0.5'>
						<Button
							shape='circle'
							icon={<CheckOutlined className='w-[15px] h-[15px]' />}
							className='flex items-center justify-center p-0 w-[25px] h-[25px] min-w-[25px] border-none shadow-none'
						/>
						<Button
							shape='circle'
							icon={<CloseOutlined className='w-[15px] h-[15px]' />}
							className='flex items-center justify-center p-0 w-[25px] h-[25px] min-w-[25px] border-none shadow-none'
						/>
					</div>
				</List.Item>
			)}
		/>
	)
}

export default PendingInvitations
