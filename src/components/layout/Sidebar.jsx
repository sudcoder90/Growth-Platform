import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  BarChart3,
  Brain,
  Megaphone,
  Shield,
  Database,
  LayoutDashboard,
  Target,
  Route,
  MessageSquare,
  Palette,
  Gift,
  FlaskConical,
  Calendar,
  TestTube,
  Activity,
  Bug,
  ChevronDown,
  ChevronRight,
  Sparkles,
  Home
} from 'lucide-react';
import { useState } from 'react';

const navSections = [
  {
    id: 'intelligence',
    label: 'Customer Intelligence',
    icon: Brain,
    items: [
      { path: '/intelligence/data-analysis', label: 'Data Analysis', icon: Database },
      { path: '/intelligence/dashboard', label: 'Dashboard & Metrics', icon: LayoutDashboard },
      { path: '/intelligence/competitive', label: 'Competitive Landscape', icon: Target },
    ]
  },
  {
    id: 'ideation',
    label: 'Product Ideation',
    icon: Sparkles,
    items: [
      { path: '/ideation/journey', label: 'User Journey Analysis', icon: Route },
      { path: '/ideation/feedback', label: 'Feedback Analysis', icon: MessageSquare },
      { path: '/ideation/design', label: 'Design Prototyping', icon: Palette },
    ]
  },
  {
    id: 'campaigns',
    label: 'Campaign Creation',
    icon: Megaphone,
    items: [
      { path: '/campaigns/promotions', label: 'Promotion Creation', icon: Gift },
      { path: '/campaigns/experiments', label: 'Experiment Setup', icon: FlaskConical },
      { path: '/campaigns/setup', label: 'Campaign Setup', icon: Calendar },
    ]
  },
  {
    id: 'monitoring',
    label: 'Testing & Monitoring',
    icon: Shield,
    items: [
      { path: '/monitoring/testing', label: 'Campaign Testing', icon: TestTube },
      { path: '/monitoring/journeys', label: 'Journey Monitoring', icon: Activity },
      { path: '/monitoring/bugs', label: 'Automated Bug Tickets', icon: Bug },
    ]
  }
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [expandedSections, setExpandedSections] = useState(() => {
    const currentSection = navSections.find(section =>
      section.items.some(item => location.pathname.startsWith(item.path))
    );
    return currentSection ? [currentSection.id] : ['intelligence'];
  });

  const toggleSection = (sectionId) => {
    setExpandedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen fixed left-0 top-0">
      {/* Logo - Clickable to go home */}
      <div className="p-4 border-b border-gray-200">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <div className="w-8 h-8 bg-walmart-blue rounded-lg flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <div className="text-left">
            <h1 className="font-semibold text-gray-900">Walmart Growth Platform</h1>
          </div>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-3">
        {/* Home Link */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium mb-2 transition-colors ${
              isActive
                ? 'bg-walmart-blue text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`
          }
        >
          <Home className="w-4 h-4" />
          <span>Home</span>
        </NavLink>
        {navSections.map((section) => {
          const isExpanded = expandedSections.includes(section.id);
          const isActive = section.items.some(item =>
            location.pathname.startsWith(item.path.split('/').slice(0, 3).join('/'))
          );
          const SectionIcon = section.icon;

          return (
            <div key={section.id} className="mb-1">
              <button
                onClick={() => toggleSection(section.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-walmart-blue/10 text-walmart-blue'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center gap-2">
                  <SectionIcon className="w-4 h-4" />
                  <span>{section.label}</span>
                </div>
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>

              {isExpanded && (
                <div className="mt-1 ml-4 pl-2 border-l border-gray-200">
                  {section.items.map((item) => {
                    const ItemIcon = item.icon;
                    return (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                          `flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                            isActive
                              ? 'bg-walmart-blue text-white'
                              : 'text-gray-600 hover:bg-gray-100'
                          }`
                        }
                      >
                        <ItemIcon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </NavLink>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="text-xs text-gray-500 text-center">
          Walmart Growth Platform v1.0
        </div>
      </div>
    </aside>
  );
}
