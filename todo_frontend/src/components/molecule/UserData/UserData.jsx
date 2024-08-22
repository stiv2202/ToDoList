import { useState } from 'react';
import ImageIcon from '../../atom/ImageIcon/ImageIcon';
import UserInfoHover from '../UserInfoHover/UserInfoHover';
import styles from './UserData.module.scss';
import { IoMdArrowDropdown } from "react-icons/io";
import PropTypes from 'prop-types'

const UserData = ({user}) => {
    const [show, setShow] = useState(false);
    return (
        <div
            className={styles.container}
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
        >
            <div className={styles.subContainer}>
                <ImageIcon url={user.image} />
                <h3>{user.name}</h3>
                <IoMdArrowDropdown />
            </div>
            <UserInfoHover user={user} className={show ? styles.showToggle : styles.hideToggle} />
        </div>
    )
}

export default UserData;

UserData.propTypes = {
    user: PropTypes.object
}