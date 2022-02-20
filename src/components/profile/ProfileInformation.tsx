import {
    Form,
    Input,
    Button,
    notification
} from 'antd';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { getAccount } from '../../services/profileService';
import { updateUserById } from '../../services/userService';

const ProfileInformation = () => {

    const [form] = Form.useForm();
    const [profile, setProfile] = useState<{ _id: string, last_name: string, first_name: string, email: string }>()

    const navigate = useNavigate()

    useEffect(() => {
        async function fetchProfileData(): Promise<void> {
            const res = await getAccount()
            if (res.data) setProfile(res.data)
            if (res.error) notification.error({
                message: 'Erreur interne, essayer plus tard!',
            });
        }
        fetchProfileData()
    }, [])


    const onFinish = async (values: { username: string, password: string | undefined, confirm: string | undefined }) => {
        if (profile?._id) {
            const res = await updateUserById(values, profile._id)
            if (res.status === 200) {
                navigate('/')
                notification.success({
                    message: 'Profile modifié avec succès',
                });
            }

            if (res.error) notification.error({
                message: 'Erreur interne, essayer plus tard!',
            });
        }
    };

    return (
        <div className="profile__information">
            <h2>Modifier les informations :</h2>
            {profile && <Form
                className="profileForm__container"
                form={form}
                name="updateInformation"
                onFinish={onFinish}
                initialValues={{
                    last_name: profile.last_name,
                    first_name: profile.first_name,
                    email: profile.email,
                }}
                scrollToFirstError
            >
                <Form.Item
                    name="first_name"
                    label="first_name"
                    rules={[
                        {
                            required: true,
                            message: 'Champ obligatoire',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="last_name"
                    label="last_name"
                    rules={[
                        {
                            required: true,
                            message: 'Champ obligatoire',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="email"
                    rules={[
                        {
                            required: true,
                            message: 'Champ obligatoire',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>



                <Form.Item >
                    <Button type="primary" htmlType="submit">
                        Enregistrer
                    </Button>
                </Form.Item>
            </Form>}


        </div>
    )
}


export default ProfileInformation