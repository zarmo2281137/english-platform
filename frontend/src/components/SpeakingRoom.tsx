import React, { useState, useEffect, useRef } from 'react';

interface Message {
  id: string;
  sender: 'AI' | 'USER';
  text: string;
}

export const SpeakingRoom: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [status, setStatus] = useState<'IDLE' | 'LISTENING' | 'THINKING' | 'SPEAKING'>('IDLE');
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', sender: 'AI', text: "Hello! Today we are discussing 'AI and the Future of Work'. What is your opinion?" }
  ]);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event: any) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setTranscript(currentTranscript);
      };

      recognitionRef.current.onerror = () => setStatus('IDLE');
    }
  }, []);

  const toggleRecording = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
      if (transcript.trim()) {
        sendMessage(transcript);
      } else {
        setStatus('IDLE');
      }
    } else {
      setTranscript('');
      recognitionRef.current?.start();
      setIsRecording(true);
      setStatus('LISTENING');
    }
  };

  const sendMessage = async (userText: string) => {
    const userMsg: Message = { id: Date.now().toString(), sender: 'USER', text: userText };
    setMessages((prev) => [...prev, userMsg]);
    setTranscript('');
    setStatus('THINKING');

    setTimeout(() => {
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'AI',
        text: "That's an interesting point! How do you think companies can support employees during this transition?"
      };
      setMessages((prev) => [...prev, aiMsg]);
      setStatus('SPEAKING');

      const utterance = new SpeechSynthesisUtterance(aiMsg.text);
      utterance.onend = () => setStatus('IDLE');
      window.speechSynthesis.speak(utterance);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-screen bg-slate-900 text-white p-6">
      <header className="border-b border-slate-800 pb-4 mb-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-indigo-400">AI Speaking Tutor</h1>
        <span className="text-xs bg-slate-800 px-3 py-1 rounded-full text-slate-300">Level: B2</span>
      </header>

      <div className="flex-1 overflow-y-auto space-y-4 max-w-2xl mx-auto w-full">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'USER' ? 'justify-end' : 'justify-start'}`}>
            <div className={`p-4 rounded-xl text-sm ${msg.sender === 'USER' ? 'bg-indigo-600' : 'bg-slate-800'}`}>
              <p className="text-xs font-bold opacity-70 mb-1">{msg.sender}</p>
              <p>{msg.text}</p>
            </div>
          </div>
        ))}
        {transcript && <div className="text-right text-indigo-300 italic text-sm">{transcript}...</div>}
      </div>

      <div className="pt-4 flex flex-col items-center">
        <p className="text-xs text-slate-400 mb-2">{status}</p>
        <button
          onClick={toggleRecording}
          className={`p-6 rounded-full transition ${isRecording ? 'bg-red-600' : 'bg-indigo-600'}`}
        >
          🎤
        </button>
      </div>
    </div>
  );
};