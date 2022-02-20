import {
    Form,
    Input,
    Button,
    notification
} from 'antd';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { getProfile, updateProfile } from '../../services/profileService';

const ProfileInformation = () => {

    const [form] = Form.useForm();
    const [profile, setProfile] = useState<{ id: string, username: string }>()

    const navigate = useNavigate()

    useEffect(() => {
        async function fetchProfileData(): Promise<void> {
            const res = await getProfile()
            if (res.data) setProfile(res.data)
            if (res.error) notification.error({
                message: 'Erreur interne, essayer plus tard!',
            });
        }
        fetchProfileData()
    }, [])


    const onFinish = async (values: { username: string, password: string | undefined, confirm: string | undefined }) => {
        if (profile?.id) {
            const res = await updateProfile(values, profile.id)
            if (res.status === 200){
                navigate('/')
                notification.success({
                    message: 'Profile modifié avec succès',
                });
            }

            if(res.error) notification.error({
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
                    username: profile.username
                }}
                scrollToFirstError
            >
                <Form.Item
                    name="username"
                    label="Username"
                    rules={[
                        {
                            required: true,
                            message: 'Champ obligatoire',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                {/*   <Form.Item
                    name="oldPassword"
                    label="Ancien mot de passe"
                    rules={[
                        {
                            required: true,
                            message: 'Champ obligatoire',
                        },
                    ]}
                   
                >
                    <Input.Password />
                </Form.Item> */}

                <Form.Item
                    name="password"
                    label="Mot de passe"
                    rules={[
                        { min: 8, message: 'Minimum 8 caractéres.' },
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="confirm"
                    label="Confirmer mot de passe"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (getFieldValue('password') && !value) {
                                    return Promise.reject(new Error('Champ obligatoire'))

                                }
                                return Promise.resolve();
                            },
                        }),
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Les deux mots de passe ne correspondent pas'));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
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