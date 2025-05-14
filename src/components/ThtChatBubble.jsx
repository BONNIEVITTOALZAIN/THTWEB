import { useState } from 'react';
import ICON from '../assets/icon-bot.png';

const ThtChatBubble = () => {
  const options = [
    'Masalah Telinga',
    'Masalah Hidung',
    'Masalah Tenggorokan',
    'Rekomendasi Obat Ringan',
    'Hubungi Dokter THT',
  ];

  const responses = {
    'Masalah Telinga': 'Silakan bersihkan telinga secara rutin dan hindari penggunaan cotton bud terlalu dalam.',
    'Masalah Hidung': 'Apakah Anda mengalami pilek, hidung tersumbat, atau mimisan?',
    'Masalah Tenggorokan': 'Kondisi tenggorokan kering atau sakit bisa diatasi dengan minum hangat dan istirahat cukup.',
    'Rekomendasi Obat Ringan': 'Silakan konsumsi Paracetamol, CTM, atau sirup herbal jika gejala ringan.',
    'Hubungi Dokter THT': 'Anda dapat menghubungi Dokter THT kami di WhatsApp: 0812-XXXX-XXXX.',
  };

  const [chatLog, setChatLog] = useState([
    { from: 'bot', message: 'Berikut adalah beberapa layanan yang dapat kami bantu:' },
  ]);
  const [input, setInput] = useState('');

  const handleOptionClick = (option) => {
    addUserMessage(option);
    addBotResponse(responses[option]);
  };

  const handleUserInput = () => {
    if (!input.trim()) return;

    addUserMessage(input);

    const matchedOption = options.find(
      (option) => option.toLowerCase() === input.trim().toLowerCase()
    );

    if (matchedOption) {
      addBotResponse(responses[matchedOption]);
    } else {
      addBotResponse('Maaf, kami belum memahami pertanyaan Anda. Silakan pilih layanan yang tersedia.');
    }

    setInput('');
  };

  const addUserMessage = (message) => {
    setChatLog((prev) => [...prev, { from: 'user', message }]);
  };

  const addBotResponse = (message) => {
    setChatLog((prev) => [...prev, { from: 'bot', message }]);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b">
        <img src={ICON} alt="THT Assistant" className="w-10 h-10 rounded-full" />
        <div>
          <h2 className="text-lg font-semibold text-gray-800">THT Assistant</h2>
          <p className="text-sm text-gray-500">Asisten Pintar Konsultasi Penyakit THT</p>
        </div>
      </div>

      {/* Chat body scrollable */}
      <div className="flex-grow overflow-y-auto px-4 py-2 space-y-2">
        {chatLog.map((chat, index) => (
          <div
            key={index}
            className={`p-2 rounded-xl text-sm max-w-[80%] ${
              chat.from === 'bot'
                ? 'bg-gray-100 text-gray-800 self-start'
                : 'bg-orange-100 text-orange-800 self-end ml-auto'
            }`}
          >
            {chat.message}
          </div>
        ))}

        {/* Opsi pertanyaan */}
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(option)}
            className="px-4 py-2 text-sm text-orange-600 border border-orange-400 rounded-full hover:bg-orange-100 transition"
          >
            {option}
          </button>
        ))}
      </div>

      <div className="p-3 border-t flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleUserInput()}
          placeholder="Tulis pesan..."
          className="flex-grow border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none"
        />
        <button
          onClick={handleUserInput}
          className="text-white bg-orange-500 hover:bg-orange-600 rounded-full p-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M5 13l4 4L19 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ThtChatBubble;
