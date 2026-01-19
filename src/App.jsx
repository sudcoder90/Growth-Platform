import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Onboarding
import { Onboarding } from './pages/onboarding';

// Customer Intelligence pages
import { Dashboard, DataAnalysis, Competitive } from './pages/customer-intelligence';

// Product Ideation pages
import { JourneyAnalysis, FeedbackAnalysis, DesignPrototyping } from './pages/product-ideation';

// Campaign Creation pages
import { PromotionCreation, ExperimentSetup, CampaignSetup } from './pages/campaign-creation';

// Testing & Monitoring pages
import { CampaignTesting, JourneyMonitoring, AutomatedBugTickets } from './pages/testing-monitoring';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Onboarding - Landing Page */}
        <Route path="/" element={<Onboarding />} />

        {/* Customer Intelligence */}
        <Route path="/intelligence/dashboard" element={<Dashboard />} />
        <Route path="/intelligence/data-analysis" element={<DataAnalysis />} />
        <Route path="/intelligence/competitive" element={<Competitive />} />

        {/* Product Ideation */}
        <Route path="/ideation/journey" element={<JourneyAnalysis />} />
        <Route path="/ideation/feedback" element={<FeedbackAnalysis />} />
        <Route path="/ideation/design" element={<DesignPrototyping />} />

        {/* Campaign Creation */}
        <Route path="/campaigns/promotions" element={<PromotionCreation />} />
        <Route path="/campaigns/experiments" element={<ExperimentSetup />} />
        <Route path="/campaigns/setup" element={<CampaignSetup />} />

        {/* Testing & Monitoring */}
        <Route path="/monitoring/testing" element={<CampaignTesting />} />
        <Route path="/monitoring/journeys" element={<JourneyMonitoring />} />
        <Route path="/monitoring/bugs" element={<AutomatedBugTickets />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
