import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { toast } from 'react-toastify';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        name: '',
        email: ''
    });

    const [errors, setErrors] = useState({
        username: '',
        password: '',
        name: '',
        email: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: '', general: '' }));
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = { username: '', password: '', name: '', email: '', general: '' };

        if (!formData.username.trim()) {
            //newErrors.username = 'Username is required';
            toast.error('Username is required');
            valid = false;
        } else if (formData.username.length < 3) {
            //newErrors.username = 'Username must be at least 3 characters';
            toast.error('Username must be at least 3 character');
            valid = false;
        }

        if (!formData.password) {
            //newErrors.password = 'Password is required';
            toast.error('Password required');
            valid = false;
        } else if (formData.password.length < 6) {
            //newErrors.password = 'Password must be at least 6 characters';
            toast.error('Password must be at least 6 characters');
            valid = false;
        }

        if (!formData.name.trim()) {
            //newErrors.name = 'Name is required';
            toast.error('Name is required');
            valid = false;
        }

        if (!formData.email.trim()) {
            //newErrors.email = 'Email is required';
            toast.error('Email is required');
            valid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            //newErrors.email = 'Please enter a valid email address';
            toast.error('Please enter a valid email address');
            valid = false;
        }

        setErrors(newErrors);
       
        setFormData({ username: '', password: '', name: '', email: '' });

        return valid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);
        setErrors(prev => ({ ...prev, general: '' }));

        try {
            const response = await api.post('/auth/register', formData);
            if (response.status === 200) {
                setFormData({ username: '', password: '', name: '', email: '' });
                toast.success('Registration successful! Please login.');
                navigate('/login');
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.response?.data || error.message || 'Registration failed. Please try again.';
            setErrors(prev => ({ ...prev, general: errorMessage }));
            toast.error(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            background: 'linear-gradient(to right, #4a90e2, #145da0)',
            padding: '1rem'
        }}>
            <div style={{
                maxWidth: '400px',
                width: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                padding: '1.5rem',
                borderRadius: '6px',
                background: 'linear-gradient(to right, #4a90e2, #145da0)',
                boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.2)',
                backdropFilter: 'blur(12px)'
            }}>
                <h1 style={{ textAlign: 'center', marginBottom: '0.6rem', color: '#222' }}>
                    <b>Create Account</b> <br />Join to get started!
                </h1>
                {errors.general && <div style={{ color: '#d32f2f', backgroundColor: '#fde8e8', padding: '0.5rem', borderRadius: '2px', marginBottom: '1rem', fontSize: '0.9rem' }}>{errors.general}</div>}
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    {['username', 'password', 'name', 'email'].map(field => (
                        <div key={field}>
                            <label htmlFor={field} style={{ display: 'block', marginBottom: '0.2rem', fontWeight: '600' }}>{field.charAt(0).toUpperCase() + field.slice(1)}*</label>
                            <input
                                type={field === 'password' ? 'password' : 'text'}
                                id={field}
                                name={field}
                                value={formData[field]}
                                onChange={handleChange}
                                style={{
                                    width: '100%',
                                    padding: '0.5rem',
                                    border: `1px solid ${errors[field] ? '#d32f2f' : '#ccc'}`,
                                    borderRadius: '6px',
                                    fontSize: '1rem',
                                    backgroundColor: 'lightblue'
                                }}
                                disabled={isSubmitting}
                            />
                            {errors[field] && <span style={{ color: '#d32f2f', fontSize: '0.85rem', marginTop: '0.3rem', display: 'block' }}>{errors[field]}</span>}
                        </div>
                    ))}
                    <button type="submit" disabled={isSubmitting} style={{ padding: '0.8rem', backgroundColor: isSubmitting ? '#cccccc' : '#28a745', color: 'white', border: 'none', borderRadius: '6px', fontSize: '1rem', fontWeight: '600', cursor: isSubmitting ? 'not-allowed' : 'pointer', marginTop: '0.7rem', transition: 'background-color 0.3s' }}>
                        {isSubmitting ? 'Creating Account...' : 'Register'}
                    </button>
                </form>
                <p style={{ textAlign: 'center', marginTop: '1.5rem', color: '#444' }}>
                    Already have an account? <span onClick={() => !isSubmitting && navigate('/login')} style={{ color: '#007bff', cursor: 'pointer', textDecoration: 'underline', fontWeight: '600' }}>Sign in</span>
                </p>
            </div>
        </div>
    );
};

export default Register;
