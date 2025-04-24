
import React from "react";

const features = [
  {
    title: "Explore Your DNA",
    description:
      "Visualize your unique gaming profile and discover your core playstyles, favorite genres, and lifetime milestones.",
    button: (
      <>
        <button
          className="mt-6 px-6 py-3 bg-primary text-white rounded-xl font-bold shadow-lg transition hover:scale-105"
          onClick={() => window.open('/demo/index.html', '_blank')}
        >
          Explore Your Neural Graph
        </button>
        <span className="block text-xs text-muted mt-2">
          Experience your entire gaming profile in an immersive neural graph demo.
        </span>
      </>
    ),
  },
  {
    title: "Connect Platforms",
    description:
      "Seamlessly integrate your Steam, Xbox, and PlayStation accounts to unlock a unified data layer.",
    button: (
      <button className="mt-6 px-6 py-3 bg-muted text-primary rounded-xl font-bold shadow transition hover:scale-105">
        Coming Soon
      </button>
    ),
  },
  {
    title: "Read Manifesto",
    description:
      "Discover our mission to give gamers true data ownership, interoperability, and meaningful insights.",
    button: (
      <button className="mt-6 px-6 py-3 bg-muted text-primary rounded-xl font-bold shadow transition hover:scale-105">
        Manifesto
      </button>
    ),
  },
];

export default function CTASection() {
  return (
    <section className="w-full max-w-4xl mx-auto grid gap-6 md:grid-cols-3 mt-16 mb-32 px-2">
      {features.map((feature, i) => (
        <div
          key={i}
          className="flex flex-col items-start justify-between bg-card/80 p-8 rounded-2xl shadow-xl h-full"
        >
          <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
          <p className="flex-1 text-muted mb-8">{feature.description}</p>
          {feature.button}
        </div>
      ))}
    </section>
  );
}
