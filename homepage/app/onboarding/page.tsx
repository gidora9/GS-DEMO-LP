import { Header } from "@/components/header"
import { OnboardingFlow } from "@/components/onboarding-flow"

export default function OnboardingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16">
        <OnboardingFlow />
      </main>
    </div>
  )
}
