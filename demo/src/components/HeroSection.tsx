
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  const handleGetStarted = () => {
    toast({
      title: "Welcome to GameScrobbler 2.6",
      description: "Let's begin your Neural Graph journey!",
    });
    
    // Here we would handle authentication or onboarding
    document.getElementById('onboarding')?.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
      <div className={`transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <h1 className="text-5xl md:text-7xl font-bold mb-4 text-gs-primary glow">
          GameScrobbler <span className="text-gs-light-purple">2.6</span>
        </h1>
        
        <p className="text-lg md:text-xl mb-8 text-gs-light-purple max-w-md text-center mx-auto">
          Your gaming identity, visualized through an interactive neural graph experience.
        </p>
        
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 justify-center">
          <Button 
            onClick={handleGetStarted}
            className="bg-gs-primary hover:bg-gs-secondary text-black font-medium px-8 py-6"
          >
            Get Started
          </Button>
          
          <Button 
            variant="outline" 
            className="border-gs-primary text-gs-light-purple hover:bg-gs-primary/20 px-8 py-6"
            onClick={() => document.getElementById('manifesto')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
