
import { useRef, useEffect } from 'react';
import { Network } from 'vis-network';
import { DataSet } from 'vis-data';
import { Node } from './NeuralGraphRenderer';

interface FallbackGraphProps {
  nodes: Node[];
  onNodeClick?: (nodeId: string) => void;
  onNodeHover?: (nodeId: string | null) => void;
  activeNodeId?: string | null;
}

const FallbackGraph = ({
  nodes,
  onNodeClick,
  onNodeHover,
  activeNodeId
}: FallbackGraphProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const networkRef = useRef<Network | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Convert nodes to vis-network format
    const graphNodes = new DataSet(
      nodes.map(node => ({
        id: node.id,
        label: node.name,
        title: node.name,
        color: {
          background: node.type === 'core' ? '#9b87f5' : '#7E69AB',
          border: node.type === 'core' ? '#9b87f5' : '#7E69AB',
          highlight: {
            background: '#D6BCFA',
            border: '#9b87f5'
          },
          hover: {
            background: '#D6BCFA',
            border: '#9b87f5'
          }
        },
        size: node.type === 'core' ? 25 : 15,
        font: {
          color: '#fff',
          size: 12
        },
        shadow: {
          enabled: true,
          color: 'rgba(155, 135, 245, 0.5)',
          size: 10,
          x: 0,
          y: 0
        }
      }))
    );

    // Create edges from connections with proper id field for DataSet
    const edgeData = nodes.flatMap((node, idx) =>
      node.connections.map((targetId, index) => ({
        id: `${node.id}-${targetId}-${idx}-${index}`,
        from: node.id,
        to: targetId,
        color: {
          color: 'rgba(155, 135, 245, 0.3)',
          highlight: '#9b87f5',
          hover: '#9b87f5'
        },
        width: 1,
        smooth: {
          type: 'continuous'
        }
      }))
    );
    
    const edges = new DataSet(edgeData);

    // Configure the visualization
    const options = {
      nodes: {
        shape: 'dot',
        borderWidth: 1,
        shadow: true
      },
      edges: {
        width: 1,
        shadow: true
      },
      physics: {
        enabled: true,
        barnesHut: {
          gravitationalConstant: -2000,
          centralGravity: 0.3,
          springLength: 150,
          springConstant: 0.04,
          damping: 0.09
        }
      },
      interaction: {
        hover: true,
        tooltipDelay: 200
      }
    };

    // Create the network
    const network = new Network(
      containerRef.current,
      { nodes: graphNodes, edges },
      options
    );
    networkRef.current = network;

    // Set up event listeners
    network.on('click', params => {
      if (params.nodes.length > 0 && onNodeClick) {
        onNodeClick(params.nodes[0]);
      }
    });

    network.on('hoverNode', params => {
      if (onNodeHover) onNodeHover(params.node);
    });

    network.on('blurNode', () => {
      if (onNodeHover) onNodeHover(null);
    });

    // Update active node
    if (activeNodeId) {
      const nodeData = graphNodes.get(activeNodeId);
      if (nodeData) {
        graphNodes.update({
          id: activeNodeId,
          color: {
            background: '#D6BCFA',
            border: '#9b87f5',
            highlight: {
              background: '#D6BCFA',
              border: '#9b87f5'
            }
          },
          size: nodeData.size * 1.2
        });
        network.focus(activeNodeId, {
          scale: 1.2,
          animation: true
        });
      }
    }

    return () => {
      network.destroy();
    };
  }, [nodes, onNodeClick, onNodeHover, activeNodeId]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full absolute inset-0 bg-gs-dark"
    />
  );
};

export default FallbackGraph;
