import { useContext, useEffect } from 'react';
import { serverHost } from '../config';
import useFetch from './useFetch';
import AuthContext from '../context/AuthContext';

function useLogin() {
  const {
    callFetch, result, error, loading,
  } = useFetch();
  const { setToken } = useContext(AuthContext);
  useEffect(() => {
    if (!result?.token) return;
    setToken(result.token);
  }, [result, setToken]);

  const login = async ({
    user, password,
  }) => {
    const uri = `${serverHost}/login_check`;
    const body = JSON.stringify({ user, password });
    callFetch({
      uri, method: 'POST', body,
    });
  };

  return {
    login, success: result, error, loading,
  };
}
export default useLogin;
