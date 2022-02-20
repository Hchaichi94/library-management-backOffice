import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { ConfigProvider, Empty, Modal, notification, Table } from "antd"
import { ColumnsType } from "antd/lib/table";
import { useEffect, useState } from "react";
import UpdateCategoryModal from "../components/category/UpdateCategoryModal";
import { deletecategory, getListcategorys, getcategoryById, updatecategoryById } from "../services/categoryService";

const ListCategories = () => {
  const columns: ColumnsType<any> = [

    {
      title: 'name',
      dataIndex: 'name',
      key: 'name',
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

  const [category, setcategory] = useState<any>()
  const [categorys, setListecategorys] = useState<any[]>([])
  const [categoryId, setcategoryId] = useState<string>()
  const [isModalDeleteVisible, setIsModalDeleteVisible] = useState<boolean>(false);
  const [isModalEditVisible, setIsModalEditVisible] = useState<boolean>(false);
  const [, setUpdatecategoryValues] = useState<any>()
  const [categoryForm, setcategoryForm] = useState<any>()

  const deleteCategoryHandler = (record: { _id: string }): void => {
    setcategoryId(record._id)
    setIsModalDeleteVisible(true);
  }

  const handleChangecategory = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setcategoryForm({ ...categoryForm, [e.target.name]: e.target.value })
  }

  const handleEditCancel = (): void => {
    setcategoryId("")
    setcategory({})
    setcategoryForm(undefined)
    setUpdatecategoryValues(undefined)
    setIsModalEditVisible(false);
  };

  const handleDeleteOk = async (): Promise<void> => {
    setIsModalDeleteVisible(false);
    let res;
    if (categoryId) res = await deletecategory(categoryId)
    if (res?.status === 200) window.location.reload()
    if (res?.error) notification.error({
      message: 'Erreur interne, essayer plus tard!',
    });
  };

  const handleDeleteCancel = (): void => {
    setIsModalDeleteVisible(false);
  };

  const editCategoryHandler = async (record: { _id: string }): Promise<void> => {
    setcategoryId(record._id)
    const res = await getcategoryById(record._id)
    if (res) {

      setUpdatecategoryValues(res.data)
      if (res.data) {
        setcategoryForm(res.data)
        setcategory(res.data)
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

    if (categoryId && categoryForm) res = await updatecategoryById(categoryForm, categoryId)
    if (res?.status === 200) window.location.reload()
    if (res?.error) notification.error({
      message: 'Erreur interne, essayer plus tard!',
    });

  };


  useEffect(() => {
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
    <div className='listAddress'>
      <h2>Liste des categorys</h2>
      <ConfigProvider renderEmpty={() => <Empty description="Aucun résultat n’est trouvé" />}>
        <Table<any> columns={columns} dataSource={categorys} />
      </ConfigProvider>
      <div className='deleteCategoryModal'>
        <Modal title="Supprimer category" visible={isModalDeleteVisible} onOk={handleDeleteOk} onCancel={handleDeleteCancel}>
          <p>Voulez-vous vraiment supprimer cette category?</p>
        </Modal>
      </div>
      <UpdateCategoryModal categoryForm={categoryForm} category={category} handleChangecategory={handleChangecategory}
        handleEditCancel={handleEditCancel} handleEditOk={handleEditOk} isModalEditVisible={isModalEditVisible} />
    </div>

  )
}

export default ListCategories
