import { useState } from 'react';
import { Layout } from '../../components/layout';
import { Card, CardHeader, CardTitle, CardContent, Button } from '../../components/ui';
import { sampleQueries } from '../../data/mockData';
import { Send, Database, Download, Copy, History, Sparkles, Table, Code } from 'lucide-react';

export default function DataAnalysis() {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('results');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    const userMessage = { role: 'user', content: query };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const matchedQuery = sampleQueries.find(q =>
        q.query.toLowerCase().includes(query.toLowerCase().split(' ').slice(0, 3).join(' '))
      ) || sampleQueries[0];

      const aiMessage = {
        role: 'assistant',
        content: `I found the data you're looking for. Here's the SQL query I generated and the results:`,
        sql: matchedQuery.sql,
        results: matchedQuery.results,
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);

    setQuery('');
  };

  const suggestedQueries = [
    "What's the conversion rate for W+ members?",
    "Show me top performing A/B tests",
    "Compare GMV by region last quarter",
    "Which product categories have highest margins?",
  ];

  return (
    <Layout title="Data Analysis" subtitle="Natural language queries to SQL with AI">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-180px)]">
        {/* Chat Panel */}
        <div className="lg:col-span-3 flex flex-col">
          <Card className="flex-1 flex flex-col" padding={false}>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 bg-walmart-blue/10 rounded-full flex items-center justify-center mb-4">
                    <Sparkles className="w-8 h-8 text-walmart-blue" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Ask anything about your data
                  </h3>
                  <p className="text-gray-500 max-w-md mb-6">
                    Use natural language to query your data. I'll generate the SQL and show you the results.
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center max-w-xl">
                    {suggestedQueries.map((q, i) => (
                      <button
                        key={i}
                        onClick={() => setQuery(q)}
                        className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 transition-colors"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-2xl ${msg.role === 'user' ? 'bg-walmart-blue text-white' : 'bg-gray-100'} rounded-lg px-4 py-3`}>
                        <p className={msg.role === 'user' ? 'text-white' : 'text-gray-900'}>{msg.content}</p>

                        {msg.sql && (
                          <div className="mt-4">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <Code className="w-4 h-4 text-gray-500" />
                                <span className="text-sm font-medium text-gray-700">Generated SQL</span>
                              </div>
                              <button className="text-gray-500 hover:text-gray-700">
                                <Copy className="w-4 h-4" />
                              </button>
                            </div>
                            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
                              {msg.sql}
                            </pre>
                          </div>
                        )}

                        {msg.results && (
                          <div className="mt-4">
                            <div className="flex items-center gap-2 mb-2">
                              <Table className="w-4 h-4 text-gray-500" />
                              <span className="text-sm font-medium text-gray-700">Results</span>
                            </div>
                            <div className="bg-white rounded-lg border overflow-hidden">
                              <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                  <tr>
                                    {Object.keys(msg.results[0]).map(key => (
                                      <th key={key} className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                        {key.replace(/_/g, ' ')}
                                      </th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                  {msg.results.map((row, rowIdx) => (
                                    <tr key={rowIdx}>
                                      {Object.values(row).map((val, valIdx) => (
                                        <td key={valIdx} className="px-4 py-2 text-sm text-gray-900">
                                          {typeof val === 'number'
                                            ? val >= 1000000
                                              ? `$${(val / 1000000).toFixed(1)}M`
                                              : val.toLocaleString()
                                            : val}
                                        </td>
                                      ))}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                            <div className="flex gap-2 mt-3">
                              <Button variant="outline" size="sm" icon={Download}>
                                Export CSV
                              </Button>
                              <Button variant="outline" size="sm" icon={Copy}>
                                Copy
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 rounded-lg px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Input */}
            <div className="border-t border-gray-200 p-4">
              <form onSubmit={handleSubmit} className="flex gap-3">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ask a question about your data..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-walmart-blue/20 focus:border-walmart-blue"
                />
                <Button type="submit" disabled={isLoading || !query.trim()} icon={Send}>
                  Send
                </Button>
              </form>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="w-4 h-4" />
                Recent Queries
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {sampleQueries.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => setQuery(q.query)}
                    className="w-full text-left p-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    {q.query}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-4 h-4" />
                Available Tables
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="p-2 bg-gray-50 rounded">
                  <span className="font-mono text-walmart-blue">customer_analytics</span>
                </div>
                <div className="p-2 bg-gray-50 rounded">
                  <span className="font-mono text-walmart-blue">ab_test_results</span>
                </div>
                <div className="p-2 bg-gray-50 rounded">
                  <span className="font-mono text-walmart-blue">transactions</span>
                </div>
                <div className="p-2 bg-gray-50 rounded">
                  <span className="font-mono text-walmart-blue">product_catalog</span>
                </div>
                <div className="p-2 bg-gray-50 rounded">
                  <span className="font-mono text-walmart-blue">user_sessions</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
