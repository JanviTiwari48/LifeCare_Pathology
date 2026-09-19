const CONFIG = {
    BOOKED: { label: 'Booked', className: 'bg-secondary' },
    SAMPLE_COLLECTED: { label: 'Sample Collected', className: 'bg-info text-dark' },
    TEST_IN_PROGRESS: { label: 'In Progress', className: 'bg-warning text-dark' },
    TEST_COMPLETED: { label: 'Completed', className: 'bg-success' },
};

function StatusBadge({ status }) {
    const cfg = CONFIG[status] || { label: status, className: 'bg-secondary' };
    return (
        <span className={`badge ${cfg.className}`} style={{ fontSize: '13px', padding: '6px 10px' }}>
      {cfg.label}
    </span>
    );
}

export default StatusBadge;