import React, { useState } from 'react';
import ThtChatBubble from './ThtChatBubble';

const FloatingChatButton = () => {
  const [chatVisible, setChatVisible] = useState(false);

  return (
    <div>
      {/* Chat bubble muncul hanya saat chatVisible true */}
      {chatVisible && (
        <div className="fixed bottom-20 right-8 z-50 w-[320px] h-[450px]">
          <div className="w-full h-full bg-white shadow-xl rounded-2xl overflow-hidden flex flex-col">
            <ThtChatBubble />
          </div>
        </div>
      )}

      {/* Tombol floating selalu tampil */}
      <div className="fixed bottom-5 right-5 z-50">
        <button
          onClick={() => setChatVisible(!chatVisible)}
          className="bg-indigo-600 text-white p-4 rounded-full shadow-lg w-30 hover:bg-indigo-500"
        >
          <span className="text-sm">{chatVisible ? 'X Bantuan' : 'Bantuan'}</span>
        </button>
      </div>
    </div>
  );
};

export default FloatingChatButton;
