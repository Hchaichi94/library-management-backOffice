import { Button, Form, Input, notification } from "antd"
import { useState } from "react"
import '../components/auther/createAuther.css'
import { createAuther } from "../services/autherService"


const CreateAuther = () => {

  const [auther, setauther] = useState<any>({
    first_name: "",
    last_name: "",
    age: "",
    country: "",
  })

  const handleChangeauther = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setauther({ ...auther, [e.target.name]: e.target.value })
  }


  const onFinish = async (): Promise<void> => {
    const autherData: any = {
      first_name: auther.first_name,
      last_name: auther.last_name,
      age: auther.age,
      country: auther.country,

    }

    const res = await createAuther(autherData)
    if (res.status === 201) {
      window.location.pathname = "/authers"
    }
    if (res.error) {
      notification.error({
        message: 'Erreur serveur interne !',
      });
    }
  };


  return (
    <div className='autherContainer'>
      <h2>Ajouter un auther</h2>

      <Form className='contentCategory' autoComplete="off" onFinish={onFinish}>

        <Form.Item rules={[
          {
            required: true,
            message: 'Champ obligatoire',
          },
        ]} name='first_name' label="first_name" >
          <Input name="first_name" onChange={handleChangeauther} />
        </Form.Item>

        <Form.Item rules={[
          {
            required: true,
            message: 'Champ obligatoire',
          },
        ]} name='last_name' label="last_name" >
          <Input name="last_name" onChange={handleChangeauther} />
        </Form.Item>

        <Form.Item rules={[
          {
            required: true,
            message: 'Champ obligatoire',
          },
        ]} name='age' label="age" >
          <Input name="age" onChange={handleChangeauther} />
        </Form.Item>

        <Form.Item rules={[
          {
            required: true,
            message: 'Champ obligatoire',
          },
        ]} name='country' label="country" >
          <Input name="country" onChange={handleChangeauther} />
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

export default CreateAuther