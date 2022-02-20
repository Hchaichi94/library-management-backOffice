import { Button, Form, Input, notification } from "antd"
import { useState } from "react"
import '../components/user/createUser.css'
import { createcategory } from "../services/categoryService"


const CreateCategory = () => {


  const [category, Setcategory] = useState<any>({})

  const handleChangeUser = (e: React.ChangeEvent<HTMLInputElement>): void => {
    Setcategory({ ...category, [e.target.name]: e.target.value })
  }


  const onFinish = async (): Promise<void> => {
    const categoryData: any = {
      name: category.name,
    }

    const res = await createcategory(categoryData)
    if (res.status === 201) {
      window.location.pathname = "/categories"
    }
    if (res.error) {
      notification.error({
        message: 'Erreur serveur interne !',
      });
    }
  };


  return (
    <div className='userContainer'>
      <h2>Ajouter une categorie</h2>

      <Form className='contentCategory' autoComplete="off" onFinish={onFinish}>

        <Form.Item rules={[
          {
            required: true,
            message: 'Champ obligatoire',
          },
        ]} name='name' label="name" >
          <Input name="name" onChange={handleChangeUser} />
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

export default CreateCategory