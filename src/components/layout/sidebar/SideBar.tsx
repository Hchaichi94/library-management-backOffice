import './sidebar.css'
import { Drawer, Menu } from 'antd';
import { BellOutlined, DiffOutlined, EnvironmentOutlined, FileUnknownOutlined, HomeOutlined, MedicineBoxOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Link, useLocation, useParams } from 'react-router-dom';
import { PropsSideBar } from '../../../interfaces/LayoutInterface';
import { Fragment, useEffect, useState } from 'react';

const { SubMenu } = Menu;

const SideBar: React.FC<PropsSideBar> = ({ visibleDrawer, setVisibleDrawer }) => {

    const location = useLocation();
    const [selectedSideBarKey, setSelectedSideBarKey] = useState<undefined | string[]>(undefined)
    const [selectedSideBarSub, setSelectedSideBarSub] = useState<undefined | string[]>(undefined)
    const onClose = (): void => {
        setVisibleDrawer(false)
    };



    useEffect(() => {
        if (location.pathname === "/") {
            setSelectedSideBarKey(["1"])
            setSelectedSideBarSub([""])
        }
        if (location.pathname === "/users") {
            setSelectedSideBarKey(["3"])
            setSelectedSideBarSub(["sub1"])
        }
        if (location.pathname === "/create-user") {
            setSelectedSideBarKey(["4"])
            setSelectedSideBarSub(["sub1"])
        }
        if (location.pathname === "/categories") {
            setSelectedSideBarKey(["5"])
            setSelectedSideBarSub(["sub2"])
        }
        if (location.pathname === "/create-category") {
            setSelectedSideBarKey(["6"])
            setSelectedSideBarSub(["sub2"])
        }
        if (location.pathname === "/authers") {
            setSelectedSideBarKey(["7"])
            setSelectedSideBarSub(["sub3"])
        }
        if (location.pathname === "/create-auther") {
            setSelectedSideBarKey(["8"])
            setSelectedSideBarSub(["sub3"])
        }
        if (location.pathname === "/books") {
            setSelectedSideBarKey(["9"])
            setSelectedSideBarSub(["sub4"])
        }
        if (location.pathname === "/create-book") {
            setSelectedSideBarKey(["10"])
            setSelectedSideBarSub(["sub4"])
        }
        if (location.pathname === "/account") {
            setSelectedSideBarKey(["1"])
            setSelectedSideBarSub([""])
        }
    }, [location.pathname])


    return (
        <div className='sidebar'>
            {selectedSideBarKey !== undefined && selectedSideBarSub !== undefined ? <Fragment>
                <Menu
                    /* onClick={handleClick} */
                    style={{ width: 261 }}
                    defaultSelectedKeys={selectedSideBarKey}
                    defaultOpenKeys={selectedSideBarSub}
                    className="menuSidebar"
                    mode="inline"

                >

                    <Menu.Item key="1" icon={<HomeOutlined />}>
                        <Link className='sidebarLinks' to={'/'}>Accueil</Link>
                    </Menu.Item>

                    <SubMenu key="sub1" icon={<MedicineBoxOutlined />} title="Users">
                        <Menu.Item key="3"><Link className='sidebarLinks' to={'/users'}>Liste users</Link></Menu.Item>
                        <Menu.Item key="4"><Link className='sidebarLinks' to={'/create-user'}>Ajouter un user</Link></Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" icon={<MedicineBoxOutlined />} title="Categories">
                        <Menu.Item key="5"><Link className='sidebarLinks' to={'/categories'}>Liste categories</Link></Menu.Item>
                        <Menu.Item key="6"><Link className='sidebarLinks' to={'/create-category'}>Ajouter une category</Link></Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub3" icon={<MedicineBoxOutlined />} title="Authers">
                        <Menu.Item key="7"><Link className='sidebarLinks' to={'/authers'}>Liste Authers</Link></Menu.Item>
                        <Menu.Item key="8"><Link className='sidebarLinks' to={'/create-auther'}>Ajouter un auther</Link></Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub4" icon={<MedicineBoxOutlined />} title="Books">
                        <Menu.Item key="9"><Link className='sidebarLinks' to={'/books'}>Liste Books</Link></Menu.Item>
                        <Menu.Item key="10"><Link className='sidebarLinks' to={'/create-book'}>Ajouter un livre</Link></Menu.Item>
                    </SubMenu>
                </Menu>


            </Fragment> : null}

        </div>
    );
}

export default SideBar;