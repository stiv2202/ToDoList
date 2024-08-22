import styles from './UserInfoHover.module.scss'
import PropTypes from 'prop-types'
import { GrConfigure } from "react-icons/gr";
import { RiTeamLine } from "react-icons/ri";
import { CiLogout } from "react-icons/ci";
import ListItem from '../../atom/ListItem/ListItem';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../../context/AuthContext'
import { useContext } from 'react';

const UserInfoHover = ({ user, className }) => {
    const { setToken } = useContext(AuthContext)
    const navigate = useNavigate();
    const handleLogOut = () => {
        setToken(undefined)
        localStorage.clear();
        navigate('/login')
    }

    const sections = [
        {
            name: 'Config',
            icon: <GrConfigure />,
        },
        {
            name: 'Team',
            icon: <RiTeamLine />,
        },
        {
            name: 'Cerrar Sesión',
            icon: <CiLogout />,
            action: handleLogOut
        },
    ]

    return (
        <div className={`${styles.container} ${className}`}>
            <ListItem icon={user.image} detail="0 de 5 tareas" title={user.name} />
            {sections.map((section) => <ListItem key={section.name} icon={section.icon} title={section.name} action={section.action} />)}
        </div>
    )
}

UserInfoHover.propTypes = {
    user: PropTypes.object,
    className: PropTypes.string
}

export default UserInfoHover