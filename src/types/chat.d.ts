// Type definitions for chatbot functionality

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'agent';
  timestamp: Date;
  status: 'sent' | 'pending' | 'error';
  sources?: SourceReference[];
}

export interface ChatSession {
  id: string;
  messages: ChatMessage[];
  createdAt: Date;
  lastActiveAt: Date;
  context?: QueryContext;
}

export interface QueryContext {
  selectedText?: string;
  currentPageUrl?: string;
  currentPageTitle?: string;
  additionalContext?: string;
}

export interface SourceReference {
  documentId: string;
  title: string;
  url: string;
  contentSnippet: string;
  similarityScore: number; // 0-1
}

export interface ChatUIState {
  isOpen: boolean;
  isLoading: boolean;
  error?: string;
  currentInput: string;
  selectedText?: string;
  session?: ChatSession;
}

export interface QueryRequest {
  query: string;
  context?: QueryContext;
  sessionId?: string;
}

export interface QueryResponse {
  answer: string;
  sources: SourceReference[];
  queryId: string;
  confidence?: number; // 0-1
  timestamp: string;
}

export interface ErrorResponse {
  error: string;
  message: string;
  details?: Record<string, any>;
}