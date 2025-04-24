
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const platforms = [
  { id: 'steam', name: 'Steam', description: 'Connect your Steam library' },
  { id: 'xbox', name: 'Xbox', description: 'Sync your Xbox achievements' },
  { id: 'playstation', name: 'PlayStation', description: 'Link your PlayStation Network' },
];

const OnboardingSection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [connectedPlatforms, setConnectedPlatforms] = useState<string[]>([]);
  const { toast } = useToast();
  
  const connectPlatform = (platformId: string) => {
    if (connectedPlatforms.includes(platformId)) {
      setConnectedPlatforms(connectedPlatforms.filter(id => id !== platformId));
      toast({
        title: "Platform disconnected",
        description: `You've disconnected ${platformId}`,
      });
    } else {
      setConnectedPlatforms([...connectedPlatforms, platformId]);
      toast({
        title: "Platform connected",
        description: `You've successfully connected ${platformId}`,
      });
    }
  };
  
  const steps = [
    {
      title: "Create Your Account",
      description: "Set up your GameScrobbler identity to start tracking your gaming journey.",
      action: (
        <Button 
          onClick={() => setActiveStep(1)}
          className="w-full bg-gs-primary hover:bg-gs-secondary text-black"
        >
          Continue
        </Button>
      )
    },
    {
      title: "Connect Platforms",
      description: "Link your gaming accounts to populate your Neural Graph.",
      action: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {platforms.map(platform => (
              <Card key={platform.id} className={`cursor-pointer transition-all hover:border-gs-primary ${connectedPlatforms.includes(platform.id) ? 'border-gs-primary bg-gs-dark/80' : 'border-gs-dark bg-gs-charcoal'}`}>
                <CardHeader className="relative pb-2">
                  <CardTitle className="text-lg">{platform.name}</CardTitle>
                  {connectedPlatforms.includes(platform.id) && (
                    <div className="absolute top-2 right-2 bg-gs-primary rounded-full p-1">
                      <Check size={12} className="text-black" />
                    </div>
                  )}
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm text-gs-neutral mb-4">{platform.description}</CardDescription>
                  <Button 
                    variant={connectedPlatforms.includes(platform.id) ? "outline" : "default"}
                    className={connectedPlatforms.includes(platform.id) ? "border-gs-primary text-gs-primary w-full" : "bg-gs-primary hover:bg-gs-secondary text-black w-full"}
                    onClick={() => connectPlatform(platform.id)}
                  >
                    {connectedPlatforms.includes(platform.id) ? "Disconnect" : "Connect"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <Button 
            onClick={() => setActiveStep(2)}
            className="w-full bg-gs-primary hover:bg-gs-secondary text-black"
            disabled={connectedPlatforms.length === 0}
          >
            Continue
          </Button>
        </div>
      )
    },
    {
      title: "Customize Privacy",
      description: "Control what data is shared and who can see your gaming profile.",
      action: (
        <div className="space-y-4">
          <Card className="border-gs-dark bg-gs-charcoal">
            <CardHeader>
              <CardTitle className="text-lg">Privacy Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Share gaming activity</span>
                <div className="w-12 h-6 bg-gs-primary rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 bg-black w-4 h-4 rounded-full transition-all"></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span>Public profile</span>
                <div className="w-12 h-6 bg-gs-primary rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 bg-black w-4 h-4 rounded-full transition-all"></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span>Anonymous statistics</span>
                <div className="w-12 h-6 bg-muted rounded-full relative cursor-pointer">
                  <div className="absolute left-1 top-1 bg-gs-neutral w-4 h-4 rounded-full transition-all"></div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Button 
            onClick={() => {
              toast({
                title: "Setup Complete",
                description: "Your GameScrobbler profile is ready to explore!",
              });
              setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }, 1000);
            }}
            className="w-full bg-gs-primary hover:bg-gs-secondary text-black"
          >
            Complete Setup
          </Button>
        </div>
      )
    }
  ];
  
  return (
    <div id="onboarding" className="min-h-screen flex items-center justify-center py-16 px-4">
      <Card className="w-full max-w-3xl bg-gs-charcoal border-gs-dark glassmorphism">
        <CardHeader>
          <div className="flex justify-between items-center mb-4">
            <CardTitle className="text-2xl text-gs-primary">Get Started with GameScrobbler</CardTitle>
            <div className="flex items-center space-x-2">
              {steps.map((_, index) => (
                <div 
                  key={index} 
                  className={`w-2 h-2 rounded-full ${activeStep >= index ? 'bg-gs-primary' : 'bg-gs-neutral'}`}
                />
              ))}
            </div>
          </div>
          <CardDescription className="text-gs-light-purple">{steps[activeStep].description}</CardDescription>
        </CardHeader>
        <CardContent>
          <h3 className="text-xl font-medium mb-6 text-gs-light-purple">{steps[activeStep].title}</h3>
          {steps[activeStep].action}
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingSection;
