import { Layout } from '../../components/layout';
import { Card, CardHeader, CardTitle, CardContent, Badge } from '../../components/ui';
import { LineChart } from '../../components/charts';
import { journeyHealth } from '../../data/mockData';
import { Activity, Clock, AlertTriangle, CheckCircle, XCircle, Globe, RefreshCw, Bell } from 'lucide-react';

export default function JourneyMonitoring() {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'degraded':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'critical':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy':
        return 'bg-green-500';
      case 'degraded':
        return 'bg-yellow-500';
      case 'critical':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const latencyData = [
    { time: '10:00', checkout: 1.2, search: 0.8, cart: 1.1 },
    { time: '10:05', checkout: 1.1, search: 0.9, cart: 1.3 },
    { time: '10:10', checkout: 1.3, search: 0.7, cart: 2.4 },
    { time: '10:15', checkout: 1.2, search: 0.8, cart: 2.1 },
    { time: '10:20', checkout: 1.4, search: 0.9, cart: 1.8 },
    { time: '10:25', checkout: 1.2, search: 0.8, cart: 1.5 },
  ];

  const recentAlerts = [
    { id: 1, message: 'Inventory Check latency exceeds threshold', severity: 'critical', time: '2 min ago' },
    { id: 2, message: 'Add to Cart response time elevated', severity: 'warning', time: '8 min ago' },
    { id: 3, message: 'Search & Browse latency normalized', severity: 'resolved', time: '15 min ago' },
  ];

  const regions = [
    { name: 'US East', status: 'healthy', latency: 45 },
    { name: 'US West', status: 'healthy', latency: 52 },
    { name: 'US Central', status: 'degraded', latency: 128 },
    { name: 'Canada', status: 'healthy', latency: 67 },
  ];

  const healthyCount = journeyHealth.filter(j => j.status === 'healthy').length;
  const degradedCount = journeyHealth.filter(j => j.status === 'degraded').length;
  const criticalCount = journeyHealth.filter(j => j.status === 'critical').length;

  return (
    <Layout title="Journey Monitoring" subtitle="Real-time health status and performance metrics">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Healthy</p>
                <p className="text-2xl font-bold text-green-600">{healthyCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Degraded</p>
                <p className="text-2xl font-bold text-yellow-600">{degradedCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Critical</p>
                <p className="text-2xl font-bold text-red-600">{criticalCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-walmart-blue/10 rounded-full flex items-center justify-center">
                <Activity className="w-6 h-6 text-walmart-blue" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Avg Latency</p>
                <p className="text-2xl font-bold text-gray-900">1.8s</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Journey Health Cards */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Journey Health Status</CardTitle>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <RefreshCw className="w-4 h-4" />
                Auto-refresh: 30s
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {journeyHealth.map((journey) => (
                  <div
                    key={journey.id}
                    className={`p-4 rounded-lg border ${
                      journey.status === 'healthy' ? 'border-green-200 bg-green-50' :
                      journey.status === 'degraded' ? 'border-yellow-200 bg-yellow-50' :
                      'border-red-200 bg-red-50'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(journey.status)}
                        <h4 className="font-medium text-gray-900">{journey.name}</h4>
                      </div>
                      <Badge variant={
                        journey.status === 'healthy' ? 'success' :
                        journey.status === 'degraded' ? 'warning' : 'danger'
                      }>
                        {journey.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Latency</p>
                        <p className={`font-medium ${
                          journey.latency > 2 ? 'text-red-600' :
                          journey.latency > 1.5 ? 'text-yellow-600' : 'text-gray-900'
                        }`}>
                          {journey.latency}s
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Error Rate</p>
                        <p className={`font-medium ${
                          journey.errorRate > 0.1 ? 'text-red-600' :
                          journey.errorRate > 0.05 ? 'text-yellow-600' : 'text-gray-900'
                        }`}>
                          {(journey.errorRate * 100).toFixed(1)}%
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Last updated: {journey.lastUpdated}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alert Feed */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              Real-time Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-3 rounded-lg border ${
                    alert.severity === 'critical' ? 'border-red-200 bg-red-50' :
                    alert.severity === 'warning' ? 'border-yellow-200 bg-yellow-50' :
                    'border-green-200 bg-green-50'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {alert.severity === 'critical' && <XCircle className="w-4 h-4 text-red-500 mt-0.5" />}
                    {alert.severity === 'warning' && <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5" />}
                    {alert.severity === 'resolved' && <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />}
                    <div>
                      <p className={`text-sm font-medium ${
                        alert.severity === 'critical' ? 'text-red-800' :
                        alert.severity === 'warning' ? 'text-yellow-800' :
                        'text-green-800'
                      }`}>
                        {alert.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Latency Chart */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Latency Trends (Last 30 min)</CardTitle>
            </CardHeader>
            <CardContent>
              <LineChart
                data={latencyData}
                xAxisKey="time"
                lines={[
                  { dataKey: 'checkout', name: 'Checkout', color: '#0071CE' },
                  { dataKey: 'search', name: 'Search', color: '#22C55E' },
                  { dataKey: 'cart', name: 'Cart', color: '#F59E0B' },
                ]}
                height={300}
              />
            </CardContent>
          </Card>
        </div>

        {/* Geographic Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Regional Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {regions.map((region) => (
                <div key={region.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(region.status)}`} />
                    <span className="text-sm font-medium text-gray-700">{region.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3 h-3 text-gray-400" />
                    <span className={`text-sm ${
                      region.latency > 100 ? 'text-yellow-600 font-medium' : 'text-gray-500'
                    }`}>
                      {region.latency}ms
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
