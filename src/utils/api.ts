import axios, { AxiosResponse } from 'axios';
import { QueryRequest, QueryResponse, ErrorResponse } from '../types/chat';

// Base API configuration
// In Docusaurus, we can't use process.env directly in browser environment
// Using window object to access environment variables passed via Docusaurus config
const API_BASE_URL =
  typeof window !== 'undefined' && window.ENV && window.ENV.REACT_APP_API_URL
    ? window.ENV.REACT_APP_API_URL
    : 'http://localhost:8001';

// Create axios instance with default configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add authentication or other headers if needed
apiClient.interceptors.request.use(
  (config) => {
    // Add any request modifications here (e.g., auth tokens)
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle responses globally
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle errors globally if needed
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

/**
 * Send a query to the RAG backend
 * @param request - The query request with context
 * @returns Promise resolving to the query response
 */
export const queryRAGBackend = async (request: QueryRequest): Promise<QueryResponse> => {
  try {
    // Transform the frontend QueryRequest to match backend expectations
    const backendRequest = {
      query: request.query,
      context: request.context ? (typeof request.context === 'string' ? request.context : JSON.stringify(request.context)) : undefined,
      user_id: request.sessionId,
      metadata: {
        currentPageUrl: request.context?.currentPageUrl,
        currentPageTitle: request.context?.currentPageTitle,
        selectedText: request.context?.selectedText
      }
    };

    const response = await apiClient.post('/api/query', backendRequest);

    // Map backend response to frontend QueryResponse format
    const backendResponse = response.data;
    const frontendResponse: QueryResponse = {
      answer: backendResponse.answer,
      sources: backendResponse.sources || [],
      queryId: backendResponse.query_id || `query_${Date.now()}`,
      confidence: backendResponse.confidence,
      timestamp: backendResponse.timestamp
    };

    return frontendResponse;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle specific axios errors
      const errorResponse: ErrorResponse = {
        error: error.code || 'REQUEST_ERROR',
        message: error.message || 'An error occurred while processing the request',
        details: error.response?.data || undefined,
      };
      throw errorResponse;
    } else {
      // Handle generic errors
      const errorResponse: ErrorResponse = {
        error: 'UNKNOWN_ERROR',
        message: 'An unknown error occurred',
      };
      throw errorResponse;
    }
  }
};

/**
 * Check if the backend service is available
 * @returns Promise resolving to true if service is available, false otherwise
 */
export const checkBackendHealth = async (): Promise<boolean> => {
  try {
    const response = await apiClient.get('/health');
    return response.status === 200;
  } catch (error) {
    console.error('Backend health check failed:', error);
    return false;
  }
};

// Export the API client for direct use if needed
export default apiClient;