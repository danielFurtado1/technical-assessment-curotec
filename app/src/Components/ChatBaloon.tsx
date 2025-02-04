// ChatBaloon.tsx
import React, { useState } from 'react';
import './ChatBaloon.css';

const ChatBaloon: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages([...messages, input]);
      setInput('');
    }
  };

  return (
    <div className="chat-baloon">
      <h3>Chat</h3>
      <div className="chat-baloon-messages">
        {messages.length === 0 ? (
          <p className="chat-baloon-placeholder">No messages yet...</p>
        ) : (
          messages.map((msg, index) => (
            // TODO-daniel change this for an actual chat id instead of index
            <div key={index} className="chat-baloon-message">
              {msg}
            </div>
          ))
        )}
      </div>
      <form onSubmit={handleSubmit} className="chat-baloon-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="chat-baloon-input"
        />
        <button type="submit" className="chat-baloon-button">
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatBaloon;
