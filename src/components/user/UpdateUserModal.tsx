import { CloseOutlined } from "@ant-design/icons"
import { Button, Input, Modal, Form } from "antd"
import { useRef } from "react"


const UpdateUserModal: React.FC<any> = ({ userForm, user, handleChangeUser, handleEditCancel, handleEditOk,
    isModalEditVisible }) => {
    const form = useRef<any>()


    return (
        <div className='editCategoryModal'>

            {userForm && <Modal closeIcon={<CloseOutlined onClick={handleEditCancel} />} footer={[
                <Button key="back" onClick={handleEditCancel}>
                    Annuler
                </Button>,
                <Button key="submit" type="primary" onClick={handleEditOk}>
                    Modifier
                </Button>

            ]} title="Modifier l'adresse" visible={isModalEditVisible} >
                <Form ref={form} initialValues={user} className='contentCategory' autoComplete="off">

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
                    ]} name='role' label="role" >
                        <Input name="role" onChange={handleChangeUser} />
                    </Form.Item>


                </Form>
            </Modal>}

        </div>
    )
}

export default UpdateUserModal