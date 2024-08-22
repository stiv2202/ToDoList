import Dashboard from '../../components/organism/Dashboard/Dashboard';
import Navbar from '../../components/organism/Navbar/Navbar';
import styles from './MainPage.module.scss';

const user = {
  name: 'Steve Rogers',
  email: 'capitanamerica0407@avengers.com',
  image: 'https://pyxis.nymag.com/v1/imgs/338/9c1/462cbd8aec032b6e7648a2ba76314afdd1-25-captain-america-chris-evans.2x.rhorizontal.w710.jpg'
}

const tasks = [
  {
    name: 'Sacar la basura',
    finished: false,
  },
  {
    name: 'Lavar el carro',
    finished: true,
  },
  {
    name: 'Configurar el proyecto',
    finished: false,
  },
  {
    name: 'Ordenar la cocina',
    finished: true,
  },
  {
    name: 'Lavar trastos',
    finished: false,
  },
]

function MainPage() {
  return (
    <div className={styles.container}>
      <Navbar user={user} />
      <Dashboard user={user} initialTasks={tasks} />
    </div>
  );
}

export default MainPage;
