import React, { useState } from 'react';
import { Lock, Eye, EyeOff, Sparkles, Volume2, Key, HelpCircle, Heart, Music, Cake } from 'lucide-react';
import { Gift } from '../../types/gift';
import { sound } from '../../utils/soundEngine';
import { fireConfettiExplosion } from '../../utils/confettiEngine';
import { GiftStorageService } from '../../services/storageService';

interface PasswordGateProps {
  gift: Gift;
  onUnlocked: () => void;
}

export const RecipientPasswordGate: React.FC<PasswordGateProps> = ({
  gift,
  onUnlocked
}) => {
  const [code, setCode] = useState('');
  const [showCode, setShowCode] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) {
      setErrorMsg('Please enter the secret gift code.');
      return;
    }

    setIsVerifying(true);
    setErrorMsg('');

    // Check with Storage Service
    const result = GiftStorageService.verifyGiftPassword(gift.id, code);

    setTimeout(() => {
      setIsVerifying(false);
      if (result.success) {
        sound.playWaxPop();
        sound.playBoxOpen();
        fireConfettiExplosion(0.5, 0.4);
        onUnlocked();
      } else {
        sound.playWaxPop();
        setErrorMsg(result.message);
      }
    }, 400);
  };

  return (
    <div className="w-full min-h-[85vh] flex flex-col items-center justify-center px-4 py-8 relative">
      {/* Ambient Sound Bar at top matching Stitch 16 */}
      <div className="flex items-center gap-2 mb-8">
        <button
          onClick={() => sound.playChime()}
          className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-[#EFE5DE] shadow-2xs text-xs font-semibold text-slate-700 hover:bg-white transition-colors"
        >
          <Volume2 className="w-3.5 h-3.5 text-purple-600 animate-pulse" />
          <span>Ambient Sound: Soft Windchimes</span>
        </button>
      </div>

      {/* Main Card matching Stitch 16 */}
      <div className="w-full max-w-lg bg-white rounded-[36px] p-6 sm:p-10 shadow-xl border border-[#EFE5DE] flex flex-col items-center text-center relative overflow-hidden">
        {/* Top Washi Tape */}
        <div className="w-20 h-4 bg-pink-200/80 -top-2 left-1/2 -translate-x-1/2 absolute rounded-xs shadow-xs" />

        {/* Secret Delivery Badge */}
        <div className="self-center -mt-6 px-4 py-1 bg-amber-100/80 text-amber-900 font-bold text-[10px] uppercase tracking-wider rounded-b-lg border border-t-0 border-amber-200 mb-4">
          SECRET DELIVERY
        </div>

        {/* Sender Keepsake Capsule Pill */}
        <span className="text-[11px] font-bold text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-100 mb-6">
          ✨ A PRIVATE KEEPSAKE FROM {gift.sender.name.toUpperCase()}
        </span>

        {/* Sealed Gift Box Graphic */}
        <div className="w-28 h-28 rounded-3xl bg-gradient-to-tr from-purple-100 via-pink-100 to-amber-50 border-2 border-white shadow-lg relative flex items-center justify-center mb-6">
          <div className="absolute inset-y-0 w-5 bg-white/70" />
          <div className="absolute inset-x-0 h-5 bg-white/70" />
          <div className="w-12 h-12 rounded-full bg-[#FED7AA] text-amber-900 flex items-center justify-center shadow-md z-10 border border-white">
            <Lock className="w-5 h-5 text-amber-800" />
          </div>
          <span className="absolute -bottom-2 bg-white text-[9px] font-bold text-purple-900 px-2 py-0.5 rounded-full shadow-2xs border border-purple-100">
            FOR {gift.recipient.name.toUpperCase()}
          </span>
        </div>

        {/* Title & Copy */}
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#2D232E] mb-2 leading-tight">
          Someone made something just for you! 🎁
        </h2>
        <p className="text-xs sm:text-sm text-[#6D5D6E] leading-relaxed max-w-sm mb-6">
          {gift.recipient.name}, a custom birthday unboxing experience has been lovingly prepared and sealed with a secret key.
        </p>

        {/* Code Input Form */}
        <form onSubmit={handleUnlock} className="w-full flex flex-col gap-4">
          <div className="text-left">
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700">
                Enter the secret gift code:
              </label>
              <span className="text-[10px] text-slate-400 font-mono">Private & Sealed</span>
            </div>

            <div className="relative">
              <input
                type={showCode ? 'text' : 'password'}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Type secret code here..."
                className="w-full px-4 py-3.5 bg-[#FAF7F4] border border-[#EAE0D8] rounded-2xl text-sm font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowCode(!showCode)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showCode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {errorMsg && (
            <p className="text-xs font-semibold text-rose-600 bg-rose-50 p-2 rounded-xl border border-rose-100">
              {errorMsg}
            </p>
          )}

          {/* Clue from Clara Card */}
          <div className="p-3 bg-[#FFFBF0] rounded-2xl border border-amber-200 text-left flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="text-sm">💡</span>
              <div>
                <span className="text-[10px] font-bold text-amber-800 block">
                  Clue from {gift.sender.name}:
                </span>
                <span className="text-amber-900 italic font-medium">
                  "{gift.security.promptClue}"
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                sound.playSparkle();
                setShowHint(!showHint);
              }}
              className="px-2.5 py-1 bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold rounded-lg text-[10px] transition-colors"
            >
              Hint
            </button>
          </div>

          {showHint && (
            <p className="text-xs text-purple-700 bg-purple-50 p-2.5 rounded-xl border border-purple-200 text-left">
              🐾 Quick hint: Try typing <strong>{gift.security.secretKey}</strong> (e.g. your fluffy friend!).
            </p>
          )}

          {/* Big CTA */}
          <button
            type="submit"
            disabled={isVerifying}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#C084FC] to-[#8B5CF6] hover:from-[#A855F7] hover:to-[#7C3AED] text-white font-bold text-base shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 active:scale-98 cursor-pointer mt-2"
          >
            <Lock className="w-4 h-4" />
            <span>{isVerifying ? 'Verifying Cipher...' : 'Unlock My Surprise 🔒 ✨'}</span>
          </button>
        </form>

        <span className="text-[11px] text-slate-400 mt-4 flex items-center gap-1.5">
          🎧 Headphones recommended for the complete musical unboxing experience
        </span>
      </div>

      {/* Bottom Floating Badges matching Stitch 16 */}
      <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
        <div className="p-3 bg-white/90 backdrop-blur-xs rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-2 text-xs font-bold text-slate-700">
          <Cake className="w-4 h-4 text-purple-600" />
          <span>Party Time</span>
        </div>

        <div className="px-4 py-2 bg-white/80 rounded-full border border-slate-200 text-xs text-slate-600 font-medium">
          • Handcrafted with love
        </div>

        <div className="p-3 bg-white/90 backdrop-blur-xs rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-2 text-xs font-bold text-slate-700">
          <Music className="w-4 h-4 text-purple-600" />
          <span>Soundtrack Ready</span>
        </div>
      </div>
    </div>
  );
};
