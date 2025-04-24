
import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { useIsMobile } from '@/hooks/use-mobile';

// Define the basic properties a node should have
export interface Node {
  id: string;
  name: string;
  type: 'core' | 'timeline' | 'dna' | 'integration' | 'privacy' | 'manifesto';
  position?: THREE.Vector3;
  connections: string[];
}

interface NeuralGraphRendererProps {
  nodes: Node[];
  onNodeClick?: (nodeId: string) => void;
  onNodeHover?: (nodeId: string | null) => void;
  activeNodeId?: string | null;
}

const NeuralGraphRenderer = ({
  nodes,
  onNodeClick,
  onNodeHover,
  activeNodeId
}: NeuralGraphRendererProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const nodesRef = useRef<{ [key: string]: THREE.Mesh }>({});
  const linesRef = useRef<THREE.Line[]>([]);
  const raycasterRef = useRef<THREE.Raycaster>(new THREE.Raycaster());
  const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2());
  
  const isMobile = useIsMobile();
  
  // State to track which node is being hovered
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  
  // Effect to initialize and manage Three.js
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Initialize scene, camera, and renderer
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    const camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 20;
    cameraRef.current = camera;
    
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    
    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0x9b87f5, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Add point light at camera position
    const pointLight = new THREE.PointLight(0x9b87f5, 1, 100);
    pointLight.position.copy(camera.position);
    scene.add(pointLight);
    
    // Function to create nodes
    const createNodes = () => {
      // Clear existing nodes and lines
      Object.values(nodesRef.current).forEach(node => scene.remove(node));
      linesRef.current.forEach(line => scene.remove(line));
      nodesRef.current = {};
      linesRef.current = [];
      
      // Calculate positions for nodes if not provided
      const nodesWithPositions = nodes.map((node, i) => {
        if (node.position) return node;
        
        let position: THREE.Vector3;
        
        if (node.type === 'core') {
          position = new THREE.Vector3(0, 0, 0); // Core node at center
        } else {
          // Distribute other nodes in a circle around the core
          const angleStep = (2 * Math.PI) / (nodes.length - 1);
          const angle = i * angleStep;
          const radius = 10;
          position = new THREE.Vector3(
            radius * Math.cos(angle),
            radius * Math.sin(angle),
            0
          );
        }
        
        return { ...node, position };
      });
      
      // Create meshes for nodes
      nodesWithPositions.forEach(node => {
        const nodeSize = node.type === 'core' ? 2 : 1;
        
        // Create a glow effect for nodes using a sprite
        const nodeGeometry = new THREE.SphereGeometry(nodeSize, 32, 32);
        const nodeMaterial = new THREE.MeshPhongMaterial({
          color: node.type === 'core' ? 0x9b87f5 : 0x7E69AB,
          transparent: true,
          opacity: 0.8,
          emissive: node.type === 'core' ? 0x9b87f5 : 0x6E59A5,
          emissiveIntensity: 0.5,
        });
        
        const nodeMesh = new THREE.Mesh(nodeGeometry, nodeMaterial);
        nodeMesh.position.copy(node.position as THREE.Vector3);
        nodeMesh.userData = { id: node.id, type: node.type, name: node.name };
        scene.add(nodeMesh);
        nodesRef.current[node.id] = nodeMesh;
        
        // Add glow effect using sprite
        const spriteMaterial = new THREE.SpriteMaterial({
          map: new THREE.TextureLoader().load(
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo2MDk0YzU4OS1lOThjLTQyYTktYTJkOC1mNmFlZmJlN2JjMDMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6ODM1RTg5RkYzMzNFMTFFNzhFNDVFQUMxQjhEREJCMEEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ODM1RTg5RkUzMzNFMTFFNzhFNDVFQUMxQjhEREJCMEEiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDplMzM3M2E1NC0yM2MwLTQ5ZmQtODZkYi0wZDU3MmI2ZjgzOTAiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDpiOGYwNjEzZS0wYTQxLTExN2EtOTVkZC1mZWJjNTM0MjFkOGMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7JhraSAAAEh0lEQVR42rRXa2wUVRT+7szsY3a7dOm223a3UlugLaUtFJACIiYYqkCMifhIFDX4Q2LiD3/AH8bwT4kmakhMjBh+GBI0Jj4SEw3RKA9FtFhKkVJwbSl0u92W7o7dnd3xzOy2Qx9DC3gnk7n33HPuN+c795y5I0gpsYPtLTDTfQqy5GNgYAB6pQm6rsMwcigoGEEkMoyVlQMIh8OorgZ+PBRe9vbcB+1zVxvfOydJPpZXwu4N7wbvkWUpJU+qEjy55AiVV4fH4ikxYhpCGIYhzJRQrphdTfo92fDwaJ5ry3hS2IZ7+HGH/4SiKKe4eMbh9oDB8LluslKvd+/OioL2J2t/MbiSgzoMQ3DZ2AxDtu59wB8cHZ/DAw3+Ej1r7kpnZLnQpVLb2VGMRFIIBgvxSJMfgwMGygo19Pb24tYtgXA4jFZaLy3VUFFRwfNJLN6qQ9+xt2EH4dSfn3R/7JSrSN+93rMnDDvenr5r32AvH14jp7PzD9nVdU2Ojv6TF6urP5HNzRfkxYs/y0RiKadrYWFFjo9Pyng8mTd74NMmz0ZOMqbhkMCH7tXnt780mUwJr9eH06efQXNzDMnkHIaGbvB3NcbHL+LmzQoEg/6819pa2/DMmVZ+XTCwkQ1cp6Q2WHDebYLT9HTl80XQ1fUZent/w8hIHLdu3cHs7BLm5+dx9WoUx44dw+zsX1hcXMKpU+30f5BXDtiFRZaxVxKaoij23X781LtFRYWYmkri88++QE1NDaLRKKampuB2u9HWdphgOIiGhnoIISCEG8eP2zK8m9IVRcHw8HBeqfkt/JZr1b7VZFjgbayZUOjA6dAL9RxlHE6nEw6HA5qmwel0rRnSzTAMA4lEAi5XEYqLPUgmM7h3rJ9xeBYLCwsYHLyOZPK/4lMUfUuWtPffWvdRz+3JrrFYbFsF54hinXOi7eK3YGktPD4aY7Zl4KW+M+/9zTXwtQeZxyxZngckg8FwrxvXbWb47Br8rmXiuunZdJ66xLvew+x2O1d8Xu+HPAqsiP5+1RYLy/E8FrCZlgBvLCbMQljoHxgYfIlFPKEpnF5Cdmt5eTnrXkMw6Ofo05ic5N7ApF/O05aU0+bW1nZUVVUhFovh8OFDaGlpZYz4oarw+TQ0NjRgYmICZ8+ew4kTJ1FXdwgNDfVYXl7B5OQUKisr0NjYiJKSEptFL1t2u2qFnx+wP8yXze78CCw4KmfttSMvqLv9MT5DKahDZ+drqKmptVvQ0tIi9u7dj+rqRxGJDGN6egZDQzeYrBXMzi5Al0VMTExgbm4BTz/dhfLyUqiqirKyUuwvf4B5mN4y+fMZ5YzP+kCRFMXu7/Hl5QwTLWW3YlFk7emGQiGEQg/Zl9Hi4iKz4CDzY4i93o2lpSVEo3dQVKQxBwJ9fd9h3769qK+vWz2Dr+H9o4ffaeIa2lL9g3v2vEGeeDXvx7KOeTw+9PX1IRQK2d4qLvbySsxmszbnFvHkpW586d3d3XZlu8ZOglJxxb9U3rlTetenYS+WGOP2x3y32tpQLIkyhmpbtuXo+Zu9MdTmtO05+S377X8BBgDa+Ei8o4gqJAAAAABJRU5ErkJggg=='
          ),
          transparent: true,
          opacity: 0.6,
        });
        
        const sprite = new THREE.Sprite(spriteMaterial);
        const spriteSize = nodeSize * 2;
        sprite.scale.set(spriteSize, spriteSize, 1);
        sprite.position.copy(node.position as THREE.Vector3);
        scene.add(sprite);
      });
      
      // Create connections between nodes
      nodesWithPositions.forEach(node => {
        node.connections.forEach(targetId => {
          const sourceMesh = nodesRef.current[node.id];
          const targetMesh = nodesRef.current[targetId];
          
          if (sourceMesh && targetMesh) {
            const lineGeometry = new THREE.BufferGeometry().setFromPoints([
              sourceMesh.position,
              targetMesh.position,
            ]);
            
            const lineMaterial = new THREE.LineBasicMaterial({
              color: 0x9b87f5,
              transparent: true,
              opacity: 0.3,
            });
            
            const line = new THREE.Line(lineGeometry, lineMaterial);
            scene.add(line);
            linesRef.current.push(line);
          }
        });
      });
    };
    
    // Create initial nodes
    createNodes();
    
    // Handle window resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Handle mouse movement for hover effects
    const handleMouseMove = (event: MouseEvent) => {
      if (!containerRef.current) return;
      
      // Calculate mouse position in normalized device coordinates
      const rect = containerRef.current.getBoundingClientRect();
      mouseRef.current.x = ((event.clientX - rect.left) / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -((event.clientY - rect.top) / window.innerHeight) * 2 + 1;
    };
    
    // Handle mouse clicks for node selection
    const handleClick = () => {
      if (!cameraRef.current || !raycasterRef.current || !sceneRef.current) return;
      
      raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);
      const intersects = raycasterRef.current.intersectObjects(
        Object.values(nodesRef.current)
      );
      
      if (intersects.length > 0 && onNodeClick) {
        const clickedNodeId = intersects[0].object.userData.id;
        onNodeClick(clickedNodeId);
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
    
    // Animation loop
    let frameId: number;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      
      if (!cameraRef.current || !rendererRef.current || !sceneRef.current) return;
      
      // Check for hovered nodes
      raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);
      const intersects = raycasterRef.current.intersectObjects(
        Object.values(nodesRef.current)
      );
      
      let hoveredNode: string | null = null;
      if (intersects.length > 0) {
        hoveredNode = intersects[0].object.userData.id;
      }
      
      // Update hover state if changed
      if (hoveredNode !== hoveredNodeId) {
        setHoveredNodeId(hoveredNode);
        if (onNodeHover) onNodeHover(hoveredNode);
      }
      
      // Update node appearance based on hover/active state
      Object.entries(nodesRef.current).forEach(([nodeId, nodeMesh]) => {
        const isHovered = nodeId === hoveredNodeId;
        const isActive = nodeId === activeNodeId;
        
        // Scale based on state
        const targetScale = isActive ? 1.3 : isHovered ? 1.15 : 1;
        const currentScale = nodeMesh.scale.x;
        const scaleStep = (targetScale - currentScale) * 0.1;
        nodeMesh.scale.set(
          currentScale + scaleStep,
          currentScale + scaleStep,
          currentScale + scaleStep
        );
        
        // Update material based on state
        const material = nodeMesh.material as THREE.MeshPhongMaterial;
        if (isActive) {
          material.emissiveIntensity = 1.0;
          material.opacity = 1;
        } else if (isHovered) {
          material.emissiveIntensity = 0.8;
          material.opacity = 0.9;
        } else {
          material.emissiveIntensity = 0.5;
          material.opacity = 0.8;
        }
      });
      
      // Gentle camera movement
      if (cameraRef.current) {
        cameraRef.current.position.x = Math.sin(Date.now() * 0.0001) * 0.5;
        cameraRef.current.position.y = Math.cos(Date.now() * 0.0001) * 0.5;
        cameraRef.current.lookAt(new THREE.Vector3(0, 0, 0));
      }
      
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    };
    
    animate();
    
    // Clean up
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
    };
  }, [nodes, onNodeClick, onNodeHover, activeNodeId, hoveredNodeId]);
  
  return <div ref={containerRef} className="graph-canvas" />;
};

export default NeuralGraphRenderer;
