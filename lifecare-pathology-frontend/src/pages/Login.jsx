import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

function Login() {
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const res = await api.post('/auth/login', form);
            login(res.data);
            navigate(res.data.role === 'PATIENT' ? '/patient' : '/lab');
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid email or password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '85vh' }}>
                <div className="soft-card p-5" style={{ maxWidth: '420px', width: '100%' }}>
                    <div className="text-center mb-4">
                        <div className="icon-circle mx-auto mb-2"><i className="bi bi-heart-pulse-fill"></i></div>
                        <h4 className="card-title-custom mb-1">Welcome Back</h4>
                        <p className="body-text" style={{ fontSize: '14.5px' }}>Login to your LifeCare account</p>
                    </div>

                    {error && <div className="alert alert-danger py-2" style={{ fontSize: '14.5px' }}>{error}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label" style={{ fontSize: '14.5px' }}>Email</label>
                            <input type="email" className="form-control" name="email" value={form.email} onChange={handleChange} required />
                        </div>
                        <div className="mb-4">
                            <label className="form-label" style={{ fontSize: '14.5px' }}>Password</label>
                            <input type="password" className="form-control" name="password" value={form.password} onChange={handleChange} required />
                        </div>
                        <button className="btn btn-brand w-100" disabled={loading}>
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>
                    <p className="mt-3 text-center body-text" style={{ fontSize: '14.5px' }}>
                        Don't have an account? <Link to="/register">Register</Link>
                    </p>
                </div>
            </div>
        </>
    );
}

export default Login;