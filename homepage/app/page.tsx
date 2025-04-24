import { HeroSection } from "@/components/hero-section"
import { NeuralGraphDemo } from "@/components/neural-graph-demo"
import { CTASection } from "@/components/cta-section"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <NeuralGraphDemo />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
