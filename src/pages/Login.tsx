import { Button, Form, Input, notification } from 'antd'
import { useState } from 'react';
import { useNavigate } from 'react-router';
import '../components/login/login.css'
import { LoginData } from '../interfaces/LoginInterface';
import { loginUser } from '../services/authService';

const Login = () => {

    const [loginErr, setLoginErr] = useState<string>("")
    const navigate = useNavigate()
    const onFinish = async (values: LoginData): Promise<void> => {
        setLoginErr("")

        const res = await loginUser(values)
        if (res.token) {
            localStorage.setItem('token', res.token)
            navigate('/')
        }
        if (res.error === 406) setLoginErr("Pseudo/mot de passe incorrect")
        if (res.error && res.error !== 406) notification.error({
            message: 'Erreur interne, essayer plus tard!',
        });
    };


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
                        label="Email"
                        name="email"
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
                            Se connecter
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default Login