import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import  api  from '../utils/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [profile, setProfile] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            fetchProfile();
        } else {
            localStorage.removeItem('token');
            delete api.defaults.headers.common['Authorization'];
            setProfile(null);
        }
    }, [token]);

   const fetchProfile = async () => {
        try {
            const response = await api.get('/auth/profile');
            setProfile(response.data);
        } catch (error) {
            console.error('Failed to fetch profile:', error);
        }
    };

    const login = async (username, password) => {
        try {
            const response = await api.post('/auth/login', { username, password });
            setToken(response.data);
            setUser({ username });
            navigate('/tasks');
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    const register = async (userData) => {
        try {
            await api.post('/auth/register', userData);
            navigate('/login');
        } catch (error) {
            console.error('Registration failed:', error);
            throw error;
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        setProfile(null);
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ 
            user, 
            token, 
            profile,
            login, 
            register, 
            logout,
            fetchProfile
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);