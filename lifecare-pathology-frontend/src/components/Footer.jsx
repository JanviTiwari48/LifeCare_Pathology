function Footer() {
    return (
        <footer className="bg-white border-top mt-5 pt-5 pb-4">
            <div className="container">
                <div className="row g-4">
                    <div className="col-md-4">
                        <h5 className="navbar-brand-text" style={{ fontSize: '20px', color: 'var(--brand-teal)' }}>
                            <i className="bi bi-heart-pulse-fill me-2"></i>LifeCare Pathology
                        </h5>
                        <p className="body-text" style={{ fontSize: '14.5px' }}>
                            Reliable diagnostic testing with easy online booking and real-time sample tracking.
                        </p>
                    </div>
                    <div className="col-md-4">
                        <h6 className="fw-semibold mb-3" style={{ fontSize: '15px' }}>Quick Links</h6>
                        <ul className="list-unstyled body-text" style={{ fontSize: '14.5px' }}>
                            <li className="mb-2"><a href="/" className="text-decoration-none text-muted">Home</a></li>
                            <li className="mb-2"><a href="/#popular-tests" className="text-decoration-none text-muted">Tests</a></li>
                            <li className="mb-2"><a href="/register" className="text-decoration-none text-muted">Register</a></li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <h6 className="fw-semibold mb-3" style={{ fontSize: '15px' }}>Contact</h6>
                        <p className="body-text mb-1" style={{ fontSize: '14.5px' }}>
                            <i className="bi bi-envelope me-2"></i>support@lifecarepathology.com
                        </p>
                        <p className="body-text" style={{ fontSize: '14.5px' }}>
                            <i className="bi bi-geo-alt me-2"></i>Bhopal, India
                        </p>
                    </div>
                </div>
                <hr className="my-4" />
                <p className="text-center text-muted mb-0" style={{ fontSize: '13.5px' }}>
                    © 2026 LifeCare Pathology. All rights reserved.
                </p>
            </div>
        </footer>
    );
}

export default Footer;