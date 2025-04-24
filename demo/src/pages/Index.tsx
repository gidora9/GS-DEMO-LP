
import { useState, useEffect } from 'react';
import NeuralGraph from '@/components/NeuralGraph/NeuralGraph';
import HeroSection from '@/components/HeroSection';
import OnboardingSection from '@/components/OnboardingSection';
import ManifestoSection from '@/components/ManifestoSection';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [activeNodeId, setActiveNodeId] = useState<string | null>('core');
  const [showOverlay, setShowOverlay] = useState(true);
  const [overlayStep, setOverlayStep] = useState(0);
  
  useEffect(() => {
    // Fade out overlay after introduction
    if (overlayStep === 3) {
      setTimeout(() => {
        setShowOverlay(false);
      }, 1000);
    }
  }, [overlayStep]);
  
  const handleNodeClick = (nodeId: string) => {
    setActiveNodeId(nodeId);
    
    // Scroll to the corresponding section based on node
    if (nodeId === 'core') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (nodeId === 'integration' || nodeId === 'dna' || nodeId === 'timeline') {
      document.getElementById('onboarding')?.scrollIntoView({ behavior: 'smooth' });
    } else if (nodeId === 'manifesto') {
      document.getElementById('manifesto')?.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // Overlay content for first-time visitors
  const overlayContent = [
    {
      title: "Welcome to GameScrobbler 2.6",
      description: "Your gaming identity visualized through an interactive neural graph.",
      buttonText: "Next"
    },
    {
      title: "The Neural Graph",
      description: "This visualization represents your gaming identity. Each node connects to different aspects of your gaming history.",
      buttonText: "Continue"
    },
    {
      title: "Interactive Experience",
      description: "Click on nodes to navigate through different sections of GameScrobbler.",
      buttonText: "Get Started"
    }
  ];
  
  return (
    <div className="w-full min-h-screen bg-gs-dark grid-bg overflow-x-hidden">
      {/* Neural Graph Visualization (always visible as background) */}
      <NeuralGraph onNodeClick={handleNodeClick} activeNodeId={activeNodeId} />
      
      {/* Intro Overlay for first-time visitors */}
      {showOverlay && (
        <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-gs-dark/90 transition-opacity duration-500 ${overlayStep === 3 ? 'opacity-0' : 'opacity-100'}`}>
          <div className="max-w-md w-full glassmorphism rounded-lg p-6 border border-gs-primary/30">
            <h2 className="text-2xl font-bold mb-4 text-gs-primary">
              {overlayContent[overlayStep]?.title}
            </h2>
            <p className="mb-6 text-gs-light-purple">
              {overlayContent[overlayStep]?.description}
            </p>
            <Button
              onClick={() => setOverlayStep(prevStep => prevStep + 1)}
              className="w-full bg-gs-primary hover:bg-gs-secondary text-black"
            >
              {overlayContent[overlayStep]?.buttonText}
            </Button>
          </div>
        </div>
      )}
      
      {/* Content Sections */}
      <div className="relative z-10">
        <HeroSection />
        <OnboardingSection />
        <ManifestoSection />
      </div>
      
      {/* Fixed Navigation */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-20">
        <div className="glassmorphism px-6 py-3 rounded-full flex items-center space-x-4 border border-gs-primary/20">
          <button
            onClick={() => handleNodeClick('core')}
            className={`w-3 h-3 rounded-full transition-all ${activeNodeId === 'core' ? 'bg-gs-primary scale-125' : 'bg-gs-neutral hover:bg-gs-primary/50'}`}
          />
          <button
            onClick={() => handleNodeClick('dna')}
            className={`w-3 h-3 rounded-full transition-all ${activeNodeId === 'dna' ? 'bg-gs-primary scale-125' : 'bg-gs-neutral hover:bg-gs-primary/50'}`}
          />
          <button
            onClick={() => handleNodeClick('integration')}
            className={`w-3 h-3 rounded-full transition-all ${activeNodeId === 'integration' ? 'bg-gs-primary scale-125' : 'bg-gs-neutral hover:bg-gs-primary/50'}`}
          />
          <button
            onClick={() => handleNodeClick('manifesto')}
            className={`w-3 h-3 rounded-full transition-all ${activeNodeId === 'manifesto' ? 'bg-gs-primary scale-125' : 'bg-gs-neutral hover:bg-gs-primary/50'}`}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
