import React, { useState, useEffect, useRef } from 'react';
import { FiX, FiMessageSquare, FiMinimize2, FiMaximize2 } from 'react-icons/fi';
import { ChatMessage as ChatMessageType, ChatUIState, QueryRequest, QueryResponse, ErrorResponse } from '../../types/chat';
import { queryRAGBackend, checkBackendHealth } from '../../utils/api';
import { getSelectedTextWithContext } from '../../utils/textSelection';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import './Chatbot.css';

interface ChatbotProps {
  initialOpen?: boolean;
}

const Chatbot: React.FC<ChatbotProps> = ({ initialOpen = false }) => {
  const [uiState, setUiState] = useState<ChatUIState>({
    isOpen: initialOpen,
    isLoading: false,
    error: undefined,
    currentInput: '',
    selectedText: undefined,
    session: {
      id: `session_${Date.now()}`,
      messages: [],
      createdAt: new Date(),
      lastActiveAt: new Date(),
    }
  });

  // Add welcome message when chat is opened for the first time
  useEffect(() => {
    if (uiState.isOpen && uiState.session?.messages.length === 0) {
      const welcomeMessage: ChatMessageType = {
        id: `msg_welcome_${Date.now()}`,
        content: "Hello! I'm your Physical AI Assistant. I can help answer questions about the book content, explain concepts, or provide additional information. What would you like to know?",
        sender: 'agent',
        timestamp: new Date(),
        status: 'sent'
      };

      setUiState(prev => ({
        ...prev,
        session: {
          ...prev.session!,
          messages: [welcomeMessage]
        }
      }));
    }
  }, [uiState.isOpen]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages when new messages are added
  useEffect(() => {
    scrollToBottom();
  }, [uiState.session?.messages]);

  // Check backend health when component mounts but don't show error immediately
  useEffect(() => {
    const checkHealth = async () => {
      const isHealthy = await checkBackendHealth();
      // Don't set error immediately, just store the health status if needed
      // The error will be shown only when user tries to send a message
    };
    checkHealth();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    // Add user message to the chat
    const userMessage: ChatMessageType = {
      id: `msg_${Date.now()}`,
      content: message,
      sender: 'user',
      timestamp: new Date(),
      status: 'pending'
    };

    // Get selected text context if available
    const selectionContext = getSelectedTextWithContext();
    const selectedText = selectionContext.selectedText;

    setUiState(prev => {
      const updatedMessages = [...(prev.session?.messages || []), userMessage];
      return {
        ...prev,
        isLoading: true,
        error: undefined,
        session: {
          ...prev.session!,
          messages: updatedMessages,
          lastActiveAt: new Date(),
          context: {
            ...prev.session?.context,
            selectedText: selectedText || prev.session?.context?.selectedText
          }
        }
      };
    });

    try {
      // Prepare the query request with context
      const queryRequest: QueryRequest = {
        query: message,
        context: {
          selectedText: selectedText || uiState.session?.context?.selectedText,
          currentPageUrl: selectionContext.currentPageUrl,
          currentPageTitle: selectionContext.currentPageTitle,
          additionalContext: uiState.session?.context?.additionalContext
        },
        sessionId: uiState.session?.id
      };

      // Send query to RAG backend
      const response: QueryResponse = await queryRAGBackend(queryRequest);

      // Create agent response message
      const agentMessage: ChatMessageType = {
        id: `msg_${Date.now() + 1}`,
        content: response.answer,
        sender: 'agent',
        timestamp: new Date(),
        status: 'sent',
        sources: response.sources
      };

      // Update state with agent response
      setUiState(prev => {
        const updatedMessages = [...prev.session!.messages.slice(0, -1),
                                { ...userMessage, status: 'sent' },
                                agentMessage];
        return {
          ...prev,
          isLoading: false,
          session: {
            ...prev.session!,
            messages: updatedMessages,
            lastActiveAt: new Date()
          }
        };
      });
    } catch (error) {
      // Handle error response
      const errorMessage: ChatMessageType = {
        id: `msg_${Date.now() + 1}`,
        content: 'Sorry, I encountered an error processing your request. Please try again.',
        sender: 'agent',
        timestamp: new Date(),
        status: 'error'
      };

      setUiState(prev => {
        const updatedMessages = [...prev.session!.messages.slice(0, -1),
                                { ...userMessage, status: 'error' },
                                errorMessage];
        return {
          ...prev,
          isLoading: false,
          error: (error as ErrorResponse).message || 'An error occurred while processing your request',
          session: {
            ...prev.session!,
            messages: updatedMessages,
            lastActiveAt: new Date()
          }
        };
      });
    }
  };

  const toggleChat = () => {
    setUiState(prev => ({
      ...prev,
      isOpen: !prev.isOpen
    }));
  };

  const closeChat = () => {
    setUiState(prev => ({
      ...prev,
      isOpen: false
    }));
  };

  if (!uiState.isOpen) {
    return (
      <button className="chatbot-toggle-minimized" onClick={toggleChat} aria-label="Open chat">
        <FiMessageSquare size={22} />
      </button>
    );
  }

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <h3 className="chatbot-header-title">Physical AI Assistant</h3>
        <div className="chatbot-header-actions">
          <button
            className="chatbot-toggle-btn"
            onClick={toggleChat}
            aria-label="Minimize chat"
          >
            <FiMinimize2 />
          </button>
          <button
            className="chatbot-close-btn"
            onClick={closeChat}
            aria-label="Close chat"
          >
            <FiX />
          </button>
        </div>
      </div>

      <div className="chatbot-messages">
        {uiState.session?.messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}

        {uiState.isLoading && (
          <div className="chatbot-loading">
            <div className="loading-dots">
              <div className="loading-dot"></div>
              <div className="loading-dot"></div>
              <div className="loading-dot"></div>
            </div>
          </div>
        )}

        {uiState.error && (
          <div className="chatbot-error">
            Error: {uiState.error}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <ChatInput
        onSendMessage={handleSendMessage}
        disabled={uiState.isLoading}
        placeholder="Ask about the book content..."
      />
    </div>
  );
};

export default Chatbot;