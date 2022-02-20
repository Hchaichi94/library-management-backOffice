import { CloseOutlined, SmileOutlined } from "@ant-design/icons"
import { Button, Input, Modal, Form, Typography, notification, Select } from "antd"
import { useEffect, useRef, useState } from "react"
import { getListAuthers } from "../../services/autherService"
import { getListcategorys } from "../../services/categoryService"

const { Option } = Select;

const UpdateBookModal: React.FC<any> = ({ bookForm, book, handleChangebook, handleEditCancel, handleEditOk,
    isModalEditVisible }) => {
    const form = useRef<any>()
    const [selectOptions, setSelectOptions] = useState([])
    const [categories, setListecategorys] = useState<any[]>([])
    console.log('bookForm', bookForm)
    console.log('book', book)
    useEffect(() => {

        async function getlistauthers(): Promise<void> {
            const res = await getListAuthers()
            if (res.data) setSelectOptions(res.data)
            if (res.error) {
                notification.error({
                    message: 'Erreur interne, essayer plus tard!',
                });
            }
        }

        getlistauthers()
        async function getlistcategorys(): Promise<void> {
            const res = await getListcategorys()
            if (res.data) setListecategorys(res.data)
            if (res.error) {
                notification.error({
                    message: 'Erreur interne, essayer plus tard!',
                });
            }
        }

        getlistcategorys()
    }, [])
    return (
        <div className='editCategoryModal'>

            {bookForm && <Modal closeIcon={<CloseOutlined onClick={handleEditCancel} />} footer={[
                <Button key="back" onClick={handleEditCancel}>
                    Annuler
                </Button>,
                <Button key="submit" type="primary" onClick={handleEditOk}>
                    Modifier
                </Button>

            ]} title="Modifier l'adresse" visible={isModalEditVisible} >
                <Form ref={form} initialValues={book} className='contentCategory' autoComplete="off">

                    <Form.Item rules={[
                        {
                            required: true,
                            message: 'Champ obligatoire',
                        },
                    ]} name='title' label="title" >
                        <Input name="title" onChange={handleChangebook} />
                    </Form.Item>

                    <Form.Item rules={[
                        {
                            required: true,
                            message: 'Champ obligatoire',
                        },
                    ]} name='pages' label="pages" >
                        <Input name="pages" onChange={handleChangebook} />
                    </Form.Item>

                    <Form.Item rules={[
                        {
                            required: true,
                            message: 'Champ obligatoire',
                        },
                    ]} name='price' label="price" >
                        <Input name="price" onChange={handleChangebook} />
                    </Form.Item>

                    <Form.Item rules={[
                        {
                            required: true,
                            message: 'Champ obligatoire',
                        },
                    ]} name='quantity' label="quantity" >
                        <Input name="quantity" onChange={handleChangebook} />
                    </Form.Item>


                </Form>
            </Modal>}

        </div>
    )
}

export default UpdateBookModal