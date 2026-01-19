import { Layout } from '../../components/layout';
import { Card, CardHeader, CardTitle, CardContent, Badge } from '../../components/ui';
import { AreaChart, BarChart } from '../../components/charts';
import { feedbackData } from '../../data/mockData';
import { MessageSquare, ThumbsUp, ThumbsDown, Minus, AlertTriangle, TrendingUp, Clock } from 'lucide-react';

export default function FeedbackAnalysis() {
  const sentimentIcon = (sentiment) => {
    switch (sentiment) {
      case 'positive':
        return <ThumbsUp className="w-4 h-4 text-green-500" />;
      case 'negative':
        return <ThumbsDown className="w-4 h-4 text-red-500" />;
      default:
        return <Minus className="w-4 h-4 text-gray-400" />;
    }
  };

  const themeData = feedbackData.themes.map(t => ({
    name: t.name,
    count: t.count,
    sentiment: Math.round(t.sentiment * 100),
  }));

  return (
    <Layout title="Feedback Analysis" subtitle="Real-time customer feedback from Medallia and other sources">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Feedback</p>
                <p className="text-2xl font-semibold text-gray-900">42,340</p>
              </div>
              <div className="w-10 h-10 bg-walmart-blue/10 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-walmart-blue" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">Last 7 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Positive</p>
                <p className="text-2xl font-semibold text-green-600">73%</p>
              </div>
              <ThumbsUp className="w-8 h-8 text-green-500" />
            </div>
            <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +2% vs last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Negative</p>
                <p className="text-2xl font-semibold text-red-600">10%</p>
              </div>
              <ThumbsDown className="w-8 h-8 text-red-500" />
            </div>
            <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
              <TrendingUp className="w-3 h-3 rotate-180" /> -3% vs last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Active Alerts</p>
                <p className="text-2xl font-semibold text-yellow-600">2</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-yellow-500" />
            </div>
            <p className="text-xs text-yellow-600 mt-2">Requires attention</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Sentiment Trend */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Sentiment Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <AreaChart
              data={feedbackData.sentimentTrend}
              xAxisKey="date"
              areas={[
                { dataKey: 'positive', name: 'Positive', color: '#22C55E' },
                { dataKey: 'neutral', name: 'Neutral', color: '#9CA3AF' },
                { dataKey: 'negative', name: 'Negative', color: '#EF4444' },
              ]}
              height={280}
            />
          </CardContent>
        </Card>

        {/* Theme Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Top Themes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {feedbackData.themes.map((theme) => (
                <div key={theme.name}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-700">{theme.name}</span>
                    <span className="text-sm text-gray-500">{theme.count.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${theme.sentiment * 100}%`,
                          backgroundColor: theme.sentiment > 0.7 ? '#22C55E' : theme.sentiment > 0.5 ? '#F59E0B' : '#EF4444'
                        }}
                      />
                    </div>
                    <span className="text-xs text-gray-500 w-10">
                      {Math.round(theme.sentiment * 100)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Real-time Feed */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Real-time Feedback
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {feedbackData.recentFeedback.map((feedback) => (
                <div key={feedback.id} className="p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    {sentimentIcon(feedback.sentiment)}
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{feedback.text}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="default">{feedback.category}</Badge>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {feedback.time}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-yellow-500" />
              Emerging Issues
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {feedbackData.alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-4 rounded-lg border ${
                    alert.severity === 'critical'
                      ? 'bg-red-50 border-red-200'
                      : 'bg-yellow-50 border-yellow-200'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <AlertTriangle className={`w-5 h-5 mt-0.5 ${
                      alert.severity === 'critical' ? 'text-red-500' : 'text-yellow-500'
                    }`} />
                    <div>
                      <h4 className={`font-medium ${
                        alert.severity === 'critical' ? 'text-red-800' : 'text-yellow-800'
                      }`}>
                        {alert.title}
                      </h4>
                      <p className={`text-sm mt-1 ${
                        alert.severity === 'critical' ? 'text-red-700' : 'text-yellow-700'
                      }`}>
                        {alert.description}
                      </p>
                      <p className={`text-xs mt-2 ${
                        alert.severity === 'critical' ? 'text-red-600' : 'text-yellow-600'
                      }`}>
                        Detected {alert.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-600 text-center">
                  AI is continuously monitoring 15+ feedback channels for emerging patterns
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
