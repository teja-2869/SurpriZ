import React from 'react';
import { Sparkles, Gift, Heart, ArrowRight, Smile, Music, Cake, Volume2 } from 'lucide-react';
import { sound } from '../../utils/soundEngine';

interface WelcomeScreenProps {
  onStart: () => void;
  onExploreMood: (mood: string) => void;
  onOpenRecipient: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onStart,
  onExploreMood,
  onOpenRecipient
}) => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 md:py-12 flex flex-col items-center">
      {/* Top micro badges */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-100 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-rose-500" />
          100% Free digital keepsake
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-100 shadow-2xs">
          <Heart className="w-3.5 h-3.5 text-purple-500" />
          Made for milestone smiles
        </span>
      </div>

      {/* Main Headline */}
      <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-center text-[#2D232E] tracking-tight max-w-3xl leading-[1.15]">
        Someone deserves a little magic.
      </h1>

      <p className="mt-5 text-base sm:text-lg text-[#6D5D6E] text-center max-w-2xl leading-relaxed">
        Turn your favourite moments into a surprise they'll never forget.
        Unfold digital letters, unbox memories, and sprinkle real warmth across any distance.
      </p>

      {/* Primary CTA */}
      <div className="mt-8 flex flex-col items-center gap-2.5">
        <button
          onClick={() => {
            sound.playBoxOpen();
            onStart();
          }}
          className="group px-8 py-4 rounded-full bg-gradient-to-r from-[#F472B6] via-[#C084FC] to-[#8B5CF6] text-white font-bold text-base sm:text-lg shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3 cursor-pointer"
        >
          <Gift className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          <span>Create a Surprise 🎁</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
        <span className="text-xs text-[#8C7A87]">
          No account. No complicated setup. Just love.
        </span>
      </div>

      {/* Three Hero Tilt Polaroid Cards matching Stitch 01 */}
      <div className="mt-14 w-full grid grid-cols-1 md:grid-cols-3 gap-6 items-center max-w-4xl">
        {/* Left Card: Summer '24 Rooftop giggles */}
        <div
          onClick={() => {
            sound.playCameraClick();
            onOpenRecipient();
          }}
          className="bg-white p-4 pb-6 rounded-2xl shadow-md border border-[#F0E6DE] -rotate-4 hover:rotate-0 hover:scale-105 transition-all duration-300 cursor-pointer relative group"
        >
          <div className="w-16 h-5 bg-rose-200/80 -top-2.5 left-1/2 -translate-x-1/2 absolute rounded-xs shadow-xs" />
          <div className="w-full aspect-square rounded-xl overflow-hidden bg-slate-100 mb-3">
            <img
              src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80"
              alt="Summer '24 Rooftop giggles"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <p className="font-handwriting text-2xl font-bold text-[#2D232E] text-center">
            Summer '24 Rooftop giggles
          </p>
        </div>

        {/* Center Card: Barnaby the Bear Gift Courier */}
        <div
          onClick={() => {
            sound.playBoxOpen();
            onOpenRecipient();
          }}
          className="bg-white p-5 pb-7 rounded-3xl shadow-xl border-2 border-purple-200 z-10 hover:scale-105 transition-all duration-300 cursor-pointer relative group"
        >
          <div className="w-full aspect-square rounded-2xl overflow-hidden bg-gradient-to-b from-purple-50 to-pink-50 mb-4 flex flex-col items-center justify-center relative p-3">
            <img
              src="https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=600&q=80"
              alt="Barnaby the Bear"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover rounded-xl"
            />
            <span className="absolute top-5 left-5 text-xs font-bold text-white bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded-full">
              Opening
            </span>
            <div className="absolute bottom-4 inset-x-4 bg-white/95 backdrop-blur-md py-2 px-3 rounded-xl border border-purple-100 shadow-md flex items-center justify-between text-xs">
              <span className="font-bold text-purple-900">Barnaby the Bear</span>
              <span className="text-[10px] bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded-full">
                Gift Courier
              </span>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-purple-700 bg-purple-50 py-2 rounded-xl">
            <Gift className="w-4 h-4 text-purple-600 animate-bounce" />
            <span>Tap to peek ribbon • Ready to unwrap</span>
          </div>
        </div>

        {/* Right Card: Cake for breakfast! ✨ */}
        <div
          onClick={() => {
            sound.playChime();
            onOpenRecipient();
          }}
          className="bg-white p-4 pb-6 rounded-2xl shadow-md border border-[#F0E6DE] rotate-3 hover:rotate-0 hover:scale-105 transition-all duration-300 cursor-pointer relative group"
        >
          <div className="w-16 h-5 bg-purple-200/80 -top-2.5 left-1/2 -translate-x-1/2 absolute rounded-xs shadow-xs" />
          <div className="w-full aspect-square rounded-xl overflow-hidden bg-slate-100 mb-3">
            <img
              src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80"
              alt="Cake for breakfast"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <p className="font-handwriting text-2xl font-bold text-[#2D232E] text-center">
            Cake for breakfast! ✨
          </p>
        </div>
      </div>

      {/* Mood Selector Kits matching Stitch 01 bottom */}
      <div className="mt-16 w-full max-w-4xl bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 border border-[#EFE5DE] shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-display text-xl font-bold text-[#2D232E]">Choose a Surprise Mood</h3>
            <p className="text-xs text-[#8C7A87]">
              Tap a kit below to sample animations, musical chimes, and interactive confetti.
            </p>
          </div>
          <span className="text-xs font-bold text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-100">
            3 Interactive Kits
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Kit 1 */}
          <div
            onClick={() => {
              sound.playChime();
              onExploreMood('Birthday Reverie');
            }}
            className="p-4 rounded-2xl bg-[#FFF5F5] hover:bg-[#FFEBEB] border border-rose-100 transition-all cursor-pointer flex items-center justify-between group active:scale-98"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center text-lg">
                🎂
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#2D232E]">Birthday Reverie</h4>
                <p className="text-xs text-rose-700">Balloons & cake candle tap</p>
                <span className="text-[10px] text-slate-400 mt-0.5 block">14 Keepsake Items</span>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-rose-400 group-hover:translate-x-1 transition-transform" />
          </div>

          {/* Kit 2 */}
          <div
            onClick={() => {
              sound.playSparkle();
              onExploreMood('Sweet Appreciation');
            }}
            className="p-4 rounded-2xl bg-[#FAF5FF] hover:bg-[#F3E8FF] border border-purple-100 transition-all cursor-pointer flex items-center justify-between group active:scale-98"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center text-lg">
                💜
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#2D232E]">Sweet Appreciation</h4>
                <p className="text-xs text-purple-700">Letters, Polaroids & hugs</p>
                <span className="text-[10px] text-slate-400 mt-0.5 block">Audio capsule ready</span>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-purple-400 group-hover:translate-x-1 transition-transform" />
          </div>

          {/* Kit 3 */}
          <div
            onClick={() => {
              sound.playWaxPop();
              onExploreMood('Just Because Joy');
            }}
            className="p-4 rounded-2xl bg-[#FFFBEB] hover:bg-[#FEF3C7] border border-amber-100 transition-all cursor-pointer flex items-center justify-between group active:scale-98"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center text-lg">
                🎈
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#2D232E]">Just Because Joy</h4>
                <p className="text-xs text-amber-700">Stickers, jokes & tiny thrills</p>
                <span className="text-[10px] text-slate-400 mt-0.5 block">Instant share link</span>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
};
