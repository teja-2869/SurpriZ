import React, { useState } from 'react';
import {
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Check,
  Sliders,
  Play,
  Volume2,
  Heart
} from 'lucide-react';
import { Gift, PaletteId } from '../../types/gift';
import { PALETTES } from '../../data/defaultGiftData';
import { sound } from '../../utils/soundEngine';

interface Step9Props {
  gift: Gift;
  onUpdate: (updated: Partial<Gift>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const Step9Palette: React.FC<Step9Props> = ({
  gift,
  onUpdate,
  onNext,
  onBack
}) => {
  const [selectedPalette, setSelectedPalette] = useState<PaletteId>(gift.palette || 'lavender');
  const [saturation, setSaturation] = useState(18);
  const [activeSwatch, setActiveSwatch] = useState<string>('#DDD6FE');

  const activePalObj = PALETTES.find((p) => p.id === selectedPalette) || PALETTES[1];

  const handleSelect = (id: PaletteId) => {
    sound.playSparkle();
    setSelectedPalette(id);
    onUpdate({ palette: id });
  };

  const handleNext = () => {
    sound.playSparkle();
    onUpdate({ palette: selectedPalette });
    onNext();
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 flex flex-col items-center">
      {/* Step Indicator */}
      <div className="w-full flex items-center justify-between mb-4 max-w-5xl">
        <span className="text-xs uppercase font-bold tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
          STEP 09 OF 12 • CREATOR STUDIO
        </span>
        <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          ✓ Palette Engine Synchronized
        </span>
      </div>

      <div className="w-full max-w-5xl h-1.5 bg-[#EAE0D8] rounded-full overflow-hidden mb-6">
        <div className="w-9/12 h-full bg-[#8B5CF6] rounded-full transition-all duration-300" />
      </div>

      {/* Headline */}
      <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-center text-[#2D232E] tracking-tight">
        Dress your memories in perfect hues 🎨
      </h2>
      <p className="mt-2 text-sm sm:text-base text-[#6D5D6E] text-center max-w-xl">
        Choose an emotional palette to tint gift wrapping, stationery cards, sticker accents, and ambient lighting.
      </p>

      <span className="mt-3 text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
        Dynamic Washi & 3D Ink Ready
      </span>

      {/* 2-Column Split matching Stitch 10 */}
      <div className="mt-8 w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: 5 Handcrafted Harmonizers (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-display text-lg font-bold text-[#2D232E]">
              Curated Emotional Palettes
            </h3>
            <span className="text-xs text-slate-400">5 Handcrafted Harmonizers</span>
          </div>

          {PALETTES.map((pal) => {
            const isSelected = selectedPalette === pal.id;
            return (
              <div
                key={pal.id}
                onClick={() => handleSelect(pal.id)}
                className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                  isSelected
                    ? 'bg-white border-purple-400 shadow-md ring-2 ring-purple-200'
                    : 'bg-white/80 border-[#EFE5DE] shadow-2xs hover:bg-white hover:border-purple-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                      isSelected ? 'bg-purple-600 text-white shadow-2xs' : 'border-2 border-slate-300'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5" />}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-display text-base font-bold text-[#2D232E]">
                        {pal.name}
                      </h4>
                      {isSelected && (
                        <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-100">
                          CURRENT CHOICE
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500">{pal.mood}</p>
                    <p className="text-[11px] text-[#8C7A87] mt-0.5">{pal.description}</p>
                  </div>
                </div>

                {/* 4 Color Swatches */}
                <div className="flex items-center gap-1.5 shrink-0 bg-slate-50 p-1.5 rounded-full border border-slate-200">
                  {pal.colors.map((c, i) => (
                    <div
                      key={i}
                      style={{ backgroundColor: c }}
                      className="w-5 h-5 rounded-full shadow-2xs border border-black/10"
                    />
                  ))}
                </div>
              </div>
            );
          })}

          {/* Custom Accent Tint & Saturation Slider */}
          <div className="p-5 bg-white rounded-2xl border border-[#EFE5DE] shadow-sm flex flex-col gap-3 mt-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#2D232E] flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-purple-600" />
                Custom Accent Tint & Saturation
              </span>
              <span className="text-xs font-mono font-bold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full">
                Warm Soft +{saturation}%
              </span>
            </div>

            <input
              type="range"
              min="0"
              max="50"
              value={saturation}
              onChange={(e) => setSaturation(Number(e.target.value))}
              className="w-full accent-purple-600"
            />

            <div className="flex justify-between text-[10px] font-bold text-slate-400">
              <span>Pastel Air</span>
              <span>Rich Velvet</span>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-slate-100 text-[11px] text-slate-600">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-400" /> Primary Foil: Lavender
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-300" /> Secondary Ribbon: Peach
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-100 border border-slate-300" /> Base Stock: Pure Cream
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Live Palette Reflection (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-slate-700 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              Live Palette Reflection
            </span>
            <span className="text-purple-700 font-bold">
              {activePalObj.name} (Active)
            </span>
          </div>

          {/* Live Reflection Card matching Stitch 10 */}
          <div className="bg-white p-6 rounded-3xl border border-[#EFE5DE] shadow-md flex flex-col relative overflow-hidden">
            {/* Ribbon at Top */}
            <div className="w-24 h-5 bg-purple-200/80 -top-2.5 left-1/2 -translate-x-1/2 absolute rounded-xs shadow-xs" />

            <div className="flex items-center justify-between mt-2 mb-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                DREAMY & WHIMSICAL HARMONY
              </span>
              <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
                ♥ FOR {gift.recipient.name.toUpperCase()}
              </span>
            </div>

            <h3 className="font-display text-2xl font-bold text-[#2D232E]">
              {gift.recipient.name}'s 25th Memory Vault
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              A curated collection of rooftop talks and golden laughters.
            </p>

            {/* Polaroid Reflection */}
            <div className="bg-[#FAF5FF] p-4 rounded-2xl border border-purple-100 flex flex-col items-center">
              <div className="w-full aspect-square rounded-xl overflow-hidden bg-slate-100 mb-3 shadow-inner relative">
                <img
                  src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=500&q=80"
                  alt="Celebration"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-2 left-2 text-[10px] font-handwriting bg-white/80 px-2 py-0.5 rounded shadow-xs">
                  {gift.recipient.name}'s Celebration
                </span>
              </div>

              {/* Tint Strip */}
              <div className="w-full flex items-center justify-between px-2 py-1 bg-white rounded-lg border border-slate-200 shadow-2xs mb-2">
                {activePalObj.colors.map((c, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      sound.playSparkle();
                      setActiveSwatch(c);
                    }}
                    style={{ backgroundColor: c }}
                    className="w-5 h-5 rounded-md cursor-pointer hover:scale-110 transition-transform shadow-2xs"
                  />
                ))}
                <span className="text-xs">🎂</span>
              </div>

              <h4 className="font-handwriting text-xl font-bold text-slate-800 text-center mt-1">
                "Rooftop sunset in Lisbon • Aug 2024"
              </h4>
            </div>

            {/* Voice Note Bar */}
            <div className="mt-4 p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => sound.playChime()}
                  className="w-7 h-7 rounded-full bg-[#8B5CF6] text-white flex items-center justify-center shadow-xs"
                >
                  <Play className="w-3.5 h-3.5 ml-0.5" />
                </button>
                <div>
                  <span className="font-bold text-[#2D232E] block">Voice Note from {gift.sender.name}</span>
                  <span className="text-[10px] text-slate-400">0:42 • Recorded in Paris</span>
                </div>
              </div>

              <div className="flex items-center gap-0.5 h-3">
                {[40, 70, 90, 50, 30].map((h, i) => (
                  <div key={i} style={{ height: `${h}%` }} className="w-0.5 rounded-full bg-purple-500" />
                ))}
              </div>
            </div>

            {/* Instant Tint Test Swatches */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-[10px] font-bold text-slate-400">
                Instant Tint Test (Tap Swatch)
              </span>
              <span className="text-[10px] text-purple-600 font-bold">Triggers Live Ink Sync</span>
            </div>

            <div className="grid grid-cols-4 gap-2 mt-2 text-center text-[10px] font-bold text-slate-600">
              <div
                onClick={() => {
                  sound.playSparkle();
                  setActiveSwatch('#DDD6FE');
                }}
                className="p-2 rounded-xl bg-purple-50 border border-purple-200 cursor-pointer hover:bg-purple-100"
              >
                <div className="w-4 h-4 rounded-full bg-[#DDD6FE] mx-auto mb-1" />
                Lilac
              </div>
              <div
                onClick={() => {
                  sound.playSparkle();
                  setActiveSwatch('#FBCFE8');
                }}
                className="p-2 rounded-xl bg-pink-50 border border-pink-200 cursor-pointer hover:bg-pink-100"
              >
                <div className="w-4 h-4 rounded-full bg-[#FBCFE8] mx-auto mb-1" />
                Blush
              </div>
              <div
                onClick={() => {
                  sound.playSparkle();
                  setActiveSwatch('#FFFBEB');
                }}
                className="p-2 rounded-xl bg-amber-50 border border-amber-200 cursor-pointer hover:bg-amber-100"
              >
                <div className="w-4 h-4 rounded-full bg-[#FFFBEB] border border-slate-300 mx-auto mb-1" />
                Cream
              </div>
              <div
                onClick={() => {
                  sound.playSparkle();
                  setActiveSwatch('#4C1D95');
                }}
                className="p-2 rounded-xl bg-purple-100 border border-purple-300 cursor-pointer hover:bg-purple-200"
              >
                <div className="w-4 h-4 rounded-full bg-[#4C1D95] mx-auto mb-1" />
                Plum
              </div>
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
          <ArrowLeft className="w-4 h-4" /> Back to Templates
        </button>

        <span className="text-xs text-purple-700 font-semibold hidden sm:block">
          • Autosaved to Gift Blueprint
        </span>

        <button
          type="button"
          onClick={handleNext}
          className="px-8 py-3.5 rounded-full bg-[#C084FC] hover:bg-[#A855F7] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
        >
          <span>Continue to Animation Studio ✨</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
