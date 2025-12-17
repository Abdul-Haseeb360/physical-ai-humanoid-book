import React from 'react';
import { ChatMessage as ChatMessageType } from '../../types/chat';
import './Chatbot.css';

interface ChatMessageProps {
  message: ChatMessageType;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const { sender, content, timestamp, sources, status } = message;

  // Format timestamp for display
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`chat-message chat-message-${sender}`}>
      <div className="chat-message-content">
        {content}
      </div>
      <div className="chat-message-timestamp">
        {formatTime(timestamp)}
        {status === 'pending' && ' ●'}
        {status === 'error' && ' ⚠️ Error'}
      </div>

      {/* Display sources if available */}
      {sources && sources.length > 0 && (
        <div className="chat-message-sources">
          <strong>📚 Sources:</strong>
          {sources.map((source, index) => (
            <div key={source.documentId || index} className="chat-message-source">
              <a href={source.url} target="_blank" rel="noopener noreferrer">
                {source.title || `Document ${index + 1}`}
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatMessage;