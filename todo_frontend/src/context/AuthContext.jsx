import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { serverHost } from '../config';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [refresh, setRefresh] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedRefresh = localStorage.getItem('refresh_token');

        if (storedToken) {
            setToken(storedToken);
        }

        if (storedRefresh) {
            setRefresh(storedRefresh);
        }
    }, []);

    const refreshToken = async () => {
        if (!refresh) return;

        const uri = `${serverHost}/token/refresh`;

        try {
            const response = await fetch(uri, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ refresh }),
            });

            const data = await response.json();
            if (response.ok) {
                setToken(data.token);
                setRefresh(data.refresh_token);
                sessionStorage.setItem('token', data.token);
                sessionStorage.setItem('refresh_token', data.refresh_token);
            } else {
                console.log('Fallo al refrescar token. Cerrando sesión...');
                // Puedes manejar el error de refresco de token aquí.
            }
        } catch (error) {
            console.error('Error al intentar refrescar el token', error);
            // Maneja el error aquí.
        }
    };

    return (
        <AuthContext.Provider value={{ token, setToken, refreshToken, refresh, setRefresh }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider };
export default AuthContext;

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
