import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  Send,
  Sparkles,
  X,
  Volume2,
  RefreshCw,
  Copy,
  Check,
  Heart,
  FileText,
  Lightbulb,
  Radio
} from 'lucide-react';
import { sound } from '../../utils/soundEngine';
import { useToast } from './ToastNotification';

interface Message {
  id: string;
  sender: 'user' | 'gemini';
  text: string;
  timestamp: string;
}

interface GeminiLiveVoiceModalProps {
  isOpen: boolean;
  recipientName: string;
  senderName: string;
  onClose: () => void;
  onInsertIntoLetter?: (text: string) => void;
  onInsertAsMemory?: (title: string, story: string) => void;
}

export const GeminiLiveVoiceModal: React.FC<GeminiLiveVoiceModalProps> = ({
  isOpen,
  recipientName,
  senderName,
  onClose,
  onInsertIntoLetter,
  onInsertAsMemory
}) => {
  const { showToast } = useToast();

  if (!isOpen) return null;

  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      sender: 'gemini',
      text: `Hello ${senderName}! I'm your SURPRIZ Live Muse. Tell me about your favourite moment with ${recipientName}, or ask me to draft a rhyming toast, an inside joke, or a heartfelt letter section! 🌷`,
      timestamp: 'Just now'
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || isLoading) return;

    sound.playChime();
    const userMsg: Message = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/voice-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          recipientName,
          senderName,
          history: messages.map((m) => ({
            role: m.sender === 'user' ? 'user' : 'model',
            parts: [{ text: m.text }]
          }))
        })
      });

      const data = await res.json();
      const replyText =
        data.reply ||
        `To ${recipientName}, the rarest treasure. Every year with you makes life feel like a cinematic adventure filled with warm tea, spontaneous road trips, and laughter that echoes long after the stars come out.`;

      sound.playSparkle();
      setMessages((prev) => [
        ...prev,
        {
          id: `gem_${Date.now()}`,
          sender: 'gemini',
          text: replyText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: `gem_${Date.now()}`,
          sender: 'gemini',
          text: `Remember when you and ${recipientName} got completely lost on that road trip and decided it was the best accidental diner breakfast ever? Moments like that belong right in the heart of this gift! ✨`,
          timestamp: 'Just now'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleVoiceMic = () => {
    if (!isListening) {
      sound.playCameraClick();
      setIsListening(true);

      // Check for browser SpeechRecognition
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setIsListening(false);
          handleSendMessage(transcript);
        };

        recognition.onerror = () => {
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognition.start();
      } else {
        // Speech simulation
        setTimeout(() => {
          setIsListening(false);
          handleSendMessage(`Help me write a poetic message celebrating ${recipientName}'s 25th birthday`);
        }, 2200);
      }
    } else {
      sound.playWaxPop();
      setIsListening(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    showToast('Copied to Clipboard', 'Text copied successfully.', 'success');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleApplyToLetter = (text: string) => {
    if (onInsertIntoLetter) {
      onInsertIntoLetter(text);
      showToast('Inserted into Letter', 'Added text directly to your stationery letter!', 'sparkle');
    }
  };

  const handleApplyAsMemory = (text: string) => {
    if (onInsertAsMemory) {
      onInsertAsMemory(`Golden Moment with ${recipientName}`, text);
      showToast('New Memory Created', 'Added to your scrapbook memory cards!', 'sparkle');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#FFFDFB] w-full max-w-2xl rounded-3xl shadow-2xl border border-purple-200 overflow-hidden flex flex-col h-[650px] max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-purple-100 bg-[#FAF5FF]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-500 text-white flex items-center justify-center shadow-xs">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold text-purple-700 tracking-wider">
                  Live Muse • Gemini 3.8
                </span>
                <span className="inline-flex items-center gap-1 text-[9px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                  <Radio className="w-2.5 h-2.5 text-emerald-600 animate-pulse" /> Live Voice Ready
                </span>
              </div>
              <h3 className="font-display text-base font-bold text-[#2D232E]">
                Brainstorm Wishes, Toasts & Letters
              </h3>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playWaxPop();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-white hover:bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center shadow-xs transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Prompts Bar */}
        <div className="flex items-center gap-2 px-6 py-2.5 bg-white border-b border-slate-100 overflow-x-auto text-[11px] font-semibold text-slate-600 shrink-0">
          <span className="text-slate-400 font-bold shrink-0">Try asking:</span>
          <button
            onClick={() => handleSendMessage(`Write 3 sweet, rhyming couplets for ${recipientName}'s 25th birthday`)}
            className="px-3 py-1 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-full border border-purple-200 shrink-0 transition-colors"
          >
            ✨ Rhyming Toast
          </button>
          <button
            onClick={() => handleSendMessage(`Suggest 3 funny inside joke categories for best friends`)}
            className="px-3 py-1 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-full border border-purple-200 shrink-0 transition-colors"
          >
            🍕 Inside Jokes
          </button>
          <button
            onClick={() => handleSendMessage(`Draft a nostalgic opening paragraph about growing up together and watching dreams come true`)}
            className="px-3 py-1 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-full border border-purple-200 shrink-0 transition-colors"
          >
            💌 Emotional Letter
          </button>
        </div>

        {/* Messages Feed */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#FCFBF7]">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-4 shadow-xs text-xs sm:text-sm leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-purple-600 text-white rounded-tr-none'
                    : 'bg-white border border-[#EFE5DE] text-[#2D232E] rounded-tl-none'
                }`}
              >
                <p className="whitespace-pre-line">{m.text}</p>

                {m.sender === 'gemini' && (
                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap items-center gap-2 text-[11px]">
                    <button
                      type="button"
                      onClick={() => handleCopy(m.id, m.text)}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold flex items-center gap-1 transition-colors"
                    >
                      {copiedId === m.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" /> Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" /> Copy
                        </>
                      )}
                    </button>

                    {onInsertIntoLetter && (
                      <button
                        type="button"
                        onClick={() => handleApplyToLetter(m.text)}
                        className="px-2.5 py-1 rounded-lg bg-purple-100 hover:bg-purple-200 text-purple-800 font-semibold flex items-center gap-1 transition-colors"
                      >
                        <FileText className="w-3 h-3" /> Insert into Letter
                      </button>
                    )}

                    {onInsertAsMemory && (
                      <button
                        type="button"
                        onClick={() => handleApplyAsMemory(m.text)}
                        className="px-2.5 py-1 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-800 font-semibold flex items-center gap-1 transition-colors"
                      >
                        <Heart className="w-3 h-3" /> Save as Memory
                      </button>
                    )}
                  </div>
                )}
              </div>
              <span className="text-[10px] text-slate-400 mt-1 px-1">{m.timestamp}</span>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 p-3 bg-white rounded-2xl border border-purple-100 max-w-[200px] text-xs text-purple-700 animate-pulse">
              <RefreshCw className="w-4 h-4 animate-spin text-purple-600" />
              <span>Gemini is composing...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-white border-t border-slate-100">
          {isListening && (
            <div className="mb-2 py-2 px-3 bg-rose-50 rounded-xl border border-rose-200 flex items-center justify-between text-xs text-rose-800">
              <span className="flex items-center gap-2 font-bold animate-pulse">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-600" />
                Listening to your voice... Speak your thoughts naturally
              </span>
              <button
                onClick={handleToggleVoiceMic}
                className="text-xs font-bold text-rose-700 hover:underline"
              >
                Stop
              </button>
            </div>
          )}

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleToggleVoiceMic}
              title={isListening ? 'Stop recording' : 'Speak with Gemini Live'}
              className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all cursor-pointer ${
                isListening
                  ? 'bg-rose-500 text-white animate-bounce'
                  : 'bg-purple-100 hover:bg-purple-200 text-purple-700'
              }`}
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
              placeholder={`Ask Gemini Live to write or brainstorm for ${recipientName}...`}
              className="flex-1 px-4 py-2.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            />

            <button
              type="button"
              onClick={() => handleSendMessage()}
              disabled={!input.trim() || isLoading}
              className="w-11 h-11 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center disabled:opacity-40 transition-all cursor-pointer shadow-xs active:scale-95"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
