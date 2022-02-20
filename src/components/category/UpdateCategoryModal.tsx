import { CloseOutlined } from "@ant-design/icons"
import { Button, Input, Modal, Form } from "antd"
import { useRef } from "react"


const UpdatecategoryModal: React.FC<any> = ({ categoryForm, category, handleChangecategory, handleEditCancel, handleEditOk,
    isModalEditVisible }) => {
    const form = useRef<any>()


    return (
        <div className='editCategoryModal'>

            {categoryForm && <Modal closeIcon={<CloseOutlined onClick={handleEditCancel} />} footer={[
                <Button key="back" onClick={handleEditCancel}>
                    Annuler
                </Button>,
                <Button key="submit" type="primary" onClick={handleEditOk}>
                    Modifier
                </Button>

            ]} title="Modifier l'adresse" visible={isModalEditVisible} >
                <Form ref={form} initialValues={category} className='contentCategory' autoComplete="off">

                    <Form.Item rules={[
                        {
                            required: true,
                            message: 'Champ obligatoire',
                        },
                    ]} name='name' label="name" >
                        <Input name="name" onChange={handleChangecategory} />
                    </Form.Item>

                
                </Form>
            </Modal>}

        </div>
    )
}

export default UpdatecategoryModal