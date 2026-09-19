import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TestCard from '../components/TestCard';
import StatusTimeline from '../components/StatusTimeline';
import StatusBadge from '../components/StatusBadge';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

function PatientDashboard() {
    const [activeTab, setActiveTab] = useState('tests');
    const [tests, setTests] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [bookingId, setBookingId] = useState(null);
    const [message, setMessage] = useState('');
    const { user } = useAuth();

    const loadTests = async () => {
        const res = await api.get('/tests/active');
        setTests(res.data);
    };

    const loadBookings = async () => {
        const res = await api.get(`/bookings/patient/${user.patientId}`);
        setBookings(res.data);
    };

    useEffect(() => {
        setLoading(true);
        Promise.all([loadTests(), loadBookings()]).finally(() => setLoading(false));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleBook = async (test) => {
        setBookingId(test.id);
        setMessage('');
        try {
            await api.post('/bookings', { testId: test.id });
            setMessage(`Booked "${test.testName}" successfully.`);
            await loadBookings();
            setActiveTab('bookings');
        } catch (err) {
            setMessage(err.response?.data?.message || 'Booking failed');
        } finally {
            setBookingId(null);
        }
    };

    return (
        <>
            <Navbar />
            <div className="py-4" style={{ backgroundColor: '#eef4f4' }}>
                <div className="container">
                    <h2 className="section-heading mb-1" style={{ fontSize: '26px' }}>Welcome, {user?.name}</h2>
                    <p className="body-text mb-0">Manage your tests and track results here.</p>
                </div>
            </div>

            <div className="container py-4">
                <ul className="nav nav-pills mb-4 gap-2">
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === 'tests' ? 'active' : ''}`}
                            style={activeTab === 'tests' ? { backgroundColor: 'var(--brand-teal)' } : {}}
                            onClick={() => setActiveTab('tests')}
                        >
                            Available Tests
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === 'bookings' ? 'active' : ''}`}
                            style={activeTab === 'bookings' ? { backgroundColor: 'var(--brand-teal)' } : {}}
                            onClick={() => setActiveTab('bookings')}
                        >
                            My Bookings
                        </button>
                    </li>
                </ul>

                {message && <div className="alert alert-info" style={{ fontSize: '14.5px' }}>{message}</div>}
                {loading && <p className="body-text">Loading...</p>}

                {!loading && activeTab === 'tests' && (
                    <div className="row g-4">
                        {tests.map((test) => (
                            <div className="col-md-4" key={test.id}>
                                <TestCard test={test} onBook={handleBook} booking={bookingId === test.id} />
                            </div>
                        ))}
                        {tests.length === 0 && <p className="body-text">No active tests available right now.</p>}
                    </div>
                )}

                {!loading && activeTab === 'bookings' && (
                    <div>
                        {bookings.map((b) => (
                            <div className="soft-card mb-3 p-4" key={b.id}>
                                <div className="d-flex justify-content-between align-items-start flex-wrap gap-2">
                                    <div>
                                        <h5 className="card-title-custom mb-1">Booking #{b.id} — {b.testName}</h5>
                                        <p className="body-text mb-0" style={{ fontSize: '14.5px' }}>
                                            ₹{b.totalAmount} · Booked on {new Date(b.bookingDate).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <StatusBadge status={b.status} />
                                </div>
                                <StatusTimeline currentStatus={b.status} />
                            </div>
                        ))}
                        {bookings.length === 0 && <p className="body-text">You have no bookings yet.</p>}
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}

export default PatientDashboard;