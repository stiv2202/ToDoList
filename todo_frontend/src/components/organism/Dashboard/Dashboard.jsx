import { useState } from 'react';
import styles from './Dashboard.module.scss';
import PropTypes from 'prop-types';
import InputText from '../../atom/InputText';
import MainButton from '../../atom/MainButton/MainButton';

function saludo() {
    const ahora = new Date();
    const hora = ahora.getHours();

    if (hora >= 5 && hora < 12) {
        return '¡Buenos días,';
    } else if (hora >= 12 && hora < 19) {
        return '¡Buenas tardes,';
    } else {
        return '¡Buenas noches,';
    }
}

const Dashboard = ({ user, initialTasks }) => {
    const [tasks, setTasks] = useState(initialTasks);
    const [newTask, setNewTask] = useState({
        name: "",
    })

    const toggleTaskCompletion = (taskName) => {
        setTasks(tasks.map(task =>
            task.name === taskName ? { ...task, finished: !task.finished } : task
        ));
    };

    const removeTask = (taskName) => {
        setTasks(tasks.filter(task => task.name !== taskName));
    };

    const addTask = (taskName) => {
        console.log("taskName:", taskName)
        if (taskName.trim() === '') return;
        setTasks([...tasks, { name: taskName, finished: false }]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addTask(newTask.name);
        setNewTask({ name: '' });
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewTask((lastValue) => ({ ...lastValue, [name]: value }));
    }

    return (
        <div className={styles.container}>
            <h1>{`${saludo()} ${user.name}!`}</h1>
            <div className={styles.newTaskContainer}>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <InputText
                        title="Nueva Tarea"
                        name="name"
                        className={styles.input}
                        value={newTask.name}
                        onChange={handleChange}
                        defaultValue=''
                        autoComplete="off"
                    />
                    <MainButton text="Agregar" type='submit' />
                </form>
            </div>
            {tasks.map((task) => (
                <div key={task.name} className={styles.taskContainer}>
                    <h2>{task.name}</h2>
                    <input
                        type="checkbox"
                        checked={task.finished}
                        onChange={() => toggleTaskCompletion(task.name)}
                    />
                    <button onClick={() => removeTask(task.name)}>Eliminar</button>
                </div>
            ))}
        </div>
    );
};

Dashboard.propTypes = {
    user: PropTypes.object.isRequired,
    initialTasks: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            finished: PropTypes.bool.isRequired
        })
    ).isRequired
};

export default Dashboard;
