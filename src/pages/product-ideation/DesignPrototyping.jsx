import { useState } from 'react';
import { Layout } from '../../components/layout';
import { Card, CardHeader, CardTitle, CardContent, Button, Badge } from '../../components/ui';
import { Textarea } from '../../components/ui/Input';
import { designPromptExamples, designVariants } from '../../data/mockData';
import { Sparkles, Wand2, Download, Share2, RefreshCw, Check, Image, Layers, Smartphone, Monitor } from 'lucide-react';

export default function DesignPrototyping() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [viewMode, setViewMode] = useState('desktop');

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setShowResults(true);
    }, 2000);
  };

  const VariantPlaceholder = ({ variant, index }) => {
    const colors = ['from-blue-400 to-purple-500', 'from-green-400 to-teal-500', 'from-orange-400 to-red-500', 'from-pink-400 to-rose-500'];
    return (
      <div className={`aspect-video bg-gradient-to-br ${colors[index]} rounded-lg flex items-center justify-center`}>
        <div className="text-center text-white p-4">
          <Layers className="w-8 h-8 mx-auto mb-2 opacity-80" />
          <p className="text-sm font-medium">{variant.name}</p>
        </div>
      </div>
    );
  };

  return (
    <Layout title="Design Prototyping" subtitle="AI-powered design generation and iteration">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Prompt Input */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wand2 className="w-4 h-4 text-walmart-blue" />
                Design Prompt
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Describe the design you want to create..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={5}
                className="mb-4"
              />
              <Button
                onClick={handleGenerate}
                disabled={isGenerating || !prompt.trim()}
                className="w-full"
                icon={isGenerating ? RefreshCw : Sparkles}
              >
                {isGenerating ? 'Generating...' : 'Generate Designs'}
              </Button>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500 mb-2">Try these examples:</p>
                <div className="space-y-2">
                  {designPromptExamples.map((example, idx) => (
                    <button
                      key={idx}
                      onClick={() => setPrompt(example)}
                      className="w-full text-left p-2 text-xs text-gray-600 bg-gray-50 hover:bg-gray-100 rounded transition-colors"
                    >
                      {example}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {showResults && selectedVariant && (
            <Card>
              <CardHeader>
                <CardTitle>Refine Design</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Describe changes you'd like to make..."
                  rows={3}
                  className="mb-3"
                />
                <Button variant="outline" className="w-full" icon={RefreshCw}>
                  Regenerate with Changes
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Panel - Results */}
        <div className="lg:col-span-2">
          {!showResults ? (
            <Card className="h-full">
              <CardContent className="h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Image className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No designs yet</h3>
                  <p className="text-gray-500 max-w-sm">
                    Enter a prompt and click "Generate Designs" to create AI-powered design variants
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {/* View Toggle */}
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Generated Variants</h3>
                <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('desktop')}
                    className={`p-2 rounded ${viewMode === 'desktop' ? 'bg-white shadow-sm' : ''}`}
                  >
                    <Monitor className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('mobile')}
                    className={`p-2 rounded ${viewMode === 'mobile' ? 'bg-white shadow-sm' : ''}`}
                  >
                    <Smartphone className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Variants Grid */}
              <div className="grid grid-cols-2 gap-4">
                {designVariants.map((variant, idx) => (
                  <Card
                    key={variant.id}
                    padding={false}
                    className={`cursor-pointer transition-all overflow-hidden ${
                      selectedVariant === variant.id
                        ? 'ring-2 ring-walmart-blue'
                        : 'hover:shadow-lg'
                    }`}
                    onClick={() => setSelectedVariant(variant.id)}
                  >
                    <div className="relative">
                      <VariantPlaceholder variant={variant} index={idx} />
                      {selectedVariant === variant.id && (
                        <div className="absolute top-2 right-2">
                          <div className="w-6 h-6 bg-walmart-blue rounded-full flex items-center justify-center">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-gray-900">{variant.name}</h4>
                        {idx === 0 && <Badge variant="success">Recommended</Badge>}
                      </div>
                      <p className="text-sm text-gray-500">{variant.description}</p>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Actions */}
              {selectedVariant && (
                <Card>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {designVariants.find(v => v.id === selectedVariant)?.name} Selected
                        </h4>
                        <p className="text-sm text-gray-500">
                          Export or share this design variant
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" icon={Share2}>
                          Share
                        </Button>
                        <Button variant="outline" icon={Download}>
                          Export
                        </Button>
                        <Button icon={Check}>
                          Use This Design
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
