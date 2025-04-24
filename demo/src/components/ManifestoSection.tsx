
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const ManifestoSection = () => {
  const manifestoPoints = [
    {
      title: "Data Ownership",
      description: "Your gaming history belongs to you. Full stop. GameScrobbler ensures you maintain complete ownership and control over your data."
    },
    {
      title: "Platform Interoperability",
      description: "No walled gardens. We connect across platforms to give you a unified view of your gaming identity regardless of where you play."
    },
    {
      title: "Privacy by Design",
      description: "Fine-grained privacy controls are built into the core of our system, allowing you to decide what you share and with whom."
    },
    {
      title: "Meaningful Insights",
      description: "We transform raw gaming data into an interactive neural graph visualization that reveals patterns and insights about your unique gaming identity."
    }
  ];

  return (
    <div id="manifesto" className="min-h-screen py-16 px-4 flex flex-col items-center justify-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-2 text-gs-primary">Our Manifesto</h2>
      <p className="text-lg text-gs-light-purple mb-12 max-w-lg text-center">
        GameScrobbler is built on core principles that put you at the center of your gaming identity.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
        {manifestoPoints.map((point, index) => (
          <Card key={index} className="bg-gs-charcoal border-gs-dark hover:border-gs-primary transition-all glassmorphism">
            <CardHeader>
              <CardTitle className="text-xl text-gs-primary">{point.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gs-light-purple">{point.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ManifestoSection;
