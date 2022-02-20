import "./navbar.css"
import { LogoutOutlined, MenuOutlined, UserOutlined } from '@ant-design/icons'
import { PropsNavbar } from "../../../interfaces/LayoutInterface";
import { useNavigate } from "react-router";
import Avatar from "antd/lib/avatar/avatar";
import { Link } from "react-router-dom";

const Navbar: React.FC<PropsNavbar> = ({ showDrawer }) => {

  const navigate = useNavigate()

  return (
    <div className="navbar">
      <div className='logoSidebar'>
        <a href="/"></a>
      </div>

      <div className='logoMobile'>
        <div className='drawerMobile' onClick={showDrawer}>
          <MenuOutlined />
        </div>
        <a href="/"><img  alt="" className='logoImg' src={require('../../../assets/img/LogoBgWhite.svg').default} /></a>
      </div>

      <div className='navbar__elements'>
        <div>
      <Avatar  className="navbarUserAvatar" size={30} icon={<UserOutlined onClick={() => navigate('/account') } />} />

        </div>
        <LogoutOutlined onClick={
        () => {
          localStorage.removeItem('token')
          navigate('/login')
        }
      }  className='logout__Icon' />
      
      </div>
    </div>
  );
}

export default Navbar;