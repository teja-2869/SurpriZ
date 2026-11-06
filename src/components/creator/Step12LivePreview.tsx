import React, { useState } from 'react';
import {
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Check,
  RotateCcw,
  Smartphone,
  Monitor,
  Play,
  ShieldCheck,
  Music2,
  Lock,
  Volume2
} from 'lucide-react';
import { Gift } from '../../types/gift';
import { sound } from '../../utils/soundEngine';
import { fireConfettiExplosion } from '../../utils/confettiEngine';

interface Step12Props {
  gift: Gift;
  onNext: () => void;
  onBack: () => void;
  onLaunchRecipient: () => void;
}

export const Step12LivePreview: React.FC<Step12Props> = ({
  gift,
  onNext,
  onBack,
  onLaunchRecipient
}) => {
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [sealBroken, setSealBroken] = useState(false);
  const [activeChapter, setActiveChapter] = useState(1);

  const handleSimulateBreakSeal = () => {
    sound.playBoxOpen();
    fireConfettiExplosion(0.5, 0.45);
    setSealBroken(true);
    setTimeout(() => {
      setActiveChapter(2);
    }, 1000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 py-6 flex flex-col items-center">
      {/* Top Header Bar matching Stitch 13 */}
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 mb-4 pb-4 border-b border-[#EFE5DE]">
        <button
          onClick={onBack}
          className="text-xs font-bold text-slate-700 hover:text-purple-700 flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Visual Editor
        </button>

        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-100">
            STEP 12 OF 12 • PRE-RELEASE AUDIT
          </span>
          <span className="text-xs font-bold text-slate-700">
            • {gift.recipient.name}'s 25th Birthday
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Device Toggle */}
          <div className="flex items-center p-1 bg-white rounded-xl border border-slate-200 text-xs font-bold shadow-2xs">
            <button
              onClick={() => setDevice('desktop')}
              className={`px-3 py-1 rounded-lg flex items-center gap-1.5 transition-colors ${
                device === 'desktop' ? 'bg-slate-900 text-white' : 'text-slate-500'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" /> Desktop
            </button>
            <button
              onClick={() => setDevice('mobile')}
              className={`px-3 py-1 rounded-lg flex items-center gap-1.5 transition-colors ${
                device === 'mobile' ? 'bg-slate-900 text-white' : 'text-slate-500'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" /> Mobile
            </button>
          </div>

          <button
            onClick={() => {
              sound.playSparkle();
              setSealBroken(false);
              setActiveChapter(1);
            }}
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
            title="Reload Preview"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => {
              sound.playBoxOpen();
              onLaunchRecipient();
            }}
            className="px-4 py-2 rounded-xl bg-[#C084FC] hover:bg-[#A855F7] text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition-all active:scale-95"
          >
            <Play className="w-3.5 h-3.5 fill-current" /> Play Experience
          </button>
        </div>
      </div>

      {/* Interactive Recipient Viewport Browser Frame matching Stitch 13 */}
      <div className="w-full flex items-center justify-between text-xs text-slate-400 mb-2 px-2">
        <span className="flex items-center gap-1.5 text-emerald-600 font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          INTERACTIVE RECIPIENT VIEWPORT
        </span>
        <span className="font-mono">1440 × 900 (Simulated Scale 78%) • WebGL Confetti: ON</span>
      </div>

      <div
        className={`w-full ${
          device === 'mobile' ? 'max-w-md' : 'max-w-5xl'
        } bg-[#FFFDF9] rounded-3xl border-4 border-slate-200 shadow-2xl overflow-hidden flex flex-col relative transition-all duration-300`}
      >
        {/* Browser Top URL Bar */}
        <div className="bg-[#FAF5F2] px-4 py-2.5 border-b border-[#EFE5DE] flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          </div>

          <div className="flex items-center gap-2 px-6 py-1 bg-white rounded-full border border-slate-200 text-[11px] font-mono text-slate-600 shadow-inner">
            <Lock className="w-3 h-3 text-emerald-600" />
            <span>https://surpriz.love/{gift.slug}/preview</span>
          </div>

          <span className="text-[10px] font-mono">🔒</span>
        </div>

        {/* Viewport Canvas Content */}
        <div className="p-8 sm:p-12 min-h-[480px] bg-gradient-to-b from-[#FFF9F5] to-[#FAF2EE] flex flex-col items-center justify-center relative overflow-hidden">
          {/* Chapter Dots Header */}
          <div className="absolute top-6 right-8 flex items-center gap-1.5 bg-white/80 backdrop-blur-xs p-1.5 rounded-full border border-slate-200 shadow-2xs">
            {[1, 2, 3, 4, 5].map((ch) => (
              <button
                key={ch}
                onClick={() => {
                  sound.playSparkle();
                  setActiveChapter(ch);
                }}
                className={`w-6 h-6 rounded-full text-[10px] font-bold flex items-center justify-center transition-all ${
                  activeChapter === ch
                    ? 'bg-[#C084FC] text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-700'
                }`}
              >
                {ch}
              </button>
            ))}
          </div>

          {/* Left Floating Polaroid Card */}
          <div className="hidden lg:block absolute left-8 top-16 w-44 bg-white p-2.5 pb-4 rounded-xl shadow-lg -rotate-6 border border-slate-200">
            <div className="w-12 h-3.5 bg-rose-200 -top-2 left-1/2 -translate-x-1/2 absolute rounded-xs" />
            <img
              src={gift.photos[0]?.url || 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=300&q=80'}
              alt="Paris moment"
              className="w-full aspect-square object-cover rounded mb-2"
            />
            <p className="font-handwriting text-base font-bold text-center text-slate-800">
              "Paris, June '22"
            </p>
          </div>

          {/* Right Floating Polaroid Card */}
          <div className="hidden lg:block absolute right-8 bottom-16 w-44 bg-white p-2.5 pb-4 rounded-xl shadow-lg rotate-6 border border-slate-200">
            <div className="w-12 h-3.5 bg-purple-200 -top-2 left-1/2 -translate-x-1/2 absolute rounded-xs" />
            <img
              src={gift.photos[1]?.url || 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=300&q=80'}
              alt="Together"
              className="w-full aspect-square object-cover rounded mb-2"
            />
            <p className="font-handwriting text-base font-bold text-center text-slate-800">
              "Always by your side"
            </p>
          </div>

          {/* Center Parcel */}
          <div className="flex flex-col items-center text-center z-10">
            <span className="text-[11px] font-bold text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200 mb-4">
              ✦ Chapter 1 of 5: The Sealed Parcel
            </span>

            {/* 3D Box Illustration */}
            <div className="w-48 h-48 rounded-3xl bg-gradient-to-tr from-[#9880B9] to-[#C084FC] shadow-2xl border-4 border-white/60 relative flex items-center justify-center mb-6 transition-transform hover:scale-105 duration-300">
              {/* Ribbon cross */}
              <div className="absolute inset-y-0 w-8 bg-[#FED7AA] shadow-xs" />
              <div className="absolute inset-x-0 h-8 bg-[#FED7AA] shadow-xs" />

              {/* Seal */}
              <div className="w-14 h-14 rounded-full bg-[#6B5B95] text-white flex items-center justify-center font-display text-2xl font-bold shadow-lg z-10 border-2 border-white">
                M
              </div>

              {/* Tag */}
              <div className="absolute bottom-2 bg-white/90 px-3 py-0.5 rounded-full text-[10px] font-bold text-purple-900 shadow-xs">
                ♡ For {gift.recipient.name}, With Love
              </div>
            </div>

            <button
              type="button"
              onClick={handleSimulateBreakSeal}
              className="px-6 py-3 rounded-full bg-white hover:bg-slate-50 border border-purple-200 shadow-md text-purple-900 font-bold text-xs flex items-center gap-2 active:scale-95 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-purple-600" />
              {sealBroken ? '✓ Seal Broken! (Unwrapped)' : 'Simulate Recipient Tap to Break Seal'}
            </button>

            <p className="text-[11px] text-slate-400 mt-2 max-w-xs">
              {gift.recipient.name} will experience real-time ribbon uncurling and particle release.
            </p>

            {/* Audio Bar */}
            <div className="mt-8 flex items-center gap-3 px-4 py-2 bg-white/90 backdrop-blur-md rounded-full border border-slate-200 shadow-xs">
              <button
                onClick={() => sound.toggleSoundtrack()}
                className="w-7 h-7 rounded-full bg-[#8B5CF6] text-white flex items-center justify-center"
              >
                <Play className="w-3.5 h-3.5 ml-0.5" />
              </button>
              <div className="text-left text-xs">
                <span className="font-bold text-slate-800 block">{gift.music.title}</span>
                <span className="text-[10px] text-slate-400">01:14 / {gift.music.duration}</span>
              </div>
              <div className="flex items-center gap-0.5 h-3 px-2">
                {[30, 60, 90, 45, 20].map((h, i) => (
                  <div key={i} style={{ height: `${h}%` }} className="w-0.5 bg-purple-600 rounded-full" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Status Cards matching Stitch 13 */}
      <div className="mt-8 w-full max-w-5xl grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center text-lg shrink-0">
            <Check className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400">RELEASE READINESS</span>
            <h4 className="text-sm font-bold text-[#2D232E]">100% Ready</h4>
            <p className="text-[11px] text-slate-500">All 5 chapters compiled</p>
          </div>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-lg shrink-0">
            <Music2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400">SOUNDTRACK PIPELINE</span>
            <h4 className="text-sm font-bold text-[#2D232E]">Audio Synced</h4>
            <p className="text-[11px] text-slate-500">Fade-in at ribbon untie</p>
          </div>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-lg shrink-0">
            <Monitor className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400">RESPONSIVE CANVAS</span>
            <h4 className="text-sm font-bold text-[#2D232E]">Mobile Verified</h4>
            <p className="text-[11px] text-slate-500">iOS Safari & Android tested</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-10 w-full max-w-5xl flex items-center justify-between pt-6 border-t border-[#F0E6DE]">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3 rounded-full bg-white hover:bg-slate-50 border border-[#EAE0D8] text-xs font-bold text-slate-700 shadow-2xs transition-all flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Editor
        </button>

        <span className="text-xs text-slate-500 hidden sm:block">
          Next: Deliver via Link or Timed SMS • Scheduled for: Friday 9:00 AM
        </span>

        <button
          type="button"
          onClick={onNext}
          className="px-8 py-3.5 rounded-full bg-[#6B5B95] hover:bg-[#584880] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
        >
          <span>Proceed to Final Review ✨</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
