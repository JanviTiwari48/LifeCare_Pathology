const STAGES = ['BOOKED', 'SAMPLE_COLLECTED', 'TEST_IN_PROGRESS', 'TEST_COMPLETED'];
const LABELS = {
    BOOKED: 'Booked',
    SAMPLE_COLLECTED: 'Sample Collected',
    TEST_IN_PROGRESS: 'In Progress',
    TEST_COMPLETED: 'Completed',
};

function StatusTimeline({ currentStatus }) {
    const currentIndex = STAGES.indexOf(currentStatus);

    return (
        <div className="d-flex align-items-center my-3">
            {STAGES.map((stage, index) => (
                <div key={stage} className="d-flex align-items-center flex-grow-1">
                    <div className="text-center" style={{ minWidth: '80px' }}>
                        <div
                            className={`rounded-circle d-inline-flex align-items-center justify-content-center ${
                                index <= currentIndex ? 'text-white' : 'bg-light text-muted border'
                            }`}
                            style={{
                                width: '26px', height: '26px', fontSize: '12px',
                                backgroundColor: index <= currentIndex ? 'var(--brand-teal)' : undefined,
                            }}
                        >
                            {index < currentIndex ? <i className="bi bi-check-lg"></i> : index + 1}
                        </div>
                        <div className={index === currentIndex ? 'fw-semibold mt-1' : 'text-muted mt-1'} style={{ fontSize: '12px' }}>
                            {LABELS[stage]}
                        </div>
                    </div>
                    {index < STAGES.length - 1 && (
                        <div
                            className="flex-grow-1"
                            style={{ height: '3px', backgroundColor: index < currentIndex ? 'var(--brand-teal)' : '#e2e8e8' }}
                        />
                    )}
                </div>
            ))}
        </div>
    );
}

export default StatusTimeline;