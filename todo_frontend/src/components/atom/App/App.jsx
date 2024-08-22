import '../../../styles/App.scss'
import { AuthProvider } from '../../../context/AuthContext';
import IndexPage from '../../../pages/IndexPage/IndexPage';

function App() {
  return (
    <AuthProvider>
      <IndexPage />
    </AuthProvider>
  );
}

export default App
