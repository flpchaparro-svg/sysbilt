<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

**Codebase map:** Routes are defined in `src/App.tsx`; each route loads `pages/` modules that import `components/` and `constants/` as needed. Sanity CMS lives under `studio/` (separate from the Vite app).

View your app in AI Studio: https://ai.studio/apps/drive/1G_ebFCKG9R1SJQyo6BG085NhxKYy_rg0

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
