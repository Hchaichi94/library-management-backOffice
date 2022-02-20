import { UserOutlined } from '@ant-design/icons'
import Avatar from 'antd/lib/avatar/avatar'
import './profile.css'

const ProfileHeader = () => {
    return (
        <div className="profile__header">
            <Avatar size={80} icon={<UserOutlined />} />
            <h3>Administrateur</h3>
        </div>
    )
}
export default ProfileHeader