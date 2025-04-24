"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for the neural graph
const mockGameData = [
  { id: 1, name: "Elden Ring", hours: 120, category: "RPG", connections: [2, 5, 7] },
  { id: 2, name: "Dark Souls III", hours: 85, category: "RPG", connections: [1, 3, 4] },
  { id: 3, name: "Bloodborne", hours: 65, category: "RPG", connections: [2, 4] },
  { id: 4, name: "Sekiro", hours: 50, category: "Action", connections: [2, 3] },
  { id: 5, name: "The Witcher 3", hours: 200, category: "RPG", connections: [1, 6] },
  { id: 6, name: "Cyberpunk 2077", hours: 90, category: "RPG", connections: [5] },
  { id: 7, name: "Starfield", hours: 110, category: "RPG", connections: [1, 8] },
  { id: 8, name: "No Man's Sky", hours: 75, category: "Exploration", connections: [7] },
  { id: 9, name: "Counter-Strike 2", hours: 300, category: "FPS", connections: [10, 11] },
  { id: 10, name: "Valorant", hours: 150, category: "FPS", connections: [9, 11] },
  { id: 11, name: "Apex Legends", hours: 200, category: "FPS", connections: [9, 10] },
]

export function NeuralGraphDemo() {
  const [activeNode, setActiveNode] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Your Gaming Neural Graph</h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Discover connections between your games, playstyles, and preferences through our advanced neural
            visualization.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Neural Graph Visualization */}
          <div className="lg:col-span-2">
            <Card className="bg-black/50 border border-white/10 overflow-hidden h-[500px]">
              <CardContent className="p-0 h-full">
                <div className="relative w-full h-full">
                  <NeuralGraphVisualization data={mockGameData} activeNode={activeNode} setActiveNode={setActiveNode} />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Game Details Panel */}
          <div>
            <Card className="bg-black/50 border border-white/10 h-[500px] overflow-hidden">
              <CardContent className="p-6 h-full flex flex-col">
                <h3 className="text-xl font-bold mb-4">Game Insights</h3>

                {activeNode ? (
                  <GameDetails game={mockGameData.find((g) => g.id === activeNode)!} allGames={mockGameData} />
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-center text-white/60">
                    <p className="mb-4">Select a game node to view detailed insights</p>
                    <p className="text-sm">
                      Discover connections between games, playtime patterns, and genre preferences
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-white/70 mb-6">
            This is just a demo. Sign up to see your personalized gaming neural graph.
          </p>
          <button className="px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-colors">
            Create Your Neural Graph
          </button>
        </motion.div>
      </div>
    </section>
  )
}

function NeuralGraphVisualization({
  data,
  activeNode,
  setActiveNode,
}: {
  data: typeof mockGameData
  activeNode: number | null
  setActiveNode: (id: number | null) => void
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [nodes, setNodes] = useState<{ [key: number]: { x: number; y: number; radius: number } }>({})

  useEffect(() => {
    if (!containerRef.current) return

    const width = containerRef.current.clientWidth
    const height = containerRef.current.clientHeight

    // Position nodes using a simple force-directed layout simulation
    const newNodes: { [key: number]: { x: number; y: number; radius: number } } = {}

    data.forEach((game) => {
      // Calculate node size based on hours played
      const radius = 10 + game.hours / 50

      // Initial random position
      newNodes[game.id] = {
        x: 100 + Math.random() * (width - 200),
        y: 100 + Math.random() * (height - 200),
        radius,
      }
    })

    // Run a simple force-directed layout algorithm
    for (let i = 0; i < 100; i++) {
      // Repulsive forces between all nodes
      for (const id1 in newNodes) {
        for (const id2 in newNodes) {
          if (id1 === id2) continue

          const node1 = newNodes[Number.parseInt(id1)]
          const node2 = newNodes[Number.parseInt(id2)]

          const dx = node2.x - node1.x
          const dy = node2.y - node1.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            const repulsiveForce = 1 / (distance + 1)
            const angle = Math.atan2(dy, dx)

            newNodes[Number.parseInt(id2)].x += Math.cos(angle) * repulsiveForce * 5
            newNodes[Number.parseInt(id2)].y += Math.sin(angle) * repulsiveForce * 5
            newNodes[Number.parseInt(id1)].x -= Math.cos(angle) * repulsiveForce * 5
            newNodes[Number.parseInt(id1)].y -= Math.sin(angle) * repulsiveForce * 5
          }
        }
      }

      // Attractive forces between connected nodes
      data.forEach((game) => {
        game.connections.forEach((connectedId) => {
          const node1 = newNodes[game.id]
          const node2 = newNodes[connectedId]

          const dx = node2.x - node1.x
          const dy = node2.y - node1.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance > 150) {
            const attractiveForce = (distance - 150) / 1000
            const angle = Math.atan2(dy, dx)

            newNodes[game.id].x += Math.cos(angle) * attractiveForce * 5
            newNodes[game.id].y += Math.sin(angle) * attractiveForce * 5
            newNodes[connectedId].x -= Math.cos(angle) * attractiveForce * 5
            newNodes[connectedId].y -= Math.sin(angle) * attractiveForce * 5
          }
        })
      })

      // Keep nodes within bounds
      for (const id in newNodes) {
        const node = newNodes[Number.parseInt(id)]
        const r = node.radius

        newNodes[Number.parseInt(id)].x = Math.max(r, Math.min(width - r, node.x))
        newNodes[Number.parseInt(id)].y = Math.max(r, Math.min(height - r, node.y))
      }
    }

    setNodes(newNodes)
  }, [data])

  return (
    <div ref={containerRef} className="w-full h-full bg-black relative">
      {/* Connections */}
      <svg className="absolute inset-0 w-full h-full">
        {data.map((game) =>
          game.connections.map((connectedId) => {
            if (!nodes[game.id] || !nodes[connectedId]) return null

            const isActive = activeNode === game.id || activeNode === connectedId

            return (
              <line
                key={`${game.id}-${connectedId}`}
                x1={nodes[game.id].x}
                y1={nodes[game.id].y}
                x2={nodes[connectedId].x}
                y2={nodes[connectedId].y}
                stroke={isActive ? "#954ce9" : "#954ce950"}
                strokeWidth={isActive ? 2 : 1}
                strokeOpacity={isActive ? 0.8 : 0.3}
              />
            )
          }),
        )}
      </svg>

      {/* Nodes */}
      {data.map((game) => {
        if (!nodes[game.id]) return null

        const { x, y, radius } = nodes[game.id]
        const isActive = activeNode === game.id

        return (
          <motion.div
            key={game.id}
            className="absolute rounded-full cursor-pointer flex items-center justify-center"
            style={{
              left: x,
              top: y,
              width: radius * 2,
              height: radius * 2,
              transform: "translate(-50%, -50%)",
              backgroundColor: isActive ? "#954ce9" : "#954ce980",
              boxShadow: isActive ? "0 0 15px #954ce9" : "0 0 5px #954ce950",
              zIndex: isActive ? 10 : 1,
            }}
            animate={{
              scale: isActive ? 1.2 : 1,
            }}
            onClick={() => setActiveNode(game.id)}
            whileHover={{ scale: 1.1 }}
          >
            {radius > 15 && <span className="text-xs font-bold text-white">{game.id}</span>}
          </motion.div>
        )
      })}

      {/* Tooltips */}
      {activeNode && nodes[activeNode] && (
        <div
          className="absolute bg-black/80 border border-primary/50 rounded-md p-2 text-xs pointer-events-none"
          style={{
            left: nodes[activeNode].x + nodes[activeNode].radius + 10,
            top: nodes[activeNode].y,
            transform: "translateY(-50%)",
            zIndex: 20,
          }}
        >
          {data.find((g) => g.id === activeNode)?.name}
        </div>
      )}
    </div>
  )
}

function GameDetails({ game, allGames }: { game: (typeof mockGameData)[0]; allGames: typeof mockGameData }) {
  return (
    <div className="flex-1 flex flex-col">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        key={game.id}
        className="mb-4"
      >
        <h3 className="text-2xl font-bold text-primary mb-1">{game.name}</h3>
        <p className="text-white/70 mb-4">Category: {game.category}</p>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white/5 rounded-lg p-3">
            <p className="text-xs text-white/50 mb-1">Hours Played</p>
            <p className="text-xl font-bold">{game.hours}</p>
          </div>
          <div className="bg-white/5 rounded-lg p-3">
            <p className="text-xs text-white/50 mb-1">Connections</p>
            <p className="text-xl font-bold">{game.connections.length}</p>
          </div>
        </div>
      </motion.div>

      <div className="flex-1 overflow-auto">
        <h4 className="text-sm font-medium mb-2 text-white/70">Connected Games</h4>
        <div className="space-y-2">
          {game.connections.map((connId) => {
            const connectedGame = allGames.find((g) => g.id === connId)
            if (!connectedGame) return null

            return (
              <div key={connId} className="bg-white/5 rounded-lg p-3 flex justify-between items-center">
                <div>
                  <p className="font-medium">{connectedGame.name}</p>
                  <p className="text-xs text-white/50">{connectedGame.category}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm">{connectedGame.hours} hrs</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <Tabs defaultValue="insights" className="mt-4">
        <TabsList className="w-full">
          <TabsTrigger value="insights" className="flex-1">
            Insights
          </TabsTrigger>
          <TabsTrigger value="stats" className="flex-1">
            Stats
          </TabsTrigger>
        </TabsList>
        <TabsContent value="insights" className="mt-2">
          <p className="text-sm text-white/70">
            Your playstyle in {game.name} shows a preference for
            {game.category === "RPG"
              ? " exploration and character development"
              : game.category === "FPS"
                ? " competitive team-based gameplay"
                : " immersive world interaction"}
            .
          </p>
        </TabsContent>
        <TabsContent value="stats" className="mt-2">
          <div className="text-sm space-y-2">
            <div className="flex justify-between">
              <span className="text-white/70">Last played:</span>
              <span>3 days ago</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/70">Achievements:</span>
              <span>24/42</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/70">Friends playing:</span>
              <span>5</span>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
