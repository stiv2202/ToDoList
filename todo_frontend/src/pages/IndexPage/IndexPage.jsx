import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from '../../pages/LoginPage';
import MainPage from '../../pages/MainPage';
import SignupPage from '../../pages/SignupPage';
import useToken from '../../hooks/useToken';
import { Navigate } from 'react-router-dom';

function IndexPage() {
  const token = useToken();

  return (
    <Router>
      <Routes>
        <Route path="/" element={token ? <MainPage /> : <LoginPage />} />
        <Route
          path="/login"
          element={token ? <Navigate to="/" /> : <LoginPage />}
        />
        <Route
          path="/signup"
          element={token ? <Navigate to="/" /> : <SignupPage />}
        />
      </Routes>
    </Router>
  );
}

export default IndexPage;
