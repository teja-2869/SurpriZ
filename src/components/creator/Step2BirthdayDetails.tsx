import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, Cake, Clock, Calendar, Globe, Sparkles, Heart } from 'lucide-react';
import { Gift } from '../../types/gift';
import { sound } from '../../utils/soundEngine';

interface Step2Props {
  gift: Gift;
  onUpdate: (updated: Partial<Gift>) => void;
  onNext: () => void;
  onBack: () => void;
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const Step2BirthdayDetails: React.FC<Step2Props> = ({
  gift,
  onUpdate,
  onNext,
  onBack
}) => {
  const [birthMonth, setBirthMonth] = useState(gift.recipient.birthMonth || 'October');
  const [birthDay, setBirthDay] = useState(gift.recipient.birthDay || 14);
  const [birthYear, setBirthYear] = useState(gift.recipient.birthYear || 1999);
  const [revealDate, setRevealDate] = useState(gift.recipient.revealDate || '2024-10-14');
  const [revealTime, setRevealTime] = useState(gift.recipient.revealTime || '09:00 AM');
  const [bannerHeading, setBannerHeading] = useState(
    gift.recipient.bannerHeading || `Happy 25th Birthday, ${gift.recipient.name}! 🎈`
  );
  const [timezone] = useState('Pacific Standard Time (PST, UTC-8)');

  // Calculate age
  const calculatedAge = 2024 - birthYear;

  // Countdown timer state
  const [countdown, setCountdown] = useState({ days: 18, hours: 6, mins: 42, secs: 35 });

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev.secs > 0) return { ...prev, secs: prev.secs - 1 };
        if (prev.mins > 0) return { ...prev, mins: 59, secs: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, mins: 59, secs: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleHeadingSuggestion = (text: string) => {
    sound.playSparkle();
    setBannerHeading(text);
  };

  const handleNext = () => {
    sound.playSparkle();
    onUpdate({
      recipient: {
        ...gift.recipient,
        birthMonth,
        birthDay,
        birthYear,
        milestoneAge: calculatedAge,
        revealDate,
        revealTime,
        bannerHeading
      }
    });
    onNext();
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 flex flex-col items-center">
      {/* Step Indicator */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs uppercase font-bold tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
          STEP 2 OF 8 • BIRTHDAY CELEBRATION BLUEPRINT
        </span>
      </div>

      <div className="w-48 h-1.5 bg-[#EAE0D8] rounded-full overflow-hidden mb-6">
        <div className="w-2/8 h-full bg-[#8B5CF6] rounded-full transition-all duration-300" />
      </div>

      {/* Headline */}
      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 mb-2">
        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
        Milestone Countdown Engine
      </span>

      <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-center text-[#2D232E] tracking-tight">
        When is the big celebration? 🎂
      </h2>
      <p className="mt-2 text-sm sm:text-base text-[#6D5D6E] text-center max-w-xl">
        Set the milestone clock so {gift.recipient.name} gets their digital unboxing experience
        at the exact second the celebration begins.
      </p>

      {/* Main 2-Column Grid matching Stitch 03 */}
      <div className="mt-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form Details (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-[#EFE5DE] shadow-md flex flex-col gap-6 relative">
          <div className="w-16 h-4 bg-rose-200/80 -top-2 left-8 absolute rounded-xs shadow-xs" />

          {/* Date of Birth */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-bold text-[#2D232E] flex items-center gap-1.5">
                <Cake className="w-4 h-4 text-purple-600" />
                {gift.recipient.name}'s Date of Birth
              </label>
              <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-100 flex items-center gap-1">
                ★ Turning {calculatedAge}! 🌟
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <span className="text-[10px] text-slate-400 font-bold block mb-1">Month</span>
                <select
                  value={birthMonth}
                  onChange={(e) => setBirthMonth(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#FBF7F4] border border-[#EFE5DE] rounded-xl text-xs font-semibold text-[#2D232E] focus:ring-2 focus:ring-[#8B5CF6] focus:outline-none"
                >
                  {MONTHS.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 font-bold block mb-1">Day</span>
                <select
                  value={birthDay}
                  onChange={(e) => setBirthDay(Number(e.target.value))}
                  className="w-full px-3 py-2.5 bg-[#FBF7F4] border border-[#EFE5DE] rounded-xl text-xs font-semibold text-[#2D232E] focus:ring-2 focus:ring-[#8B5CF6] focus:outline-none"
                >
                  {[...Array(31)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 font-bold block mb-1">Birth Year</span>
                <select
                  value={birthYear}
                  onChange={(e) => setBirthYear(Number(e.target.value))}
                  className="w-full px-3 py-2.5 bg-[#FBF7F4] border border-[#EFE5DE] rounded-xl text-xs font-semibold text-[#2D232E] focus:ring-2 focus:ring-[#8B5CF6] focus:outline-none"
                >
                  {[...Array(40)].map((_, i) => {
                    const yr = 2024 - i;
                    return (
                      <option key={yr} value={yr}>
                        {yr} ({2024 - yr})
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>

          {/* Surprise Reveal Moment */}
          <div className="pt-4 border-t border-[#F5ECE5]">
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-bold text-[#2D232E] flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-purple-600" />
                Surprise Reveal Moment
              </label>
              <span className="text-[10px] font-mono text-[#8C7A87]">
                Exact box unwrap unlock
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <input
                  type="date"
                  value={revealDate}
                  onChange={(e) => setRevealDate(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#FBF7F4] border border-[#EFE5DE] rounded-xl text-xs font-semibold text-[#2D232E] focus:ring-2 focus:ring-[#8B5CF6] focus:outline-none"
                />
              </div>

              <div className="relative">
                <input
                  type="text"
                  value={revealTime}
                  onChange={(e) => setRevealTime(e.target.value)}
                  placeholder="09:00 AM"
                  className="w-full px-3 py-2.5 bg-[#FBF7F4] border border-[#EFE5DE] rounded-xl text-xs font-semibold text-[#2D232E] focus:ring-2 focus:ring-[#8B5CF6] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Keepsake Banner Heading */}
          <div className="pt-4 border-t border-[#F5ECE5]">
            <label className="text-xs font-bold text-[#2D232E] block mb-2">
              Keepsake Banner Heading
            </label>
            <input
              type="text"
              value={bannerHeading}
              onChange={(e) => setBannerHeading(e.target.value)}
              className="w-full px-4 py-3 bg-[#FBF7F4] border border-[#EFE5DE] rounded-xl text-sm font-semibold text-[#2D232E] focus:ring-2 focus:ring-[#8B5CF6] focus:outline-none"
            />

            {/* Inspirations chips */}
            <div className="flex flex-wrap items-center gap-2 mt-2.5">
              <span className="text-[10px] font-bold text-slate-400">Inspirations:</span>
              <button
                type="button"
                onClick={() => handleHeadingSuggestion(`Happy ${calculatedAge}th Birthday! 🎈`)}
                className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-[11px] font-medium text-slate-700 transition-colors"
              >
                Happy {calculatedAge}th Birthday! 🎈
              </button>
              <button
                type="button"
                onClick={() => handleHeadingSuggestion('To My Favourite Human 💖')}
                className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-[11px] font-medium text-slate-700 transition-colors"
              >
                To My Favourite Human 💖
              </button>
              <button
                type="button"
                onClick={() => handleHeadingSuggestion('Quarter Century Magic ✨')}
                className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-[11px] font-medium text-slate-700 transition-colors"
              >
                Quarter Century Magic ✨
              </button>
            </div>
          </div>

          {/* Recipient Timezone Auto-Lock */}
          <div className="p-3.5 bg-[#FBF7F4] rounded-2xl border border-[#EFE5DE] flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5">
              <Globe className="w-4 h-4 text-purple-600 shrink-0" />
              <div>
                <span className="font-bold text-[#2D232E] block">Recipient Timezone Auto-Lock</span>
                <span className="text-[11px] text-[#8C7A87]">{timezone}</span>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-purple-100 text-purple-700 font-bold text-[10px]">
              ⚡ Instant Sync
            </span>
          </div>
        </div>

        {/* Right Column: Live Envelope & Countdown Preview (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Card Preview with Cake */}
          <div className="bg-gradient-to-b from-purple-50/80 to-pink-50/80 p-6 rounded-3xl border border-purple-100 shadow-md flex flex-col items-center text-center">
            {/* Illustrated Birthday Cake */}
            <div className="w-36 h-36 relative flex items-center justify-center my-2">
              <div className="w-28 h-20 bg-rose-200 rounded-t-2xl rounded-b-lg shadow-sm border border-rose-300 relative flex items-center justify-center">
                <div className="absolute top-0 inset-x-0 h-4 bg-white/80 rounded-t-2xl border-b border-rose-300" />
                <span className="text-2xl mt-2">🎂</span>

                {/* Candles */}
                <div className="absolute -top-6 flex items-center gap-4">
                  <div className="w-1.5 h-6 bg-purple-400 rounded-full relative">
                    <span className="absolute -top-2.5 -left-1 text-[10px] animate-pulse">🔥</span>
                  </div>
                  <div className="w-1.5 h-7 bg-amber-400 rounded-full relative">
                    <span className="absolute -top-2.5 -left-1 text-[10px] animate-pulse">🔥</span>
                  </div>
                  <div className="w-1.5 h-6 bg-pink-400 rounded-full relative">
                    <span className="absolute -top-2.5 -left-1 text-[10px] animate-pulse">🔥</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Custom Envelope Header Banner */}
            <div className="w-full bg-white/90 backdrop-blur-xs p-3 rounded-2xl border border-purple-100 shadow-2xs mt-2">
              <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 block mb-0.5">
                Custom Envelope Header
              </span>
              <p className="font-handwriting text-2xl font-bold text-purple-900 leading-tight">
                {bannerHeading}
              </p>
            </div>
          </div>

          {/* Live Countdown Preview Card */}
          <div className="bg-white p-6 rounded-3xl border border-[#EFE5DE] shadow-md flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#2D232E]">
                <Clock className="w-4 h-4 text-purple-600" />
                <span>Live Countdown Preview</span>
              </div>
              <span className="text-[11px] font-mono text-[#8C7A87]">
                Unwraps at {revealTime}
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="bg-[#FAF5FF] p-2.5 rounded-xl border border-purple-100">
                <span className="font-display text-2xl font-bold text-purple-900 block">
                  {countdown.days}
                </span>
                <span className="text-[10px] uppercase font-bold text-purple-600">Days</span>
              </div>

              <div className="bg-[#FAF5FF] p-2.5 rounded-xl border border-purple-100">
                <span className="font-display text-2xl font-bold text-purple-900 block">
                  {String(countdown.hours).padStart(2, '0')}
                </span>
                <span className="text-[10px] uppercase font-bold text-purple-600">Hours</span>
              </div>

              <div className="bg-[#FAF5FF] p-2.5 rounded-xl border border-purple-100">
                <span className="font-display text-2xl font-bold text-purple-900 block">
                  {String(countdown.mins).padStart(2, '0')}
                </span>
                <span className="text-[10px] uppercase font-bold text-purple-600">Mins</span>
              </div>

              <div className="bg-[#FAF5FF] p-2.5 rounded-xl border border-purple-100">
                <span className="font-display text-2xl font-bold text-purple-900 block">
                  {String(countdown.secs).padStart(2, '0')}
                </span>
                <span className="text-[10px] uppercase font-bold text-purple-600">Secs</span>
              </div>
            </div>

            <p className="mt-4 text-xs text-[#8C7A87] text-center">
              {gift.recipient.name} will receive an animated mystery lock-screen counting down until this exact instant!
            </p>
          </div>

          {/* Did You Know Card */}
          <div className="p-4 bg-white/70 backdrop-blur-xs rounded-2xl border border-[#EFE5DE] shadow-2xs flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-amber-50 border border-amber-200">
              <img
                src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=150&q=80"
                alt="Celebration"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="text-xs font-bold text-[#2D232E] block">Did you know?</span>
              <p className="text-[11px] text-[#8C7A87]">
                Turning {calculatedAge} is the {calculatedAge === 25 ? 'Silver Jubilee' : 'Milestone'} birthday!
                We have special celebratory confetti queued up.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="mt-10 w-full max-w-5xl flex items-center justify-between pt-6 border-t border-[#F0E6DE]">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3 rounded-full bg-white hover:bg-slate-50 border border-[#EAE0D8] text-xs font-bold text-slate-700 shadow-2xs transition-all flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Previous Step
        </button>

        <button
          type="button"
          onClick={handleNext}
          className="px-8 py-3.5 rounded-full bg-[#C084FC] hover:bg-[#A855F7] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
        >
          <span>Next: Collect Photos 📷</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
