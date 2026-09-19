function TestCard({ test, onBook, booking = false }) {
    return (
        <div className="soft-card h-100 p-4">
            <div className="d-flex justify-content-between align-items-start mb-2">
                <h5 className="card-title-custom mb-0">{test.testName}</h5>
                {test.active !== undefined && (
                    <span className={`badge ${test.active ? 'bg-success' : 'bg-secondary'}`} style={{ fontSize: '11px' }}>
            {test.active ? 'Active' : 'Inactive'}
          </span>
                )}
            </div>
            <p className="body-text mb-3">{test.description}</p>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="fw-bold" style={{ fontSize: '19px', color: 'var(--brand-teal)' }}>₹{test.price}</span>
                <span className="badge bg-light text-dark border" style={{ fontSize: '12.5px' }}>
          <i className="bi bi-droplet-fill me-1"></i>{test.sampleType}
        </span>
            </div>
            {onBook && (
                <button className="btn btn-brand w-100" onClick={() => onBook(test)} disabled={booking}>
                    {booking ? 'Booking...' : 'Book Test'}
                </button>
            )}
        </div>
    );
}

export default TestCard;