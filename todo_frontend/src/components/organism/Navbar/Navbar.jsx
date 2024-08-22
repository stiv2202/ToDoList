import UserData from '../../molecule/UserData/UserData';
import styles from './Navbar.module.scss';
import { FaHashtag } from "react-icons/fa6";
import PropTypes from 'prop-types'

const proyectos = [
    {
        name: 'Fitness',
        sections: [
            'Rutina',
            'Vida diaria'
        ]
    },
    {
        name: 'Supermercado',
        sections: [
            'Compras',
            'Para fiesta'
        ]
    }, {
        name: 'Citas',
        sections: [
            'Próximas consultas médicas',
            'Salidas con amigos'
        ]
    }]

const Navbar = ({user}) => {
    return (
        <div className={styles.container}>
            <UserData user={user} />
            {proyectos.map((proyecto) => (
                <div className={styles.projects} key={proyecto.name}>
                    <FaHashtag />
                    {proyecto.name}
                    <div className={styles.sections}>
                        {proyecto.sections.map((section) => (
                            <h3 key={section}>{section}</h3>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Navbar

Navbar.propTypes = {
    user: PropTypes.object,
}