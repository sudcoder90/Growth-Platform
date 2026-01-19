import { useState } from 'react';
import { Layout } from '../../components/layout';
import { Card, CardHeader, CardTitle, CardContent, Select } from '../../components/ui';
import { journeySegments, journeyData } from '../../data/mockData';
import { Users, Clock, TrendingDown, ArrowRight, Lightbulb } from 'lucide-react';

export default function JourneyAnalysis() {
  const [selectedSegment, setSelectedSegment] = useState('wplus');
  const data = journeyData[selectedSegment] || journeyData.wplus;

  const maxUsers = data.funnel[0].users;

  return (
    <Layout title="User Journey Analysis" subtitle="Visualize and analyze customer journeys">
      <div className="mb-6">
        <Select
          label="Select Customer Segment"
          options={journeySegments}
          value={selectedSegment}
          onChange={setSelectedSegment}
          className="max-w-xs"
        />
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-walmart-blue/10 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-walmart-blue" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Users</p>
                <p className="text-xl font-semibold text-gray-900">
                  {(data.funnel[0].users / 1000000).toFixed(1)}M
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingDown className="w-5 h-5 text-green-600 rotate-180" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Conversion Rate</p>
                <p className="text-xl font-semibold text-gray-900">{data.conversionRate}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Avg Session Duration</p>
                <p className="text-xl font-semibold text-gray-900">{data.avgSessionDuration}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Funnel Visualization */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Conversion Funnel</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.funnel.map((stage, idx) => {
                  const widthPercent = (stage.users / maxUsers) * 100;
                  const isLast = idx === data.funnel.length - 1;

                  return (
                    <div key={stage.stage}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">{stage.stage}</span>
                        <span className="text-sm text-gray-500">
                          {(stage.users / 1000000).toFixed(2)}M users
                        </span>
                      </div>
                      <div className="relative">
                        <div className="h-12 bg-gray-100 rounded-lg overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-walmart-blue to-walmart-lightBlue rounded-lg transition-all duration-500 flex items-center justify-end pr-3"
                            style={{ width: `${widthPercent}%` }}
                          >
                            <span className="text-white text-sm font-medium">
                              {widthPercent.toFixed(0)}%
                            </span>
                          </div>
                        </div>
                        {!isLast && stage.dropoff > 0 && (
                          <div className="flex items-center justify-center my-2">
                            <div className="flex items-center gap-2 px-3 py-1 bg-red-50 rounded-full">
                              <TrendingDown className="w-3 h-3 text-red-500" />
                              <span className="text-xs font-medium text-red-600">
                                {stage.dropoff}% drop-off
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Insights Panel */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-walmart-yellow" />
                Key Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p className="text-sm font-medium text-yellow-800 mb-1">High Drop-off Alert</p>
                  <p className="text-xs text-yellow-700">
                    {selectedSegment === 'wplus'
                      ? '60% drop-off at Add to Cart stage. Consider optimizing product pages or adding social proof.'
                      : '75% drop-off at Add to Cart. Non-members may need pricing incentives.'}
                  </p>
                </div>

                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-sm font-medium text-green-800 mb-1">Opportunity</p>
                  <p className="text-xs text-green-700">
                    {selectedSegment === 'wplus'
                      ? 'W+ members show 4.8x higher conversion than non-members. Expand membership benefits.'
                      : 'Converting 5% of these users to W+ could increase revenue by $45M/quarter.'}
                  </p>
                </div>

                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm font-medium text-blue-800 mb-1">Recommendation</p>
                  <p className="text-xs text-blue-700">
                    Implement cart abandonment emails with personalized offers based on browsed products.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Journey Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">W+ Members</span>
                  <span className="text-sm font-semibold text-green-600">12.96%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: '65%' }} />
                </div>

                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm text-gray-600">Non-W+ Members</span>
                  <span className="text-sm font-semibold text-gray-600">2.70%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gray-400 rounded-full" style={{ width: '14%' }} />
                </div>

                <p className="text-xs text-gray-500 mt-4">
                  W+ members convert at 4.8x the rate of non-members
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
