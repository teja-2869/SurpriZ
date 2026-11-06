import React, { useState } from 'react';
import { Sparkles, Heart, ArrowRight, ArrowLeft, ShieldCheck, Image, Link2, User } from 'lucide-react';
import { Gift } from '../../types/gift';
import { sound } from '../../utils/soundEngine';

interface Step1Props {
  gift: Gift;
  onUpdate: (updated: Partial<Gift>) => void;
  onNext: () => void;
  onBack: () => void;
}

import { useToast } from '../shared/ToastNotification';

export const Step1SenderRecipient: React.FC<Step1Props> = ({
  gift,
  onUpdate,
  onNext,
  onBack
}) => {
  const { showToast } = useToast();
  const [senderName, setSenderName] = useState(gift.sender.name);
  const [recipientName, setRecipientName] = useState(gift.recipient.name);
  const [enablePetName, setEnablePetName] = useState(Boolean(gift.recipient.petName));
  const [petName, setPetName] = useState(gift.recipient.petName || 'Sunshine ☀️');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName.trim() || !recipientName.trim()) {
      showToast('Missing Names', 'Please enter both sender and recipient names.', 'error');
      return;
    }

    sound.playSparkle();
    onUpdate({
      sender: { ...gift.sender, name: senderName },
      recipient: {
        ...gift.recipient,
        name: recipientName,
        petName: enablePetName ? petName : undefined
      }
    });
    onNext();
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 flex flex-col items-center">
      {/* Step Indicator & Progress */}
      <div className="flex items-center gap-2 mb-3">
        <span className="w-6 h-6 rounded-full bg-[#6B5B95] text-white text-xs font-bold flex items-center justify-center">
          1
        </span>
        <span className="text-xs uppercase font-bold tracking-wider text-[#6B5B95]">
          STEP 1 OF 8 • SENDER & RECIPIENT
        </span>
      </div>

      <div className="w-48 h-1.5 bg-[#EAE0D8] rounded-full overflow-hidden mb-6">
        <div className="w-1/8 h-full bg-[#8B5CF6] rounded-full transition-all duration-300" />
      </div>

      {/* Headline */}
      <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-center text-[#2D232E] tracking-tight">
        Let's make something special! ✨
      </h2>
      <p className="mt-2 text-sm sm:text-base text-[#6D5D6E] text-center max-w-lg">
        Tell us who this magical surprise is from and who gets to celebrate.
      </p>

      {/* Main Craft Form Card */}
      <div className="mt-8 w-full max-w-xl relative">
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10 px-4 py-1 rounded-full bg-[#F5ECE5] text-[#8C7A87] font-bold text-[11px] uppercase tracking-wider border border-[#E9DFD8]">
          Keepsake Craft
        </div>

        {/* Floating VIP Note Sticky Tape */}
        <div className="absolute -left-6 top-28 bg-[#FFFBF0] text-amber-900 border border-amber-200 shadow-md px-3 py-1.5 rounded-md -rotate-6 z-20 hidden sm:flex items-center gap-1.5 text-xs font-semibold">
          <span>📎</span>
          <span>VIP NOTE</span>
        </div>

        {/* Decorative corner sparkle */}
        <div className="absolute -right-3 -top-3 w-8 h-8 rounded-full bg-pink-100 text-pink-500 flex items-center justify-center text-sm shadow-xs z-10">
          ✨
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EFE5DE] shadow-md flex flex-col gap-6"
        >
          {/* Sender Input */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-[#2D232E] flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-purple-600" />
                Your Name (Sender)
              </label>
              <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-100">
                • The Creator
              </span>
            </div>
            <div className="relative">
              <input
                type="text"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="e.g. Clara Bennett"
                className="w-full px-4 py-3 bg-[#FBF7F4] border border-[#EFE5DE] rounded-xl text-sm font-semibold text-[#2D232E] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] transition-all"
                required
              />
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sm">
                🌸
              </span>
            </div>
          </div>

          {/* Recipient Input */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-[#2D232E] flex items-center gap-1.5">
                <span>🎉</span>
                Their Name (Birthday Person)
              </label>
              <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-100">
                • Honoree
              </span>
            </div>
            <div className="relative">
              <input
                type="text"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                placeholder="e.g. Maya Rose"
                className="w-full px-4 py-3 bg-[#FBF7F4] border border-[#EFE5DE] rounded-xl text-sm font-semibold text-[#2D232E] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] transition-all"
                required
              />
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sm">
                🎂
              </span>
            </div>
          </div>

          {/* Pet Name / Inside Joke Toggle */}
          <div className="p-4 bg-[#FBF7F4] rounded-2xl border border-[#EFE5DE]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-purple-600" />
                <div>
                  <span className="text-xs font-bold text-[#2D232E] block">
                    Add a Pet Name / Inside Joke?
                  </span>
                  <span className="text-[11px] text-[#8C7A87]">
                    Used in playful card pop-ups & stickers
                  </span>
                </div>
              </div>

              {/* Custom Toggle Switch */}
              <button
                type="button"
                onClick={() => setEnablePetName(!enablePetName)}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                  enablePetName ? 'bg-[#8B5CF6]' : 'bg-slate-300'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    enablePetName ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {enablePetName && (
              <div className="mt-3 pt-3 border-t border-[#EFE5DE]">
                <input
                  type="text"
                  value={petName}
                  onChange={(e) => setPetName(e.target.value)}
                  placeholder="e.g. Sunshine ☀️ or Mochi"
                  className="w-full px-4 py-2.5 bg-white border border-[#E9DFD8] rounded-xl text-sm font-semibold text-[#2D232E] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
                />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-[#6B5B95] hover:bg-[#584880] text-white font-bold text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-98 cursor-pointer"
          >
            <span>Let's Continue 💜</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onBack}
            className="text-xs text-[#8C7A87] hover:text-[#2D232E] font-semibold flex items-center justify-center gap-1 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Start
          </button>
        </form>
      </div>

      {/* 3 Bottom Feature Cards matching Stitch 02 */}
      <div className="mt-12 w-full max-w-3xl grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-white/70 backdrop-blur-xs rounded-2xl border border-[#EFE5DE] shadow-2xs flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center text-sm shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#2D232E]">Zero Spoilers</h4>
            <p className="text-[11px] text-[#8C7A87]">
              The recipient only unboxes on their big day.
            </p>
          </div>
        </div>

        <div className="p-4 bg-white/70 backdrop-blur-xs rounded-2xl border border-[#EFE5DE] shadow-2xs flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-pink-100 text-pink-700 flex items-center justify-center text-sm shrink-0">
            <Image className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#2D232E]">Memory Mosaic</h4>
            <p className="text-[11px] text-[#8C7A87]">
              Blend vintage snaps, voice notes, and confetti.
            </p>
          </div>
        </div>

        <div className="p-4 bg-white/70 backdrop-blur-xs rounded-2xl border border-[#EFE5DE] shadow-2xs flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center text-sm shrink-0">
            <Link2 className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#2D232E]">Instant Magic Link</h4>
            <p className="text-[11px] text-[#8C7A87]">
              Delivered via SMS, email, or a real QR card.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
