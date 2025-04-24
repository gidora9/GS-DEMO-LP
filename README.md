
# GameScrobbler Finalized Codebase

This package contains two separate apps:

## 1. Homepage / Landing Page (`/homepage`)
- Next.js + TypeScript + TailwindCSS
- The main entry point for new users: clean, minimal, branded
- Features a "Explore Your Neural Graph" CTA button that launches the immersive graph demo in a new tab

## 2. Neural Graph Demo (`/demo`)
- Vite + React + TypeScript + TailwindCSS
- Cinematic, interactive neural graph experience
- Features a persistent "Back to Homepage" button at the top right

## User Flow
1. User lands on the homepage, reads about GameScrobbler, and sees a preview or summary.
2. User clicks "Explore Your Neural Graph" and is taken to the full interactive demo.
3. In the demo, users can return to the homepage at any time using the top-right button.

## How to Run Locally

### Homepage
```bash
cd homepage
npm install
npm run dev
# Usually runs at http://localhost:3000
```

### Demo
```bash
cd demo
npm install
npm run dev
# Usually runs at http://localhost:5173
```

**Tip:** For full integration locally, use the local URLs or adjust the CTA/demo URLs as needed.

## Deployment
- You may deploy each folder as its own Vercel, Netlify, or static host project.
- Adjust the CTA and Back URLs for production as needed.

---

Questions? hello@gamescrobbler.com
