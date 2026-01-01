import { useState, useEffect, useCallback } from 'react';
import { X, ChevronRight, ChevronLeft, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

interface GuideStep {
  title: string;
  description: string;
  icon: React.ReactNode;
  selector?: string; // CSS selector for the element to highlight
}

const guideSteps: GuideStep[] = [
  {
    title: "Welcome to Naffaro Solutions! 👋",
    description: "We're excited to have you here! Let us show you around our website so you can discover how we can help transform your business with automation and technology.",
    icon: <Sparkles className="h-8 w-8 text-accent" />,
  },
  {
    title: "Navigation Menu",
    description: "Use the navigation bar to explore different sections of our website. Access Services, Portfolio, About Us, Blog, and Contact pages easily from here.",
    icon: <span className="text-3xl">🧭</span>,
    selector: "nav",
  },
  {
    title: "Explore Our Services",
    description: "Click on 'Services' to discover our offerings: Web Development, Business Automation, and Data Analysis. Each service is designed to streamline your operations.",
    icon: <span className="text-3xl">🛠️</span>,
    selector: "[href='/services']",
  },
  {
    title: "View Our Portfolio",
    description: "Check out our Portfolio to see real projects we've delivered for clients. From church management systems to GPS tracking solutions - see what we can build for you.",
    icon: <span className="text-3xl">💼</span>,
    selector: "[href='/portfolio']",
  },
  {
    title: "Get a Custom Quote",
    description: "Use our Service Calculator (the floating button at the bottom) to build your requirements and get a personalized quote for your project.",
    icon: <span className="text-3xl">📊</span>,
    selector: "[data-calculator-trigger]",
  },
  {
    title: "Book a Consultation",
    description: "Ready to discuss your project? Visit our Consultation page to schedule a meeting with our team. We'll contact you to confirm your preferred time.",
    icon: <span className="text-3xl">📅</span>,
    selector: "[href='/consultation']",
  },
  {
    title: "Need Help? Chat With Us!",
    description: "Have questions? Click the chat icon in the bottom right corner anytime to get instant assistance navigating the site or learning about our services.",
    icon: <span className="text-3xl">💬</span>,
    selector: "[data-chatbot-trigger]",
  },
  {
    title: "You're All Set! 🎉",
    description: "You now know your way around! Feel free to explore at your own pace. If you ever need this guide again, just refresh the page and click 'Take the Tour' in the welcome popup.",
    icon: <span className="text-3xl">✨</span>,
  },
];

interface SpotlightPosition {
  top: number;
  left: number;
  width: number;
  height: number;
}

const WebsiteGuide = () => {
  const [showWelcome, setShowWelcome] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [spotlightPosition, setSpotlightPosition] = useState<SpotlightPosition | null>(null);

  useEffect(() => {
    const hasSeenGuide = localStorage.getItem('naffaro-guide-seen');
    if (!hasSeenGuide) {
      const timer = setTimeout(() => {
        setShowWelcome(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const updateSpotlight = useCallback(() => {
    const currentGuideStep = guideSteps[currentStep];
    if (currentGuideStep.selector && showGuide) {
      const element = document.querySelector(currentGuideStep.selector);
      if (element) {
        const rect = element.getBoundingClientRect();
        const padding = 8;
        setSpotlightPosition({
          top: rect.top + window.scrollY - padding,
          left: rect.left + window.scrollX - padding,
          width: rect.width + padding * 2,
          height: rect.height + padding * 2,
        });
        
        // Scroll element into view if needed
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        setSpotlightPosition(null);
      }
    } else {
      setSpotlightPosition(null);
    }
  }, [currentStep, showGuide]);

  useEffect(() => {
    updateSpotlight();
    
    // Update on resize/scroll
    window.addEventListener('resize', updateSpotlight);
    window.addEventListener('scroll', updateSpotlight);
    
    return () => {
      window.removeEventListener('resize', updateSpotlight);
      window.removeEventListener('scroll', updateSpotlight);
    };
  }, [updateSpotlight]);

  const startGuide = () => {
    setShowWelcome(false);
    setShowGuide(true);
    setCurrentStep(0);
  };

  const skipGuide = () => {
    setShowWelcome(false);
    localStorage.setItem('naffaro-guide-seen', 'true');
  };

  const nextStep = () => {
    if (currentStep < guideSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      finishGuide();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const finishGuide = () => {
    setShowGuide(false);
    setSpotlightPosition(null);
    localStorage.setItem('naffaro-guide-seen', 'true');
  };

  const currentGuideStep = guideSteps[currentStep];

  return (
    <>
      {/* Welcome Dialog */}
      <Dialog open={showWelcome} onOpenChange={setShowWelcome}>
        <DialogContent className="sm:max-w-md bg-background border-primary/20">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-primary flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-accent" />
              Welcome to Naffaro Solutions!
            </DialogTitle>
            <DialogDescription className="text-muted-foreground pt-2">
              It looks like this is your first time here. Would you like a quick tour to help you navigate our website?
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <Button
              onClick={startGuide}
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Take the Tour
            </Button>
            <Button
              variant="outline"
              onClick={skipGuide}
              className="flex-1 border-muted-foreground/30"
            >
              Skip for Now
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Spotlight Overlay */}
      {showGuide && (
        <div className="fixed inset-0 z-[60] pointer-events-none">
          {/* Dark overlay with cutout */}
          <svg className="absolute inset-0 w-full h-full">
            <defs>
              <mask id="spotlight-mask">
                <rect x="0" y="0" width="100%" height="100%" fill="white" />
                {spotlightPosition && (
                  <rect
                    x={spotlightPosition.left}
                    y={spotlightPosition.top}
                    width={spotlightPosition.width}
                    height={spotlightPosition.height}
                    rx="8"
                    fill="black"
                    className="transition-all duration-500 ease-out"
                  />
                )}
              </mask>
            </defs>
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="rgba(0, 0, 0, 0.75)"
              mask="url(#spotlight-mask)"
            />
          </svg>

          {/* Highlight border around element */}
          {spotlightPosition && (
            <div
              className="absolute border-2 border-accent rounded-lg transition-all duration-500 ease-out animate-pulse"
              style={{
                top: spotlightPosition.top,
                left: spotlightPosition.left,
                width: spotlightPosition.width,
                height: spotlightPosition.height,
                boxShadow: '0 0 20px 4px hsl(var(--accent) / 0.5)',
              }}
            />
          )}
        </div>
      )}

      {/* Guide Steps Panel */}
      {showGuide && (
        <div 
          className="fixed z-[70] bg-background border border-primary/20 rounded-xl shadow-2xl p-6 max-w-md w-[90vw] animate-fade-in"
          style={{
            bottom: spotlightPosition ? '24px' : '50%',
            right: '24px',
            transform: spotlightPosition ? 'none' : 'translateY(50%)',
          }}
        >
          <button
            onClick={finishGuide}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
          
          <div className="flex flex-col items-center text-center">
            {/* Progress indicator */}
            <div className="flex gap-1.5 mb-4">
              {guideSteps.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentStep
                      ? 'w-6 bg-primary'
                      : index < currentStep
                      ? 'w-2 bg-primary/60'
                      : 'w-2 bg-muted'
                  }`}
                />
              ))}
            </div>

            {/* Icon */}
            <div className="mb-3 p-3 rounded-full bg-primary/10">
              {currentGuideStep.icon}
            </div>

            {/* Content */}
            <h3 className="text-lg font-bold text-primary mb-2">
              {currentGuideStep.title}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              {currentGuideStep.description}
            </p>

            {/* Step counter */}
            <p className="text-xs text-muted-foreground mb-4">
              Step {currentStep + 1} of {guideSteps.length}
            </p>

            {/* Navigation buttons */}
            <div className="flex gap-3 w-full">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 0}
                className="flex-1 border-muted-foreground/30"
                size="sm"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back
              </Button>
              <Button
                onClick={nextStep}
                className="flex-1 bg-primary hover:bg-primary/90"
                size="sm"
              >
                {currentStep === guideSteps.length - 1 ? (
                  "Get Started"
                ) : (
                  <>
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </>
                )}
              </Button>
            </div>

            {/* Skip link */}
            <button
              onClick={finishGuide}
              className="mt-3 text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              Skip tour
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default WebsiteGuide;
