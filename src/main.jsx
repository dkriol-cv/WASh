import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';

// Note: StrictMode removed for SCORM compatibility
// (StrictMode double-invokes effects in dev which can trigger LMSFinish prematurely)
createRoot(document.getElementById('root')).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
