import { useState } from 'react';
import { Layout } from '../../components/layout';
import { Card, CardHeader, CardTitle, CardContent, Badge, Button } from '../../components/ui';
import { PieChart } from '../../components/charts';
import { bugTickets, bugSeverityDistribution } from '../../data/mockData';
import { Bug, Users, Clock, ChevronRight, ExternalLink, Image, List, AlertCircle, CheckCircle, RefreshCw, X } from 'lucide-react';

export default function AutomatedBugTickets() {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [filter, setFilter] = useState('all');

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'high':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'open':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'in_progress':
        return <RefreshCw className="w-4 h-4 text-yellow-500" />;
      case 'resolved':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      default:
        return null;
    }
  };

  const filteredTickets = filter === 'all'
    ? bugTickets
    : bugTickets.filter(t => t.status === filter);

  const teamDistribution = [
    { name: 'Cart Team', value: 12 },
    { name: 'Checkout Team', value: 18 },
    { name: 'Browse Team', value: 8 },
    { name: 'Search Team', value: 15 },
    { name: 'Account Team', value: 6 },
  ];

  return (
    <Layout title="Automated Bug Tickets" subtitle="AI-generated bug reports from monitoring">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <Bug className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Open Bugs</p>
                <p className="text-2xl font-bold text-gray-900">23</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <RefreshCw className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">In Progress</p>
                <p className="text-2xl font-bold text-gray-900">8</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Resolved Today</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-walmart-blue/10 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-walmart-blue" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Users Affected</p>
                <p className="text-2xl font-bold text-gray-900">21.5K</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Ticket List */}
        <div className="lg:col-span-2">
          <Card padding={false}>
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Recent Tickets</h3>
                <div className="flex gap-2">
                  {['all', 'open', 'in_progress', 'resolved'].map((f) => (
                    <button
                      key={f}
                      onClick={() => setFilter(f)}
                      className={`px-3 py-1 text-sm rounded-full ${
                        filter === f
                          ? 'bg-walmart-blue text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {f.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="divide-y divide-gray-200">
              {filteredTickets.map((ticket) => (
                <div
                  key={ticket.id}
                  onClick={() => setSelectedTicket(ticket)}
                  className={`p-4 hover:bg-gray-50 cursor-pointer ${
                    selectedTicket?.id === ticket.id ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {getStatusIcon(ticket.status)}
                        <span className="text-sm font-mono text-gray-500">{ticket.id}</span>
                        <span className={`px-2 py-0.5 text-xs rounded-full border ${getSeverityColor(ticket.severity)}`}>
                          {ticket.severity}
                        </span>
                      </div>
                      <h4 className="font-medium text-gray-900">{ticket.title}</h4>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {ticket.affectedUsers.toLocaleString()} users
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {ticket.created}
                        </span>
                        <Badge variant="default">{ticket.team}</Badge>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Ticket Detail */}
          {selectedTicket ? (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-base">{selectedTicket.id}</CardTitle>
                <button onClick={() => setSelectedTicket(null)}>
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">{selectedTicket.title}</h4>
                    <div className="flex gap-2">
                      <Badge variant={
                        selectedTicket.severity === 'high' ? 'danger' :
                        selectedTicket.severity === 'medium' ? 'warning' : 'default'
                      }>
                        {selectedTicket.severity}
                      </Badge>
                      <Badge variant={
                        selectedTicket.status === 'open' ? 'danger' :
                        selectedTicket.status === 'in_progress' ? 'warning' : 'success'
                      }>
                        {selectedTicket.status}
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 mb-2">Reproduction Steps</p>
                    <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
                      {selectedTicket.reproSteps.map((step, idx) => (
                        <li key={idx}>{step}</li>
                      ))}
                    </ol>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 mb-2">Screenshot</p>
                    <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
                      <Image className="w-8 h-8 text-gray-400" />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" icon={ExternalLink}>
                      Open in Jira
                    </Button>
                    <Button size="sm">
                      Assign
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Severity Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <PieChart
                  data={bugSeverityDistribution}
                  height={200}
                  innerRadius={40}
                  outerRadius={70}
                />
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Team Routing</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {teamDistribution.map((team) => (
                  <div key={team.name} className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">{team.name}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-walmart-blue rounded-full"
                          style={{ width: `${(team.value / 20) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900 w-8 text-right">
                        {team.value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <div className="text-center">
                <div className="w-12 h-12 bg-walmart-blue/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Bug className="w-6 h-6 text-walmart-blue" />
                </div>
                <h4 className="font-medium text-gray-900 mb-1">AI Bug Detection</h4>
                <p className="text-sm text-gray-500">
                  Automatically creates tickets from error logs, user feedback, and monitoring alerts
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
