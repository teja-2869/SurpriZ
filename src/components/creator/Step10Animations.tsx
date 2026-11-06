import React, { useState } from 'react';
import {
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Check,
  Play,
  RotateCcw,
  Sliders,
  Volume2,
  Eye,
  Plus
} from 'lucide-react';
import { Gift, GiftAnimations } from '../../types/gift';
import { sound } from '../../utils/soundEngine';
import { fireConfettiExplosion, fireHeartSparkles } from '../../utils/confettiEngine';

interface Step10Props {
  gift: Gift;
  onUpdate: (updated: Partial<Gift>) => void;
  onNext: () => void;
  onBack: () => void;
}

interface MotionModule {
  id: string;
  title: string;
  category: string;
  description: string;
  trigger: string;
  badge: string;
  icon: string;
}

const MODULES: MotionModule[] = [
  {
    id: 'confetti',
    title: 'Confetti Explosion',
    category: 'Celebration Trigger',
    description: 'Pastel streamers & gilded star ribbons detonating upon lid release.',
    trigger: 'Unboxing Lid Release',
    badge: 'Simulated Burst',
    icon: '🎉'
  },
  {
    id: 'hearts',
    title: 'Floating Hearts',
    category: 'Ambient Mood',
    description: 'Translucent blush & lilac hearts rising with unhurried organic drift.',
    trigger: 'Letter Unroll Ambiance',
    badge: 'Ascent Drift',
    icon: '💜'
  },
  {
    id: 'petals',
    title: 'Flower Petals',
    category: 'Ambient Breeze',
    description: 'Cascading cherry blossom & cream rose petals tumbling gently down.',
    trigger: 'Continuous Cascade',
    badge: 'Gentle Swirl',
    icon: '🌸'
  },
  {
    id: 'sparkles',
    title: 'Star Dust Sparkles',
    category: 'Tactile Touch',
    description: 'Twinkling 4-point golden stardust blooming upon photo and card taps.',
    trigger: 'Click & Tap Echo',
    badge: 'Gilded Sparkle',
    icon: '✨'
  },
  {
    id: 'parallax',
    title: 'Polaroid Parallax',
    category: '3D Dynamics',
    description: 'Floating snapshot cards bobbing dynamically to gyroscopic & cursor tilt.',
    trigger: 'Gyro & Mouse Reactive',
    badge: 'Spatial Tilt',
    icon: '📷'
  },
  {
    id: 'typewriter',
    title: 'Typewriter Reveal',
    category: 'Storytelling',
    description: 'Letter text breathes onto canvas character-by-character with soft clicks.',
    trigger: 'Heartfelt Unroll',
    badge: 'Vintage Keystrokes',
    icon: '✍️'
  },
  {
    id: 'wax_seal',
    title: 'Wax Seal Release',
    category: 'Unboxing Gate',
    description: 'Tactile ribbon unraveling as the stamped golden wax stamp splits cleanly.',
    trigger: 'Unwrap Gate Opener',
    badge: 'Spring Resistance',
    icon: '🔒'
  },
  {
    id: 'box_pop',
    title: 'Surprise Box Pop',
    category: 'Grand Climax',
    description: 'Box lid springing open accompanied by a plush courier bear floating forward.',
    trigger: 'Grand Finale Climax',
    badge: '3D Bouncy Spring',
    icon: '🎁'
  }
];

export const Step10Animations: React.FC<Step10Props> = ({
  gift,
  onUpdate,
  onNext,
  onBack
}) => {
  const [activeEffects, setActiveEffects] = useState<string[]>(
    gift.animations.activeEffects || ['confetti', 'hearts', 'sparkles']
  );
  const [intensity, setIntensity] = useState<'gentle' | 'balanced' | 'festive'>(
    gift.animations.intensity || 'balanced'
  );
  const [soundSync, setSoundSync] = useState(gift.animations.soundSync ?? true);
  const [respectReducedMotion, setRespectReducedMotion] = useState(
    gift.animations.respectReducedMotion ?? false
  );

  const toggleModule = (id: string) => {
    sound.playSparkle();
    if (activeEffects.includes(id)) {
      setActiveEffects(activeEffects.filter((x) => x !== id));
    } else {
      setActiveEffects([...activeEffects, id]);
      if (id === 'confetti') fireConfettiExplosion();
      if (id === 'hearts') fireHeartSparkles();
    }
  };

  const handleTestBurst = () => {
    sound.playBoxOpen();
    fireConfettiExplosion();
    fireHeartSparkles();
  };

  const handleNext = () => {
    sound.playSparkle();
    onUpdate({
      animations: {
        activeEffects,
        intensity,
        density: intensity === 'gentle' ? 20 : intensity === 'balanced' ? 45 : 80,
        soundSync,
        respectReducedMotion
      }
    });
    onNext();
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 flex flex-col items-center">
      {/* Step Indicator */}
      <div className="w-full flex items-center justify-between mb-4 max-w-5xl">
        <span className="text-xs uppercase font-bold tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
          STEP 10 OF 12 • CREATOR STUDIO
        </span>
        <span className="text-xs font-mono font-bold text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
          ✦ Selected FX: {activeEffects.length} Choreographed • 60 FPS
        </span>
      </div>

      <div className="w-full max-w-5xl h-1.5 bg-[#EAE0D8] rounded-full overflow-hidden mb-6">
        <div className="w-10/12 h-full bg-[#8B5CF6] rounded-full transition-all duration-300" />
      </div>

      {/* Headline */}
      <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-center text-[#2D232E] tracking-tight">
        Sprinkle interactive magic & motion ✨
      </h2>
      <p className="mt-2 text-sm sm:text-base text-[#6D5D6E] text-center max-w-xl">
        Choreograph celebratory particle bursts, tactile reveals, and unboxing transitions.
      </p>

      {/* 2-Column Split matching Stitch 11 */}
      <div className="mt-8 w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Motion Library (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <h3 className="font-display text-lg font-bold text-[#2D232E]">
                Motion Library
              </h3>
              <span className="text-xs font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">
                8 Modules
              </span>
            </div>
            <span className="text-xs text-slate-400">Click cards to toggle stage presence</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {MODULES.map((mod) => {
              const isActive = activeEffects.includes(mod.id);
              return (
                <div
                  key={mod.id}
                  onClick={() => toggleModule(mod.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isActive
                      ? 'bg-white border-purple-400 shadow-md ring-2 ring-purple-200'
                      : 'bg-white/80 border-[#EFE5DE] shadow-2xs hover:bg-white hover:border-purple-200'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center text-sm shadow-2xs">
                        {mod.icon}
                      </div>

                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isActive
                            ? 'bg-purple-600 text-white'
                            : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {isActive ? 'Active ✓' : 'Inactive +'}
                      </span>
                    </div>

                    <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">
                      {mod.category}
                    </span>

                    <h4 className="font-display text-sm font-bold text-[#2D232E] mt-0.5 mb-1">
                      {mod.title}
                    </h4>

                    <p className="text-[11px] text-[#6D5D6E] leading-relaxed mb-3">
                      {mod.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                    <span className="font-medium">{mod.trigger}</span>
                    <span className="font-mono text-purple-600 font-bold">{mod.badge}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Live Stage Canvas & Choreography Panel (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Live Stage Canvas matching Stitch 11 */}
          <div className="bg-white p-6 rounded-3xl border border-[#EFE5DE] shadow-md flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Play className="w-3.5 h-3.5 text-purple-600" />
                Live Stage Canvas
              </span>

              <button
                type="button"
                onClick={handleTestBurst}
                className="px-3 py-1 rounded-full bg-purple-50 hover:bg-purple-100 border border-purple-200 text-xs font-bold text-purple-700 flex items-center gap-1 shadow-2xs transition-colors"
              >
                <RotateCcw className="w-3 h-3" /> Test Burst
              </button>
            </div>

            {/* Simulated Stage Box */}
            <div
              onClick={handleTestBurst}
              className="w-full aspect-[4/3] rounded-2xl bg-gradient-to-b from-[#FAF5FF] to-[#FFF5F8] border border-purple-100 p-4 flex flex-col items-center justify-center relative cursor-pointer group shadow-inner overflow-hidden"
            >
              {/* Floating tilted polaroid */}
              <div className="absolute top-4 left-4 w-20 h-24 bg-white p-1 rounded-md shadow-md -rotate-12 border border-slate-200">
                <img
                  src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=150&q=80"
                  alt="Snapshot"
                  className="w-full h-14 object-cover rounded-xs"
                />
                <span className="font-handwriting text-[8px] font-bold block text-center mt-1">July in Paris</span>
              </div>

              {/* Central Parcel Box with Ribbon */}
              <div className="w-28 h-28 rounded-2xl bg-gradient-to-tr from-[#C084FC] to-[#DDD6FE] shadow-xl border-2 border-white relative flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                {/* Cross ribbons */}
                <div className="absolute inset-y-0 w-6 bg-white/70" />
                <div className="absolute inset-x-0 h-6 bg-white/70" />
                <div className="w-10 h-10 rounded-full bg-white shadow-md z-10 flex items-center justify-center text-sm">
                  🎁
                </div>
              </div>

              {/* Floating Hearts in preview */}
              <span className="absolute bottom-6 right-8 text-rose-400 text-base animate-bounce">
                💖
              </span>
              <span className="absolute top-8 right-12 text-purple-400 text-xs">
                ✦
              </span>

              <span className="text-[10px] font-bold text-purple-900 bg-white/80 px-3 py-1 rounded-full shadow-2xs mt-4">
                • Tap parcel to trigger effects
              </span>
            </div>

            <div className="flex items-center justify-between text-[10px] text-slate-400 mt-3 pt-2 border-t border-slate-100">
              <span>Stage latency: 12ms (WebGL Accel)</span>
              <span>Recipient Viewport Preview</span>
            </div>
          </div>

          {/* Motion Choreography Panel matching Stitch 11 */}
          <div className="bg-white p-6 rounded-3xl border border-[#EFE5DE] shadow-md flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-[#2D232E] flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-purple-600" />
                Motion Choreography
              </h4>
              <span className="text-[10px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded">
                Tactile Feedback
              </span>
            </div>

            {/* Motion Intensity */}
            <div>
              <div className="flex items-center justify-between mb-1.5 text-xs">
                <span className="font-bold text-slate-700">Motion Intensity</span>
                <span className="font-bold text-purple-700 capitalize">
                  ✦ {intensity} (Recommended)
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {(['gentle', 'balanced', 'festive'] as const).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => {
                      sound.playSparkle();
                      setIntensity(lvl);
                    }}
                    className={`py-1.5 rounded-xl text-xs font-bold capitalize transition-colors ${
                      intensity === lvl
                        ? 'bg-[#C084FC] text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Particle Density */}
            <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-[#2D232E] block">Particle Density</span>
                <span className="text-[10px] text-slate-400">Real-time emission rate</span>
              </div>
              <span className="text-[11px] font-mono font-bold text-purple-700 bg-white px-2 py-1 rounded border border-slate-200">
                Moderate (45 particles/sec)
              </span>
            </div>

            {/* Sound Sync Chimes Toggle */}
            <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
              <div>
                <span className="font-bold text-[#2D232E] block">Sound Sync Chimes</span>
                <span className="text-[10px] text-slate-400">Sync bursts with soundtrack chime drops</span>
              </div>
              <button
                type="button"
                onClick={() => setSoundSync(!soundSync)}
                className={`w-10 h-6 flex items-center rounded-full p-1 transition-colors ${
                  soundSync ? 'bg-[#8B5CF6]' : 'bg-slate-300'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    soundSync ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Respect Reduced Motion */}
            <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
              <div>
                <span className="font-bold text-[#2D232E] block">Respect Reduced Motion</span>
                <span className="text-[10px] text-slate-400">Falls back to soft fades for sensitive users</span>
              </div>
              <button
                type="button"
                onClick={() => setRespectReducedMotion(!respectReducedMotion)}
                className={`w-10 h-6 flex items-center rounded-full p-1 transition-colors ${
                  respectReducedMotion ? 'bg-[#8B5CF6]' : 'bg-slate-300'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    respectReducedMotion ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
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
          <ArrowLeft className="w-4 h-4" /> Back to Palette
        </button>

        <span className="text-xs text-purple-700 font-semibold hidden sm:block">
          • {activeEffects.length} Animations Active: Confetti, Hearts & Sparkles
        </span>

        <button
          type="button"
          onClick={handleNext}
          className="px-8 py-3.5 rounded-full bg-[#6B5B95] hover:bg-[#584880] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
        >
          <span>Open Visual Gift Editor 🖌️</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
