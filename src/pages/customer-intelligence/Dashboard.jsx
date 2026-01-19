import { Layout } from '../../components/layout';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui';
import { MetricCard, LineChart, BarChart } from '../../components/charts';
import { kpiMetrics, revenueTimeSeriesData, automatedInsights } from '../../data/mockData';
import { Users, DollarSign, ShoppingCart, Repeat, Star, TrendingUp, AlertCircle, Lightbulb, CheckCircle } from 'lucide-react';

export default function Dashboard() {
  const categoryPerformance = [
    { name: 'Electronics', value: 245000000 },
    { name: 'Grocery', value: 198000000 },
    { name: 'Home & Garden', value: 156000000 },
    { name: 'Apparel', value: 134000000 },
    { name: 'Health', value: 112000000 },
  ];

  return (
    <Layout title="Dashboard & Metrics" subtitle="Real-time business intelligence and KPIs">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
        <MetricCard
          title="W+ Subscribers"
          value={kpiMetrics.wPlusSubscribers.value}
          change={kpiMetrics.wPlusSubscribers.change}
          icon={Users}
          format="compact"
        />
        <MetricCard
          title="Monthly GMV"
          value={kpiMetrics.monthlyGMV.value}
          change={kpiMetrics.monthlyGMV.change}
          icon={DollarSign}
          format="currency"
        />
        <MetricCard
          title="Conversion Rate"
          value={kpiMetrics.conversionRate.value}
          change={kpiMetrics.conversionRate.change}
          icon={ShoppingCart}
          format="percent"
        />
        <MetricCard
          title="Avg Order Value"
          value={kpiMetrics.avgOrderValue.value}
          change={kpiMetrics.avgOrderValue.change}
          icon={TrendingUp}
          format="currency"
        />
        <MetricCard
          title="Customer Retention"
          value={kpiMetrics.customerRetention.value}
          change={kpiMetrics.customerRetention.change}
          icon={Repeat}
          format="percent"
        />
        <MetricCard
          title="NPS Score"
          value={kpiMetrics.nps.value}
          change={kpiMetrics.nps.change}
          icon={Star}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Revenue & Subscriber Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart
              data={revenueTimeSeriesData}
              xAxisKey="date"
              lines={[
                { dataKey: 'revenue', name: 'Revenue ($)', color: '#0071CE' },
                { dataKey: 'subscribers', name: 'Subscribers', color: '#FFC220' },
              ]}
              height={320}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Category Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart
              data={categoryPerformance}
              xAxisKey="name"
              bars={[{ dataKey: 'value', name: 'Revenue' }]}
              height={320}
              layout="vertical"
            />
          </CardContent>
        </Card>
      </div>

      {/* Insights Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Automated Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {automatedInsights.map((insight) => (
                <div
                  key={insight.id}
                  className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  {insight.type === 'opportunity' && (
                    <Lightbulb className="w-5 h-5 text-walmart-blue mt-0.5" />
                  )}
                  {insight.type === 'alert' && (
                    <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5" />
                  )}
                  {insight.type === 'positive' && (
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{insight.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        insight.impact === 'high' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {insight.impact} impact
                      </span>
                      <span className="text-xs text-gray-500">{insight.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Anomaly Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-4 rounded-lg border border-yellow-200 bg-yellow-50">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-5 h-5 text-yellow-600" />
                  <span className="font-medium text-yellow-800">Cart Abandonment Spike</span>
                </div>
                <p className="text-sm text-yellow-700">
                  Cart abandonment rate increased by 12% in the last 2 hours.
                  Investigating potential checkout issues.
                </p>
                <p className="text-xs text-yellow-600 mt-2">Detected 15 minutes ago</p>
              </div>

              <div className="p-4 rounded-lg border border-green-200 bg-green-50">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-green-800">Positive Trend</span>
                </div>
                <p className="text-sm text-green-700">
                  W+ sign-ups are 25% above forecast for the past week.
                  Summer promotion driving strong acquisition.
                </p>
                <p className="text-xs text-green-600 mt-2">Ongoing trend</p>
              </div>

              <div className="p-4 rounded-lg border border-blue-200 bg-blue-50">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-blue-800">Opportunity Detected</span>
                </div>
                <p className="text-sm text-blue-700">
                  High-value customers (top 10%) have low adoption of Scan & Go.
                  Consider targeted promotion.
                </p>
                <p className="text-xs text-blue-600 mt-2">Analysis completed today</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
