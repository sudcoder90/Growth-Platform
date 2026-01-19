// Customer Intelligence - Dashboard Metrics
export const kpiMetrics = {
  wPlusSubscribers: { value: 32500000, change: 12.4 },
  monthlyGMV: { value: 4850000000, change: 8.2 },
  conversionRate: { value: 4.2, change: 0.3 },
  avgOrderValue: { value: 127.50, change: 5.1 },
  customerRetention: { value: 78.3, change: 2.1 },
  nps: { value: 72, change: 4 },
};

// Time series data for charts
export const revenueTimeSeriesData = [
  { date: 'Jan', revenue: 4200000000, subscribers: 28500000, orders: 42000000 },
  { date: 'Feb', revenue: 4350000000, subscribers: 29100000, orders: 43500000 },
  { date: 'Mar', revenue: 4500000000, subscribers: 29800000, orders: 45000000 },
  { date: 'Apr', revenue: 4420000000, subscribers: 30200000, orders: 44200000 },
  { date: 'May', revenue: 4680000000, subscribers: 31000000, orders: 46800000 },
  { date: 'Jun', revenue: 4750000000, subscribers: 31800000, orders: 47500000 },
  { date: 'Jul', revenue: 4850000000, subscribers: 32500000, orders: 48500000 },
];

// Competitive landscape data
export const competitors = [
  {
    id: 'amazon',
    name: 'Amazon',
    logo: 'A',
    marketShare: 38.7,
    primeMembers: 200000000,
    yoyGrowth: 9.2,
    recentNews: [
      { title: 'Amazon expands same-day delivery to 15 new markets', date: '2 hours ago', sentiment: 'neutral' },
      { title: 'Prime membership hits record numbers in Q4', date: '1 day ago', sentiment: 'positive' },
    ]
  },
  {
    id: 'target',
    name: 'Target',
    logo: 'T',
    marketShare: 7.4,
    circleMembers: 100000000,
    yoyGrowth: 3.1,
    recentNews: [
      { title: 'Target Circle expands rewards program benefits', date: '5 hours ago', sentiment: 'positive' },
      { title: 'New store format launches in urban markets', date: '2 days ago', sentiment: 'neutral' },
    ]
  },
  {
    id: 'costco',
    name: 'Costco',
    logo: 'C',
    marketShare: 5.2,
    members: 71000000,
    yoyGrowth: 7.8,
    recentNews: [
      { title: 'Costco reports strong membership renewals', date: '1 day ago', sentiment: 'positive' },
    ]
  },
  {
    id: 'kroger',
    name: 'Kroger',
    logo: 'K',
    marketShare: 4.1,
    boostMembers: 34000000,
    yoyGrowth: 2.4,
    recentNews: [
      { title: 'Kroger Boost adds new delivery perks', date: '3 days ago', sentiment: 'positive' },
    ]
  },
];

// Data Analysis - Sample queries and results
export const sampleQueries = [
  {
    query: "What's the conversion rate for W+ members in electronics?",
    sql: `SELECT
  segment,
  category,
  ROUND(conversions::float / sessions * 100, 2) as conversion_rate,
  total_revenue
FROM customer_analytics
WHERE segment = 'W+ Member'
  AND category = 'Electronics'
  AND date >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY segment, category
ORDER BY conversion_rate DESC;`,
    results: [
      { segment: 'W+ Member', category: 'Electronics', conversion_rate: 6.8, total_revenue: 245000000 },
      { segment: 'W+ Member', category: 'TVs', conversion_rate: 5.2, total_revenue: 89000000 },
      { segment: 'W+ Member', category: 'Computers', conversion_rate: 4.9, total_revenue: 67000000 },
    ]
  },
  {
    query: "Show me top performing A/B tests from last quarter",
    sql: `SELECT
  test_name,
  variant,
  lift_percent,
  statistical_significance,
  status
FROM ab_test_results
WHERE end_date >= CURRENT_DATE - INTERVAL '90 days'
  AND statistical_significance >= 0.95
ORDER BY lift_percent DESC
LIMIT 10;`,
    results: [
      { test_name: 'Checkout CTA Color', variant: 'Blue Button', lift_percent: 12.4, significance: 0.98, status: 'Completed' },
      { test_name: 'PDP Image Size', variant: 'Large Images', lift_percent: 8.7, significance: 0.96, status: 'Completed' },
      { test_name: 'Cart Abandonment Email', variant: 'Personalized', lift_percent: 7.2, significance: 0.97, status: 'Completed' },
    ]
  }
];

// User Journey Data
export const journeySegments = [
  { value: 'wplus', label: 'W+ Members' },
  { value: 'nonwplus', label: 'Non-W+ Members' },
  { value: 'new', label: 'New Customers' },
  { value: 'returning', label: 'Returning Customers' },
];

export const journeyData = {
  wplus: {
    funnel: [
      { stage: 'Homepage', users: 10000000, dropoff: 0 },
      { stage: 'Category Browse', users: 7200000, dropoff: 28 },
      { stage: 'Product View', users: 5400000, dropoff: 25 },
      { stage: 'Add to Cart', users: 2160000, dropoff: 60 },
      { stage: 'Checkout Start', users: 1620000, dropoff: 25 },
      { stage: 'Purchase', users: 1296000, dropoff: 20 },
    ],
    conversionRate: 12.96,
    avgSessionDuration: '8m 42s',
  },
  nonwplus: {
    funnel: [
      { stage: 'Homepage', users: 25000000, dropoff: 0 },
      { stage: 'Category Browse', users: 15000000, dropoff: 40 },
      { stage: 'Product View', users: 9000000, dropoff: 40 },
      { stage: 'Add to Cart', users: 2250000, dropoff: 75 },
      { stage: 'Checkout Start', users: 1125000, dropoff: 50 },
      { stage: 'Purchase', users: 675000, dropoff: 40 },
    ],
    conversionRate: 2.7,
    avgSessionDuration: '4m 15s',
  },
};

// Feedback Analysis Data
export const feedbackData = {
  sentimentTrend: [
    { date: 'Week 1', positive: 72, neutral: 18, negative: 10 },
    { date: 'Week 2', positive: 74, neutral: 17, negative: 9 },
    { date: 'Week 3', positive: 71, neutral: 16, negative: 13 },
    { date: 'Week 4', positive: 75, neutral: 17, negative: 8 },
  ],
  themes: [
    { name: 'Delivery Speed', count: 12450, sentiment: 0.82 },
    { name: 'Product Quality', count: 9870, sentiment: 0.78 },
    { name: 'App Experience', count: 7650, sentiment: 0.71 },
    { name: 'Pricing', count: 6540, sentiment: 0.65 },
    { name: 'Customer Service', count: 5430, sentiment: 0.74 },
  ],
  recentFeedback: [
    { id: 1, text: 'Same-day delivery is a game changer. Ordered at 10am, received by 4pm!', sentiment: 'positive', category: 'Delivery', time: '2 min ago' },
    { id: 2, text: 'App crashes when I try to apply coupons at checkout', sentiment: 'negative', category: 'App Experience', time: '5 min ago' },
    { id: 3, text: 'Great selection of organic products', sentiment: 'positive', category: 'Product Quality', time: '8 min ago' },
    { id: 4, text: 'Prices seem higher than in-store', sentiment: 'negative', category: 'Pricing', time: '12 min ago' },
    { id: 5, text: 'Easy to find what I need', sentiment: 'positive', category: 'App Experience', time: '15 min ago' },
  ],
  alerts: [
    { id: 1, title: 'Delivery complaints spike', description: 'Negative feedback about delivery delays up 23% in Northeast region', severity: 'warning', time: '1 hour ago' },
    { id: 2, title: 'App crash reports increasing', description: 'iOS app crash reports increased 45% since latest update', severity: 'critical', time: '3 hours ago' },
  ]
};

// Campaign/Promotion Templates
export const promotionTemplates = [
  { id: 1, name: 'BOGO', description: 'Buy One Get One Free', category: 'discount', popular: true },
  { id: 2, name: 'Percentage Off', description: 'X% off entire purchase', category: 'discount', popular: true },
  { id: 3, name: 'Free Shipping', description: 'Free shipping on orders over $X', category: 'shipping', popular: true },
  { id: 4, name: 'Bundle Deal', description: 'Save when buying multiple items', category: 'bundle', popular: false },
  { id: 5, name: 'Flash Sale', description: 'Limited time deep discount', category: 'discount', popular: true },
  { id: 6, name: 'Loyalty Bonus', description: 'Extra points for W+ members', category: 'loyalty', popular: false },
];

// Experiment Setup
export const experimentTypes = [
  { value: 'ab', label: 'A/B Test' },
  { value: 'multivariate', label: 'Multivariate Test' },
  { value: 'bandit', label: 'Multi-armed Bandit' },
];

export const metricOptions = [
  { value: 'conversion', label: 'Conversion Rate' },
  { value: 'revenue', label: 'Revenue per Visitor' },
  { value: 'aov', label: 'Average Order Value' },
  { value: 'ctr', label: 'Click-through Rate' },
  { value: 'engagement', label: 'Engagement Time' },
];

// Campaign Calendar
export const upcomingCampaigns = [
  { id: 1, name: 'Summer Savings Event', startDate: '2024-06-15', endDate: '2024-06-22', status: 'scheduled', channels: ['email', 'push', 'banner'] },
  { id: 2, name: 'Back to School', startDate: '2024-07-20', endDate: '2024-08-15', status: 'draft', channels: ['email', 'banner'] },
  { id: 3, name: 'Labor Day Sale', startDate: '2024-08-30', endDate: '2024-09-02', status: 'scheduled', channels: ['email', 'push', 'banner', 'sms'] },
  { id: 4, name: 'Fall Fashion Launch', startDate: '2024-09-10', endDate: '2024-09-17', status: 'draft', channels: ['email', 'push'] },
];

// Testing Coverage
export const testCoverage = {
  overall: 87,
  byArea: [
    { area: 'Homepage', coverage: 95, tests: 24, passing: 23 },
    { area: 'Search', coverage: 88, tests: 32, passing: 28 },
    { area: 'Product Pages', coverage: 92, tests: 45, passing: 42 },
    { area: 'Cart', coverage: 85, tests: 28, passing: 24 },
    { area: 'Checkout', coverage: 78, tests: 36, passing: 28 },
    { area: 'Account', coverage: 82, tests: 18, passing: 15 },
  ],
  browserMatrix: [
    { browser: 'Chrome', desktop: 'pass', mobile: 'pass' },
    { browser: 'Safari', desktop: 'pass', mobile: 'pass' },
    { browser: 'Firefox', desktop: 'pass', mobile: 'warning' },
    { browser: 'Edge', desktop: 'pass', mobile: 'pass' },
  ]
};

// Journey Health Monitoring
export const journeyHealth = [
  { id: 1, name: 'Checkout Flow', status: 'healthy', latency: 1.2, errorRate: 0.02, lastUpdated: '2 min ago' },
  { id: 2, name: 'Search & Browse', status: 'healthy', latency: 0.8, errorRate: 0.01, lastUpdated: '1 min ago' },
  { id: 3, name: 'Add to Cart', status: 'degraded', latency: 2.4, errorRate: 0.15, lastUpdated: '30 sec ago' },
  { id: 4, name: 'Payment Processing', status: 'healthy', latency: 1.8, errorRate: 0.03, lastUpdated: '1 min ago' },
  { id: 5, name: 'Order Confirmation', status: 'healthy', latency: 0.6, errorRate: 0.01, lastUpdated: '2 min ago' },
  { id: 6, name: 'Inventory Check', status: 'critical', latency: 4.5, errorRate: 0.28, lastUpdated: '15 sec ago' },
];

// Bug Tickets
export const bugTickets = [
  {
    id: 'BUG-4521',
    title: 'Cart total not updating after removing item',
    severity: 'high',
    status: 'open',
    team: 'Cart Team',
    created: '15 min ago',
    reproSteps: [
      'Add multiple items to cart',
      'Remove one item',
      'Observe cart total still shows old amount',
    ],
    affectedUsers: 1250,
  },
  {
    id: 'BUG-4520',
    title: 'Images not loading on category page - Mobile Safari',
    severity: 'medium',
    status: 'in_progress',
    team: 'Browse Team',
    created: '1 hour ago',
    reproSteps: [
      'Open Safari on iOS device',
      'Navigate to Electronics category',
      'Scroll down - images fail to lazy load',
    ],
    affectedUsers: 3400,
  },
  {
    id: 'BUG-4519',
    title: 'Promo code field disappears after error',
    severity: 'medium',
    status: 'open',
    team: 'Checkout Team',
    created: '2 hours ago',
    reproSteps: [
      'Go to checkout',
      'Enter invalid promo code',
      'Click Apply',
      'Promo code input field disappears',
    ],
    affectedUsers: 890,
  },
  {
    id: 'BUG-4518',
    title: 'Search suggestions showing duplicate results',
    severity: 'low',
    status: 'resolved',
    team: 'Search Team',
    created: '3 hours ago',
    reproSteps: [
      'Type "laptop" in search',
      'View autocomplete suggestions',
      'Some suggestions appear twice',
    ],
    affectedUsers: 15000,
  },
];

export const bugSeverityDistribution = [
  { name: 'Critical', value: 3, color: '#EF4444' },
  { name: 'High', value: 12, color: '#F59E0B' },
  { name: 'Medium', value: 28, color: '#FFC220' },
  { name: 'Low', value: 45, color: '#22C55E' },
];

// Design Prototyping
export const designPromptExamples = [
  'Create a mobile checkout flow with Apple Pay integration',
  'Design a W+ membership benefits comparison page',
  'Show a product recommendation carousel for the homepage',
  'Create an order tracking page with delivery updates',
];

export const designVariants = [
  { id: 1, name: 'Variant A', description: 'Clean minimal design with focus on CTA', thumbnail: 'variant-a' },
  { id: 2, name: 'Variant B', description: 'Feature-rich layout with social proof', thumbnail: 'variant-b' },
  { id: 3, name: 'Variant C', description: 'Mobile-first responsive design', thumbnail: 'variant-c' },
  { id: 4, name: 'Variant D', description: 'High-contrast accessibility focused', thumbnail: 'variant-d' },
];

// Automated Insights
export const automatedInsights = [
  { id: 1, title: 'W+ members show 3.2x higher LTV', type: 'opportunity', impact: 'high', date: 'Today' },
  { id: 2, title: 'Cart abandonment up 8% on mobile', type: 'alert', impact: 'high', date: 'Today' },
  { id: 3, title: 'Electronics category outperforming by 15%', type: 'positive', impact: 'medium', date: 'Yesterday' },
  { id: 4, title: 'Free shipping threshold test showing +5% AOV', type: 'positive', impact: 'high', date: 'Yesterday' },
];
