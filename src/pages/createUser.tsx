import { Button, Form, Input, notification } from "antd"
import { useState } from "react"
import '../components/user/createUser.css'
import { createUser } from "../services/userService"


const CreateUser = () => {

  const [user, setUser] = useState<any>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  })

  const handleChangeUser = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }


  const onFinish = async (): Promise<void> => {
    const userData: any = {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      password: user.password,

    }

    const res = await createUser(userData)
    if (res.status === 201) {
      window.location.pathname = "/users"
    }
    if (res.error) {
      notification.error({
        message: 'Erreur serveur interne !',
      });
    }
  };


  return (
    <div className='userContainer'>
      <h2>Ajouter un user</h2>

      <Form className='contentCategory' autoComplete="off" onFinish={onFinish}>

        <Form.Item rules={[
          {
            required: true,
            message: 'Champ obligatoire',
          },
        ]} name='first_name' label="first_name" >
          <Input name="first_name" onChange={handleChangeUser} />
        </Form.Item>

        <Form.Item rules={[
          {
            required: true,
            message: 'Champ obligatoire',
          },
        ]} name='last_name' label="last_name" >
          <Input name="last_name" onChange={handleChangeUser} />
        </Form.Item>

        <Form.Item rules={[
          {
            required: true,
            message: 'Champ obligatoire',
          },
        ]} name='email' label="email" >
          <Input name="email" onChange={handleChangeUser} />
        </Form.Item>

        <Form.Item rules={[
          {
            required: true,
            message: 'Champ obligatoire',
          },
        ]} name='password' label="password" >
          <Input name="password" onChange={handleChangeUser} />
        </Form.Item>


        <Form.Item className='btnSubmit__createCat'>
          <Button type="primary" htmlType="submit">
            Publier
          </Button>
        </Form.Item>
      </Form>

    </div>
  )
}

export default CreateUser