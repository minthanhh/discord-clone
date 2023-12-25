import {Button, Flex, Form, Input, Typography} from 'antd'
import {Link, useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {useState} from 'react'
import {thunkAuth} from '../../store/slices'

const {Title, Text} = Typography

const Login = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [form] = Form.useForm()
	const [isLoading, setIsLoading] = useState(false)

	const onFinish = (values) => {
		setIsLoading(true)
		dispatch(thunkAuth.login(values))
		setIsLoading(false)
		navigate('/dashboard')
	}

	return (
		<Flex className='w-full h-screen bg-gray-100' justify='center' align='center'>
			<div className='max-w-[600px] w-full bg-white shadow-md rounded-md p-6'>
				<Title level={3}>Welcome back</Title>
				<Text>We are happy that you are with us.</Text>

				<Form layout='vertical' form={form} name='control-hooks' onFinish={onFinish} className='mt-6'>
					<Form.Item name='email' label='E-mail' rules={[{required: true}]}>
						<Input size='large' placeholder='Please enter your Email' />
					</Form.Item>

					<Form.Item name='password' label='Password' rules={[{required: true}]}>
						<Input size='large' placeholder='Please enter your Password' />
					</Form.Item>

					<div className='flex items-center justify-between'>
						<Button htmlType='submit' size='large' loading={isLoading}>
							Submit
						</Button>

						<Text>
							Need an account?
							<Link className='ml-2' to='/register'>
								Create an account
							</Link>
						</Text>
					</div>
				</Form>
			</div>
		</Flex>
	)
}

export default Login
