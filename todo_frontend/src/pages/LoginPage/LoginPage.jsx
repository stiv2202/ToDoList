import { useContext, useState } from 'react';
import InputText from '../../components/atom/InputText';
import styles from './LoginPage.module.scss';
import Title from '../../components/atom/Title/Title';
import AnchorButton from '../../components/atom/AnchorButton';
import MainButton from '../../components/atom/MainButton/MainButton';
import { DotLoader } from 'react-spinners';
import { serverHost } from '../../config';
import AuthContext from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();
  const { setToken, setRefresh } = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: ""
  })
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((lastValue) => ({ ...lastValue, [name]: value }));
  }

  const clearErrors = () => {
    setErrors({});
  };

  const clearError = (e) => {
    setErrors((lastVal) => ({ ...lastVal, [e.target.name]: null }));
  };

  const validateEmail = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (form?.email?.trim().length === 0) {
      setErrors((lastVal) => ({ ...lastVal, email: 'El email es obligatorio.' }));
      return false;
    }
    if (!emailPattern.test(form?.email?.trim())) {
      setErrors((lastVal) => ({ ...lastVal, email: 'El formato del email no es válido.' }));
      return false;
    }
    return true;
  }

  const validatePassword = () => {
    if (form?.password?.trim().length > 0) return true;
    setErrors((lastVal) => ({ ...lastVal, password: 'La contraseña es obligatoria.' }));
    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearErrors();
    if (!(validateEmail() && validatePassword())) return;

    try {
      setLoading(true)
      const uri = `${serverHost}/login_check`;
      const response = await fetch(uri, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: form.email, password: form.password }),
      });

      if (response.ok) {
        const data = await response.json();
        setToken(data.token)
        setRefresh(data.refresh_token)
        localStorage.setItem('token', data.token);
        localStorage.setItem('refresh_token', data.refresh_token);
        navigate('/');
      } else {
        const errorData = await response.json();
        setError(errorData);
      }
    } catch (err) {
      setError('Error al conectarse al servidor', err);
    } finally {
      setLoading(false)
    }

  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Title title='Iniciar Sesión' className={styles.title} />
        <InputText
          title="Correo Electrónico"
          name="email"
          onChange={handleChange}
          value={form.email}
          error={errors?.email}
          onBlur={validateEmail}
          onFocus={clearError}
          type="email"
        />
        <InputText
          title="Contraseña"
          name="password"
          onChange={handleChange}
          value={form.password}
          error={errors?.password}
          onBlur={validatePassword}
          onFocus={clearError}
          type="password"
        />
        {error && <div className={styles.errorMessage}>{error?.code === 401 ? 'Credenciales incorrectas' : 'Ocurrió un error.'}</div>}
        {!loading && (<MainButton text="Acceder" type="submit" />)}
        {loading && <DotLoader color="#26688c" />}
      </form>
      <p className={styles.text}>¿No tienes una cuenta? <AnchorButton text="¡Regístrate!" link='/signup' /></p>
    </div>
  )

}

export default LoginPage;
