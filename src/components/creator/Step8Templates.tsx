import React, { useState } from 'react';
import {
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Check,
  Eye,
  Layers,
  Film,
  Camera,
  TreePine,
  Maximize2
} from 'lucide-react';
import { Gift, TemplateId } from '../../types/gift';
import { TEMPLATES } from '../../data/defaultGiftData';
import { sound } from '../../utils/soundEngine';

interface Step8Props {
  gift: Gift;
  onUpdate: (updated: Partial<Gift>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const Step8Templates: React.FC<Step8Props> = ({
  gift,
  onUpdate,
  onNext,
  onBack
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>(gift.template || 'scrapbook');
  const [filterStyle, setFilterStyle] = useState<'all' | 'tactile' | 'spatial'>('all');

  const handleSelect = (id: TemplateId) => {
    sound.playSparkle();
    setSelectedTemplate(id);
    onUpdate({ template: id });
  };

  const handleNext = () => {
    sound.playSparkle();
    onUpdate({ template: selectedTemplate });
    onNext();
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 flex flex-col items-center">
      {/* Step Indicator */}
      <div className="w-full flex items-center justify-between mb-4 max-w-5xl">
        <span className="text-xs uppercase font-bold tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
          STEP 08 OF 12 • CREATOR STUDIO
        </span>
        <span className="text-xs font-mono font-bold text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200">
          66% Completed
        </span>
      </div>

      <div className="w-full max-w-5xl h-1.5 bg-[#EAE0D8] rounded-full overflow-hidden mb-6">
        <div className="w-8/12 h-full bg-[#8B5CF6] rounded-full transition-all duration-300" />
      </div>

      {/* Headline */}
      <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-center text-[#2D232E] tracking-tight">
        Choose how your story should unfold ✨
      </h2>
      <p className="mt-2 text-sm sm:text-base text-[#6D5D6E] text-center max-w-xl">
        Select an unboxing layout style that matches your relationship vibe and photo collection.
      </p>

      {/* Filter Tabs matching Stitch 09 */}
      <div className="mt-6 flex items-center p-1 bg-white rounded-full border border-slate-200 text-xs font-bold">
        <button
          onClick={() => setFilterStyle('all')}
          className={`px-4 py-1.5 rounded-full transition-colors ${
            filterStyle === 'all' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          All Styles (5)
        </button>
        <button
          onClick={() => setFilterStyle('tactile')}
          className={`px-4 py-1.5 rounded-full transition-colors ${
            filterStyle === 'tactile' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Tactile
        </button>
        <button
          onClick={() => setFilterStyle('spatial')}
          className={`px-4 py-1.5 rounded-full transition-colors ${
            filterStyle === 'spatial' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Spatial
        </button>
      </div>

      {/* Templates Grid matching Stitch 09 */}
      <div className="mt-8 w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6">
        {TEMPLATES.map((tmpl) => {
          const isSelected = selectedTemplate === tmpl.id;
          return (
            <div
              key={tmpl.id}
              onClick={() => handleSelect(tmpl.id)}
              className={`bg-white rounded-3xl border transition-all cursor-pointer flex flex-col justify-between overflow-hidden relative ${
                isSelected
                  ? 'border-purple-500 shadow-xl ring-2 ring-purple-300/40'
                  : 'border-[#EFE5DE] shadow-sm hover:shadow-md hover:border-purple-200'
              }`}
            >
              {/* Active Choice Top Badge */}
              {isSelected && (
                <div className="bg-[#6B5B95] text-white py-1 px-4 text-center text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1">
                  <Check className="w-3 h-3" /> ACTIVE CHOICE
                </div>
              )}

              {/* Visual Preview Illustration Header */}
              <div className="p-4 bg-slate-50 border-b border-slate-100 flex flex-col items-center justify-center h-48 relative overflow-hidden">
                {tmpl.id === 'portfolio' && (
                  <div className="w-full h-full bg-white rounded-xl shadow-xs p-3 border border-slate-200 flex flex-col justify-between">
                    <div className="flex justify-between text-[8px] font-mono text-slate-400">
                      <span>VOL. 03 • PARIS</span>
                      <span>JUNE 2024</span>
                    </div>
                    <div className="flex gap-2 items-center">
                      <div className="w-16 h-16 rounded bg-slate-200 overflow-hidden">
                        <img
                          src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=200&q=80"
                          alt="Paris"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h6 className="font-bold text-xs text-slate-800">Golden Hours.</h6>
                        <p className="text-[8px] text-slate-400">Unfiltered laughter, warm sunlight</p>
                      </div>
                    </div>
                    <span className="text-[8px] font-bold text-slate-400">CLEAN GRID SYSTEM</span>
                  </div>
                )}

                {tmpl.id === 'scrapbook' && (
                  <div className="w-full h-full bg-[#FFFBF7] rounded-xl shadow-xs p-3 border border-pink-200 relative flex items-center justify-center">
                    <div className="w-24 h-28 bg-white p-2 rounded shadow-md -rotate-6 border border-slate-100 flex flex-col">
                      <img
                        src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=200&q=80"
                        alt="Scrapbook"
                        className="w-full h-16 object-cover rounded-xs"
                      />
                      <span className="font-handwriting text-[10px] font-bold mt-1 text-center">Best day ever!</span>
                    </div>
                    <div className="w-24 h-28 bg-white p-2 rounded shadow-md rotate-6 border border-slate-100 flex flex-col -ml-6">
                      <img
                        src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=200&q=80"
                        alt="Scrapbook 2"
                        className="w-full h-16 object-cover rounded-xs"
                      />
                      <span className="font-handwriting text-[10px] font-bold mt-1 text-center">Maya & Leo 🌸</span>
                    </div>
                  </div>
                )}

                {tmpl.id === 'tree' && (
                  <div className="w-full h-full bg-[#FAFBF7] rounded-xl p-3 border border-emerald-100 flex flex-col items-center justify-center relative">
                    <span className="text-3xl mb-1">🌳</span>
                    <span className="text-[10px] font-bold text-emerald-800 bg-white px-2 py-0.5 rounded-full border border-emerald-200">
                      Interactive Canopy • 12 Blooms
                    </span>
                    <span className="text-[9px] text-slate-400 mt-1">TAP BRANCH TO EXPLORE</span>
                  </div>
                )}

                {tmpl.id === 'cinematic' && (
                  <div className="w-full h-full bg-slate-950 rounded-xl p-3 text-white flex flex-col justify-between relative overflow-hidden">
                    <div className="flex justify-between text-[8px] font-mono text-slate-400">
                      <span>KODAK PORTRA 400</span>
                      <span>■ ■ ■ ■</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                        ▶
                      </div>
                      <div>
                        <span className="text-[8px] uppercase tracking-wider text-rose-400 block font-bold">SCENE 04</span>
                        <h6 className="text-xs font-bold font-mono">"Turn the music up"</h6>
                      </div>
                    </div>
                    <div className="text-[8px] text-slate-400 font-mono">FPS 24 • AUDIO SYNC</div>
                  </div>
                )}

                {tmpl.id === 'floating' && (
                  <div className="w-full h-full bg-gradient-to-tr from-purple-100 via-pink-50 to-blue-50 rounded-xl p-3 flex flex-col items-center justify-center relative">
                    <span className="text-[9px] font-bold text-purple-700 bg-white/80 px-2 py-0.5 rounded-full mb-1">
                      3D Parallax View
                    </span>
                    <div className="flex gap-2 -rotate-3">
                      <div className="w-16 h-16 bg-white p-1 rounded-xl shadow-md">
                        <img
                          src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=200&q=80"
                          alt="Floating"
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      <div className="w-16 h-16 bg-white p-1 rounded-xl shadow-md rotate-6">
                        <img
                          src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=200&q=80"
                          alt="Floating"
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                    </div>
                    <span className="text-[8px] text-purple-600 font-bold mt-2">GYRO & CURSOR REACTIVE</span>
                  </div>
                )}
              </div>

              {/* Text Info */}
              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-100">
                      {tmpl.category}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      {tmpl.photosCountText}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-[#2D232E] mb-1.5">
                    {tmpl.name}
                  </h3>

                  <p className="text-xs text-[#6D5D6E] leading-relaxed mb-4">
                    {tmpl.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">
                    {tmpl.motionLabel}
                  </span>

                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'bg-purple-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    {isSelected ? <Check className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Dynamic Story Blend Card matching Stitch 09 */}
        <div className="p-6 rounded-3xl bg-[#FAF5FF] border border-purple-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-2xl bg-purple-200 text-purple-700 flex items-center justify-center text-lg mb-3">
              🔀
            </div>
            <span className="text-[10px] uppercase font-bold text-purple-600 tracking-wider">
              Need Inspiration?
            </span>
            <h4 className="font-display text-lg font-bold text-[#2D232E] mt-1 mb-2">
              Dynamic Story Blend
            </h4>
            <p className="text-xs text-purple-800 leading-relaxed">
              Can't choose just one? We can start with Scrapbook polaroids and glide smoothly into a full Cinematic widescreen climax.
            </p>
          </div>

          <div className="pt-4 border-t border-purple-200/60 flex items-center justify-between text-xs">
            <button
              onClick={() => {
                sound.playSparkle();
                alert('Blend mode preview activated!');
              }}
              className="px-3 py-1.5 rounded-full bg-white text-purple-800 font-bold shadow-2xs hover:bg-purple-100"
            >
              Preview Blend Mode
            </button>
            <span className="text-[10px] text-slate-400">Optional mix</span>
          </div>
        </div>
      </div>

      {/* Scrapbook Gallery Ready Bar matching Stitch 09 */}
      <div className="mt-8 w-full max-w-5xl bg-[#F5ECE5] p-4 rounded-2xl border border-[#E9DFD8] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-purple-200 text-purple-700 flex items-center justify-center text-sm">
            ✨
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h5 className="text-xs font-bold text-[#2D232E]">
                Scrapbook Gallery is ready
              </h5>
              <span className="text-[10px] font-bold text-purple-700 bg-white px-2 py-0.5 rounded-full border border-purple-100">
                Active
              </span>
            </div>
            <p className="text-[11px] text-[#8C7A87]">
              18 photos imported from {gift.recipient.name}'s Google Drive • Washi tape & heart doodle pack auto-applied
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            sound.playChime();
            alert('Opening instant template layout preview...');
          }}
          className="px-4 py-2 rounded-full bg-white text-purple-700 text-xs font-bold border border-purple-200 shadow-2xs hover:bg-purple-50 transition-colors flex items-center gap-1.5"
        >
          <Eye className="w-3.5 h-3.5" />
          Instant Interactive Preview
        </button>
      </div>

      {/* Navigation */}
      <div className="mt-10 w-full max-w-5xl flex items-center justify-between pt-6 border-t border-[#F0E6DE]">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3 rounded-full bg-white hover:bg-slate-50 border border-[#EAE0D8] text-xs font-bold text-slate-700 shadow-2xs transition-all flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Relationship
        </button>

        <span className="text-xs text-slate-500 hidden sm:block">
          ⓘ Template can be switched anytime without losing content
        </span>

        <button
          type="button"
          onClick={handleNext}
          className="px-8 py-3.5 rounded-full bg-[#C084FC] hover:bg-[#A855F7] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
        >
          <span>Continue to Colour Palette 🎨</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
