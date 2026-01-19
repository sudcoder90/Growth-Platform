import { useNavigate } from 'react-router-dom';
import { Brain, Sparkles, Megaphone, Shield, ArrowRight, BarChart3 } from 'lucide-react';

const sections = [
  {
    id: 'intelligence',
    title: 'Customer Intelligence',
    description: 'Analyze customer data with natural language queries, view real-time dashboards, and monitor competitive landscape.',
    icon: Brain,
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    path: '/intelligence/dashboard',
    features: ['Text-to-SQL Analysis', 'KPI Dashboards', 'Competitive Monitoring'],
  },
  {
    id: 'ideation',
    title: 'Product Ideation',
    description: 'Explore user journeys, analyze customer feedback, and generate AI-powered design prototypes.',
    icon: Sparkles,
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    path: '/ideation/journey',
    features: ['Journey Analysis', 'Feedback Insights', 'AI Design Generation'],
  },
  {
    id: 'campaigns',
    title: 'Campaign Creation',
    description: 'Create promotions, set up A/B experiments, and manage multi-channel campaign launches.',
    icon: Megaphone,
    color: 'from-orange-500 to-red-500',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    path: '/campaigns/promotions',
    features: ['Promotion Builder', 'Experiment Setup', 'Campaign Calendar'],
  },
  {
    id: 'monitoring',
    title: 'Testing & Monitoring',
    description: 'Validate campaigns before launch, monitor journey health, and track automated bug reports.',
    icon: Shield,
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    path: '/monitoring/testing',
    features: ['Pre-launch Testing', 'Health Monitoring', 'Bug Tracking'],
  },
];

export default function Onboarding() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-walmart-blue rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Walmart Growth Platform</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome, Sudarshan!
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your unified platform for customer insights, product ideation, campaign management, and quality monitoring.
            Select a section to get started.
          </p>
        </div>

        {/* Section Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <div
                key={section.id}
                onClick={() => navigate(section.path)}
                className={`group relative bg-white rounded-2xl border-2 ${section.borderColor} p-6 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02]`}
              >
                {/* Gradient Header */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${section.color} rounded-t-2xl`} />

                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`w-14 h-14 ${section.bgColor} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-7 h-7 bg-gradient-to-r ${section.color} bg-clip-text`} style={{ color: section.color.includes('blue') ? '#3B82F6' : section.color.includes('purple') ? '#8B5CF6' : section.color.includes('orange') ? '#F97316' : '#22C55E' }} />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-walmart-blue transition-colors">
                      {section.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {section.description}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {section.features.map((feature, idx) => (
                        <span
                          key={idx}
                          className={`text-xs px-2.5 py-1 ${section.bgColor} rounded-full text-gray-700`}
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="flex items-center text-walmart-blue font-medium text-sm group-hover:gap-3 gap-2 transition-all">
                      <span>Explore {section.title}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="mt-12 bg-white rounded-2xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Overview</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-walmart-blue">32.5M</p>
              <p className="text-sm text-gray-500">W+ Subscribers</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">4.2%</p>
              <p className="text-sm text-gray-500">Conversion Rate</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-600">12</p>
              <p className="text-sm text-gray-500">Active Campaigns</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-orange-600">98.5%</p>
              <p className="text-sm text-gray-500">System Health</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white mt-12">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <p className="text-sm text-gray-500 text-center">
            Walmart Growth Platform v1.0
          </p>
        </div>
      </footer>
    </div>
  );
}
