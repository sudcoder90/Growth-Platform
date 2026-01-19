import { useState } from 'react';
import { Layout } from '../../components/layout';
import { Card, CardHeader, CardTitle, CardContent, Button, Badge, Input, Select } from '../../components/ui';
import { upcomingCampaigns } from '../../data/mockData';
import { Calendar, Mail, Bell, Image, MessageSquare, ChevronLeft, ChevronRight, Plus, Rocket, Edit2, Trash2, Check } from 'lucide-react';

const channelConfig = [
  { id: 'email', name: 'Email', icon: Mail, enabled: true },
  { id: 'push', name: 'Push Notification', icon: Bell, enabled: true },
  { id: 'banner', name: 'Web Banner', icon: Image, enabled: false },
  { id: 'sms', name: 'SMS', icon: MessageSquare, enabled: false },
];

export default function CampaignSetup() {
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [viewMode, setViewMode] = useState('calendar');
  const [channels, setChannels] = useState(channelConfig);

  const toggleChannel = (channelId) => {
    setChannels(channels.map(ch =>
      ch.id === channelId ? { ...ch, enabled: !ch.enabled } : ch
    ));
  };

  // Calendar helper - simplified month view
  const currentMonth = 'July 2024';
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const calendarDays = Array.from({ length: 35 }, (_, i) => {
    const day = i - 1; // Start from day 0 (previous month fill)
    return day >= 0 && day < 31 ? day + 1 : null;
  });

  const getCampaignsForDay = (day) => {
    if (!day) return [];
    return upcomingCampaigns.filter(c => {
      const start = parseInt(c.startDate.split('-')[2]);
      const end = parseInt(c.endDate.split('-')[2]);
      return day >= start && day <= end;
    });
  };

  return (
    <Layout title="Campaign Setup" subtitle="Plan and schedule multi-channel campaigns">
      {/* View Toggle & Actions */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-2 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setViewMode('calendar')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              viewMode === 'calendar' ? 'bg-white shadow-sm' : ''
            }`}
          >
            <Calendar className="w-4 h-4 inline mr-2" />
            Calendar
          </button>
          <button
            onClick={() => setViewMode('timeline')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              viewMode === 'timeline' ? 'bg-white shadow-sm' : ''
            }`}
          >
            Timeline
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              viewMode === 'list' ? 'bg-white shadow-sm' : ''
            }`}
          >
            List
          </button>
        </div>
        <Button icon={Plus}>
          New Campaign
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Calendar/Timeline View */}
        <div className="lg:col-span-2">
          <Card padding={false}>
            {viewMode === 'calendar' && (
              <>
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <h3 className="font-semibold text-gray-900">{currentMonth}</h3>
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-4">
                  {/* Day headers */}
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {days.map(day => (
                      <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
                        {day}
                      </div>
                    ))}
                  </div>
                  {/* Calendar grid */}
                  <div className="grid grid-cols-7 gap-1">
                    {calendarDays.map((day, idx) => {
                      const campaigns = getCampaignsForDay(day);
                      return (
                        <div
                          key={idx}
                          className={`min-h-24 p-1 border rounded-lg ${
                            day ? 'bg-white border-gray-200' : 'bg-gray-50 border-gray-100'
                          }`}
                        >
                          {day && (
                            <>
                              <span className={`text-sm ${
                                day === 15 ? 'font-bold text-walmart-blue' : 'text-gray-700'
                              }`}>
                                {day}
                              </span>
                              <div className="mt-1 space-y-1">
                                {campaigns.slice(0, 2).map(c => (
                                  <div
                                    key={c.id}
                                    onClick={() => setSelectedCampaign(c)}
                                    className={`text-xs px-1.5 py-0.5 rounded truncate cursor-pointer ${
                                      c.status === 'scheduled'
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-yellow-100 text-yellow-700'
                                    }`}
                                  >
                                    {c.name}
                                  </div>
                                ))}
                                {campaigns.length > 2 && (
                                  <div className="text-xs text-gray-500 px-1">
                                    +{campaigns.length - 2} more
                                  </div>
                                )}
                              </div>
                            </>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}

            {viewMode === 'timeline' && (
              <div className="p-4">
                <div className="relative">
                  {/* Timeline header */}
                  <div className="flex border-b border-gray-200 pb-2 mb-4">
                    <div className="w-40 flex-shrink-0" />
                    {['Jun', 'Jul', 'Aug', 'Sep'].map(month => (
                      <div key={month} className="flex-1 text-center text-sm font-medium text-gray-500">
                        {month}
                      </div>
                    ))}
                  </div>
                  {/* Campaigns */}
                  {upcomingCampaigns.map((campaign, idx) => (
                    <div key={campaign.id} className="flex items-center mb-3">
                      <div className="w-40 flex-shrink-0 pr-4">
                        <p className="text-sm font-medium text-gray-900 truncate">{campaign.name}</p>
                      </div>
                      <div className="flex-1 relative h-8">
                        <div
                          className={`absolute h-full rounded-full ${
                            campaign.status === 'scheduled' ? 'bg-green-500' : 'bg-yellow-500'
                          }`}
                          style={{
                            left: `${idx * 20 + 10}%`,
                            width: '15%',
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {viewMode === 'list' && (
              <div className="divide-y divide-gray-200">
                {upcomingCampaigns.map(campaign => (
                  <div
                    key={campaign.id}
                    onClick={() => setSelectedCampaign(campaign)}
                    className="p-4 hover:bg-gray-50 cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">{campaign.name}</h4>
                        <p className="text-sm text-gray-500">
                          {campaign.startDate} - {campaign.endDate}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex gap-1">
                          {campaign.channels.map(ch => {
                            const channel = channelConfig.find(c => c.id === ch);
                            const Icon = channel?.icon || Mail;
                            return (
                              <div key={ch} className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center">
                                <Icon className="w-3 h-3 text-gray-600" />
                              </div>
                            );
                          })}
                        </div>
                        <Badge variant={campaign.status === 'scheduled' ? 'success' : 'warning'}>
                          {campaign.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* Right Panel - Campaign Details or Channel Config */}
        <div className="space-y-6">
          {selectedCampaign ? (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>{selectedCampaign.name}</CardTitle>
                <button
                  onClick={() => setSelectedCampaign(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  &times;
                </button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Duration</p>
                    <p className="font-medium">{selectedCampaign.startDate} - {selectedCampaign.endDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <Badge variant={selectedCampaign.status === 'scheduled' ? 'success' : 'warning'}>
                      {selectedCampaign.status}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Channels</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedCampaign.channels.map(ch => (
                        <Badge key={ch} variant="default">{ch}</Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2 pt-4 border-t border-gray-200">
                    <Button variant="outline" size="sm" icon={Edit2}>
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" icon={Trash2} className="text-red-600">
                      Delete
                    </Button>
                    {selectedCampaign.status === 'draft' && (
                      <Button size="sm" icon={Rocket}>
                        Launch
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Quick Deploy</CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  label="Campaign Name"
                  placeholder="Enter campaign name"
                  className="mb-4"
                />
                <Select
                  label="Template"
                  options={[
                    { value: 'flash', label: 'Flash Sale' },
                    { value: 'seasonal', label: 'Seasonal Campaign' },
                    { value: 'loyalty', label: 'Loyalty Reward' },
                  ]}
                  placeholder="Select template"
                  className="mb-4"
                />
                <Button className="w-full" icon={Rocket}>
                  Quick Deploy
                </Button>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Channel Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {channels.map(channel => {
                  const Icon = channel.icon;
                  return (
                    <div
                      key={channel.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-5 h-5 text-gray-600" />
                        <span className="text-sm font-medium text-gray-700">{channel.name}</span>
                      </div>
                      <button
                        onClick={() => toggleChannel(channel.id)}
                        className={`w-10 h-6 rounded-full transition-colors ${
                          channel.enabled ? 'bg-walmart-blue' : 'bg-gray-300'
                        }`}
                      >
                        <div
                          className={`w-4 h-4 bg-white rounded-full transition-transform ${
                            channel.enabled ? 'translate-x-5' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingCampaigns.filter(c => c.status === 'scheduled').slice(0, 3).map(campaign => (
                  <div key={campaign.id} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{campaign.name}</p>
                      <p className="text-xs text-gray-500">{campaign.startDate}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
