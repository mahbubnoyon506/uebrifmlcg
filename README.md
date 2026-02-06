---
# 🎬 MovieDiscovery

A high-performance, cinematic movie exploration app built with **Next.js 15**, **TMDB API**, and **Tailwind CSS v4**.

**🔗 Live Demo:** [https://uebrifmlcg.vercel.app/](https://uebrifmlcg.vercel.app/)
---

## 🚀 Getting Started

### 1. Prerequisites

- Node.js 18.x or later
- A TMDB API Key ([Get one here](https://developer.themoviedb.org/docs/getting-started))

### 2. Installation

```bash
# Clone the repository
git clone https://github.com/mahbubnoyon506/uebrifmlcg.git

# Install dependencies
npm install

# Set up Environment Variables
# Create a .env.local file and add:
NEXT_PUBLIC_TMDB_API_KEY=your_api_key_here
NEXT_PUBLIC_TMDB_BASE_URL=https://api.themoviedb.org/3

```

### 3. Run Development

```bash
npm run dev

```

---

## ✨ Key Features

- **Cinematic Hero Section:** Dynamic billboard featuring daily trending movies.
- **Deep Search:** Real-time search with URL sync (shareable search results).
- **Genre Navigation:** Filterable movie lists categorized by genre.
- **Personalization:** "Watch Later" list and "Recently Viewed" history (Local Storage).
- **Adaptive Theming:** Full Light/Dark mode support using **shadcn/ui** and **OKLCH** color space.
- **Responsive Design:** Fully optimized for mobile, tablet, and desktop.

---

## 🛠️ Tech Stack & Architecture

- **Framework:** Next.js 15 (App Router)
- **State & Data:** TanStack Query (React Query) for caching and fetching.
- **Styling:** Tailwind CSS v4 & shadcn/ui.
- **Icons:** Lucide React.
- **Types:** Strict TypeScript interfaces for API responses and movie details.

---

## 🛡️ Edge Cases & Optimization

- **SEO & Metadata:** Implemented `generateMetadata` for dynamic movie and genre pages to ensure unique titles and OpenGraph images for social sharing.
- **Race Conditions:** Used `useSearchParams` within **Suspense Boundaries** to handle CSR bailout and ensure smooth navigation.
- **Performance:** \* Implemented **Skeleton Screens** for Hero, Movie Cards, and Cast lists to reduce perceived latency.
- Optimized images using `next/image` with `remotePatterns` for security.

- **Error Handling:** Handled 404s for invalid movie IDs and implemented empty states for search results.
- **Type Safety:** Fixed structural typing issues between basic `Movie` objects and detailed `MovieDetails` to handle optional properties like `tagline`.

---
