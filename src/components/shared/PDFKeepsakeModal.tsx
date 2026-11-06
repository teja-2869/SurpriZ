import React from 'react';
import { X, Printer, Download, Sparkles, Heart } from 'lucide-react';
import { Gift } from '../../types/gift';
import { sound } from '../../utils/soundEngine';

interface PDFKeepsakeModalProps {
  isOpen: boolean;
  onClose: () => void;
  gift: Gift;
}

export const PDFKeepsakeModal: React.FC<PDFKeepsakeModalProps> = ({
  isOpen,
  onClose,
  gift
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    sound.playCameraClick();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#FFFDF9] rounded-3xl p-6 md:p-10 shadow-2xl border border-purple-100 flex flex-col my-8">
        <div className="flex items-center justify-between pb-4 border-b border-purple-100 mb-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#8B5CF6]" />
            <h3 className="font-display text-xl font-bold text-[#2D232E]">
              Printable Keepsake Memory Album
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Printable Paper Canvas */}
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-8">
          {/* Header */}
          <div className="text-center pb-6 border-b border-dashed border-slate-200">
            <span className="text-xs uppercase tracking-widest text-[#8B5CF6] font-bold">
              SURPRIZ ARCHIVE #{gift.recipient.milestoneAge}
            </span>
            <h1 className="font-display text-3xl font-bold text-[#2D232E] mt-1">
              {gift.recipient.bannerHeading || `Happy ${gift.recipient.milestoneAge}th Birthday, ${gift.recipient.name}!`}
            </h1>
            <p className="text-xs text-slate-500 mt-1 font-mono">
              Curated by {gift.sender.name} • October 14, 2024
            </p>
          </div>

          {/* Letter Excerpt */}
          <div className="bg-[#FFFBF0] p-6 rounded-xl border border-amber-100">
            <h4 className="font-bold text-amber-900 text-sm mb-2">{gift.letter.salutation}</h4>
            <p className="font-handwriting text-xl text-amber-950 whitespace-pre-line leading-relaxed">
              {gift.letter.body}
            </p>
            <div className="mt-4 text-right font-handwriting text-xl text-purple-900 font-bold">
              {gift.letter.signature}
            </div>
          </div>

          {/* Photos Grid */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-bold text-slate-400 mb-4">
              Polaroid Moments ({gift.photos.length} Captured)
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {gift.photos.slice(0, 8).map((p) => (
                <div key={p.id} className="bg-slate-50 p-2 rounded-lg border border-slate-200 text-center">
                  <img
                    src={p.url}
                    alt={p.title}
                    referrerPolicy="no-referrer"
                    className="w-full aspect-square object-cover rounded mb-2"
                  />
                  <p className="font-handwriting text-sm font-bold text-slate-800 truncate">
                    {p.caption || p.title}
                  </p>
                  <p className="text-[10px] text-slate-400">{p.date}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Footer stamp */}
          <div className="flex items-center justify-between text-xs text-slate-400 pt-4 border-t border-slate-100">
            <span>SURPRIZ Vault ID: {gift.slug}</span>
            <span className="flex items-center gap-1 text-purple-700 font-semibold">
              <Heart className="w-3.5 h-3.5 fill-purple-600" /> Preserved with Love
            </span>
          </div>
        </div>

        {/* Action bar */}
        <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900"
          >
            Close
          </button>
          <button
            onClick={handlePrint}
            className="px-5 py-2.5 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-semibold text-sm flex items-center gap-2 shadow-md transition-all active:scale-95"
          >
            <Printer className="w-4 h-4" />
            Print / Save as PDF
          </button>
        </div>
      </div>
    </div>
  );
};
