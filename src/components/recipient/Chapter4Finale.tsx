import React, { useState } from 'react';
import {
  Sparkles,
  Heart,
  Volume2,
  Download,
  RotateCcw,
  Gift as GiftIcon,
  Wind,
  Flame,
  Check,
  PartyPopper,
  Edit3,
  Upload
} from 'lucide-react';
import { Gift } from '../../types/gift';
import { sound } from '../../utils/soundEngine';
import { fireConfettiExplosion, fireGrandFinaleConfetti, fireHeartSparkles } from '../../utils/confettiEngine';
import { PDFKeepsakeModal } from '../shared/PDFKeepsakeModal';
import { useToast } from '../shared/ToastNotification';

interface Chapter4Props {
  gift: Gift;
  onReplayJourney: () => void;
  onCreateNewGift: () => void;
  onUpdateGift?: (updated: Partial<Gift>) => void;
}

export const Chapter4Finale: React.FC<Chapter4Props> = ({
  gift,
  onReplayJourney,
  onCreateNewGift,
  onUpdateGift
}) => {
  const { showToast } = useToast();
  const totalCandles = gift.birthday?.age ?? gift.recipient?.milestoneAge ?? 25;
  const [extinguishedCandles, setExtinguishedCandles] = useState<Record<number, boolean>>({});
  const [reactions, setReactions] = useState<Record<string, number>>(
    gift.recipientState?.reactions || {
      '😭 Tears of Joy': 14,
      '🥹 So Touched': 28,
      '💖 Huge Hug': 52,
      '🎉 Party On!': 31,
      '🥂 Cheers!': 22
    }
  );
  const [showPDFModal, setShowPDFModal] = useState(false);

  // Custom cake & mascot photos
  const [cakePhotoUrl, setCakePhotoUrl] = useState(
    'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80'
  );
  const cakeFileInputRef = React.useRef<HTMLInputElement | null>(null);

  const [toastProse, setToastProse] = useState(
    `“Some people make ordinary moments extraordinary. Today, we celebrate the pure magic of you.”`
  );
  const [isEditingToast, setIsEditingToast] = useState(false);

  const extinguishedCount = Object.values(extinguishedCandles).filter(Boolean).length;

  const handleBlowSingleCandle = (num: number) => {
    if (extinguishedCandles[num]) return;
    sound.playCandleBlow();
    setExtinguishedCandles((prev) => {
      const updated = { ...prev, [num]: true };
      const count = Object.values(updated).filter(Boolean).length;
      if (count === totalCandles) {
        sound.playPartyHorn();
        fireGrandFinaleConfetti();
        showToast('All Candles Extinguished!', 'May all your birthday wishes come true! 🎂✨', 'sparkle');
      }
      return updated;
    });
  };

  const handleBlowAllCandles = () => {
    sound.playCandleBlow();
    const allExt: Record<number, boolean> = {};
    for (let i = 1; i <= totalCandles; i++) {
      allExt[i] = true;
    }
    setExtinguishedCandles(allExt);
    setTimeout(() => {
      sound.playPartyHorn();
      fireGrandFinaleConfetti();
      showToast('All Candles Blown Out!', 'Wishes released into the universe ✨', 'sparkle');
    }, 300);
  };

  const handlePartyHorn = () => {
    sound.playPartyHorn();
    fireConfettiExplosion(0.3, 0.5);
    showToast('Toot!', 'Party horn blaring! 🎺', 'sparkle');
  };

  const handleSendReaction = (label: string) => {
    sound.playSparkle();
    if (label.includes('Hug')) fireHeartSparkles();
    else fireConfettiExplosion();

    setReactions((prev) => ({
      ...prev,
      [label]: (prev[label] || 0) + 1
    }));
    showToast('Reaction Sent', `Sent ${label} to ${gift.sender.name}!`, 'sparkle');
  };

  const handleCakePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    sound.playCameraClick();
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        setCakePhotoUrl(result);
        showToast('Cake Photo Updated', 'Uploaded your dream birthday cake!', 'success');
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 flex flex-col items-center">
      {/* Grand Finale Badge */}
      <span className="text-[11px] font-bold text-purple-700 bg-purple-50 px-3.5 py-1 rounded-full border border-purple-200 mb-3 shadow-2xs">
        🎉 GRAND FINALE
      </span>

      {/* Main Headline */}
      <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-center text-[#2D232E] tracking-tight">
        Happy {gift.birthday?.age ?? gift.recipient?.milestoneAge ?? 25}th Birthday,{' '}
        <span className="text-[#8B5CF6] underline decoration-wavy decoration-[#C084FC]">
          {gift.recipient.name}!
        </span>
      </h1>
      <span className="text-3xl my-2">🎂 🎉 ✨</span>

      <p className="text-sm sm:text-base text-[#6D5D6E] text-center max-w-xl leading-relaxed mb-4">
        May this year sparkle as brightly as your laughter and carry you into your most magical adventures yet.
      </p>

      <span className="text-xs text-amber-700 bg-amber-50 px-3.5 py-1 rounded-full border border-amber-200 font-semibold mb-8">
        • {totalCandles} golden candles alight • Make a secret wish!
      </span>

      {/* 2-Column Split matching Stitch 20 */}
      <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Column: Party Pal Barney (4 cols) */}
        <div className="md:col-span-4 bg-white p-6 rounded-3xl border border-[#EFE5DE] shadow-md flex flex-col items-center text-center relative">
          <div className="w-16 h-4 bg-amber-200/80 -top-2 left-1/2 -translate-x-1/2 absolute rounded-xs shadow-xs" />

          {/* Party Pal Barney Image */}
          <div className="w-full aspect-square rounded-2xl overflow-hidden bg-purple-50 mb-4 shadow-inner relative group">
            <img
              src="https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=500&q=80"
              alt="Party Pal Barney"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
            />
            <span className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-xs text-xs font-bold text-purple-900 px-2.5 py-0.5 rounded-full shadow-xs">
              🎉 Party Pal Barney
            </span>
          </div>

          <h3 className="font-display text-xl font-bold text-[#2D232E] mb-1">
            "Toots! Hip Hip Hooray!"
          </h3>
          <p className="text-xs text-slate-500 mb-6 leading-relaxed">
            Ready with infinite hugs, silly dancing, and extra strawberry frosting!
          </p>

          <button
            type="button"
            onClick={handlePartyHorn}
            className="w-full py-3 rounded-2xl bg-slate-100 hover:bg-purple-100 text-[#2D232E] font-bold text-xs flex items-center justify-center gap-2 border border-slate-200 transition-all active:scale-95 shadow-2xs cursor-pointer"
          >
            <Volume2 className="w-4 h-4 text-purple-600" />
            <span>Blow Party Horn!</span>
          </button>
        </div>

        {/* Right Column: Maya's 25-Candle Dream Cake (8 cols) matching Stitch 20 */}
        <div className="md:col-span-8 bg-white p-6 sm:p-8 rounded-3xl border border-[#EFE5DE] shadow-md flex flex-col">
          <input
            ref={cakeFileInputRef}
            type="file"
            accept="image/*"
            onChange={handleCakePhotoUpload}
            className="hidden"
          />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <span className="text-[10px] uppercase font-bold text-purple-700 tracking-wider">
                TOUCH TO BLOW CANDLES
              </span>
              <h3 className="font-display text-2xl font-bold text-[#2D232E]">
                {gift.recipient.name}'s {totalCandles}-Candle Dream Cake
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => cakeFileInputRef.current?.click()}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5 text-purple-600" /> Replace Cake
              </button>

              <button
                type="button"
                onClick={handleBlowAllCandles}
                className="px-4 py-2 rounded-2xl bg-pink-100 hover:bg-pink-200 text-pink-800 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
              >
                <Wind className="w-3.5 h-3.5 text-pink-600" />
                <span>Blow Out All {totalCandles}!</span>
              </button>
            </div>
          </div>

          {/* Dream Cake Photo Banner */}
          <div className="w-full h-44 rounded-2xl overflow-hidden bg-slate-100 relative mb-4 shadow-inner">
            <img
              src={cakePhotoUrl}
              alt="Birthday Cake"
              className="w-full h-full object-cover"
            />
            <span className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1">
              🎂 Tier III: Wild Blackberry & Champagne Cream
            </span>
          </div>

          {/* Extinguished Status */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
            <span className="font-bold text-purple-900">
              🔥 Candles Extinguished: {extinguishedCount} / {totalCandles}
            </span>
            <span className="text-[11px] text-slate-400">
              Tap each flickering candle to release its wish!
            </span>
          </div>

          {/* 25 Interactive Candles Grid matching Stitch 20 */}
          <div className="grid grid-cols-6 sm:grid-cols-12 gap-2 p-3 bg-purple-50/50 rounded-2xl border border-purple-100">
            {[...Array(totalCandles)].map((_, i) => {
              const num = i + 1;
              const isExtinguished = extinguishedCandles[num];
              return (
                <button
                  key={num}
                  type="button"
                  onClick={() => handleBlowSingleCandle(num)}
                  className={`flex flex-col items-center justify-center p-1.5 rounded-xl transition-all cursor-pointer ${
                    isExtinguished
                      ? 'bg-white/60 opacity-40'
                      : 'bg-white hover:scale-110 shadow-2xs'
                  }`}
                  title={isExtinguished ? 'Extinguished!' : 'Tap to blow out candle'}
                >
                  <span
                    className={`text-sm transition-transform ${
                      isExtinguished ? 'grayscale opacity-30 scale-75' : 'animate-pulse'
                    }`}
                  >
                    {isExtinguished ? '💨' : '🔥'}
                  </span>
                  <div
                    className={`w-1.5 h-4 rounded-full mt-0.5 ${
                      i % 3 === 0 ? 'bg-purple-400' : i % 3 === 1 ? 'bg-amber-400' : 'bg-pink-400'
                    }`}
                  />
                  <span className="text-[9px] font-mono text-slate-500 mt-0.5">{num}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* The Birthday Toast Card matching Stitch 20 */}
      <div className="mt-8 w-full bg-white p-6 sm:p-8 rounded-3xl border border-[#EFE5DE] shadow-md grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative">
        <div className="w-16 h-4 bg-pink-200/80 -top-2 left-16 absolute rounded-xs shadow-xs" />
        <div className="w-16 h-4 bg-purple-200/80 -top-2 right-16 absolute rounded-xs shadow-xs" />

        {/* Toast Polaroid */}
        <div className="md:col-span-4 bg-white p-3 pb-5 rounded-2xl shadow-lg border border-slate-200 -rotate-2">
          <img
            src={gift.photos[0]?.url || "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=400&q=80"}
            alt="Golden Hour Toast"
            className="w-full aspect-square object-cover rounded-xl mb-2"
          />
          <p className="font-handwriting text-sm font-bold text-center text-slate-800">
            {gift.sender.name} & {gift.recipient.name}
          </p>
          <span className="font-handwriting text-base font-bold text-purple-900 block text-center mt-1">
            "To endless sunsets 🥂"
          </span>
        </div>

        {/* Toast Prose */}
        <div className="md:col-span-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] uppercase font-bold text-purple-700 tracking-wider">
                99 THE BIRTHDAY TOAST
              </span>
              <button
                type="button"
                onClick={() => setIsEditingToast(!isEditingToast)}
                className="text-[11px] font-bold text-purple-600 hover:underline flex items-center gap-1"
              >
                <Edit3 className="w-3 h-3" /> {isEditingToast ? 'Save Toast' : 'Edit Toast'}
              </button>
            </div>

            {isEditingToast ? (
              <textarea
                rows={3}
                value={toastProse}
                onChange={(e) => setToastProse(e.target.value)}
                className="w-full p-3 bg-purple-50/50 rounded-xl border border-purple-200 font-display text-lg font-bold text-[#2D232E] mb-3"
              />
            ) : (
              <h3 className="font-display text-2xl font-bold text-[#2D232E] mb-3 leading-snug">
                {toastProse}
              </h3>
            )}

            <p className="text-xs sm:text-sm text-[#6D5D6E] leading-relaxed mb-6">
              Thank you for being the easiest laughter, the safest harbor, and the brightest star in every room. Here is to your {gift.birthday?.age ?? gift.recipient?.milestoneAge ?? 25}th chapter—full of open roads, spontaneous adventures, warm tea, and everything your heart dreams of.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-pink-100 text-pink-700 font-bold flex items-center justify-center text-sm">
                {gift.sender.name[0]}
              </div>
              <div>
                <span className="text-xs font-bold text-[#2D232E] block">
                  With all my love, {gift.sender.name}
                </span>
                <span className="text-[10px] text-slate-400">
                  {gift.birthday?.date || 'October 14, 2024'} • {gift.sender.relationship || 'Best Friend & Confidante'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1 text-rose-500 text-xs font-semibold">
              <Heart className="w-4 h-4 fill-rose-500" />
              <Heart className="w-4 h-4 fill-rose-500" />
              <Heart className="w-4 h-4 fill-rose-500" />
              <span className="ml-1 text-slate-500">Sealed with Love</span>
            </div>
          </div>
        </div>
      </div>

      {/* Send Instant Love & Toast Bar matching Stitch 20 */}
      <div className="mt-8 w-full bg-white p-5 rounded-3xl border border-[#EFE5DE] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-xs font-bold text-[#2D232E] flex items-center gap-1.5">
            <span>💬</span> Send Instant Love & Toast to {gift.sender.name}
          </h4>
          <p className="text-[11px] text-slate-400">
            Tap a reaction to instantly ping their celebration feed!
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {Object.entries(reactions).map(([label, count]) => (
            <button
              key={label}
              type="button"
              onClick={() => handleSendReaction(label)}
              className="px-3 py-1.5 rounded-full bg-slate-50 hover:bg-purple-50 text-xs font-bold text-slate-700 border border-slate-200 hover:border-purple-200 transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
            >
              <span>{label}</span>
              <span className="text-[10px] font-mono text-purple-700 bg-white px-1.5 py-0.2 rounded-full border border-slate-200">
                {count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 3 Action Buttons matching Stitch 20 bottom */}
      <div className="mt-8 w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
        <button
          type="button"
          onClick={() => {
            sound.playSparkle();
            setShowPDFModal(true);
          }}
          className="p-4 rounded-2xl bg-white hover:bg-purple-50/50 border border-purple-200 shadow-sm flex items-center gap-3 transition-all text-left active:scale-98 cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
            <Download className="w-5 h-5" />
          </div>
          <div>
            <h5 className="text-xs font-bold text-[#2D232E]">Save Keepsake PDF</h5>
            <p className="text-[10px] text-slate-500">
              Download high-res printable memory album
            </p>
          </div>
        </button>

        <button
          type="button"
          onClick={() => {
            sound.playChime();
            onReplayJourney();
          }}
          className="p-4 rounded-2xl bg-white hover:bg-purple-50/50 border border-purple-200 shadow-sm flex items-center gap-3 transition-all text-left active:scale-98 cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-pink-100 text-pink-700 flex items-center justify-center shrink-0">
            <RotateCcw className="w-5 h-5" />
          </div>
          <div>
            <h5 className="text-xs font-bold text-[#2D232E]">Replay Journey</h5>
            <p className="text-[10px] text-slate-500">
              Relive from Chapter 1 with full music cues
            </p>
          </div>
        </button>

        <button
          type="button"
          onClick={() => {
            sound.playBoxOpen();
            onCreateNewGift();
          }}
          className="p-4 rounded-2xl bg-[#6B5B95] hover:bg-[#584880] text-white shadow-md flex items-center gap-3 transition-all text-left active:scale-98 cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
            <GiftIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h5 className="text-xs font-bold text-white">Gift a Surprise</h5>
            <p className="text-[10px] text-purple-200">
              Create a magical memory box for someone
            </p>
          </div>
        </button>
      </div>

      {/* PDF Modal */}
      <PDFKeepsakeModal
        isOpen={showPDFModal}
        onClose={() => setShowPDFModal(false)}
        gift={gift}
      />
    </div>
  );
};
