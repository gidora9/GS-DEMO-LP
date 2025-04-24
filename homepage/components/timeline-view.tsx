"use client"

import { useState } from "react"
import { motion } from "framer-motion"

// Mock timeline data
const timelineData = [
  {
    id: 1,
    date: "April 15, 2023",
    title: "Completed Elden Ring",
    description: "Defeated the final boss after 120 hours of gameplay.",
    platform: "PlayStation 5",
    icon: "ER",
  },
  {
    id: 2,
    date: "March 3, 2023",
    title: "Reached Global Elite in CS2",
    description: "After 300 hours, finally reached the highest competitive rank.",
    platform: "PC",
    icon: "CS",
  },
  {
    id: 3,
    date: "February 20, 2023",
    title: "Started The Witcher 3",
    description: "Began a new journey in the Northern Kingdoms.",
    platform: "PC",
    icon: "W3",
  },
  {
    id: 4,
    date: "January 5, 2023",
    title: "Platinum Trophy in God of War Ragnarök",
    description: "Collected all trophies and completed all side quests.",
    platform: "PlayStation 5",
    icon: "GoW",
  },
  {
    id: 5,
    date: "December 10, 2022",
    title: "Reached 100 hours in Cyberpunk 2077",
    description: "Explored Night City extensively after the 2.0 update.",
    platform: "PC",
    icon: "CP",
  },
]

export function TimelineView() {
  const [expandedItem, setExpandedItem] = useState<number | null>(null)

  return (
    <div className="space-y-6 py-4">
      {timelineData.map((item) => (
        <motion.div
          key={item.id}
          className="timeline-item pl-8 relative"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: item.id * 0.1 }}
        >
          <div className="cursor-pointer" onClick={() => setExpandedItem(expandedItem === item.id ? null : item.id)}>
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                <span className="text-primary text-xs font-bold">{item.icon}</span>
              </div>
              <div>
                <h3 className="font-bold">{item.title}</h3>
                <p className="text-sm text-white/60">{item.date}</p>
              </div>
            </div>

            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: expandedItem === item.id ? "auto" : 0,
                opacity: expandedItem === item.id ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="bg-white/5 rounded-lg p-4 mt-2">
                <p className="text-white/80 mb-2">{item.description}</p>
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Platform: {item.platform}</span>
                  <button className="text-primary hover:text-primary/80 transition-colors">View Details</button>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      ))}

      <div className="flex justify-center mt-8">
        <button className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white/80 rounded-lg font-medium transition-colors">
          Load More History
        </button>
      </div>
    </div>
  )
}
