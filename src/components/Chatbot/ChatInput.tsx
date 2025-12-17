import React, { useState, useRef, useEffect } from 'react';
import { FiSend, FiPaperclip, FiCornerDownLeft } from 'react-icons/fi';
import './Chatbot.css';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled = false, placeholder = 'Ask about the book content...' }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [inputValue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !disabled) {
      onSendMessage(inputValue.trim());
      setInputValue('');
      // Reset textarea height after clearing
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Submit on Enter (without Shift)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!disabled) {
        handleSubmit(e as any); // Type assertion to avoid event typing issues
      }
    }
  };

  return (
    <form className="chatbot-input-area" onSubmit={handleSubmit}>
      <input
        ref={textareaRef}
        className="chatbot-input"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        rows={1}
      />
      <button
        type="submit"
        className="chatbot-send-btn"
        disabled={disabled || !inputValue.trim()}
        aria-label="Send message"
      >
        <FiCornerDownLeft size={18} />
      </button>
    </form>
  );
};

export default ChatInput;