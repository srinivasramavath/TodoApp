import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(username, password);
            toast.success('Login successful!');
        } catch (error) {
            //alert('Login failed. Please check your credentials.');
            toast.error('Login failed. Please check your credentials.');
            
        }
    };

    return (
        <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100vh', 
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
        }}>
            <div style={{ 
                maxWidth: '400px', 
                width: '100%',
                padding: '30px',
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(10px)',
                color: '#fff',
                textAlign: 'center'
            }}>
                <h2 style={{ marginBottom: '20px', fontSize: '24px' }}>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Username:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            style={{ 
                                width: '100%', 
                                padding: '12px',
                                borderRadius: '6px',
                                border: '1px solid rgba(255, 255, 255, 0.3)',
                                background: 'rgba(255, 255, 255, 0.2)',
                                color: '#fff',
                                outline: 'none'
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{ 
                                width: '100%', 
                                padding: '12px',
                                borderRadius: '6px',
                                border: '1px solid rgba(255, 255, 255, 0.3)',
                                background: 'rgba(255, 255, 255, 0.2)',
                                color: '#fff',
                                outline: 'none'
                            }}
                        />
                    </div>
                    <button 
                        type="submit"
                        style={{ 
                            width: '100%',
                            padding: '12px',
                            backgroundColor: '#ff7eb3', 
                            color: 'white', 
                            border: 'none', 
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '16px',
                            transition: '0.3s',
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#ff4d94'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#ff7eb3'}
                    >
                        Login
                    </button>
                </form>
                <p style={{ 
                    marginTop: '20px',
                    fontSize: '14px'
                }}>
                    Don't have an account?{' '}
                    <span 
                        onClick={() => navigate('/register')}
                        style={{
                            color: '#ff7eb3',
                            cursor: 'pointer',
                            textDecoration: 'underline'
                        }}
                    >
                        Register
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Login;
