import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function ManifestoPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        <section className="py-20 bg-gradient-to-b from-black to-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">The GameScrobbler Manifesto</h1>
              <p className="text-xl text-white/80 mb-12 text-center">
                Our vision for the future of gaming data ownership and interoperability.
              </p>

              <div className="prose prose-invert max-w-none">
                <h2>Data Ownership</h2>
                <p>
                  We believe that your gaming data belongs to you. Not to platforms, not to publishers, and not to us.
                  GameScrobbler exists to empower gamers with ownership and control over their gaming history,
                  preferences, and achievements across all platforms.
                </p>
                <p>
                  In an era where data has become the new currency, we stand firm in our commitment to privacy,
                  transparency, and user control. Your gaming DNA is yours to explore, share, or keep private as you see
                  fit.
                </p>

                <h2>Interoperability</h2>
                <p>
                  The fragmentation of gaming platforms has created silos of player data, preventing gamers from seeing
                  the complete picture of their gaming journey. GameScrobbler breaks down these walls, creating a
                  unified view of your gaming experience regardless of where you play.
                </p>
                <p>
                  We believe in a future where your achievements, playtime, and preferences move seamlessly with you
                  across platforms, creating a continuous and enriched gaming experience.
                </p>

                <h2>Insight</h2>
                <p>
                  Data without insight is just noise. GameScrobbler's Neural Graph technology transforms raw gaming data
                  into meaningful patterns, connections, and discoveries about your unique gaming personality.
                </p>
                <p>
                  We're committed to developing ever more sophisticated tools for understanding your gaming DNA, helping
                  you discover new games, connect with like-minded players, and gain deeper appreciation for your gaming
                  journey.
                </p>

                <h2>Community</h2>
                <p>
                  Gaming is inherently social, and we believe that sharing insights about gaming habits can strengthen
                  communities. GameScrobbler facilitates meaningful connections between players based on genuine
                  compatibility rather than arbitrary matchmaking.
                </p>
                <p>
                  We envision a community where players can share their gaming DNA, discover others with complementary
                  styles, and forge lasting connections through their shared passion for games.
                </p>

                <h2>Our Commitment</h2>
                <p>As we build GameScrobbler, we commit to these principles:</p>
                <ul>
                  <li>We will never sell your personal data to third parties</li>
                  <li>We will always provide clear controls over your privacy and data sharing</li>
                  <li>We will continuously innovate to provide deeper insights and better interoperability</li>
                  <li>We will remain platform-agnostic, working to integrate with all gaming ecosystems</li>
                  <li>We will build in public, sharing our progress and listening to our community</li>
                </ul>

                <p>
                  Join us in building a future where gamers have ownership, insight, and freedom in their digital gaming
                  lives.
                </p>

                <div className="text-center mt-12">
                  <p className="italic text-white/60">"Play is the highest form of research." — Albert Einstein</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
