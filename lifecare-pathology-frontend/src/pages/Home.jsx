import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TestCard from '../components/TestCard';

const popularTests = [
    {
        testName: 'Complete Blood Count',
        description: 'Measures blood cell counts',
        price: 500,
        sampleType: 'Blood'
    },
    {
        testName: 'Blood Sugar',
        description: 'Fasting/random glucose level',
        price: 200,
        sampleType: 'Blood'
    },
    {
        testName: 'Lipid Profile',
        description: 'Cholesterol and triglyceride levels',
        price: 700,
        sampleType: 'Blood'
    },
];

const features = [
    {
        icon: 'bi-clipboard2-pulse',
        title: 'Accurate Testing',
        text: 'Modern lab equipment and certified technicians.'
    },
    {
        icon: 'bi-calendar2-check',
        title: 'Easy Online Booking',
        text: 'Book a test online in a few clicks, no queues.'
    },
    {
        icon: 'bi-geo-alt',
        title: 'Sample Tracking',
        text: 'See live status from collection to test completion.'
    },
    {
        icon: 'bi-shield-check',
        title: 'Trusted Laboratory',
        text: 'Certified processes you can rely on.'
    },
];

function Home() {
    return (
        <>
            <Navbar />

            {/* Hero Section */}
            <div
                className="text-white py-5"
                style={{
                    backgroundImage:
                        'linear-gradient(rgba(184,79,120,0.88), rgba(184,79,120,0.88)), url(https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?auto=format&fit=crop&w=1600&q=80)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="container text-center py-3">

                    <h1
                        className="mb-3"
                        style={{
                            fontSize: '38px',
                            fontWeight: 700,
                            lineHeight: 1.2
                        }}
                    >
                        Reliable Diagnostics. Better Health Decisions.
                    </h1>

                    <p
                        className="mb-4 mx-auto"
                        style={{
                            maxWidth: '600px',
                            fontSize: '16px',
                            lineHeight: 1.5,
                            opacity: 0.95
                        }}
                    >
                        Book pathology tests online and track your sample in real
                        time — from collection to test completion.
                    </p>

                    <div className="d-flex gap-3 justify-content-center flex-wrap">
                        <Link
                            to="/register"
                            className="btn btn-light px-4"
                            style={{ fontSize: '14px' }}
                        >
                            Book a Test
                        </Link>

                        <a
                            href="#popular-tests"
                            className="btn btn-brand-outline px-4"
                            style={{ fontSize: '14px' }}
                        >
                            Explore Tests
                        </a>
                    </div>

                </div>
            </div>

            {/* Why Choose LifeCare */}
            <div className="container py-5" id="why-us">

                <h2
                    className="text-center mb-4"
                    style={{
                        fontSize: '26px',
                        fontWeight: 700
                    }}
                >
                    Why Choose LifeCare?
                </h2>

                <div className="row g-4">

                    {features.map((f) => (
                        <div
                            className="col-md-3 col-sm-6"
                            key={f.title}
                        >
                            <div className="soft-card h-100 p-4 text-center">

                                <div className="icon-circle mx-auto mb-3">
                                    <i className={`bi ${f.icon}`}></i>
                                </div>

                                <h6
                                    className="mb-2"
                                    style={{
                                        fontSize: '18px',
                                        fontWeight: 600
                                    }}
                                >
                                    {f.title}
                                </h6>

                                <p
                                    className="mb-0"
                                    style={{
                                        fontSize: '14px',
                                        lineHeight: 1.5,
                                        color: '#5a6b6b'
                                    }}
                                >
                                    {f.text}
                                </p>

                            </div>
                        </div>
                    ))}

                </div>
            </div>

            {/* Popular Tests */}
            <div
                className="py-5"
                style={{ backgroundColor: '#f9eef3' }}
                id="popular-tests"
            >
                <div className="container">

                    <h2
                        className="text-center mb-4"
                        style={{
                            fontSize: '26px',
                            fontWeight: 700
                        }}
                    >
                        Popular Tests
                    </h2>

                    <div className="row g-4">

                        {popularTests.map((test) => (
                            <div
                                className="col-md-4"
                                key={test.testName}
                            >
                                <TestCard test={test} />
                            </div>
                        ))}

                    </div>
                </div>
            </div>

            {/* Call To Action */}
            <div
                className="text-white text-center py-5"
                style={{
                    backgroundColor: 'var(--brand-teal-dark)'
                }}
            >

                <h3
                    className="mb-3"
                    style={{
                        fontSize: '24px',
                        fontWeight: 600
                    }}
                >
                    Your health deserves reliable diagnostics.
                </h3>

                <Link
                    to="/register"
                    className="btn btn-light px-4"
                    style={{ fontSize: '14px' }}
                >
                    Book Your Test
                </Link>

            </div>

            <Footer />
        </>
    );
}

export default Home;