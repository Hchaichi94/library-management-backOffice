import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { ConfigProvider, Empty, Modal, notification, Table } from "antd"
import { ColumnsType } from "antd/lib/table";
import { useEffect, useState } from "react";
import UpdateUserModal from "../components/user/UpdateUserModal";
import { deleteUser, getListUsers, getUserById, updateUserById } from "../services/userService";

const ListUsers = () => {
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
      title: 'email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'role',
      dataIndex: 'role',
      key: 'role',
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

  const [user, setUser] = useState<any>()
  const [users, setListeUsers] = useState<any[]>([])
  const [userId, setUserId] = useState<string>()
  const [isModalDeleteVisible, setIsModalDeleteVisible] = useState<boolean>(false);
  const [isModalEditVisible, setIsModalEditVisible] = useState<boolean>(false);
  const [, setUpdateUserValues] = useState<any>()
  const [userForm, setUserForm] = useState<any>()

  const deleteCategoryHandler = (record: { _id: string }): void => {
    setUserId(record._id)
    setIsModalDeleteVisible(true);
  }

  const handleChangeUser = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUserForm({ ...userForm, [e.target.name]: e.target.value })
  }

  const handleEditCancel = (): void => {
    setUserId("")
    setUser({})
    setUserForm(undefined)
    setUpdateUserValues(undefined)
    setIsModalEditVisible(false);
  };

  const handleDeleteOk = async (): Promise<void> => {
    setIsModalDeleteVisible(false);
    let res;
    if (userId) res = await deleteUser(userId)
    if (res?.status === 200) window.location.reload()
    if (res?.error) notification.error({
      message: 'Erreur interne, essayer plus tard!',
    });
  };

  const handleDeleteCancel = (): void => {
    setIsModalDeleteVisible(false);
  };

  const editCategoryHandler = async (record: { _id: string }): Promise<void> => {
    setUserId(record._id)
    const res = await getUserById(record._id)
    if (res) {

      setUpdateUserValues(res.data)
      if (res.data) {
        setUserForm(res.data)
        setUser(res.data)
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

    if (userId && userForm) res = await updateUserById(userForm, userId)
    if (res?.status === 200) window.location.reload()
    if (res?.error) notification.error({
      message: 'Erreur interne, essayer plus tard!',
    });

  };


  useEffect(() => {
    async function getlistusers(): Promise<void> {
      const res = await getListUsers()
      if (res.data) setListeUsers(res.data)
      if (res.error) {
        notification.error({
          message: 'Erreur interne, essayer plus tard!',
        });
      }
    }

    getlistusers()
  }, [])

  return (
    <div className='listAddress'>
      <h2>Liste des users</h2>
      <ConfigProvider renderEmpty={() => <Empty description="Aucun résultat n’est trouvé" />}>
        <Table<any> columns={columns} dataSource={users} />
      </ConfigProvider>
      <div className='deleteCategoryModal'>
        <Modal title="Supprimer user" visible={isModalDeleteVisible} onOk={handleDeleteOk} onCancel={handleDeleteCancel}>
          <p>Voulez-vous vraiment supprimer cette user?</p>
        </Modal>
      </div>
      <UpdateUserModal userForm={userForm} user={user} handleChangeUser={handleChangeUser}
        handleEditCancel={handleEditCancel} handleEditOk={handleEditOk} isModalEditVisible={isModalEditVisible} />
    </div>

  )
}

export default ListUsers
