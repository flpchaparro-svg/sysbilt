/**
 * Entry point for the React application
 * 
 * CRITICAL: The CSS import below is essential for Tailwind to work.
 * Make sure './index.css' is imported BEFORE anything else.
 */

import './index.css';  // <-- THIS LINE IS CRITICAL
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { RouteContentProvider } from './site/RouteContentProvider';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const app = (
  <React.StrictMode>
    <BrowserRouter>
      <RouteContentProvider data={null}>
        <App />
      </RouteContentProvider>
    </BrowserRouter>
  </React.StrictMode>
);

/** `render-routes.mjs` stamps `data-ssr="1"` on `#root` for `required-body` routes. */
const wasServerRendered = rootElement.getAttribute('data-ssr') === '1';

if (wasServerRendered) {
  ReactDOM.hydrateRoot(rootElement, app, {
    onRecoverableError: (error, errorInfo) => {
      // Hydration mismatches on a required-body route silently degrade SEO;
      // log loudly so they surface in the browser console and RUM tooling.
      console.error('[hydrate] recoverable hydration error', error, errorInfo);
    },
  });
} else {
  const root = ReactDOM.createRoot(rootElement);
  root.render(app);
}
