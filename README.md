# Muhammad Saad Amin

A sleek, corporate-dark React portfolio. Inspired by Stripe, Vercel, and Linear.

## Quick Start

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build → /dist
npm run preview    # preview production build
```

## Project Structure

```
src/
├── components/
│   ├── Navbar/         Navbar.jsx + Navbar.css
│   ├── Hero/           Hero.jsx + Hero.css
│   ├── About/          About.jsx
│   ├── Experience/     Experience.jsx
│   ├── Projects/       Projects.jsx   ← featured grid + filter
│   ├── Skills/         Skills.jsx
│   ├── Certificates/   Certificates.jsx
│   ├── Contact/        Contact.jsx
│   └── Footer/         Footer.jsx
├── data/
│   └── portfolioData.js   ← edit all content here
├── hooks/
│   └── useAnimations.js   ← useInView, useTypewriter, useScrollProgress
├── styles/
│   ├── global.css         ← design tokens, reset, animations
│   └── sections.css       ← all section styles
├── App.jsx
└── main.jsx
```

## Customizing Content

All content lives in `src/data/portfolioData.js`.  
Edit the exported objects — the UI updates automatically.

## Deploying

### Vercel (recommended)
```bash
npm i -g vercel && vercel
```

### Netlify
```bash
npm run build
# drag /dist folder onto Netlify dashboard
```

## Design Tokens

Edit `src/styles/global.css` `:root` block:

```css
--bg-0: #0a0a0a;        /* page background   */
--bg-1: #111111;        /* cards             */
--text-0: #fafafa;      /* primary text      */
--accent-blue: #3b82f6; /* accent color      */
```
