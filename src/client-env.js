// Client-side environment variables for Docusaurus
// This file is loaded early to make environment variables available globally

// Check if window object is available (browser environment)
if (typeof window !== 'undefined') {
  // Initialize ENV object if it doesn't exist
  window.ENV = window.ENV || {};

  // Set default environment variables
  // These can be overridden by setting them before this script loads
  // For now, using a hardcoded default value since process.env won't be available in browser
  window.ENV.REACT_APP_API_URL = window.ENV.REACT_APP_API_URL || 'http://localhost:8001';
}

// Export nothing - this module is used for side effects only