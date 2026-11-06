import React, { useState } from 'react';
import {
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Heart,
  Volume2,
  RefreshCw,
  Bold,
  Italic,
  Underline,
  Smile,
  ShieldCheck,
  Check
} from 'lucide-react';
import { Gift, GiftLetter } from '../../types/gift';
import { sound } from '../../utils/soundEngine';

interface Step5Props {
  gift: Gift;
  onUpdate: (updated: Partial<Gift>) => void;
  onNext: () => void;
  onBack: () => void;
}

const TONES: GiftLetter['tone'][] = [
  'Handwritten Romance',
  'Warm & Nostalgic',
  'Playful & Silly',
  'Short & Sweet',
  'Golden Milestone'
];

export const Step5LetterStudio: React.FC<Step5Props> = ({
  gift,
  onUpdate,
  onNext,
  onBack
}) => {
  const [salutation, setSalutation] = useState(gift.letter.salutation);
  const [body, setBody] = useState(gift.letter.body);
  const [tone, setTone] = useState<GiftLetter['tone']>(gift.letter.tone);
  const [font, setFont] = useState<'script' | 'sans' | 'serif'>(gift.letter.font || 'script');
  const [openingExperience, setOpeningExperience] = useState<GiftLetter['openingExperience']>(
    gift.letter.openingExperience || 'wax_melt'
  );
  const [isReplaying, setIsReplaying] = useState(false);

  const handleToneChange = (newTone: GiftLetter['tone']) => {
    sound.playSparkle();
    setTone(newTone);
    if (newTone === 'Playful & Silly') {
      setSalutation(`To ${gift.recipient.name}, chief partner in crime 🍕`);
    } else if (newTone === 'Warm & Nostalgic') {
      setSalutation(`To ${gift.recipient.name}, the warmest cup of tea on a stormy day ☕`);
    } else if (newTone === 'Golden Milestone') {
      setSalutation(`To ${gift.recipient.name}, welcoming quarter of a century! 🌟`);
    } else {
      setSalutation(`To ${gift.recipient.name}, the sun of my universe ☀️`);
    }
  };

  const handleMusePrompt = (type: string) => {
    sound.playSparkle();
    if (type === 'rhyme') {
      setBody(
        (prev) =>
          prev +
          '\n\nThrough every season, sun or rain,\nYour laughter heals the deepest pain!'
      );
    } else if (type === 'deeper') {
      setBody(
        (prev) =>
          prev +
          '\n\nI never knew someone could make this world feel so safe, so soft, and so undeniably miraculous.'
      );
    } else if (type === 'childhood') {
      setBody(
        (prev) =>
          prev +
          '\n\nRemember when we built that blanket fort in your living room and promised to never grow up?'
      );
    }
  };

  const handleReplayOpen = () => {
    sound.playWaxPop();
    setIsReplaying(true);
    setTimeout(() => {
      sound.playChime();
      setIsReplaying(false);
    }, 1200);
  };

  const handleNext = () => {
    sound.playSparkle();
    onUpdate({
      letter: {
        ...gift.letter,
        salutation,
        body,
        tone,
        font,
        openingExperience
      }
    });
    onNext();
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 flex flex-col items-center">
      {/* Step Indicator */}
      <div className="w-full flex items-center justify-between mb-4 max-w-5xl">
        <span className="text-xs uppercase font-bold tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
          STEP 05 OF 08 • CREATOR STUDIO
        </span>
        <span className="text-xs text-slate-400">
          • Autosaved just now
        </span>
      </div>

      <div className="w-full max-w-5xl h-1.5 bg-[#EAE0D8] rounded-full overflow-hidden mb-6">
        <div className="w-5/8 h-full bg-[#8B5CF6] rounded-full transition-all duration-300" />
      </div>

      {/* Headline */}
      <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-center text-[#2D232E] tracking-tight">
        Put your feelings into words 💌
      </h2>
      <p className="mt-2 text-sm sm:text-base text-[#6D5D6E] text-center max-w-2xl">
        Draft a heartfelt letter, warm birthday toast, or secret inside joke that unrolls like luxury digital stationery.
      </p>

      {/* Luxury Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 mt-4 text-[11px] text-slate-500 font-semibold">
        <span className="bg-slate-100 px-3 py-1 rounded-full">Linen Stock</span>
        <span className="bg-amber-50 text-amber-800 px-3 py-1 rounded-full border border-amber-200">
          Gold Foil Accent
        </span>
        <span className="bg-slate-100 px-3 py-1 rounded-full">100% Cotton Feel</span>
      </div>

      {/* 2-Column Split matching Stitch 06 */}
      <div className="mt-8 w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Letter Editor (6 cols) */}
        <div className="lg:col-span-6 bg-white p-6 sm:p-7 rounded-3xl border border-[#EFE5DE] shadow-md flex flex-col gap-5">
          {/* Tone Selector */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-[#2D232E] flex items-center gap-1.5">
                <Smile className="w-3.5 h-3.5 text-purple-600" /> Tone of Voice
              </span>
              <span className="text-[10px] text-slate-400">Tap to infuse mood</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {TONES.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => handleToneChange(t)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                    tone === t
                      ? 'bg-[#C084FC] text-white shadow-xs'
                      : 'bg-[#FBF7F4] text-slate-600 hover:bg-[#F3E8E2]'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* AI Writing Sparkles / Muse Box */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 flex flex-col gap-2.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-purple-900">
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              <span>AI Writing Sparkles</span>
            </div>
            <p className="text-[11px] text-purple-700 leading-relaxed">
              Stuck on the right words? Let our gentle muse craft an opening touch.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <button
                type="button"
                onClick={() => handleMusePrompt('rhyme')}
                className="px-2.5 py-1 rounded-full bg-white text-[11px] font-semibold text-purple-800 shadow-2xs hover:bg-purple-100 transition-colors"
              >
                📖 Help me rhyme
              </button>
              <button
                type="button"
                onClick={() => handleMusePrompt('deeper')}
                className="px-2.5 py-1 rounded-full bg-white text-[11px] font-semibold text-purple-800 shadow-2xs hover:bg-purple-100 transition-colors"
              >
                ♡ Make it deeper
              </button>
              <button
                type="button"
                onClick={() => handleMusePrompt('childhood')}
                className="px-2.5 py-1 rounded-full bg-white text-[11px] font-semibold text-purple-800 shadow-2xs hover:bg-purple-100 transition-colors"
              >
                ✨ Add childhood memory prompt
              </button>
            </div>
          </div>

          {/* Letter Salutation */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-[#2D232E]">
                Letter Salutation & Header
              </label>
              <span className="text-[10px] text-slate-400">Shown on seal banner</span>
            </div>
            <input
              type="text"
              value={salutation}
              onChange={(e) => setSalutation(e.target.value)}
              className="w-full px-4 py-2.5 bg-[#FBF7F4] border border-[#EFE5DE] rounded-xl text-xs font-bold text-[#2D232E] focus:ring-2 focus:ring-[#8B5CF6] focus:outline-none"
            />
          </div>

          {/* Letter Body Editor */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-[#2D232E]">
                Your Heartfelt Letter
              </span>
              <span className="text-[10px] font-mono text-slate-400">
                {body.length} characters
              </span>
            </div>

            {/* Formatting Toolbar */}
            <div className="flex items-center justify-between p-1.5 bg-[#FBF7F4] rounded-t-xl border border-b-0 border-[#EFE5DE] text-xs">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => sound.playSparkle()}
                  className="p-1 rounded hover:bg-white text-slate-600"
                  title="Bold"
                >
                  <Bold className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => sound.playSparkle()}
                  className="p-1 rounded hover:bg-white text-slate-600"
                  title="Italic"
                >
                  <Italic className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => sound.playSparkle()}
                  className="p-1 rounded hover:bg-white text-slate-600"
                  title="Underline"
                >
                  <Underline className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    sound.playSparkle();
                    setBody((b) => b + ' 💖');
                  }}
                  className="px-2 py-0.5 rounded hover:bg-white text-rose-500 font-bold"
                >
                  ♡ Heart
                </button>
                <button
                  type="button"
                  onClick={() => {
                    sound.playSparkle();
                    setBody((b) => b + ' ✨');
                  }}
                  className="px-2 py-0.5 rounded hover:bg-white text-amber-500 font-bold"
                >
                  ✦ Sparkle
                </button>
              </div>

              {/* Font Selector */}
              <select
                value={font}
                onChange={(e) => setFont(e.target.value as any)}
                className="px-2 py-1 bg-white border border-slate-200 rounded-md text-[11px] font-semibold text-slate-700"
              >
                <option value="script">Caveat / Script</option>
                <option value="sans">Modern Sans</option>
                <option value="serif">Classic Serif</option>
              </select>
            </div>

            <textarea
              rows={8}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className={`w-full p-4 bg-[#FFFDF9] border border-[#EFE5DE] rounded-b-xl text-sm leading-relaxed text-[#2D232E] focus:ring-2 focus:ring-[#8B5CF6] focus:outline-none ${
                font === 'script' ? 'font-handwriting text-xl' : ''
              }`}
            />
          </div>

          {/* Letter Opening Experience selector */}
          <div className="pt-3 border-t border-[#F5ECE5]">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-bold text-[#2D232E] flex items-center gap-1.5">
                <span>🪄</span> Letter Opening Experience
              </span>
              <span className="text-[10px] text-slate-400">Tap preview to test</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => {
                  sound.playWaxPop();
                  setOpeningExperience('wax_melt');
                }}
                className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                  openingExperience === 'wax_melt'
                    ? 'bg-purple-50 border-purple-300 shadow-2xs'
                    : 'bg-[#FBF7F4] border-[#EFE5DE]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm">🕯️</span>
                  {openingExperience === 'wax_melt' && (
                    <Check className="w-3.5 h-3.5 text-purple-600" />
                  )}
                </div>
                <div className="mt-2">
                  <span className="text-xs font-bold text-[#2D232E] block">Wax Melt & Pop</span>
                  <span className="text-[10px] text-slate-500">Tactile break with spark</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  sound.playBoxOpen();
                  setOpeningExperience('ribbon_untie');
                }}
                className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                  openingExperience === 'ribbon_untie'
                    ? 'bg-purple-50 border-purple-300 shadow-2xs'
                    : 'bg-[#FBF7F4] border-[#EFE5DE]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm">🎀</span>
                  {openingExperience === 'ribbon_untie' && (
                    <Check className="w-3.5 h-3.5 text-purple-600" />
                  )}
                </div>
                <div className="mt-2">
                  <span className="text-xs font-bold text-[#2D232E] block">Ribbon Untie</span>
                  <span className="text-[10px] text-slate-500">Silken sash slips gently</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  sound.playChime();
                  setOpeningExperience('slow_unroll');
                }}
                className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                  openingExperience === 'slow_unroll'
                    ? 'bg-purple-50 border-purple-300 shadow-2xs'
                    : 'bg-[#FBF7F4] border-[#EFE5DE]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm">📜</span>
                  {openingExperience === 'slow_unroll' && (
                    <Check className="w-3.5 h-3.5 text-purple-600" />
                  )}
                </div>
                <div className="mt-2">
                  <span className="text-xs font-bold text-[#2D232E] block">Slow Scroll Unroll</span>
                  <span className="text-[10px] text-slate-500">Parchment unfurls with sound</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Live Recipient Viewport (6 cols) */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              Live Recipient Viewport
            </span>

            <button
              onClick={handleReplayOpen}
              className="px-3 py-1.5 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 flex items-center gap-1.5 shadow-2xs transition-colors"
            >
              <RefreshCw className={`w-3 h-3 ${isReplaying ? 'animate-spin' : ''}`} />
              Replay Open Motion
            </button>
          </div>

          {/* Luxury Digital Stationery Card matching Stitch 06 */}
          <div className="relative bg-gradient-to-b from-[#F7EEEC] to-[#EFE2E0] p-4 sm:p-6 rounded-3xl shadow-lg border border-[#E8DCD5]">
            <div className="bg-[#FFFDF9] rounded-2xl p-6 sm:p-8 shadow-md border border-[#F0E6DE] flex flex-col relative overflow-hidden">
              {/* SURPRIZ ARCHIVE Badge */}
              <div className="self-center -mt-6 px-4 py-1 bg-amber-100/70 text-amber-900 font-bold text-[10px] tracking-wider rounded-b-lg border border-t-0 border-amber-200">
                SURPRIZ ARCHIVE
              </div>

              {/* Stamp at top right */}
              <div className="absolute top-6 right-6 w-14 h-16 bg-[#FFF9F0] border-2 border-dashed border-amber-300 rounded-md p-1 flex flex-col items-center justify-between text-center shadow-xs">
                <span className="text-xs">🌷</span>
                <span className="text-[8px] font-mono font-bold text-amber-800">2024</span>
                <span className="text-[7px] uppercase font-bold text-slate-400">Sent with love</span>
              </div>

              {/* Salutation */}
              <h3 className="font-display text-2xl font-bold text-purple-950 mt-4 pr-16 leading-tight">
                {salutation}
              </h3>

              {/* Letter Prose */}
              <div className="mt-6 text-slate-800 whitespace-pre-line text-lg leading-relaxed font-handwriting">
                {body}
              </div>

              {/* Signature */}
              <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 block font-sans">
                    Forever your co-pilot,
                  </span>
                  <span className="font-handwriting text-2xl font-bold text-purple-900">
                    {gift.sender.name} 💖
                  </span>
                </div>

                {/* Wax Seal */}
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-100">
                    ♡ Sealed forever
                  </span>
                  <div className="w-10 h-10 rounded-full bg-[#6B5B95] text-white flex items-center justify-center font-bold text-sm shadow-md">
                    S
                  </div>
                </div>
              </div>
            </div>

            {/* Ambient Reading Track Pill */}
            <div className="mt-4 flex items-center justify-between bg-white/90 backdrop-blur-md px-4 py-2 rounded-full border border-[#E9DFD8] text-xs">
              <div className="flex items-center gap-2">
                <span className="text-sm">🎵</span>
                <div>
                  <span className="font-bold text-[#2D232E] block">Ambient Reading Track</span>
                  <span className="text-[10px] text-slate-400">Warm Acoustic Strum & Rain</span>
                </div>
              </div>
              <button
                onClick={() => sound.playChime()}
                className="p-1 hover:text-purple-600 transition-colors"
              >
                <Volume2 className="w-4 h-4 text-slate-500" />
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
          <ArrowLeft className="w-4 h-4" /> Back to Music
        </button>

        <div className="flex items-center gap-1.5">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
            <div
              key={s}
              className={`w-2 h-2 rounded-full ${s === 5 ? 'bg-purple-600 w-4' : 'bg-slate-300'}`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={handleNext}
          className="px-8 py-3.5 rounded-full bg-[#C084FC] hover:bg-[#A855F7] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
        >
          <span>Continue to Memories 🌷</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
