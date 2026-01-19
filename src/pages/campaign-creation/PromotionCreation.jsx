import { useState } from 'react';
import { Layout } from '../../components/layout';
import { Card, CardHeader, CardTitle, CardContent, Button, Badge, Input, Select } from '../../components/ui';
import { promotionTemplates } from '../../data/mockData';
import { Gift, Tag, Percent, Truck, Package, Star, Check, AlertCircle, Eye, ChevronRight } from 'lucide-react';

const iconMap = {
  discount: Percent,
  shipping: Truck,
  bundle: Package,
  loyalty: Star,
};

export default function PromotionCreation() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    discountType: '',
    discountValue: '',
    minPurchase: '',
    startDate: '',
    endDate: '',
    targetAudience: '',
  });

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setStep(2);
  };

  const complianceChecks = [
    { label: 'Legal review approved', status: 'passed' },
    { label: 'Finance sign-off', status: 'passed' },
    { label: 'Inventory verified', status: 'passed' },
    { label: 'Marketing assets ready', status: 'pending' },
  ];

  return (
    <Layout title="Promotion Creation" subtitle="Create and configure promotional campaigns">
      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-4 mb-8">
        {['Select Template', 'Configure', 'Review', 'Launch'].map((label, idx) => (
          <div key={label} className="flex items-center">
            <div className={`flex items-center gap-2 ${step > idx + 1 ? 'text-green-600' : step === idx + 1 ? 'text-walmart-blue' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step > idx + 1 ? 'bg-green-100' : step === idx + 1 ? 'bg-walmart-blue text-white' : 'bg-gray-100'
              }`}>
                {step > idx + 1 ? <Check className="w-4 h-4" /> : idx + 1}
              </div>
              <span className="text-sm font-medium hidden md:inline">{label}</span>
            </div>
            {idx < 3 && <ChevronRight className="w-4 h-4 mx-2 text-gray-300" />}
          </div>
        ))}
      </div>

      {step === 1 && (
        <>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Choose a Promotion Template</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {promotionTemplates.map((template) => {
              const Icon = iconMap[template.category] || Tag;
              return (
                <Card
                  key={template.id}
                  className="cursor-pointer hover:shadow-lg transition-all"
                  onClick={() => handleTemplateSelect(template)}
                >
                  <CardContent>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-walmart-blue/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-walmart-blue" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-gray-900">{template.name}</h3>
                          {template.popular && <Badge variant="success">Popular</Badge>}
                        </div>
                        <p className="text-sm text-gray-500">{template.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </>
      )}

      {step === 2 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Configure {selectedTemplate?.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Promotion Name"
                    placeholder="e.g., Summer BOGO Sale"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                  <Select
                    label="Discount Type"
                    options={[
                      { value: 'percent', label: 'Percentage Off' },
                      { value: 'fixed', label: 'Fixed Amount' },
                      { value: 'bogo', label: 'Buy One Get One' },
                    ]}
                    value={formData.discountType}
                    onChange={(val) => setFormData({ ...formData, discountType: val })}
                  />
                  <Input
                    label="Discount Value"
                    placeholder="e.g., 20 or 50%"
                    value={formData.discountValue}
                    onChange={(e) => setFormData({ ...formData, discountValue: e.target.value })}
                  />
                  <Input
                    label="Minimum Purchase"
                    placeholder="e.g., $50"
                    value={formData.minPurchase}
                    onChange={(e) => setFormData({ ...formData, minPurchase: e.target.value })}
                  />
                  <Input
                    label="Start Date"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  />
                  <Input
                    label="End Date"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  />
                  <Select
                    label="Target Audience"
                    options={[
                      { value: 'all', label: 'All Customers' },
                      { value: 'wplus', label: 'W+ Members Only' },
                      { value: 'new', label: 'New Customers' },
                      { value: 'lapsed', label: 'Lapsed Customers' },
                    ]}
                    value={formData.targetAudience}
                    onChange={(val) => setFormData({ ...formData, targetAudience: val })}
                    className="md:col-span-2"
                  />
                </div>

                <div className="flex gap-3 mt-6">
                  <Button variant="outline" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button onClick={() => setStep(3)}>
                    Continue to Review
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-walmart-blue text-white rounded-lg text-center">
                  <Gift className="w-8 h-8 mx-auto mb-2" />
                  <h4 className="font-bold text-lg">
                    {formData.discountValue || '20'}% OFF
                  </h4>
                  <p className="text-sm opacity-90">
                    {formData.name || 'Your Promotion Name'}
                  </p>
                  {formData.minPurchase && (
                    <p className="text-xs mt-2 opacity-75">
                      Min. purchase: {formData.minPurchase}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Review & Compliance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mb-6">
                  <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-500">Promotion Name</p>
                      <p className="font-medium">{formData.name || 'Summer BOGO Sale'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Discount</p>
                      <p className="font-medium">{formData.discountValue || '20'}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Duration</p>
                      <p className="font-medium">
                        {formData.startDate || 'Jun 15'} - {formData.endDate || 'Jun 22'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Target Audience</p>
                      <p className="font-medium">{formData.targetAudience || 'All Customers'}</p>
                    </div>
                  </div>
                </div>

                <h4 className="font-medium text-gray-900 mb-3">Compliance Checklist</h4>
                <div className="space-y-2">
                  {complianceChecks.map((check, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      {check.status === 'passed' ? (
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-green-600" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center">
                          <AlertCircle className="w-4 h-4 text-yellow-600" />
                        </div>
                      )}
                      <span className="text-sm text-gray-700">{check.label}</span>
                      <Badge variant={check.status === 'passed' ? 'success' : 'warning'} className="ml-auto">
                        {check.status}
                      </Badge>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3 mt-6">
                  <Button variant="outline" onClick={() => setStep(2)}>
                    Back
                  </Button>
                  <Button onClick={() => setStep(4)}>
                    Launch Promotion
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Estimated Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-500">Projected Revenue Lift</p>
                  <p className="text-2xl font-bold text-green-600">+$2.4M</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-500">Estimated Redemptions</p>
                  <p className="text-2xl font-bold text-walmart-blue">145K</p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <p className="text-sm text-gray-500">Promotion Cost</p>
                  <p className="text-2xl font-bold text-yellow-600">$580K</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">ROI</p>
                  <p className="text-2xl font-bold text-gray-900">4.1x</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {step === 4 && (
        <Card className="max-w-xl mx-auto">
          <CardContent className="text-center py-12">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Promotion Launched Successfully!
            </h2>
            <p className="text-gray-500 mb-6">
              Your promotion "{formData.name || 'Summer BOGO Sale'}" is now live and will be visible to customers.
            </p>
            <div className="flex gap-3 justify-center">
              <Button variant="outline" onClick={() => { setStep(1); setSelectedTemplate(null); }}>
                Create Another
              </Button>
              <Button>
                View Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </Layout>
  );
}
