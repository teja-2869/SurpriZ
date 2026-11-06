import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Sparkles, X, Info } from 'lucide-react';
import { sound } from '../../utils/soundEngine';

export type ToastType = 'success' | 'info' | 'sparkle' | 'error';

export interface Toast {
  id: string;
  title: string;
  message?: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (title: string, message?: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((title: string, message?: string, type: ToastType = 'sparkle') => {
    const id = `toast_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    setToasts((prev) => [...prev, { id, title, message, type }]);

    if (type === 'sparkle' || type === 'success') {
      sound.playSparkle();
    } else {
      sound.playChime();
    }

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast container */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-2xl shadow-xl border backdrop-blur-md transition-all duration-300 animate-in slide-in-from-bottom-3 ${
              toast.type === 'success'
                ? 'bg-emerald-900/90 text-white border-emerald-700/50'
                : toast.type === 'error'
                ? 'bg-rose-900/90 text-white border-rose-700/50'
                : toast.type === 'info'
                ? 'bg-slate-900/90 text-white border-slate-700/50'
                : 'bg-purple-950/90 text-white border-purple-500/40 shadow-purple-900/20'
            }`}
          >
            <div className="shrink-0 mt-0.5">
              {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-300" />}
              {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-300" />}
              {toast.type === 'info' && <Info className="w-5 h-5 text-sky-300" />}
              {toast.type === 'sparkle' && <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />}
            </div>

            <div className="flex-1 min-w-0">
              <h5 className="text-xs font-bold tracking-tight">{toast.title}</h5>
              {toast.message && (
                <p className="text-[11px] text-white/80 mt-0.5 leading-relaxed">{toast.message}</p>
              )}
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-white/60 hover:text-white p-1 rounded-lg transition-colors shrink-0"
              aria-label="Dismiss notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    return {
      showToast: (title: string, message?: string) => {
        console.log(`[Toast] ${title}: ${message}`);
      }
    };
  }
  return context;
};
