import { useContext, useState } from 'react';
import InputText from '../../components/atom/InputText';
import styles from './SignupPage.module.scss';
import Title from '../../components/atom/Title/Title';
import AnchorButton from '../../components/atom/AnchorButton';
import MainButton from '../../components/atom/MainButton/MainButton';
import { DotLoader } from 'react-spinners';
import { serverHost } from '../../config';
import AuthContext from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function SignupPage() {
  const navigate = useNavigate();
  const { setToken } = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    checkpassword: "",
    name: "",
    lastname: ""
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
  };
  const validateName = () => {
    if (form?.name?.trim().length > 0) return true;
    setErrors((lastVal) => ({ ...lastVal, name: 'El nombre es obligatorio.' }));
    return false;
  };
  const validateLastname = () => {
    if (form?.lastname?.trim().length > 0) return true;
    setErrors((lastVal) => ({ ...lastVal, lastname: 'El apellido es obligatorio.' }));
    return false;
  };

  const validatePassword = () => {
    if (form?.password?.trim().length === 0) {
      setErrors((lastVal) => ({ ...lastVal, password: 'La contraseña es obligatoria.' }));
      return false;
    } else if (form?.checkpassword?.trim().length != 0 && form?.password !== form?.checkpassword) {
      setErrors((lastVal) => ({ ...lastVal, password: 'Las contraseñas no coinciden.' }));
      return false;
    }
    return true;
  };
  const validateCheckPassword = () => {
    if (form?.checkpassword?.trim().length != 0) {
      setErrors((lastVal) => ({ ...lastVal, checkpassword: 'Repite tu contraseña.' }));
      return false;
    } else if (form?.password?.trim().length != 0 && form?.checkpassword !== form?.password) {
      setErrors((lastVal) => ({ ...lastVal, checkpassword: 'Las contraseñas no coinciden.' }));
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearErrors();
    if (!(validateEmail() && validatePassword() && validateName() && validateLastname() && validateCheckPassword)) return;

    try {
      setLoading(true)
      const uri = `${serverHost}/register`;
      const response = await fetch(uri, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        const data = await response.json();
        setToken(data.token)
        localStorage.setItem('token', data.token);
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
        <Title title='Nuevo Usuario' className={styles.title} />
        <div className={styles.mainInputsContainer}>
          <div className={styles.inputsContainer}>
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
              title="Nombre"
              name="name"
              onChange={handleChange}
              value={form.name}
              error={errors?.name}
              onBlur={validateName}
              onFocus={clearError}
            />
            <InputText
              title="Apellido"
              name="lastname"
              onChange={handleChange}
              value={form.lastname}
              error={errors?.lastname}
              onBlur={validateLastname}
              onFocus={clearError}
            />
          </div>
          <div className={styles.inputsContainer}>
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
            <InputText
              title="Confirma tu contraseña"
              name="checkpassword"
              onChange={handleChange}
              value={form.checkpassword}
              error={errors?.checkpassword}
              onBlur={validateCheckPassword}
              onFocus={clearError}
              type="password"
            />
          </div>
        </div>
        {error && <div className={styles.errorMessage}>{error?.code === 401 ? 'Credenciales incorrectas' : 'Ocurrió un error.'}</div>}
        {!loading && (<MainButton text="Acceder" type="submit" />)}
        {loading && <DotLoader color="#26688c" />}
      </form>
      <p className={styles.text}>¿Ya tienes una cuenta? <AnchorButton text="¡Inicia Sesión!" link='/login' /></p>
    </div>
  )

}

export default SignupPage;
