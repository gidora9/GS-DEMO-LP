"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ComputerIcon as Steam, Gamepad2, Trophy, ArrowRight, ArrowLeft } from "lucide-react"

const steps = [
  {
    id: "welcome",
    title: "Welcome to GameScrobbler 2.6",
    description: "Let's set up your gaming profile and connect your platforms.",
  },
  {
    id: "neural-graph",
    title: "Your Neural Graph",
    description:
      "Discover connections between your games, playstyles, and preferences through our advanced neural visualization.",
  },
  {
    id: "platforms",
    title: "Connect Your Platforms",
    description: "Link your gaming accounts to automatically track your activity.",
  },
  {
    id: "privacy",
    title: "Privacy Settings",
    description: "Control how your data is used and who can see it.",
  },
  {
    id: "complete",
    title: "You're All Set!",
    description: "Your GameScrobbler profile is ready to go.",
  },
]

export function OnboardingFlow() {
  const [currentStep, setCurrentStep] = useState(0)
  const [direction, setDirection] = useState(0)

  const goToNextStep = () => {
    if (currentStep < steps.length - 1) {
      setDirection(1)
      setCurrentStep(currentStep + 1)
    }
  }

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setDirection(-1)
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                    index < currentStep
                      ? "bg-primary text-white"
                      : index === currentStep
                        ? "bg-primary/20 text-primary border-2 border-primary"
                        : "bg-white/10 text-white/50"
                  }`}
                >
                  {index < currentStep ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                <span className={`text-xs hidden md:block ${index === currentStep ? "text-primary" : "text-white/50"}`}>
                  {step.title.split(" ")[0]}
                </span>
              </div>
            ))}
          </div>
          <div className="relative mt-2 h-1 bg-white/10 rounded-full">
            <motion.div
              className="absolute top-0 left-0 h-full bg-primary rounded-full"
              initial={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
              animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Step content */}
        <Card className="bg-black/50 border border-white/10 overflow-hidden">
          <CardContent className="p-0">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={currentStep}
                custom={direction}
                initial={{ opacity: 0, x: direction * 200 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -200 }}
                transition={{ duration: 0.3 }}
                className="p-8"
              >
                {currentStep === 0 && <WelcomeStep />}
                {currentStep === 1 && <NeuralGraphStep />}
                {currentStep === 2 && <PlatformsStep />}
                {currentStep === 3 && <PrivacyStep />}
                {currentStep === 4 && <CompleteStep />}
              </motion.div>
            </AnimatePresence>
          </CardContent>
        </Card>

        {/* Navigation buttons */}
        <div className="flex justify-between mt-8">
          <Button variant="outline" onClick={goToPreviousStep} disabled={currentStep === 0}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <Button onClick={goToNextStep} disabled={currentStep === steps.length - 1}>
            {currentStep === steps.length - 2 ? "Finish" : "Next"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

function WelcomeStep() {
  return (
    <div className="text-center">
      <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center mx-auto mb-6">
        <span className="text-white font-bold text-2xl">GS</span>
      </div>

      <h2 className="text-2xl font-bold mb-4">{steps[0].title}</h2>
      <p className="text-white/70 mb-8">{steps[0].description}</p>

      <div className="max-w-md mx-auto">
        <p className="text-white/70 mb-4">GameScrobbler helps you:</p>

        <ul className="space-y-3 text-left">
          <li className="flex items-center">
            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <span>Visualize your gaming preferences and patterns</span>
          </li>
          <li className="flex items-center">
            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <span>Track your gaming activity across all platforms</span>
          </li>
          <li className="flex items-center">
            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <span>Discover new games based on your unique DNA</span>
          </li>
          <li className="flex items-center">
            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <span>Own and control your gaming data</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

function NeuralGraphStep() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{steps[1].title}</h2>
      <p className="text-white/70 mb-6">{steps[1].description}</p>

      <div className="bg-black/30 border border-white/10 rounded-lg p-6 mb-6">
        <div className="aspect-video relative overflow-hidden rounded-lg">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-black flex items-center justify-center">
            <div className="text-center">
              <p className="text-white/50 mb-2">Neural Graph Visualization</p>
              <p className="text-xs text-white/30">Connect your platforms to see your personalized neural graph</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="bg-black/30 border border-white/10 rounded-lg p-4">
            <h3 className="font-bold mb-2">Discover Patterns</h3>
            <p className="text-sm text-white/70">
              See connections between games you play and identify your preferences.
            </p>
          </div>

          <div className="bg-black/30 border border-white/10 rounded-lg p-4">
            <h3 className="font-bold mb-2">Track Progress</h3>
            <p className="text-sm text-white/70">Visualize your gaming journey and achievements over time.</p>
          </div>

          <div className="bg-black/30 border border-white/10 rounded-lg p-4">
            <h3 className="font-bold mb-2">Get Insights</h3>
            <p className="text-sm text-white/70">Receive personalized recommendations based on your neural graph.</p>
          </div>
        </div>

        <p className="text-white/50 text-sm">
          Your neural graph will become more accurate as you play more games and connect more platforms.
        </p>
      </div>
    </div>
  )
}

function PlatformsStep() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{steps[2].title}</h2>
      <p className="text-white/70 mb-6">{steps[2].description}</p>

      <div className="space-y-4 mb-6">
        <div className="bg-black/30 border border-white/10 rounded-lg p-4 flex items-center">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-4">
            <Steam className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold">Steam</h3>
            <p className="text-sm text-white/70">Connect your Steam account to track PC games</p>
          </div>
          <Button>Connect</Button>
        </div>

        <div className="bg-black/30 border border-white/10 rounded-lg p-4 flex items-center">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-4">
            <Gamepad2 className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold">PlayStation Network</h3>
            <p className="text-sm text-white/70">Connect your PSN account to track PlayStation games</p>
          </div>
          <Button>Connect</Button>
        </div>

        <div className="bg-black/30 border border-white/10 rounded-lg p-4 flex items-center">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-4">
            <Trophy className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold">Xbox</h3>
            <p className="text-sm text-white/70">Connect your Xbox account to track Xbox games</p>
          </div>
          <Button>Connect</Button>
        </div>
      </div>

      <p className="text-white/50 text-sm">
        You can skip this step and connect your platforms later from your dashboard.
      </p>
    </div>
  )
}

function PrivacyStep() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{steps[3].title}</h2>
      <p className="text-white/70 mb-6">{steps[3].description}</p>

      <div className="space-y-4 mb-6">
        <div className="bg-black/30 border border-white/10 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold">Public Profile</h3>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-white/70">Off</span>
              <div className="w-8 h-4 bg-primary/20 rounded-full relative">
                <div className="absolute left-0 top-0 w-4 h-4 bg-white rounded-full"></div>
              </div>
              <span className="text-xs text-white/70">On</span>
            </div>
          </div>
          <p className="text-sm text-white/70">Allow others to view your gaming profile and neural graph</p>
        </div>

        <div className="bg-black/30 border border-white/10 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold">Share Game Activity</h3>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-white/70">Off</span>
              <div className="w-8 h-4 bg-primary rounded-full relative">
                <div className="absolute right-0 top-0 w-4 h-4 bg-white rounded-full"></div>
              </div>
              <span className="text-xs text-white/70">On</span>
            </div>
          </div>
          <p className="text-sm text-white/70">Show games you're currently playing to others</p>
        </div>

        <div className="bg-black/30 border border-white/10 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold">Data Analytics</h3>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-white/70">Off</span>
              <div className="w-8 h-4 bg-primary rounded-full relative">
                <div className="absolute right-0 top-0 w-4 h-4 bg-white rounded-full"></div>
              </div>
              <span className="text-xs text-white/70">On</span>
            </div>
          </div>
          <p className="text-sm text-white/70">Allow anonymous usage data to improve GameScrobbler</p>
        </div>
      </div>

      <p className="text-white/50 text-sm">You can change these settings at any time from your dashboard.</p>
    </div>
  )
}

function CompleteStep() {
  return (
    <div className="text-center">
      <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>

      <h2 className="text-2xl font-bold mb-4">{steps[4].title}</h2>
      <p className="text-white/70 mb-8">{steps[4].description}</p>

      <div className="max-w-md mx-auto mb-8">
        <p className="text-white/70 mb-4">What's next:</p>

        <ul className="space-y-3 text-left">
          <li className="flex items-center">
            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <span>Explore your dashboard and neural graph</span>
          </li>
          <li className="flex items-center">
            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <span>Connect additional gaming platforms</span>
          </li>
          <li className="flex items-center">
            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <span>Customize your privacy settings</span>
          </li>
        </ul>
      </div>

      <Button size="lg" className="px-8">
        Go to Dashboard
      </Button>
    </div>
  )
}
