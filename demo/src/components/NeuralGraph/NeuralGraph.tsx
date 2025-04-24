
import { useState, useEffect } from 'react';
import NeuralGraphRenderer, { Node } from './NeuralGraphRenderer';
import FallbackGraph from './FallbackGraph';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from '@/hooks/use-toast';

interface NeuralGraphProps {
  onNodeClick?: (nodeId: string) => void;
  activeNodeId?: string | null;
}

const NeuralGraph = ({ onNodeClick, activeNodeId }: NeuralGraphProps) => {
  const [webGLSupported, setWebGLSupported] = useState<boolean>(true);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [tooltipContent, setTooltipContent] = useState<string>('');
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [nodes, setNodes] = useState<Node[]>([
    {
      id: 'core',
      name: 'GS Core',
      type: 'core',
      connections: ['timeline', 'dna', 'integration', 'privacy', 'manifesto']
    },
    {
      id: 'timeline',
      name: 'Timeline',
      type: 'timeline',
      connections: ['core', 'dna']
    },
    {
      id: 'dna',
      name: 'Gaming DNA',
      type: 'dna',
      connections: ['core', 'timeline']
    },
    {
      id: 'integration',
      name: 'Integrations',
      type: 'integration',
      connections: ['core', 'privacy']
    },
    {
      id: 'privacy',
      name: 'Privacy',
      type: 'privacy',
      connections: ['core', 'integration']
    },
    {
      id: 'manifesto',
      name: 'Manifesto',
      type: 'manifesto',
      connections: ['core']
    }
  ]);
  
  const isMobile = useIsMobile();
  const { toast } = useToast();
  
  // Check WebGL support
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setWebGLSupported(!!gl);
    } catch (e) {
      setWebGLSupported(false);
    }
  }, []);
  
  // Handle node hover
  const handleNodeHover = (nodeId: string | null) => {
    if (nodeId) {
      const node = nodes.find(n => n.id === nodeId);
      if (node) {
        setTooltipContent(node.name);
        setShowTooltip(true);
        
        // Update tooltip position on next tick
        setTimeout(() => {
          const event = window.event as MouseEvent;
          if (event) {
            setTooltipPosition({
              x: event.clientX,
              y: event.clientY
            });
          }
        }, 0);
      }
    } else {
      setShowTooltip(false);
    }
  };
  
  // Handle node click
  const handleNodeClick = (nodeId: string) => {
    if (onNodeClick) {
      onNodeClick(nodeId);
    } else {
      const node = nodes.find(n => n.id === nodeId);
      if (node) {
        toast({
          title: node.name,
          description: `You clicked on the ${node.name} node`,
        });
      }
    }
  };
  
  // Update mouse position for tooltip
  const handleMouseMove = (e: React.MouseEvent) => {
    if (showTooltip) {
      setTooltipPosition({
        x: e.clientX,
        y: e.clientY
      });
    }
  };
  
  return (
    <div className="w-full h-full" onMouseMove={handleMouseMove}>
      {webGLSupported && !isMobile ? (
        <NeuralGraphRenderer
          nodes={nodes}
          onNodeClick={handleNodeClick}
          onNodeHover={handleNodeHover}
          activeNodeId={activeNodeId}
        />
      ) : (
        <FallbackGraph
          nodes={nodes}
          onNodeClick={handleNodeClick}
          onNodeHover={handleNodeHover}
          activeNodeId={activeNodeId}
        />
      )}
      
      {showTooltip && (
        <div
          className="fixed pointer-events-none glassmorphism px-3 py-1 rounded-md text-gs-light-purple z-50 text-sm"
          style={{
            left: tooltipPosition.x + 15,
            top: tooltipPosition.y + 15,
          }}
        >
          {tooltipContent}
        </div>
      )}
    </div>
  );
};

export default NeuralGraph;
