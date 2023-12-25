import {Button, Form, Input, Modal, Typography} from 'antd'
import {useDispatch} from 'react-redux'
import {sendFriendInvitations} from '../../../store/slices'
const {Paragraph} = Typography

const AddFriendsModal = ({onOk, isModalOpen, onCancel, onIsModalOpen}) => {
	const dispatch = useDispatch()
	const [form] = Form.useForm()
	const onFinish = (values) => {
		dispatch(sendFriendInvitations(values))
		form.resetFields()
		onIsModalOpen(false)
	}
	return (
		<Modal title='Invite a Friend' open={isModalOpen} onOk={onOk} onCancel={onCancel} footer={null}>
			<Paragraph>Enter E-mail address of friend which you would like to invite</Paragraph>

			<Form layout='vertical' form={form} name='control-hooks' onFinish={onFinish}>
				<Form.Item name='email' label='E-mail' rules={[{required: true}]}>
					<Input size='large' placeholder='Enter email address' />
				</Form.Item>
				<Form.Item>
					<Button size='large' htmlType='submit' className='w-full'>
						Send
					</Button>
				</Form.Item>
			</Form>
		</Modal>
	)
}

export default AddFriendsModal
