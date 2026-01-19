import { useState } from 'react';
import { Layout } from '../../components/layout';
import { Card, CardHeader, CardTitle, CardContent, Tabs, TabsList, TabsTrigger, TabsContent, Badge } from '../../components/ui';
import { BarChart, LineChart } from '../../components/charts';
import { competitors } from '../../data/mockData';
import { TrendingUp, TrendingDown, Newspaper, FileText, Filter, ExternalLink } from 'lucide-react';

export default function Competitive() {
  const [selectedCompetitor, setSelectedCompetitor] = useState(null);

  const marketShareData = [
    { name: 'Walmart', value: 26.4 },
    { name: 'Amazon', value: 38.7 },
    { name: 'Target', value: 7.4 },
    { name: 'Costco', value: 5.2 },
    { name: 'Kroger', value: 4.1 },
  ];

  const trendData = [
    { month: 'Jan', walmart: 25.8, amazon: 38.2, target: 7.2 },
    { month: 'Feb', walmart: 25.9, amazon: 38.4, target: 7.3 },
    { month: 'Mar', walmart: 26.0, amazon: 38.5, target: 7.3 },
    { month: 'Apr', walmart: 26.1, amazon: 38.6, target: 7.4 },
    { month: 'May', walmart: 26.2, amazon: 38.6, target: 7.4 },
    { month: 'Jun', walmart: 26.4, amazon: 38.7, target: 7.4 },
  ];

  const allNews = competitors.flatMap(c =>
    c.recentNews.map(n => ({ ...n, competitor: c.name, competitorId: c.id }))
  ).sort((a, b) => {
    const aTime = a.date.includes('hour') ? parseInt(a.date) : parseInt(a.date) * 24;
    const bTime = b.date.includes('hour') ? parseInt(b.date) : parseInt(b.date) * 24;
    return aTime - bTime;
  });

  return (
    <Layout title="Competitive Landscape" subtitle="Monitor competitor activities and market trends">
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="news">News Feed</TabsTrigger>
          <TabsTrigger value="reports">Intelligence Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {/* Competitor Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {competitors.map((competitor) => (
              <Card
                key={competitor.id}
                className={`cursor-pointer transition-all ${
                  selectedCompetitor === competitor.id ? 'ring-2 ring-walmart-blue' : ''
                }`}
                onClick={() => setSelectedCompetitor(
                  selectedCompetitor === competitor.id ? null : competitor.id
                )}
              >
                <CardContent>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-xl font-bold text-gray-700">
                      {competitor.logo}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{competitor.name}</h3>
                      <p className="text-sm text-gray-500">
                        {competitor.marketShare}% market share
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">YoY Growth</span>
                      <span className={`font-medium flex items-center gap-1 ${
                        competitor.yoyGrowth > 5 ? 'text-green-600' : 'text-gray-600'
                      }`}>
                        {competitor.yoyGrowth > 0 ? (
                          <TrendingUp className="w-3 h-3" />
                        ) : (
                          <TrendingDown className="w-3 h-3" />
                        )}
                        {competitor.yoyGrowth}%
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Members</span>
                      <span className="font-medium text-gray-900">
                        {(competitor.primeMembers || competitor.circleMembers || competitor.members || competitor.boostMembers || 0) / 1000000}M
                      </span>
                    </div>
                  </div>

                  {competitor.recentNews.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <p className="text-xs text-gray-500 line-clamp-2">
                        {competitor.recentNews[0].title}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Market Share Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <BarChart
                  data={marketShareData}
                  xAxisKey="name"
                  bars={[{ dataKey: 'value', name: 'Market Share %', colorByValue: true }]}
                  layout="horizontal"
                  height={300}
                  colors={['#0071CE', '#FF9900', '#CC0000', '#E31837', '#005DAA']}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Market Share Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <LineChart
                  data={trendData}
                  xAxisKey="month"
                  lines={[
                    { dataKey: 'walmart', name: 'Walmart', color: '#0071CE' },
                    { dataKey: 'amazon', name: 'Amazon', color: '#FF9900' },
                    { dataKey: 'target', name: 'Target', color: '#CC0000' },
                  ]}
                  height={300}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="news">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Latest News</CardTitle>
                  <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700">
                    <Filter className="w-4 h-4" />
                    Filter
                  </button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {allNews.map((news, idx) => (
                      <div key={idx} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant={news.competitorId === 'amazon' ? 'warning' : 'default'}>
                                {news.competitor}
                              </Badge>
                              <span className={`text-xs px-2 py-0.5 rounded-full ${
                                news.sentiment === 'positive' ? 'bg-green-100 text-green-700' :
                                news.sentiment === 'negative' ? 'bg-red-100 text-red-700' :
                                'bg-gray-100 text-gray-600'
                              }`}>
                                {news.sentiment}
                              </span>
                            </div>
                            <h4 className="font-medium text-gray-900 mb-1">{news.title}</h4>
                            <p className="text-sm text-gray-500">{news.date}</p>
                          </div>
                          <button className="text-gray-400 hover:text-gray-600">
                            <ExternalLink className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Newspaper className="w-4 h-4" />
                    News by Competitor
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {competitors.map(c => (
                      <div key={c.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                        <span className="text-sm text-gray-700">{c.name}</span>
                        <span className="text-sm font-medium text-gray-900">{c.recentNews.length}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Key Themes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="primary">Membership Programs</Badge>
                    <Badge variant="default">Delivery Speed</Badge>
                    <Badge variant="default">Store Expansion</Badge>
                    <Badge variant="default">Digital Innovation</Badge>
                    <Badge variant="default">Pricing Strategy</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Weekly Intelligence Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { title: 'Weekly Competitive Summary - Week 28', date: 'Jul 15, 2024', status: 'new' },
                  { title: 'Weekly Competitive Summary - Week 27', date: 'Jul 8, 2024', status: 'read' },
                  { title: 'Weekly Competitive Summary - Week 26', date: 'Jul 1, 2024', status: 'read' },
                  { title: 'Q2 Competitive Deep Dive', date: 'Jun 30, 2024', status: 'read' },
                ].map((report, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-walmart-blue" />
                      <div>
                        <h4 className="font-medium text-gray-900">{report.title}</h4>
                        <p className="text-sm text-gray-500">{report.date}</p>
                      </div>
                    </div>
                    {report.status === 'new' && (
                      <Badge variant="primary">New</Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
}
