import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export default function MetricCard({
  title,
  value,
  change,
  changeLabel = 'vs last period',
  icon: Icon,
  format = 'number',
}) {
  const formatValue = (val) => {
    if (format === 'currency') {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        notation: 'compact',
        maximumFractionDigits: 1,
      }).format(val);
    }
    if (format === 'percent') {
      return `${val}%`;
    }
    if (format === 'compact') {
      return new Intl.NumberFormat('en-US', {
        notation: 'compact',
        maximumFractionDigits: 1,
      }).format(val);
    }
    return new Intl.NumberFormat('en-US').format(val);
  };

  const isPositive = change > 0;
  const isNeutral = change === 0;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {formatValue(value)}
          </p>
        </div>
        {Icon && (
          <div className="w-10 h-10 bg-walmart-blue/10 rounded-lg flex items-center justify-center">
            <Icon className="w-5 h-5 text-walmart-blue" />
          </div>
        )}
      </div>
      {change !== undefined && (
        <div className="flex items-center gap-1 mt-3">
          {isNeutral ? (
            <Minus className="w-4 h-4 text-gray-400" />
          ) : isPositive ? (
            <TrendingUp className="w-4 h-4 text-green-500" />
          ) : (
            <TrendingDown className="w-4 h-4 text-red-500" />
          )}
          <span
            className={`text-sm font-medium ${
              isNeutral
                ? 'text-gray-500'
                : isPositive
                ? 'text-green-600'
                : 'text-red-600'
            }`}
          >
            {isPositive ? '+' : ''}
            {change}%
          </span>
          <span className="text-sm text-gray-500">{changeLabel}</span>
        </div>
      )}
    </div>
  );
}
