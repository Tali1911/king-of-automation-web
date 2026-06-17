import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { X, ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { ServiceType, serviceFeatures } from './serviceCalculator/types';
import FeaturesList from './serviceCalculator/FeaturesList';
import SelectionPreview from './serviceCalculator/SelectionPreview';
import QuoteRequestForm from './serviceCalculator/QuoteRequestForm';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

type Step = 'selection' | 'preview' | 'contact' | 'success';

const ServiceCalculator = () => {
  const [selectedServiceTypes, setSelectedServiceTypes] = useState<ServiceType[]>(['website']);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<Step>('selection');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const serviceTypeLabels: Record<ServiceType, string> = {
    website: 'A New Website',
    webapp: 'A Business Tool / App',
    data: 'Help With My Data'
  };

  // Helper to get feature names from IDs
  const getFeatureNames = (featureIds: string[]): string[] => {
    const allFeatures = Object.values(serviceFeatures).flatMap(categories =>
      categories.flatMap(cat => cat.features)
    );
    return featureIds.map(id => {
      const feature = allFeatures.find(f => f.id === id);
      return feature ? feature.name : id;
    });
  };

  const handleServiceTypeToggle = (type: ServiceType) => {
    setSelectedServiceTypes(prev => {
      if (prev.includes(type)) {
        // Remove service type and its features
        const removedFeatureIds = serviceFeatures[type]
          .flatMap(cat => cat.features)
          .map(f => f.id);
        setSelectedFeatures(current => 
          current.filter(id => !removedFeatureIds.includes(id))
        );
        return prev.filter(t => t !== type);
      } else {
        return [...prev, type];
      }
    });
  };

  const handleFeatureToggle = (featureId: string) => {
    setSelectedFeatures(prev => 
      prev.includes(featureId) 
        ? prev.filter(id => id !== featureId)
        : [...prev, featureId]
    );
  };

  const handleRemoveFeature = (featureId: string) => {
    setSelectedFeatures(prev => prev.filter(id => id !== featureId));
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleReset = () => {
    setSelectedServiceTypes(['website']);
    setSelectedFeatures([]);
    setCurrentStep('selection');
    setIsSubmitting(false);
  };

  const handleQuoteSubmit = async (data: { email: string; name?: string; phone?: string; notes?: string }) => {
    setIsSubmitting(true);
    
    try {
      const { data: response, error } = await supabase.functions.invoke('send-quote-request', {
        body: {
          email: data.email,
          name: data.name,
          phone: data.phone,
          notes: data.notes,
          serviceTypes: selectedServiceTypes.map(t => serviceTypeLabels[t]),
          features: getFeatureNames(selectedFeatures)
        }
      });

      if (error) {
        console.error('Error sending quote request:', error);
        toast({
          title: "Error",
          description: "Failed to submit your request. Please try again.",
          variant: "destructive"
        });
        setIsSubmitting(false);
        return;
      }

      console.log('Quote request sent:', response);
      setIsSubmitting(false);
      setCurrentStep('success');
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive"
      });
      setIsSubmitting(false);
    }
  };

  const canProceedToPreview = selectedFeatures.length > 0;

  return (
    <Collapsible 
      open={isOpen} 
      onOpenChange={setIsOpen}
      className="fixed bottom-20 left-4 right-4 sm:right-auto sm:left-6 sm:bottom-6 z-40 w-auto sm:w-80 md:w-96 shadow-xl rounded-xl max-h-[calc(100vh-100px)] overflow-auto"
    >
      <CollapsibleTrigger 
        data-calculator-trigger
        className="bg-primary text-primary-foreground p-3 rounded-t-xl w-full flex justify-between items-center hover:opacity-90 transition-opacity"
      >
        <span className="font-medium text-sm">Tell Us What You Need</span>
        <span className="text-xs bg-background text-foreground px-2 py-1 rounded-full">
          {isOpen ? "Close" : "Open"}
        </span>
      </CollapsibleTrigger>
      
      <CollapsibleContent>
        <Card className="border-t-0 rounded-t-none relative">
          <button 
            onClick={handleClose}
            className="absolute right-2 top-2 p-1.5 bg-muted rounded-full hover:bg-muted/80 transition-colors z-10"
            aria-label="Close calculator"
          >
            <X className="h-4 w-4" />
          </button>

          <CardHeader className="pt-6 pb-3 px-4">
            <CardTitle className="text-lg">
              {currentStep === 'selection' && 'Select Your Features'}
              {currentStep === 'preview' && 'Review Your Selection'}
              {currentStep === 'contact' && 'Get Your Quote'}
              {currentStep === 'success' && 'Request Submitted!'}
            </CardTitle>
            <CardDescription className="text-xs">
              {currentStep === 'selection' && 'Choose service types and features you need'}
              {currentStep === 'preview' && 'Review and edit your selections'}
              {currentStep === 'contact' && 'Enter your contact information'}
              {currentStep === 'success' && 'We\'ll be in touch soon'}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4 px-4 py-2">
            {currentStep === 'selection' && (
              <>
                {/* Service Type Selection */}
                <div>
                  <h3 className="text-sm font-medium mb-2">What Do You Need?</h3>
                  <div className="flex flex-wrap gap-2">
                    {(['website', 'webapp', 'data'] as ServiceType[]).map(type => (
                      <button
                        key={type}
                        onClick={() => handleServiceTypeToggle(type)}
                        className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                          selectedServiceTypes.includes(type)
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted hover:bg-muted/80'
                        }`}
                      >
                        {serviceTypeLabels[type]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Features for each selected service type */}
                {selectedServiceTypes.map(serviceType => (
                  <div key={serviceType} className="border-t pt-3">
                    <h4 className="text-xs font-semibold mb-2 text-muted-foreground uppercase">
                      {serviceTypeLabels[serviceType]} — Details
                    </h4>
                    <FeaturesList 
                      serviceType={serviceType}
                      selectedFeatures={selectedFeatures}
                      serviceFeatures={serviceFeatures}
                      onFeatureToggle={handleFeatureToggle}
                    />
                  </div>
                ))}
              </>
            )}

            {currentStep === 'preview' && (
              <SelectionPreview
                selectedServiceTypes={selectedServiceTypes}
                selectedFeatures={selectedFeatures}
                onRemoveFeature={handleRemoveFeature}
              />
            )}

            {currentStep === 'contact' && (
              <QuoteRequestForm
                onSubmit={handleQuoteSubmit}
                isSubmitting={isSubmitting}
              />
            )}

            {currentStep === 'success' && (
              <div className="text-center py-6 space-y-4">
                <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto" />
                <div className="space-y-2">
                  <h3 className="font-semibold">Thank you!</h3>
                  <p className="text-sm text-muted-foreground">
                    We have received your list and will send you a personalised quote within 1-2 days.
                  </p>
                </div>
                <Button onClick={handleReset} variant="outline" className="w-full">
                  Start a New Request
                </Button>
              </div>
            )}
          </CardContent>
          
          {currentStep !== 'success' && (
            <CardFooter className="flex justify-between p-4 border-t">
              {currentStep === 'selection' && (
                <>
                  <div className="text-xs text-muted-foreground">
                    {selectedFeatures.length} item{selectedFeatures.length !== 1 ? 's' : ''} picked
                  </div>
                  <Button
                    onClick={() => setCurrentStep('preview')}
                    disabled={!canProceedToPreview}
                    size="sm"
                  >
                    Review
                    <ArrowRight className="ml-2 h-3 w-3" />
                  </Button>
                </>
              )}

              {currentStep === 'preview' && (
                <>
                  <Button
                    onClick={() => setCurrentStep('selection')}
                    variant="outline"
                    size="sm"
                  >
                    <ArrowLeft className="mr-2 h-3 w-3" />
                    Change
                  </Button>
                  <Button
                    onClick={() => setCurrentStep('contact')}
                    disabled={selectedFeatures.length === 0}
                    size="sm"
                  >
                    Get Quote
                    <ArrowRight className="ml-2 h-3 w-3" />
                  </Button>
                </>
              )}

              {currentStep === 'contact' && (
                <Button
                  onClick={() => setCurrentStep('preview')}
                  variant="outline"
                  size="sm"
                  disabled={isSubmitting}
                >
                  <ArrowLeft className="mr-2 h-3 w-3" />
                  Back
                </Button>
              )}
            </CardFooter>
          )}
        </Card>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default ServiceCalculator;