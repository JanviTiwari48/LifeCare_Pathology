import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

function Register() {
    const [form, setForm] = useState({ name: '', email: '', password: '', role: 'PATIENT', phone: '', address: '' });
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
            const res = await api.post('/auth/register', form);
            login(res.data);
            navigate(res.data.role === 'PATIENT' ? '/patient' : '/lab');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="d-flex align-items-center justify-content-center py-5" style={{ minHeight: '85vh' }}>
                <div className="soft-card p-5" style={{ maxWidth: '460px', width: '100%' }}>
                    <div className="text-center mb-4">
                        <div className="icon-circle mx-auto mb-2"><i className="bi bi-person-plus-fill"></i></div>
                        <h4 className="card-title-custom mb-1">Create Account</h4>
                        <p className="body-text" style={{ fontSize: '14.5px' }}>Join LifeCare Pathology</p>
                    </div>

                    {error && <div className="alert alert-danger py-2" style={{ fontSize: '14.5px' }}>{error}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label" style={{ fontSize: '14.5px' }}>Name</label>
                            <input className="form-control" name="name" value={form.name} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" style={{ fontSize: '14.5px' }}>Email</label>
                            <input type="email" className="form-control" name="email" value={form.email} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" style={{ fontSize: '14.5px' }}>Password</label>
                            <input type="password" className="form-control" name="password" value={form.password} onChange={handleChange} required minLength={6} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" style={{ fontSize: '14.5px' }}>Role</label>
                            <select className="form-select" name="role" value={form.role} onChange={handleChange}>
                                <option value="PATIENT">Patient</option>
                                <option value="LAB_TECHNICIAN">Lab Technician</option>
                            </select>
                        </div>
                        {form.role === 'PATIENT' && (
                            <>
                                <div className="mb-3">
                                    <label className="form-label" style={{ fontSize: '14.5px' }}>Phone</label>
                                    <input className="form-control" name="phone" value={form.phone} onChange={handleChange} />
                                </div>
                                <div className="mb-4">
                                    <label className="form-label" style={{ fontSize: '14.5px' }}>Address</label>
                                    <input className="form-control" name="address" value={form.address} onChange={handleChange} />
                                </div>
                            </>
                        )}
                        <button className="btn btn-brand w-100" disabled={loading}>
                            {loading ? 'Registering...' : 'Register'}
                        </button>
                    </form>
                    <p className="mt-3 text-center body-text" style={{ fontSize: '14.5px' }}>
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                </div>
            </div>
        </>
    );
}

export default Register;