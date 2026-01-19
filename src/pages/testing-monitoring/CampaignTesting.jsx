import { Layout } from '../../components/layout';
import { Card, CardHeader, CardTitle, CardContent, Badge, Button } from '../../components/ui';
import { testCoverage } from '../../data/mockData';
import { TestTube, Check, X, AlertTriangle, Monitor, Smartphone, RefreshCw, Play, FileText } from 'lucide-react';

export default function CampaignTesting() {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'pass':
        return <Check className="w-4 h-4 text-green-500" />;
      case 'fail':
        return <X className="w-4 h-4 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      default:
        return null;
    }
  };

  const prelaunchChecks = [
    { name: 'Links & Navigation', status: 'pass', details: 'All 156 links validated' },
    { name: 'Image Loading', status: 'pass', details: 'All assets loading correctly' },
    { name: 'Form Validation', status: 'pass', details: '12 forms tested' },
    { name: 'Payment Flow', status: 'pass', details: 'Checkout process verified' },
    { name: 'Mobile Responsiveness', status: 'warning', details: '2 layout issues on tablet' },
    { name: 'Accessibility (WCAG)', status: 'pass', details: 'AA compliance verified' },
    { name: 'Performance (Core Web Vitals)', status: 'pass', details: 'LCP: 1.2s, FID: 45ms, CLS: 0.05' },
    { name: 'Security Scan', status: 'pass', details: 'No vulnerabilities detected' },
  ];

  return (
    <Layout title="Campaign Testing" subtitle="Pre-launch validation and test coverage">
      {/* Overall Coverage */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Overall Coverage</p>
                <p className="text-3xl font-bold text-walmart-blue">{testCoverage.overall}%</p>
              </div>
              <div className="w-12 h-12 bg-walmart-blue/10 rounded-full flex items-center justify-center">
                <TestTube className="w-6 h-6 text-walmart-blue" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Tests Passing</p>
                <p className="text-3xl font-bold text-green-600">160</p>
              </div>
              <Check className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Tests Failing</p>
                <p className="text-3xl font-bold text-red-600">23</p>
              </div>
              <X className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Last Run</p>
                <p className="text-lg font-semibold text-gray-900">5 min ago</p>
              </div>
              <Button variant="outline" size="sm" icon={RefreshCw}>
                Run
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Coverage by Area */}
        <Card>
          <CardHeader>
            <CardTitle>Coverage by Area</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {testCoverage.byArea.map((area) => (
                <div key={area.area}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{area.area}</span>
                    <span className="text-sm text-gray-500">
                      {area.passing}/{area.tests} tests
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          area.coverage >= 90 ? 'bg-green-500' :
                          area.coverage >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${area.coverage}%` }}
                      />
                    </div>
                    <span className={`text-sm font-medium w-12 text-right ${
                      area.coverage >= 90 ? 'text-green-600' :
                      area.coverage >= 80 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {area.coverage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Browser/Device Matrix */}
        <Card>
          <CardHeader>
            <CardTitle>Browser Compatibility Matrix</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 text-sm font-medium text-gray-500">Browser</th>
                    <th className="text-center py-2 text-sm font-medium text-gray-500">
                      <Monitor className="w-4 h-4 inline" /> Desktop
                    </th>
                    <th className="text-center py-2 text-sm font-medium text-gray-500">
                      <Smartphone className="w-4 h-4 inline" /> Mobile
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {testCoverage.browserMatrix.map((row) => (
                    <tr key={row.browser} className="border-b border-gray-100">
                      <td className="py-3 text-sm text-gray-900">{row.browser}</td>
                      <td className="py-3 text-center">{getStatusIcon(row.desktop)}</td>
                      <td className="py-3 text-center">{getStatusIcon(row.mobile)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pre-launch Validation */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Pre-Launch Validation Report</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" icon={FileText}>
              Export Report
            </Button>
            <Button size="sm" icon={Play}>
              Run All Checks
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {prelaunchChecks.map((check, idx) => (
              <div
                key={idx}
                className={`flex items-center gap-3 p-4 rounded-lg border ${
                  check.status === 'pass' ? 'bg-green-50 border-green-200' :
                  check.status === 'warning' ? 'bg-yellow-50 border-yellow-200' :
                  'bg-red-50 border-red-200'
                }`}
              >
                {getStatusIcon(check.status)}
                <div className="flex-1">
                  <p className={`font-medium ${
                    check.status === 'pass' ? 'text-green-800' :
                    check.status === 'warning' ? 'text-yellow-800' :
                    'text-red-800'
                  }`}>
                    {check.name}
                  </p>
                  <p className={`text-sm ${
                    check.status === 'pass' ? 'text-green-600' :
                    check.status === 'warning' ? 'text-yellow-600' :
                    'text-red-600'
                  }`}>
                    {check.details}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Overall Status: Ready for Launch</p>
              <p className="text-sm text-gray-500">7 of 8 checks passed, 1 warning</p>
            </div>
            <Badge variant="success">PASS</Badge>
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
}
