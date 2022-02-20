import { Button, Form, Input, notification } from 'antd'
import { useState } from 'react';
import { useNavigate } from 'react-router';
import '../components/login/login.css'

import { SignUpData } from '../interfaces/SignUpInterface';
import { signup } from '../services/authService';

const SignUp = () => {

    const [loginErr, setLoginErr] = useState<string>("")
    const navigate = useNavigate()
    const onFinish = async (values: SignUpData): Promise<void> => {
        setLoginErr("")

        const res = await signup(values)
        if (res.token) {
            localStorage.setItem('token', res.token)
            navigate('/')
        }
        if (res.error === 406) setLoginErr("invalid data")
        if (res.error && res.error !== 406) notification.error({
            message: 'Erreur interne, essayer plus tard!',
        });
    };
    const goTo = () => {
        navigate('/login')
    }


    return (
        <div className='login'>
            <div className='login__container'>

                <Form className='formLogin'
                    name="basic"
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <p className='errLogin'>{loginErr}</p>
                    <Form.Item
                        label="first_name"
                        name="first_name"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="last_name"
                        name="last_name"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="role"
                        name="role"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Mot de passe"
                        name="password"
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item>
                        <Button htmlType="submit">
                            Register
                        </Button>
                        <Button onClick={goTo}>
                            Se connecter
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default SignUp