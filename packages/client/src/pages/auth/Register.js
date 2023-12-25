import {Button, Flex, Form, Input, Typography} from 'antd'
import {useState} from 'react'
import {Link} from 'react-router-dom'

const {Title} = Typography

const Register = () => {
	const [form] = Form.useForm()
	const [isValid, setIsValid] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const onFinish = (values) => {
		setIsLoading(true)
		console.log(values)
	}

	return (
		<Flex className='w-full h-screen bg-gray-100' justify='center' align='center'>
			<div className='max-w-[600px] w-full bg-white shadow-md rounded-md p-6'>
				<Title level={3}>Create an account.</Title>

				<Form layout='vertical' form={form} name='control-hooks' onFinish={onFinish} className='mt-6'>
					<Form.Item name='email' label='E-mail' rules={[{required: true}]}>
						<Input size='large' placeholder='Please enter your Email' />
					</Form.Item>

					<Form.Item name='username' label='Username' rules={[{required: true}]}>
						<Input size='large' placeholder='Please enter your username' />
					</Form.Item>

					<Form.Item name='password' label='Password' rules={[{required: true}]}>
						<Input size='large' placeholder='Please enter your Password' />
					</Form.Item>

					<div className='flex items-center justify-between'>
						<Button htmlType='submit' size='large' disabled={isValid} loading={isLoading}>
							Submit
						</Button>

						<Link className='ml-2' to='/login'>
							Already have an account?
						</Link>
					</div>
				</Form>
			</div>
		</Flex>
	)
}

export default Register
