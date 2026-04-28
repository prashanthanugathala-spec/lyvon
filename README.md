# LYVON

Premium printed t-shirt brand site. React + Vite, frontend-only.

## Local development

```bash
npm install
npm run dev
```

## Deploy to Vercel

### Option A — Push to GitHub, then import in Vercel (recommended)

1. Create a new empty repository at https://github.com/new (e.g. `lyvon`).
2. From this folder:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<your-username>/lyvon.git
   git push -u origin main
   ```
3. Go to https://vercel.com/new, select the repo, click **Deploy**.
   - Framework: **Vite** (auto-detected)
   - Build command: `npm run build`
   - Output directory: `dist`
   - No environment variables needed.

### Option B — Vercel CLI (no GitHub)

```bash
npm i -g vercel
vercel
```
Follow the prompts. Vercel will build and deploy directly.

## What's inside

- React 19 + Vite 7
- Tailwind v4
- wouter (client-side routing)
- framer-motion, sonner, radix-ui
- WhatsApp ordering to +91 99490 45894
- Instagram link: https://www.instagram.com/lyvon.fashions/
