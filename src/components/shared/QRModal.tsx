import React from 'react';
import { X, Download, Share2, Sparkles, Check } from 'lucide-react';
import { sound } from '../../utils/soundEngine';

interface QRModalProps {
  isOpen: boolean;
  onClose: () => void;
  giftUrl: string;
  passcode: string;
  recipientName: string;
}

export const QRModal: React.FC<QRModalProps> = ({
  isOpen,
  onClose,
  giftUrl,
  passcode,
  recipientName
}) => {
  const [downloaded, setDownloaded] = React.useState(false);

  if (!isOpen) return null;

  const handleDownload = () => {
    sound.playCameraClick();
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 md:p-8 shadow-2xl border border-purple-100 flex flex-col items-center text-center">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="w-12 h-12 rounded-2xl bg-purple-100 text-[#8B5CF6] flex items-center justify-center mb-4">
          <Sparkles className="w-6 h-6" />
        </div>

        <h3 className="font-display text-2xl font-bold text-[#2D232E] mb-1">
          Physical Keepsake QR Card
        </h3>
        <p className="text-xs text-slate-500 mb-6">
          Tuck this printable polaroid QR into an envelope or frame for {recipientName}!
        </p>

        {/* Printable Card Preview */}
        <div className="w-64 bg-[#FFFBF7] p-5 rounded-2xl border-2 border-dashed border-purple-200 shadow-inner flex flex-col items-center mb-6">
          <div className="w-10 h-3 bg-rose-200/80 rounded-xs mb-3 -rotate-2" />
          
          {/* Simulated QR Code with embedded gift logo */}
          <div className="w-40 h-40 bg-white p-2 rounded-xl border border-slate-200 shadow-xs relative flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full text-slate-900 fill-current">
              {/* Geometric QR Representation */}
              <rect x="5" y="5" width="28" height="28" rx="4" fill="none" stroke="currentColor" strokeWidth="6" />
              <rect x="13" y="13" width="12" height="12" />
              <rect x="67" y="5" width="28" height="28" rx="4" fill="none" stroke="currentColor" strokeWidth="6" />
              <rect x="75" y="13" width="12" height="12" />
              <rect x="5" y="67" width="28" height="28" rx="4" fill="none" stroke="currentColor" strokeWidth="6" />
              <rect x="13" y="75" width="12" height="12" />
              <circle cx="50" cy="50" r="14" fill="#C084FC" />
              <rect x="42" y="10" width="8" height="16" />
              <rect x="42" y="74" width="8" height="16" />
              <rect x="10" y="42" width="16" height="8" />
              <rect x="74" y="42" width="16" height="8" />
              <rect x="55" y="60" width="8" height="8" />
              <rect x="70" y="60" width="12" height="8" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-sm">🎁</span>
            </div>
          </div>

          <div className="mt-3 text-center">
            <p className="font-handwriting text-lg font-bold text-purple-900">For {recipientName} ✨</p>
            <p className="text-[10px] font-mono text-slate-500 mt-0.5">Passcode: {passcode}</p>
          </div>
        </div>

        <div className="w-full flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleDownload}
            className="flex-1 py-3 px-4 rounded-xl bg-[#6B5B95] hover:bg-[#584880] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
          >
            {downloaded ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                Downloaded!
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                Download Print Card
              </>
            )}
          </button>
          <button
            onClick={() => {
              sound.playChime();
              navigator.clipboard?.writeText(giftUrl);
              alert('Gift URL copied to clipboard!');
            }}
            className="py-3 px-4 rounded-xl bg-purple-50 hover:bg-purple-100 text-[#8B5CF6] font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
          >
            <Share2 className="w-4 h-4" />
            Copy Link
          </button>
        </div>
      </div>
    </div>
  );
};
