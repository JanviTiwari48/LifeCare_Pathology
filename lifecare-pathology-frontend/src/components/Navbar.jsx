import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const dashboardPath = user?.role === 'PATIENT' ? '/patient' : '/lab';

    return (
        <nav className="navbar navbar-expand-lg navbar-dark sticky-top" style={{ backgroundColor: 'var(--brand-teal)' }}>
            <div className="container">
                <Link className="navbar-brand navbar-brand-text" to="/">
                    <i className="bi bi-heart-pulse-fill me-2"></i>LifeCare Pathology
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navMenu">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">

                        <li className="nav-item"><a className="nav-link" href="/#popular-tests">Tests</a></li>
                        <li className="nav-item"><a className="nav-link" href="/#why-us">About</a></li>
                        {user && (
                            <li className="nav-item"><Link className="nav-link" to={dashboardPath}>Dashboard</Link></li>
                        )}
                    </ul>
                    <div className="d-flex gap-2">
                        {!user && (
                            <>
                                <Link className="btn btn-brand-outline btn-sm px-3" to="/login">Login</Link>
                                <Link className="btn btn-light btn-sm px-3" to="/register">Register</Link>
                            </>
                        )}
                        {user && (
                            <>
                <span className="text-white align-self-center me-2" style={{ fontSize: '14.5px' }}>
                  Hi, {user.name}
                </span>
                                <button className="btn btn-brand-outline btn-sm px-3" onClick={handleLogout}>Logout</button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;