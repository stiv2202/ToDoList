import ImageIcon from '../ImageIcon/ImageIcon';
import styles from './ListItem.module.scss'
import PropTypes from 'prop-types'

const ListItem = ({ icon, title, detail, className, action }) => {

    const renderIcon = () => {
        if (typeof icon === 'string') {
            return <ImageIcon url={icon} alt="profile-picture" className={styles.picture} />;
        }
        return icon;
    };

    if (action) {
        return (
            <button onClick={action} className={`${styles.container} ${styles.action} ${className}`}>
                {renderIcon()}
                <div className={styles.subSection}>
                    <h3>{title}</h3>
                    {detail ? <p>{detail}</p> : ''}
                </div>
            </button>
        )
    }

    return (
        <div className={`${styles.container} ${className}`}>
            {renderIcon()}
            <div className={styles.subSection}>
                <h3>{title}</h3>
                {detail ? <p>{detail}</p> : ''}
            </div>
        </div>
    )
}

ListItem.propTypes = {
    icon: PropTypes.node,
    title: PropTypes.string,
    detail: PropTypes.string,
    className: PropTypes.string,
    action: PropTypes.func,
}

export default ListItem;
