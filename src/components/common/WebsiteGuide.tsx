import { useState, useEffect } from 'react';
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
  highlight?: string;
}

const guideSteps: GuideStep[] = [
  {
    title: "Welcome to Naffaro Solutions! 👋",
    description: "We're excited to have you here! Let us show you around our website so you can discover how we can help transform your business with automation and technology.",
    icon: <Sparkles className="h-8 w-8 text-accent" />,
  },
  {
    title: "Explore Our Services",
    description: "Navigate to the Services page to discover our offerings: Web Development, Business Automation, and Data Analysis. Each service is designed to streamline your operations.",
    icon: <span className="text-3xl">🛠️</span>,
    highlight: "services",
  },
  {
    title: "View Our Portfolio",
    description: "Check out our Portfolio to see real projects we've delivered for clients. From church management systems to GPS tracking solutions - see what we can build for you.",
    icon: <span className="text-3xl">💼</span>,
    highlight: "portfolio",
  },
  {
    title: "Get a Custom Quote",
    description: "Use our Service Calculator (floating button at the bottom right) to build your requirements and get a personalized quote for your project.",
    icon: <span className="text-3xl">📊</span>,
    highlight: "calculator",
  },
  {
    title: "Book a Consultation",
    description: "Ready to discuss your project? Visit our Consultation page to schedule a meeting with our team. We'll contact you to confirm your preferred time.",
    icon: <span className="text-3xl">📅</span>,
    highlight: "consultation",
  },
  {
    title: "Need Help? Chat With Us!",
    description: "Have questions? Click the chat icon in the bottom right corner anytime to get instant assistance navigating the site or learning about our services.",
    icon: <span className="text-3xl">💬</span>,
    highlight: "chatbot",
  },
  {
    title: "You're All Set! 🎉",
    description: "You now know your way around! Feel free to explore at your own pace. If you ever need this guide again, just refresh the page and click 'Take the Tour' in the welcome popup.",
    icon: <span className="text-3xl">✨</span>,
  },
];

const WebsiteGuide = () => {
  const [showWelcome, setShowWelcome] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const hasSeenGuide = localStorage.getItem('naffaro-guide-seen');
    if (!hasSeenGuide) {
      // Show welcome popup after a short delay
      const timer = setTimeout(() => {
        setShowWelcome(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

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

      {/* Guide Steps Dialog */}
      <Dialog open={showGuide} onOpenChange={setShowGuide}>
        <DialogContent className="sm:max-w-lg bg-background border-primary/20">
          <button
            onClick={finishGuide}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
          
          <div className="flex flex-col items-center text-center pt-4">
            {/* Progress indicator */}
            <div className="flex gap-1.5 mb-6">
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
            <div className="mb-4 p-4 rounded-full bg-primary/10 animate-fade-in">
              {currentGuideStep.icon}
            </div>

            {/* Content */}
            <DialogHeader className="space-y-3">
              <DialogTitle className="text-xl font-bold text-primary">
                {currentGuideStep.title}
              </DialogTitle>
              <DialogDescription className="text-muted-foreground text-base leading-relaxed">
                {currentGuideStep.description}
              </DialogDescription>
            </DialogHeader>

            {/* Step counter */}
            <p className="text-sm text-muted-foreground mt-4">
              Step {currentStep + 1} of {guideSteps.length}
            </p>

            {/* Navigation buttons */}
            <div className="flex gap-3 mt-6 w-full">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 0}
                className="flex-1 border-muted-foreground/30"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back
              </Button>
              <Button
                onClick={nextStep}
                className="flex-1 bg-primary hover:bg-primary/90"
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
              className="mt-4 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Skip tour
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WebsiteGuide;
