import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

function useToken() {
  const { token } = useContext(AuthContext);
  return token;
}

export default useToken;
