import { useState } from 'react';
import { Layout } from '../../components/layout';
import { Card, CardHeader, CardTitle, CardContent, Button, Input, Select, Badge } from '../../components/ui';
import { Textarea } from '../../components/ui/Input';
import { experimentTypes, metricOptions } from '../../data/mockData';
import { FlaskConical, ChevronRight, Check, Calculator, Users, BarChart3, Rocket, AlertCircle } from 'lucide-react';

export default function ExperimentSetup() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    hypothesis: '',
    type: 'ab',
    primaryMetric: '',
    secondaryMetrics: [],
    trafficAllocation: 50,
    variants: [
      { name: 'Control', description: 'Current experience' },
      { name: 'Variant A', description: '' },
    ],
  });

  const steps = [
    { id: 1, label: 'Hypothesis', icon: FlaskConical },
    { id: 2, label: 'Variants', icon: Users },
    { id: 3, label: 'Metrics', icon: BarChart3 },
    { id: 4, label: 'Power Analysis', icon: Calculator },
    { id: 5, label: 'Launch', icon: Rocket },
  ];

  const addVariant = () => {
    const newVariant = {
      name: `Variant ${String.fromCharCode(65 + formData.variants.length - 1)}`,
      description: '',
    };
    setFormData({ ...formData, variants: [...formData.variants, newVariant] });
  };

  const powerAnalysis = {
    sampleSize: 125000,
    durationDays: 14,
    mde: 2.5,
    power: 80,
    significance: 95,
  };

  return (
    <Layout title="Experiment Setup" subtitle="Design and launch A/B tests and experiments">
      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-2 mb-8 overflow-x-auto pb-2">
        {steps.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div key={s.id} className="flex items-center">
              <button
                onClick={() => s.id < step && setStep(s.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  step === s.id
                    ? 'bg-walmart-blue text-white'
                    : step > s.id
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-500'
                }`}
              >
                {step > s.id ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Icon className="w-4 h-4" />
                )}
                <span className="text-sm font-medium hidden sm:inline">{s.label}</span>
              </button>
              {idx < steps.length - 1 && (
                <ChevronRight className="w-4 h-4 mx-1 text-gray-300" />
              )}
            </div>
          );
        })}
      </div>

      <div className="max-w-3xl mx-auto">
        {/* Step 1: Hypothesis */}
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Define Your Hypothesis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Input
                  label="Experiment Name"
                  placeholder="e.g., Checkout CTA Color Test"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <Textarea
                  label="Hypothesis"
                  placeholder="If we [change], then [metric] will [increase/decrease] by [amount] because [reason]"
                  value={formData.hypothesis}
                  onChange={(e) => setFormData({ ...formData, hypothesis: e.target.value })}
                  rows={4}
                />
                <Select
                  label="Experiment Type"
                  options={experimentTypes}
                  value={formData.type}
                  onChange={(val) => setFormData({ ...formData, type: val })}
                />
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Tip:</strong> A good hypothesis is specific and measurable.
                    Include the change you're making, the expected impact, and why you believe it will work.
                  </p>
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <Button onClick={() => setStep(2)}>
                  Continue to Variants
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Variants */}
        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Configure Variants</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {formData.variants.map((variant, idx) => (
                  <div key={idx} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        idx === 0 ? 'bg-gray-200 text-gray-700' : 'bg-walmart-blue text-white'
                      }`}>
                        {idx === 0 ? 'C' : String.fromCharCode(64 + idx)}
                      </div>
                      <Input
                        placeholder="Variant name"
                        value={variant.name}
                        onChange={(e) => {
                          const newVariants = [...formData.variants];
                          newVariants[idx].name = e.target.value;
                          setFormData({ ...formData, variants: newVariants });
                        }}
                        className="flex-1"
                      />
                    </div>
                    <Textarea
                      placeholder="Describe this variant..."
                      value={variant.description}
                      onChange={(e) => {
                        const newVariants = [...formData.variants];
                        newVariants[idx].description = e.target.value;
                        setFormData({ ...formData, variants: newVariants });
                      }}
                      rows={2}
                    />
                  </div>
                ))}
                <Button variant="outline" onClick={addVariant} className="w-full">
                  + Add Another Variant
                </Button>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Traffic Allocation: {formData.trafficAllocation}%
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="100"
                    value={formData.trafficAllocation}
                    onChange={(e) => setFormData({ ...formData, trafficAllocation: parseInt(e.target.value) })}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>5%</span>
                    <span>100%</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button onClick={() => setStep(3)}>
                  Continue to Metrics
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Metrics */}
        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Select Success Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Select
                  label="Primary Metric"
                  options={metricOptions}
                  value={formData.primaryMetric}
                  onChange={(val) => setFormData({ ...formData, primaryMetric: val })}
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Secondary Metrics (Optional)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {metricOptions.map((metric) => (
                      <button
                        key={metric.value}
                        onClick={() => {
                          const newMetrics = formData.secondaryMetrics.includes(metric.value)
                            ? formData.secondaryMetrics.filter(m => m !== metric.value)
                            : [...formData.secondaryMetrics, metric.value];
                          setFormData({ ...formData, secondaryMetrics: newMetrics });
                        }}
                        className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                          formData.secondaryMetrics.includes(metric.value)
                            ? 'bg-walmart-blue text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {metric.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-yellow-50 rounded-lg flex gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                  <p className="text-sm text-yellow-800">
                    Choose your primary metric carefully - this is what will determine if your experiment is successful.
                    Secondary metrics help you understand broader impact.
                  </p>
                </div>
              </div>
              <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={() => setStep(2)}>
                  Back
                </Button>
                <Button onClick={() => setStep(4)}>
                  Continue to Power Analysis
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Power Analysis */}
        {step === 4 && (
          <Card>
            <CardHeader>
              <CardTitle>Power Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">Required Sample Size</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {powerAnalysis.sampleSize.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500">per variant</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">Estimated Duration</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {powerAnalysis.durationDays} days
                  </p>
                  <p className="text-xs text-gray-500">at {formData.trafficAllocation}% traffic</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">Minimum Detectable Effect</p>
                  <p className="text-2xl font-bold text-walmart-blue">
                    {powerAnalysis.mde}%
                  </p>
                  <p className="text-xs text-gray-500">relative change</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">Statistical Power</p>
                  <p className="text-2xl font-bold text-green-600">
                    {powerAnalysis.power}%
                  </p>
                  <p className="text-xs text-gray-500">{powerAnalysis.significance}% significance</p>
                </div>
              </div>

              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <Check className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-green-800">Experiment is well-powered</span>
                </div>
                <p className="text-sm text-green-700">
                  With your current configuration, you have an 80% chance of detecting a 2.5% or greater improvement
                  in your primary metric with 95% confidence.
                </p>
              </div>

              <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={() => setStep(3)}>
                  Back
                </Button>
                <Button onClick={() => setStep(5)}>
                  Continue to Launch
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 5: Launch */}
        {step === 5 && (
          <Card>
            <CardHeader>
              <CardTitle>Review & Launch</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mb-6">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">{formData.name || 'Checkout CTA Color Test'}</h4>
                  <p className="text-sm text-gray-600">{formData.hypothesis || 'If we change the checkout button color to blue, then conversion rate will increase by 5% because blue conveys trust and urgency.'}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Variants</p>
                    <p className="font-medium">{formData.variants.length}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Traffic Allocation</p>
                    <p className="font-medium">{formData.trafficAllocation}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Primary Metric</p>
                    <p className="font-medium">{formData.primaryMetric || 'Conversion Rate'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Expected Duration</p>
                    <p className="font-medium">{powerAnalysis.durationDays} days</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(4)}>
                  Back
                </Button>
                <Button icon={Rocket}>
                  Launch Experiment
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
}
