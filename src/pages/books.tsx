import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { notification, ConfigProvider, Empty, Table, Modal } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useState, useEffect } from "react";
import UpdateBookModal from "../components/books/UpdateBookModal"
import { deleteBook, getBookById, updateBookById, getListBooks } from "../services/bookService";


const ListBooks = () => {
  const columns: ColumnsType<any> = [

    {
      title: 'title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'pages',
      dataIndex: 'pages',
      key: 'pages',
    },
    {
      title: 'price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'auther',
      dataIndex: 'auther',
      key: 'auther',
      render: (record: any) => {
        return (
          <p>{record.first_name} {record.last_name}</p>
        )
      }
    },
    {
      title: 'category',
      dataIndex: 'category',
      key: 'category',
      render: (record: any) => {
        return (
          <p>{record?.name}</p>
        )
      }
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

  const [book, setbook] = useState<any>()
  const [books, setListebooks] = useState<any[]>([])
  const [bookId, setbookId] = useState<string>()
  const [isModalDeleteVisible, setIsModalDeleteVisible] = useState<boolean>(false);
  const [isModalEditVisible, setIsModalEditVisible] = useState<boolean>(false);
  const [, setUpdatebookValues] = useState<any>()
  const [bookForm, setbookForm] = useState<any>()

  const deleteCategoryHandler = (record: { _id: string }): void => {
    setbookId(record._id)
    setIsModalDeleteVisible(true);
  }

  const handleChangebook = (e: React.ChangeEvent<any> | any,): void => {
    console.log('e', e)
    setbookForm({ ...bookForm, [e.target.name]: e.target.value })
    console.log('bookForm', bookForm)
  }

  const handleEditCancel = (): void => {
    setbookId("")
    setbook({})
    setbookForm(undefined)
    setUpdatebookValues(undefined)
    setIsModalEditVisible(false);
  };

  const handleDeleteOk = async (): Promise<void> => {
    setIsModalDeleteVisible(false);
    let res;
    if (bookId) res = await deleteBook(bookId)
    if (res?.status === 200) window.location.reload()
    if (res?.error) notification.error({
      message: 'Erreur interne, essayer plus tard!',
    });
  };

  const handleDeleteCancel = (): void => {
    setIsModalDeleteVisible(false);
  };

  const editCategoryHandler = async (record: { _id: string }): Promise<void> => {
    setbookId(record._id)
    const res = await getBookById(record._id)
    if (res) {

      setUpdatebookValues(res.data)
      if (res.data) {
        setbookForm(res.data)
        setbook(res.data)
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

    bookForm.autherId = bookForm.auther._id
    delete bookForm.auther
    console.log('fdsfs', bookForm)
    //bookForm.categoryId = bookForm.category._id
    //  delete bookForm.category

    if (bookId && bookForm) res = await updateBookById(bookForm, bookId)
    if (res?.status === 200) window.location.reload()
    if (res?.error) notification.error({
      message: 'Erreur interne, essayer plus tard!',
    });

  };


  useEffect(() => {
    async function getlistbooks(): Promise<void> {
      const res = await getListBooks()
      if (res.data) setListebooks(res.data)
      if (res.error) {
        notification.error({
          message: 'Erreur interne, essayer plus tard!',
        });
      }
    }

    getlistbooks()
  }, [])

  return (
    <div className='listAddress'>
      <h2>Liste des livres</h2>
      <ConfigProvider renderEmpty={() => <Empty description="Aucun résultat n’est trouvé" />}>
        <Table<any> columns={columns} dataSource={books} />
      </ConfigProvider>
      <div className='deleteCategoryModal'>
        <Modal title="Supprimer book" visible={isModalDeleteVisible} onOk={handleDeleteOk} onCancel={handleDeleteCancel}>
          <p>Voulez-vous vraiment supprimer cette book?</p>
        </Modal>
      </div>
      <UpdateBookModal bookForm={bookForm} book={book} handleChangebook={handleChangebook}
        handleEditCancel={handleEditCancel} handleEditOk={handleEditOk} isModalEditVisible={isModalEditVisible} />
    </div>

  )
}

export default ListBooks
