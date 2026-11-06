import React, { useState } from 'react';
import { Sparkles, ArrowRight, Volume2, Gift as GiftIcon, Heart, BookOpen, Mail, Cake, Box, Eye, Edit3 } from 'lucide-react';
import { Gift } from '../../types/gift';
import { sound } from '../../utils/soundEngine';
import { fireConfettiExplosion, fireGrandFinaleConfetti } from '../../utils/confettiEngine';
import { AudioPlayerBar } from '../shared/AudioPlayerBar';
import { GiftBox3DStage } from '../three/GiftBox3DStage';

interface Chapter1Props {
  gift: Gift;
  onNextChapter: () => void;
  onGoToChapter: (ch: number) => void;
  onEditGift?: () => void;
}

export const Chapter1Unwrap: React.FC<Chapter1Props> = ({
  gift,
  onNextChapter,
  onGoToChapter,
  onEditGift
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [renderMode, setRenderMode] = useState<'3d' | '2d'>('3d');

  const handleBurstConfetti = () => {
    sound.playBoxOpen();
    fireConfettiExplosion();
  };

  const handleNext = () => {
    sound.playSparkle();
    onNextChapter();
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 flex flex-col items-center">
      {/* Chapter Progress Bar matching Stitch 17 */}
      <div className="w-full max-w-xl flex items-center justify-between text-xs font-semibold text-slate-500 mb-4">
        <div className="flex items-center gap-2 text-purple-900 font-bold">
          <span className="w-5 h-5 rounded-full bg-purple-700 text-white flex items-center justify-center text-[10px]">
            1
          </span>
          <span>The Unwrap</span>
        </div>
        <div className="flex-1 mx-4 h-1 bg-purple-200 rounded-full overflow-hidden">
          <div className="w-1/4 h-full bg-purple-600" />
        </div>
        <div className="flex items-center gap-4 text-slate-400 text-[11px]">
          <span>2. Gallery</span>
          <span>•</span>
          <span>3. Letter</span>
          <span>•</span>
          <span>4. Finale</span>
        </div>
      </div>

      {/* Mode Switcher: 3D Stage vs 2D Illustrated */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-[11px] font-bold text-rose-700 bg-rose-50 px-3.5 py-1 rounded-full border border-rose-100 shadow-2xs">
          ♥ A SPECIAL KEEPSAKE CAPSULE
        </span>

        <div className="flex items-center p-0.5 bg-white rounded-full border border-purple-200 shadow-2xs text-xs font-bold">
          <button
            type="button"
            onClick={() => {
              sound.playSparkle();
              setRenderMode('3d');
            }}
            className={`px-3 py-1 rounded-full flex items-center gap-1 transition-all cursor-pointer ${
              renderMode === '3d'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Box className="w-3.5 h-3.5" /> 3D Interactive Box
          </button>
          <button
            type="button"
            onClick={() => {
              sound.playSparkle();
              setRenderMode('2d');
            }}
            className={`px-3 py-1 rounded-full flex items-center gap-1 transition-all cursor-pointer ${
              renderMode === '2d'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Eye className="w-3.5 h-3.5" /> 2D Illustration
          </button>
        </div>

        {onEditGift && (
          <button
            type="button"
            onClick={onEditGift}
            className="px-3 py-1 rounded-full bg-purple-100 hover:bg-purple-200 text-purple-800 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
          >
            <Edit3 className="w-3 h-3" /> Edit Details
          </button>
        )}
      </div>

      {/* Headline */}
      <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-center text-[#2D232E] tracking-tight leading-tight">
        {gift.recipient.bannerHeading || `Happy ${gift.birthday?.age ?? gift.recipient?.milestoneAge ?? 25}th Birthday, ${gift.recipient.name}!`}
      </h1>

      <p className="mt-3 text-sm sm:text-base text-[#6D5D6E] text-center max-w-2xl leading-relaxed">
        Handcrafted with boundless love by <strong>{gift.sender.name}</strong> — bundled with shared laughter, midnight confessions & golden memories.
      </p>

      {/* RENDER MODE: 3D THREE.JS STAGE */}
      {renderMode === '3d' ? (
        <div className="mt-6 w-full max-w-4xl bg-white rounded-3xl border border-purple-200 shadow-xl overflow-hidden p-2 sm:p-4">
          <GiftBox3DStage
            recipientName={gift.recipient.name}
            senderName={gift.sender.name}
            onUnwrapComplete={() => {
              sound.playBoxOpen();
              fireConfettiExplosion();
              onNextChapter();
            }}
          />
        </div>
      ) : (
        /* RENDER MODE: 2D ILLUSTRATED STAGE matching Stitch 17 */
        <div className="mt-12 w-full max-w-4xl flex items-center justify-center relative min-h-[380px]">
          {/* Left Floating Polaroid */}
          <div className="hidden sm:block absolute left-4 lg:left-8 top-10 w-48 bg-white p-3 pb-5 rounded-2xl shadow-xl -rotate-12 border border-slate-200 hover:rotate-0 hover:scale-105 transition-all duration-300 z-10">
            <span className="text-[9px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full mb-1 inline-block">
              🎂 Chapter {gift.birthday?.age ?? gift.recipient?.milestoneAge ?? 25}: Best Year Yet!
            </span>
            <img
              src={gift.photos[0]?.url || 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=300&q=80'}
              alt="Memories"
              className="w-full aspect-square object-cover rounded-xl mb-2"
            />
            <p className="font-handwriting text-base font-bold text-slate-800 text-center">
              "{gift.photos[0]?.caption || 'Laughing until tears'}"
            </p>
            <span className="text-[9px] text-slate-400 block text-center mt-0.5">{gift.photos[0]?.date || 'Summer'}</span>
          </div>

          {/* Center Animated Parcel Box */}
          <div
            onClick={handleBurstConfetti}
            className="relative flex flex-col items-center cursor-pointer group z-20"
          >
            {/* Animated Lid */}
            <div
              className={`w-52 h-14 rounded-2xl bg-gradient-to-r from-[#B495D6] to-[#D5B8E8] shadow-lg border-2 border-white flex items-center justify-center relative transition-transform duration-500 ${
                isOpen ? '-translate-y-8 -rotate-3 scale-105' : 'translate-y-0'
              }`}
            >
              {/* Center golden knot */}
              <div className="w-10 h-10 rounded-full bg-[#FED7AA] border-2 border-white shadow-md flex items-center justify-center text-xs font-bold text-amber-900">
                ●
              </div>
              {/* Ribbon ends */}
              <div className="absolute inset-y-0 w-8 bg-[#FED7AA]/90" />
            </div>

            {/* Box Bottom Base */}
            <div className="w-48 h-44 rounded-b-3xl rounded-t-lg bg-gradient-to-tr from-[#9880B9] to-[#C084FC] shadow-2xl border-4 border-white/60 relative flex flex-col items-center justify-between p-3 overflow-hidden -mt-2">
              {/* Cross Ribbon */}
              <div className="absolute inset-y-0 w-8 bg-[#FED7AA]/80" />
              <div className="absolute inset-x-0 top-16 h-8 bg-[#FED7AA]/80" />

              <div />

              {/* Secret Envelope Tag */}
              <div className="bg-white/95 backdrop-blur-xs px-3 py-1 rounded-xl shadow-md z-10 border border-purple-100 flex items-center gap-1.5 text-[10px] font-bold text-purple-900">
                <span>☕</span>
                <span>{gift.recipient.name.toUpperCase()}'S EYES ONLY</span>
              </div>
            </div>
          </div>

          {/* Right Floating Polaroid */}
          <div className="hidden sm:block absolute right-4 lg:right-8 top-12 w-48 bg-white p-3 pb-5 rounded-2xl shadow-xl rotate-12 border border-slate-200 hover:rotate-0 hover:scale-105 transition-all duration-300 z-10">
            <div className="w-12 h-3 bg-purple-200 -top-1.5 left-1/2 -translate-x-1/2 absolute rounded-xs" />
            <img
              src={gift.photos[1]?.url || 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=300&q=80'}
              alt="Roof concert"
              className="w-full aspect-square object-cover rounded-xl mb-2"
            />
            <p className="font-handwriting text-base font-bold text-slate-800 text-center">
              "{gift.photos[1]?.caption || 'Our private concert on the roof'}"
            </p>
            <span className="text-[9px] text-slate-400 block text-center mt-0.5">{gift.photos[1]?.date || 'Summer'}</span>
          </div>
        </div>
      )}

      {/* Primary Action Buttons matching Stitch 17 */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4 z-20">
        <button
          onClick={handleNext}
          className="px-8 py-4 rounded-full bg-gradient-to-r from-[#C084FC] to-[#8B5CF6] hover:from-[#A855F7] hover:to-[#7C3AED] text-white font-bold text-base shadow-xl hover:shadow-2xl transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
        >
          <span>Step Inside the Surprise 💌</span>
          <ArrowRight className="w-5 h-5" />
        </button>

        <button
          type="button"
          onClick={handleBurstConfetti}
          className="px-6 py-4 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 shadow-sm transition-all flex items-center gap-2 cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Fire Confetti Cannon</span>
        </button>
      </div>

      {/* Floating Audio Player Bar */}
      <AudioPlayerBar
        music={gift.music}
        recipientName={gift.recipient.name}
      />
    </div>
  );
};
