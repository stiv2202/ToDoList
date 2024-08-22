import styles from './ImageIcon.module.scss'
import PropTypes from 'prop-types'

const ImageIcon = ({ url, alt = "", className = "" }) => {
    return (
        <div className={`${styles.container} ${className}`}>
            <img src={url} alt={alt} className={styles.image} />
        </div>
    )
}

ImageIcon.propTypes = {
    url: PropTypes.string.isRequired,
    alt: PropTypes.string,
    className: PropTypes.string,
}

export default ImageIcon;