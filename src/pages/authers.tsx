import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { ConfigProvider, Empty, Modal, notification, Table } from "antd"
import { ColumnsType } from "antd/lib/table";
import { useEffect, useState } from "react";
import UpdateAutherModal from "../components/auther/UpdateAutherModal";
import { deleteAuther, getListAuthers, getAutherById, updateAutherById } from "../services/autherService";

const ListAuthers = () => {
  const columns: ColumnsType<any> = [

    {
      title: 'first_name',
      dataIndex: 'first_name',
      key: 'first_name',
    },
    {
      title: 'last_name',
      dataIndex: 'last_name',
      key: 'last_name',
    },
    {
      title: 'age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'country',
      dataIndex: 'country',
      key: 'country',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: { _id: string }) => {
        return (
          <div className='actions__category'>
            <DeleteOutlined style={{ marginRight: "20px", color: 'red' }} onClick={() => deleteCategoryHandler(record)} />
            <EditOutlined style={{ marginRight: "20px", color: 'green' }} onClick={() => editCategoryHandler(record)} />
          </div>
        )
      }
    }
  ];

  const [Auther, setAuther] = useState<any>()
  const [Authers, setListeAuthers] = useState<any[]>([])
  const [AutherId, setAutherId] = useState<string>()
  const [isModalDeleteVisible, setIsModalDeleteVisible] = useState<boolean>(false);
  const [isModalEditVisible, setIsModalEditVisible] = useState<boolean>(false);
  const [, setUpdateAutherValues] = useState<any>()
  const [AutherForm, setAutherForm] = useState<any>()

  const deleteCategoryHandler = (record: { _id: string }): void => {
    setAutherId(record._id)
    setIsModalDeleteVisible(true);
  }

  const handleChangeAuther = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setAutherForm({ ...AutherForm, [e.target.name]: e.target.value })
  }

  const handleEditCancel = (): void => {
    setAutherId("")
    setAuther({})
    setAutherForm(undefined)
    setUpdateAutherValues(undefined)
    setIsModalEditVisible(false);
  };

  const handleDeleteOk = async (): Promise<void> => {
    setIsModalDeleteVisible(false);
    let res;
    if (AutherId) res = await deleteAuther(AutherId)
    if (res?.status === 200) window.location.reload()
    if (res?.error) notification.error({
      message: 'Erreur interne, essayer plus tard!',
    });
  };

  const handleDeleteCancel = (): void => {
    setIsModalDeleteVisible(false);
  };

  const editCategoryHandler = async (record: { _id: string }): Promise<void> => {
    setAutherId(record._id)
    const res = await getAutherById(record._id)
    if (res) {

      setUpdateAutherValues(res.data)
      if (res.data) {
        setAutherForm(res.data)
        setAuther(res.data)
        setIsModalEditVisible(true);
      }
      if (res.error) {
        notification.error({
          message: 'Erreur interne, essayer plus tard!',
        });
      }

    }
  }


  const handleEditOk = async (): Promise<void> => {
    let res;
    setIsModalEditVisible(false);
    console.log('AutherForm', AutherForm)
    if (AutherId && AutherForm) res = await updateAutherById(AutherForm, AutherId)
    if (res?.status === 200) window.location.reload()
    if (res?.error) notification.error({
      message: 'Erreur interne, essayer plus tard!',
    });

  };


  useEffect(() => {
    async function getlistauthers(): Promise<void> {
      const res = await getListAuthers()
      if (res.data) setListeAuthers(res.data)
      if (res.error) {
        notification.error({
          message: 'Erreur interne, essayer plus tard!',
        });
      }
    }

    getlistauthers()
  }, [])

  return (
    <div className='listAddress'>
      <h2>Liste des Authers</h2>
      <ConfigProvider renderEmpty={() => <Empty description="Aucun résultat n’est trouvé" />}>
        <Table<any> columns={columns} dataSource={Authers} />
      </ConfigProvider>
      <div className='deleteCategoryModal'>
        <Modal title="Supprimer Auther" visible={isModalDeleteVisible} onOk={handleDeleteOk} onCancel={handleDeleteCancel}>
          <p>Voulez-vous vraiment supprimer cette Auther?</p>
        </Modal>
      </div>
      <UpdateAutherModal autherForm={AutherForm} auther={Auther} handleChangeAuther={handleChangeAuther}
        handleEditCancel={handleEditCancel} handleEditOk={handleEditOk} isModalEditVisible={isModalEditVisible} />
    </div>

  )
}

export default ListAuthers
