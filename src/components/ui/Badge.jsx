const variants = {
  default: 'bg-gray-100 text-gray-700',
  primary: 'bg-walmart-blue/10 text-walmart-blue',
  success: 'bg-green-100 text-green-700',
  warning: 'bg-yellow-100 text-yellow-700',
  danger: 'bg-red-100 text-red-700',
  info: 'bg-blue-100 text-blue-700',
};

export default function Badge({ children, variant = 'default', className = '' }) {
  return (
    <span
      className={`
        inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}

export function StatusBadge({ status }) {
  const statusConfig = {
    active: { variant: 'success', label: 'Active' },
    running: { variant: 'success', label: 'Running' },
    healthy: { variant: 'success', label: 'Healthy' },
    completed: { variant: 'success', label: 'Completed' },
    passed: { variant: 'success', label: 'Passed' },
    pending: { variant: 'warning', label: 'Pending' },
    warning: { variant: 'warning', label: 'Warning' },
    degraded: { variant: 'warning', label: 'Degraded' },
    draft: { variant: 'default', label: 'Draft' },
    paused: { variant: 'default', label: 'Paused' },
    failed: { variant: 'danger', label: 'Failed' },
    error: { variant: 'danger', label: 'Error' },
    critical: { variant: 'danger', label: 'Critical' },
  };

  const config = statusConfig[status] || { variant: 'default', label: status };

  return <Badge variant={config.variant}>{config.label}</Badge>;
}
