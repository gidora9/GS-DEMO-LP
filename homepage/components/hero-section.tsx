"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Neural Animation */}
      <div className="absolute inset-0 z-0 opacity-30">
        <NeuralBackground />
      </div>

      {/* Hero Content */}
      <div className="container mx-auto px-4 z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="hero-emblem w-24 h-24 mx-auto mb-8 rounded-full bg-primary flex items-center justify-center"
        >
          <span className="text-white font-bold text-2xl">GS</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-4xl md:text-6xl font-bold mb-4"
        >
          GameScrobbler 2.6
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto mb-8"
        >
          Visualize your gaming DNA. Own your data. Connect your platforms.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button className="px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-colors">
            Get Started
          </button>
          <button className="px-6 py-3 bg-transparent border border-white/20 hover:border-white/40 text-white rounded-lg font-medium transition-colors">
            Explore Demo
          </button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <motion.div
            animate={{
              y: [0, 12, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
            }}
            className="w-1.5 h-1.5 bg-white rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  )
}

function NeuralBackground() {
  useEffect(() => {
    // This would be replaced with a more sophisticated Three.js implementation
    const container = document.getElementById("neural-background")
    if (!container) return

    const width = container.clientWidth
    const height = container.clientHeight

    // Create nodes
    const nodeCount = 20
    for (let i = 0; i < nodeCount; i++) {
      createNode(container, width, height)
    }

    // Create connections
    const nodes = container.querySelectorAll(".neural-node")
    nodes.forEach((node, i) => {
      // Connect to 2-3 random nodes
      const connectionCount = 2 + Math.floor(Math.random() * 2)
      for (let j = 0; j < connectionCount; j++) {
        const targetIndex = Math.floor(Math.random() * nodeCount)
        if (targetIndex !== i) {
          createConnection(container, node, nodes[targetIndex])
        }
      }
    })

    // Animate nodes
    nodes.forEach((node) => {
      animateNode(node as HTMLElement, width, height)
    })
  }, [])

  function createNode(container: HTMLElement, width: number, height: number) {
    const node = document.createElement("div")
    node.className = "neural-node"

    // Random size between 4-12px
    const size = 4 + Math.random() * 8
    node.style.width = `${size}px`
    node.style.height = `${size}px`

    // Random position
    node.style.left = `${Math.random() * width}px`
    node.style.top = `${Math.random() * height}px`

    container.appendChild(node)
    return node
  }

  function createConnection(container: HTMLElement, nodeA: Element, nodeB: Element) {
    const rectA = nodeA.getBoundingClientRect()
    const rectB = nodeB.getBoundingClientRect()

    const containerRect = container.getBoundingClientRect()

    const x1 = rectA.left + rectA.width / 2 - containerRect.left
    const y1 = rectA.top + rectA.height / 2 - containerRect.top
    const x2 = rectB.left + rectB.width / 2 - containerRect.left
    const y2 = rectB.top + rectB.height / 2 - containerRect.top

    const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
    const angle = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI

    const connection = document.createElement("div")
    connection.className = "neural-connection"
    connection.style.width = `${length}px`
    connection.style.left = `${x1}px`
    connection.style.top = `${y1}px`
    connection.style.transform = `rotate(${angle}deg)`

    container.appendChild(connection)
  }

  function animateNode(node: HTMLElement, width: number, height: number) {
    const duration = 20 + Math.random() * 40
    const targetX = Math.random() * width
    const targetY = Math.random() * height

    const currentX = Number.parseFloat(node.style.left)
    const currentY = Number.parseFloat(node.style.top)

    const animation = node.animate(
      [
        { left: `${currentX}px`, top: `${currentY}px` },
        { left: `${targetX}px`, top: `${targetY}px` },
      ],
      {
        duration: duration * 1000,
        easing: "ease-in-out",
        fill: "forwards",
      },
    )

    animation.onfinish = () => {
      node.style.left = `${targetX}px`
      node.style.top = `${targetY}px`
      animateNode(node, width, height)
    }
  }

  return <div id="neural-background" className="w-full h-full neural-graph"></div>
}
