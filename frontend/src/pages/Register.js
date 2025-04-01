import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { toast } from 'react-toastify';
import './Register.css'; // Import the CSS file

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
            toast.error('Username is required');
            valid = false;
        } else if (formData.username.length < 3) {
            toast.error('Username must be at least 3 characters');
            valid = false;
        }

        if (!formData.password) {
            toast.error('Password required');
            valid = false;
        } else if (formData.password.length < 6) {
            toast.error('Password must be at least 6 characters');
            valid = false;
        }

        if (!formData.name.trim()) {
            toast.error('Name is required');
            valid = false;
        }

        if (!formData.email.trim()) {
            toast.error('Email is required');
            valid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
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
        <div className="register-container">
            <div className="register-card">
                <h1>
                    <b>Create Account</b> <br />Join to get started!
                </h1>
                {errors.general && <div className="error-message">{errors.general}</div>}
                <form onSubmit={handleSubmit} className="register-form">
                    {['username', 'password', 'name', 'email'].map(field => (
                        <div key={field}>
                            <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}*</label>
                            <input
                                type={field === 'password' ? 'password' : 'text'}
                                id={field}
                                name={field}
                                value={formData[field]}
                                onChange={handleChange}
                                className={errors[field] ? 'error' : ''}
                                disabled={isSubmitting}
                            />
                            {errors[field] && <span>{errors[field]}</span>}
                        </div>
                    ))}
                    <button type="submit" disabled={isSubmitting} className="register-button">
                        {isSubmitting ? 'Creating Account...' : 'Register'}
                    </button>
                </form>
                <p className="login-link">
                    Already have an account? <span onClick={() => !isSubmitting && navigate('/login')}>Sign in</span>
                </p>
            </div>
        </div>
    );
};

export default Register;
