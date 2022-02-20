import { CloseOutlined } from "@ant-design/icons"
import { Button, Input, Modal, Form } from "antd"
import { useRef } from "react"


const UpdateAutherModal: React.FC<any> = ({ autherForm, auther, handleChangeauther, handleEditCancel, handleEditOk,
    isModalEditVisible }) => {
    const form = useRef<any>()


    return (
        <div className='editCategoryModal'>

            {autherForm && <Modal closeIcon={<CloseOutlined onClick={handleEditCancel} />} footer={[
                <Button key="back" onClick={handleEditCancel}>
                    Annuler
                </Button>,
                <Button key="submit" type="primary" onClick={handleEditOk}>
                    Modifier
                </Button>

            ]} title="Modifier l'adresse" visible={isModalEditVisible} >
                <Form ref={form} initialValues={auther} className='contentCategory' autoComplete="off">

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


                </Form>
            </Modal>}

        </div>
    )
}

export default UpdateAutherModal