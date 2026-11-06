import React, { useState } from 'react';
import {
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Heart,
  Check,
  Plus
} from 'lucide-react';
import { Gift, RelationshipType } from '../../types/gift';
import { sound } from '../../utils/soundEngine';

interface Step7Props {
  gift: Gift;
  onUpdate: (updated: Partial<Gift>) => void;
  onNext: () => void;
  onBack: () => void;
}

interface RelationshipCardData {
  type: RelationshipType;
  title: string;
  badge: string;
  description: string;
  vibe: string;
  icon: string;
  color: string;
}

const RELATIONSHIPS: RelationshipCardData[] = [
  {
    type: 'parents',
    title: 'Parents',
    badge: 'Nostalgic & Grateful',
    description: 'Mother, Father, or Parental Figures who shaped your journey.',
    vibe: 'Warm & Reverent Vibe',
    icon: '🏡',
    color: '#FED7AA'
  },
  {
    type: 'siblings',
    title: 'Siblings',
    badge: 'Chaotic Fun & Teasing',
    description: 'Brother, Sister, or Twin Soul born to tease and protect.',
    vibe: 'Energetic & Silly',
    icon: '🧸',
    color: '#FBCFE8'
  },
  {
    type: 'best_friends',
    title: 'Best Friends',
    badge: 'Pure Joy & Inside Jokes',
    description: 'Inseparable partners-in-crime, late-night calls & unending lore.',
    vibe: 'Active Relationship Bond',
    icon: '👯‍♀️',
    color: '#DDD6FE'
  },
  {
    type: 'partners',
    title: 'Partners',
    badge: 'Romantic & Deep Love',
    description: 'Boyfriend, Girlfriend, Spouse, or lifelong soulmate bond.',
    vibe: 'Intimate & Tender',
    icon: '💖',
    color: '#FCE7F3'
  },
  {
    type: 'crush',
    title: 'Crush',
    badge: 'Sweet & Playful',
    description: 'Secret admiration, butterfly flutter hints & unspoken smiles.',
    vibe: 'Curious & Flirty',
    icon: '💌',
    color: '#E0E7FF'
  },
  {
    type: 'custom',
    title: 'Custom / Other',
    badge: 'Custom Vibe',
    description: 'Colleague, Mentor, Fur Baby, or a completely unique one-off connection.',
    vibe: 'Design from Scratch',
    icon: '🎨',
    color: '#FEF08A'
  }
];

export const Step7Relationship: React.FC<Step7Props> = ({
  gift,
  onUpdate,
  onNext,
  onBack
}) => {
  const [selectedRel, setSelectedRel] = useState<RelationshipType>(gift.relationship || 'best_friends');

  const handleSelect = (rel: RelationshipType) => {
    sound.playSparkle();
    setSelectedRel(rel);
    onUpdate({ relationship: rel });
  };

  const handleNext = () => {
    sound.playSparkle();
    onUpdate({ relationship: selectedRel });
    onNext();
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 flex flex-col items-center">
      {/* Step Indicator */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs uppercase font-bold tracking-wider text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
          STEP 07 OF 08 • CREATOR STUDIO
        </span>
      </div>

      <div className="w-48 h-1.5 bg-[#EAE0D8] rounded-full overflow-hidden mb-6">
        <div className="w-7/8 h-full bg-[#8B5CF6] rounded-full transition-all duration-300" />
      </div>

      {/* Headline */}
      <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-center text-[#2D232E] tracking-tight">
        Who is this special surprise for?
      </h2>
      <p className="mt-2 text-sm sm:text-base text-[#6D5D6E] text-center max-w-xl">
        We tailor the emotional tone, confetti patterns, and celebratory greetings based on your unique bond.
      </p>

      {/* 6 Relationship Cards Grid matching Stitch 08 */}
      <div className="mt-10 w-full grid grid-cols-1 md:grid-cols-3 gap-6">
        {RELATIONSHIPS.map((rel) => {
          const isSelected = selectedRel === rel.type;
          return (
            <div
              key={rel.type}
              onClick={() => handleSelect(rel.type)}
              className={`p-6 rounded-3xl border transition-all cursor-pointer relative flex flex-col justify-between ${
                isSelected
                  ? 'bg-white border-purple-400 shadow-lg ring-2 ring-purple-300/40'
                  : 'bg-white/80 border-[#EFE5DE] shadow-xs hover:shadow-md hover:border-purple-200'
              }`}
            >
              {/* Top Washi Tape */}
              <div
                className="w-16 h-3.5 -top-1.5 left-10 absolute rounded-xs opacity-75 shadow-2xs pointer-events-none"
                style={{ backgroundColor: rel.color }}
              />

              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-lg shadow-2xs bg-slate-50 border border-slate-100">
                    {rel.icon}
                  </div>

                  <span className="text-[10px] font-bold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-full">
                    {rel.badge}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 mb-1.5">
                  <h3 className="font-display text-xl font-bold text-[#2D232E]">
                    {rel.title}
                  </h3>
                  {isSelected && (
                    <span className="text-purple-600">✪</span>
                  )}
                </div>

                {isSelected && (
                  <span className="text-[10px] font-bold text-purple-700 block mb-2">
                    • Selected for {gift.recipient.name} 💜
                  </span>
                )}

                <p className="text-xs text-[#6D5D6E] leading-relaxed mb-4">
                  {rel.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className={`font-semibold ${isSelected ? 'text-purple-700 font-bold' : 'text-slate-400'}`}>
                  {rel.vibe}
                </span>

                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                    isSelected
                      ? 'bg-purple-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                  }`}
                >
                  {isSelected ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Smart Persona Engine card matching Stitch 08 */}
      <div className="mt-8 w-full max-w-5xl bg-gradient-to-r from-purple-50 via-pink-50 to-amber-50 p-6 rounded-3xl border border-purple-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#6B5B95] text-white flex items-center justify-center shadow-md shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-purple-900 bg-white px-2 py-0.5 rounded shadow-2xs">
                Smart Persona Engine
              </span>
              <span className="text-[10px] font-mono text-slate-500">Real-time sync</span>
            </div>
            <p className="text-xs sm:text-sm text-purple-950 leading-relaxed font-medium">
              Because you selected <strong className="text-purple-800 underline">Best Friends</strong>, SURPRIZ will automatically queue: Friendship polaroid filters, inside joke sticker packs, and high-energy celebration confetti!
            </p>
          </div>
        </div>

        {/* Mini Preview Thumbnails */}
        <div className="flex items-center gap-2 shrink-0 bg-white/80 p-2 rounded-2xl shadow-2xs border border-purple-100">
          <div className="w-12 h-14 bg-white p-1 rounded-md shadow-2xs border border-slate-200 text-center">
            <img
              src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=100&q=80"
              alt="Friends"
              className="w-full h-8 object-cover rounded-xs"
            />
            <span className="text-[7px] text-slate-500 font-mono">bffs 4ever</span>
          </div>
          <div className="w-12 h-14 bg-white p-1 rounded-md shadow-2xs border border-slate-200 text-center">
            <img
              src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=100&q=80"
              alt="Moments"
              className="w-full h-8 object-cover rounded-xs"
            />
            <span className="text-[7px] text-slate-500 font-mono">sparkles</span>
          </div>
          <span className="text-xs">✨</span>
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-10 w-full max-w-5xl flex items-center justify-between pt-6 border-t border-[#F0E6DE]">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3 rounded-full bg-white hover:bg-slate-50 border border-[#EAE0D8] text-xs font-bold text-slate-700 shadow-2xs transition-all flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Memories
        </button>

        <span className="text-xs font-semibold text-purple-700 hidden sm:block">
          ☁️ Bond draft saved • Recipient: {gift.recipient.name}
        </span>

        <button
          type="button"
          onClick={handleNext}
          className="px-8 py-3.5 rounded-full bg-[#C084FC] hover:bg-[#A855F7] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
        >
          <span>Continue to Presentation Templates 🪄</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
