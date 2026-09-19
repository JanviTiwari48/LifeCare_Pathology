import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import StatusBadge from '../components/StatusBadge';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const NEXT_ACTION = {
    BOOKED: {
        label: 'Collect Sample',
        type: 'collect'
    },
    SAMPLE_COLLECTED: {
        label: 'Start Test',
        type: 'status',
        target: 'TEST_IN_PROGRESS'
    },
    TEST_IN_PROGRESS: {
        label: 'Complete Test',
        type: 'status',
        target: 'TEST_COMPLETED'
    },
    TEST_COMPLETED: null,
};

function LabDashboard() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actingOn, setActingOn] = useState(null);
    const [message, setMessage] = useState('');
    const { user } = useAuth();

    const loadBookings = async () => {
        const res = await api.get('/bookings');
        setBookings(res.data);
    };

    useEffect(() => {
        setLoading(true);

        loadBookings()
            .finally(() => setLoading(false));

    }, []);

    const handleAction = async (booking) => {
        const action = NEXT_ACTION[booking.status];

        if (!action) return;

        setActingOn(booking.id);
        setMessage('');

        try {
            if (action.type === 'collect') {
                await api.post(`/samples/booking/${booking.id}`);

                setMessage(
                    `Sample collected for Booking #${booking.id}.`
                );
            } else {
                await api.patch(
                    `/bookings/${booking.id}/status`,
                    { status: action.target }
                );

                setMessage(
                    `Booking #${booking.id} updated successfully.`
                );
            }

            await loadBookings();

        } catch (err) {
            setMessage(
                err.response?.data?.message || 'Action failed'
            );
        } finally {
            setActingOn(null);
        }
    };

    const pending = bookings.filter(
        (b) => b.status !== 'TEST_COMPLETED'
    );

    const completed = bookings.filter(
        (b) => b.status === 'TEST_COMPLETED'
    );

    const bookedCount = bookings.filter(
        (b) => b.status === 'BOOKED'
    ).length;

    const inProgressCount = bookings.filter(
        (b) =>
            b.status === 'SAMPLE_COLLECTED' ||
            b.status === 'TEST_IN_PROGRESS'
    ).length;

    return (
        <>
            <Navbar />

            {/* Header */}
            <div
                className="py-4"
                style={{ backgroundColor: '#f9eef3' }}
            >
                <div className="container">

                    <h2
                        className="mb-1"
                        style={{
                            fontSize: '26px',
                            fontWeight: 700
                        }}
                    >
                        Lab Dashboard
                    </h2>

                    <p
                        className="mb-0"
                        style={{
                            fontSize: '14px',
                            color: '#667078'
                        }}
                    >
                        Welcome, {user?.name} — manage sample collection
                        and test status.
                    </p>

                </div>
            </div>

            <div className="container py-4">

                {/* Message */}
                {message && (
                    <div
                        className="alert alert-info"
                        style={{ fontSize: '14px' }}
                    >
                        {message}
                    </div>
                )}

                {/* Loading */}
                {loading && (
                    <p
                        style={{
                            fontSize: '14px',
                            color: '#667078'
                        }}
                    >
                        Loading...
                    </p>
                )}

                {!loading && (
                    <>

                        {/* Statistics */}
                        <div className="row g-3 mb-5">

                            <div className="col-md-4">
                                <div className="soft-card p-3">
                                    <div
                                        style={{
                                            fontSize: '13px',
                                            color: '#667078'
                                        }}
                                    >
                                        Pending Collection
                                    </div>

                                    <div
                                        style={{
                                            fontSize: '24px',
                                            fontWeight: 700,
                                            color: 'var(--brand-teal)'
                                        }}
                                    >
                                        {bookedCount}
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="soft-card p-3">
                                    <div
                                        style={{
                                            fontSize: '13px',
                                            color: '#667078'
                                        }}
                                    >
                                        In Progress
                                    </div>

                                    <div
                                        style={{
                                            fontSize: '24px',
                                            fontWeight: 700,
                                            color: 'var(--brand-teal)'
                                        }}
                                    >
                                        {inProgressCount}
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="soft-card p-3">
                                    <div
                                        style={{
                                            fontSize: '13px',
                                            color: '#667078'
                                        }}
                                    >
                                        Completed
                                    </div>

                                    <div
                                        style={{
                                            fontSize: '24px',
                                            fontWeight: 700,
                                            color: 'var(--brand-teal)'
                                        }}
                                    >
                                        {completed.length}
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* Pending Bookings */}
                        <h5
                            className="mb-3"
                            style={{
                                fontSize: '20px',
                                fontWeight: 600
                            }}
                        >
                            Pending Bookings
                        </h5>

                        {pending.length === 0 && (
                            <div
                                className="soft-card p-4 mb-5"
                                style={{
                                    color: '#667078',
                                    fontSize: '14px'
                                }}
                            >
                                No pending bookings.
                            </div>
                        )}

                        {pending.map((b) => {

                            const action = NEXT_ACTION[b.status];

                            return (
                                <div
                                    className="soft-card mb-3 p-4"
                                    key={b.id}
                                >
                                    <div
                                        className="d-flex justify-content-between align-items-center flex-wrap gap-3"
                                    >

                                        <div>

                                            <h6
                                                className="mb-1"
                                                style={{
                                                    fontSize: '17px',
                                                    fontWeight: 600
                                                }}
                                            >
                                                Booking #{b.id} — {b.testName}
                                            </h6>

                                            <p
                                                className="mb-2"
                                                style={{
                                                    fontSize: '14px',
                                                    color: '#667078'
                                                }}
                                            >
                                                Patient: {b.patientName}
                                            </p>

                                            <StatusBadge
                                                status={b.status}
                                            />

                                        </div>

                                        {action && (
                                            <button
                                                className="btn btn-brand"
                                                style={{
                                                    fontSize: '14px'
                                                }}
                                                onClick={() =>
                                                    handleAction(b)
                                                }
                                                disabled={
                                                    actingOn === b.id
                                                }
                                            >
                                                {actingOn === b.id
                                                    ? 'Processing...'
                                                    : action.label}
                                            </button>
                                        )}

                                    </div>
                                </div>
                            );
                        })}

                        {/* Completed */}
                        <h5
                            className="mt-5 mb-3"
                            style={{
                                fontSize: '20px',
                                fontWeight: 600
                            }}
                        >
                            Completed
                        </h5>

                        {completed.length === 0 && (
                            <div
                                className="soft-card p-4"
                                style={{
                                    color: '#667078',
                                    fontSize: '14px'
                                }}
                            >
                                No completed tests yet.
                            </div>
                        )}

                        {completed.map((b) => (
                            <div
                                className="soft-card mb-3 p-4"
                                key={b.id}
                            >
                                <div
                                    className="d-flex justify-content-between align-items-center flex-wrap gap-3"
                                >

                                    <div>

                                        <h6
                                            className="mb-1"
                                            style={{
                                                fontSize: '17px',
                                                fontWeight: 600
                                            }}
                                        >
                                            Booking #{b.id} — {b.testName}
                                        </h6>

                                        <p
                                            className="mb-0"
                                            style={{
                                                fontSize: '14px',
                                                color: '#667078'
                                            }}
                                        >
                                            Patient: {b.patientName}
                                        </p>

                                    </div>

                                    <StatusBadge
                                        status={b.status}
                                    />

                                </div>
                            </div>
                        ))}

                    </>
                )}

            </div>

            <Footer />
        </>
    );
}

export default LabDashboard;