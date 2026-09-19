import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        setMenuOpen(false);
        navigate('/');
    };

    const dashboardPath = user?.role === 'PATIENT' ? '/patient' : '/lab';

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <nav
            className="navbar navbar-expand-lg navbar-dark sticky-top"
            style={{ backgroundColor: 'var(--brand-teal)' }}
        >
            <div className="container">

                {/* Logo */}
                <Link
                    className="navbar-brand navbar-brand-text"
                    to="/"
                    onClick={closeMenu}
                >
                    <i className="bi bi-heart-pulse-fill me-2"></i>
                    LifeCare Pathology
                </Link>

                {/* Mobile hamburger */}
                <button
                    className="navbar-toggler"
                    type="button"
                    onClick={() => setMenuOpen(prev => !prev)}
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Navigation menu */}
                <div className={`navbar-collapse ${menuOpen ? 'show' : ''}`}>

                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">

                        <li className="nav-item">
                            <a
                                className="nav-link"
                                href="/#popular-tests"
                                onClick={closeMenu}
                            >
                                Tests
                            </a>
                        </li>

                        <li className="nav-item">
                            <a
                                className="nav-link"
                                href="/#why-us"
                                onClick={closeMenu}
                            >
                                About
                            </a>
                        </li>

                        {user && (
                            <li className="nav-item">
                                <Link
                                    className="nav-link"
                                    to={dashboardPath}
                                    onClick={closeMenu}
                                >
                                    Dashboard
                                </Link>
                            </li>
                        )}

                    </ul>

                    {/* Right side buttons */}
                    <div className="d-flex gap-2">

                        {!user && (
                            <>
                                <Link
                                    className="btn btn-brand-outline btn-sm px-3"
                                    to="/login"
                                    onClick={closeMenu}
                                >
                                    Login
                                </Link>

                                <Link
                                    className="btn btn-light btn-sm px-3"
                                    to="/register"
                                    onClick={closeMenu}
                                >
                                    Register
                                </Link>
                            </>
                        )}

                        {user && (
                            <>
                                <span
                                    className="text-white align-self-center me-2"
                                    style={{ fontSize: '14.5px' }}
                                >
                                    Hi, {user.name}
                                </span>

                                <button
                                    className="btn btn-brand-outline btn-sm px-3"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </>
                        )}

                    </div>

                </div>
            </div>
        </nav>
    );
}

export default Navbar;