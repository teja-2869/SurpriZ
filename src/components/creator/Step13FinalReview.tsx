import React, { useState } from 'react';
import {
  ArrowLeft,
  Sparkles,
  Lock,
  Eye,
  EyeOff,
  Bell,
  Check,
  Calendar,
  Image as ImageIcon,
  BookOpen,
  Mail,
  Music,
  QrCode
} from 'lucide-react';
import { Gift } from '../../types/gift';
import { sound } from '../../utils/soundEngine';
import { fireConfettiExplosion } from '../../utils/confettiEngine';

interface Step13Props {
  gift: Gift;
  onUpdate: (updated: Partial<Gift>) => void;
  onComplete: () => void;
  onBack: () => void;
}

export const Step13FinalReview: React.FC<Step13Props> = ({
  gift,
  onUpdate,
  onComplete,
  onBack
}) => {
  const [secretKey, setSecretKey] = useState(gift.security.secretKey || 'Mochi2024');
  const [promptClue, setPromptClue] = useState(
    gift.security.promptClue || "Maya's first pet's name & milestone year (Hint: fluffy samoyed)"
  );
  const [showSecret, setShowSecret] = useState(false);
  const [notifyOnOpen, setNotifyOnOpen] = useState(gift.security.notifyOnOpen ?? true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreate = () => {
    sound.playBoxOpen();
    fireConfettiExplosion();
    setIsSubmitting(true);

    onUpdate({
      security: {
        ...gift.security,
        secretKey,
        promptClue,
        notifyOnOpen
      },
      status: 'published'
    });

    setTimeout(() => {
      setIsSubmitting(false);
      onComplete();
    }, 1000);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 flex flex-col items-center">
      {/* Step Indicator */}
      <div className="w-full flex items-center justify-between mb-4 max-w-5xl">
        <span className="text-xs uppercase font-bold tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
          STEP 12 OF 12 • FINAL CONFIRMATION
        </span>
        <span className="text-xs font-semibold text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
          • Vault Status: Ready to Seal
        </span>
      </div>

      {/* Headline */}
      <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-center text-[#2D232E] tracking-tight">
        Everything looks enchanting! ✨
      </h2>
      <p className="mt-2 text-sm sm:text-base text-[#6D5D6E] text-center max-w-xl">
        Review {gift.recipient.name}'s 25th birthday surprise parcel before sealing the digital wax vault.
      </p>

      {/* 2-Column Split matching Stitch 14 */}
      <div className="mt-10 w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Milestone Card */}
          <div className="bg-white p-6 rounded-3xl border border-[#EFE5DE] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 relative">
            <div className="w-16 h-4 bg-amber-200/80 -top-2 left-8 absolute rounded-xs shadow-xs" />

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full overflow-hidden bg-purple-100 ring-2 ring-purple-300 shrink-0">
                <img
                  src={gift.recipient.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80'}
                  alt={gift.recipient.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">
                  THE HONOREE
                </span>
                <h3 className="font-display text-2xl font-bold text-[#2D232E]">
                  {gift.recipient.name}
                </h3>
                <span className="text-xs text-[#8C7A87]">
                  Turning {gift.recipient.milestoneAge} years young • Born {gift.recipient.birthMonth} {gift.recipient.birthDay}, {gift.recipient.birthYear}
                </span>
              </div>
            </div>

            <div className="bg-[#FAF5FF] p-3 rounded-2xl border border-purple-100 text-right shrink-0">
              <span className="text-[10px] text-purple-700 font-bold flex items-center justify-end gap-1 mb-0.5">
                <Calendar className="w-3 h-3" /> Scheduled Reveal
              </span>
              <span className="text-sm font-bold text-purple-950 block">Oct 14, 2024</span>
              <span className="text-[10px] text-slate-400">T-Minus 3 Days • PDT</span>
            </div>
          </div>

          {/* Assembled Keepsake Bundle */}
          <div className="bg-white p-6 rounded-3xl border border-[#EFE5DE] shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-[#2D232E] flex items-center gap-2">
                <span>🎁</span> Assembled Keepsake Bundle
              </h4>
              <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full">
                4 Elements Loaded
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3 bg-[#FAF5FF] rounded-2xl border border-purple-100">
                <ImageIcon className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                <span className="text-lg font-bold text-purple-950 block">{gift.photos.length}</span>
                <span className="text-[10px] text-slate-500 font-medium">Polaroid Snaps</span>
              </div>
              <div className="p-3 bg-[#FAF5FF] rounded-2xl border border-purple-100">
                <BookOpen className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                <span className="text-lg font-bold text-purple-950 block">{gift.memories.length}</span>
                <span className="text-[10px] text-slate-500 font-medium">Memory Notes</span>
              </div>
              <div className="p-3 bg-[#FAF5FF] rounded-2xl border border-purple-100">
                <Mail className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                <span className="text-lg font-bold text-purple-950 block">1</span>
                <span className="text-[10px] text-slate-500 font-medium">Wax-Sealed Letter</span>
              </div>
              <div className="p-3 bg-[#FAF5FF] rounded-2xl border border-purple-100">
                <Music className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                <span className="text-lg font-bold text-purple-950 block">1</span>
                <span className="text-[10px] text-slate-500 font-medium">Audio Serenade</span>
              </div>
            </div>

            {/* Audio Serenade Bar */}
            <div className="p-3 bg-slate-50 rounded-2xl flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => sound.toggleSoundtrack()}
                  className="w-8 h-8 rounded-full bg-[#8B5CF6] text-white flex items-center justify-center shrink-0"
                >
                  ▶
                </button>
                <div>
                  <h6 className="font-bold text-slate-800">{gift.music.title}</h6>
                  <span className="text-[10px] text-slate-400">
                    Acoustic Guitar • Soft Chimes • 02:45
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-0.5 h-3 px-2">
                {[30, 70, 90, 50, 40].map((h, i) => (
                  <div key={i} style={{ height: `${h}%` }} className="w-0.5 bg-purple-500 rounded-full" />
                ))}
              </div>
            </div>
          </div>

          {/* Artisan Theme Configuration */}
          <div className="bg-white p-6 rounded-3xl border border-[#EFE5DE] shadow-sm flex flex-col gap-4">
            <h4 className="text-xs font-bold text-[#2D232E] flex items-center gap-1.5">
              <span>🎨</span> Artisan Theme Configuration
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-[#FBF7F4] rounded-2xl border border-[#EFE5DE]">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                  VISUAL CANVAS
                </span>
                <h5 className="text-xs font-bold text-slate-800">Scrapbook Gallery</h5>
                <span className="text-[10px] text-slate-500">Tilted polaroids & washi</span>
              </div>

              <div className="p-3 bg-[#FBF7F4] rounded-2xl border border-[#EFE5DE]">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                  COLOR HARMONY
                </span>
                <h5 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-400" />
                  Lavender Day
                </h5>
                <span className="text-[10px] text-slate-500">Warm pastel contrast</span>
              </div>

              <div className="p-3 bg-[#FBF7F4] rounded-2xl border border-[#EFE5DE]">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                  PARTICLE PHYSICS
                </span>
                <h5 className="text-xs font-bold text-slate-800">Floating Confetti</h5>
                <span className="text-[10px] text-slate-500">Hearts + Star Dust (60 FPS)</span>
              </div>
            </div>
          </div>

          {/* Secret Key Security */}
          <div className="bg-white p-6 rounded-3xl border border-[#EFE5DE] shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-[#2D232E] flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-purple-600" /> Secret Key Security
              </h4>
              <span className="text-[10px] text-purple-600 font-bold">🔒 Encrypted Cipher</span>
            </div>

            <p className="text-xs text-slate-500">
              Lock the digital wax seal with an intimate milestone cipher.
            </p>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[11px] font-bold text-slate-700">
                  Recipient Unlocking Secret Key
                </label>
                <button
                  type="button"
                  onClick={() => setShowSecret(!showSecret)}
                  className="text-xs text-purple-700 font-semibold flex items-center gap-1 hover:underline"
                >
                  {showSecret ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  {showSecret ? 'Hide' : 'Reveal'}
                </button>
              </div>

              <div className="relative">
                <input
                  type={showSecret ? 'text' : 'password'}
                  value={secretKey}
                  onChange={(e) => setSecretKey(e.target.value)}
                  className="w-full px-4 py-3 bg-[#FBF7F4] border border-[#EFE5DE] rounded-xl text-base font-mono font-bold text-[#2D232E] focus:ring-2 focus:ring-[#8B5CF6] focus:outline-none"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs">
                  🔑
                </span>
              </div>
            </div>

            <div className="p-3.5 bg-amber-50/80 rounded-2xl border border-amber-200/80 text-xs text-amber-900 leading-relaxed">
              <strong>Prompt Clue:</strong> "{promptClue}". The recipient will be prompted for this secret key before the box unrolls.
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-purple-600" />
                <div>
                  <span className="font-bold text-[#2D232E] block">Instant Unboxing Alerts</span>
                  <span className="text-[10px] text-slate-400">Notify me via SMS/Email when Maya opens her parcel</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setNotifyOnOpen(!notifyOnOpen)}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                  notifyOnOpen ? 'bg-[#8B5CF6]' : 'bg-slate-300'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    notifyOnOpen ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column (5 cols) matching Stitch 14 */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* 3D Box Card */}
          <div className="bg-gradient-to-b from-purple-50 to-pink-50 p-6 rounded-3xl border border-purple-100 shadow-md flex flex-col items-center text-center">
            <span className="text-[10px] font-bold text-rose-700 bg-white px-2.5 py-0.5 rounded-full border border-rose-200 mb-4 shadow-2xs">
              🎂 Surprise Box
            </span>

            {/* 3D Box Illustration */}
            <div
              onClick={() => {
                sound.playBoxOpen();
                fireConfettiExplosion(0.65, 0.4);
              }}
              className="w-48 h-48 rounded-3xl bg-gradient-to-tr from-[#9880B9] to-[#DDD6FE] shadow-2xl border-4 border-white relative flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
            >
              <div className="absolute inset-y-0 w-8 bg-[#FED7AA]" />
              <div className="absolute inset-x-0 h-8 bg-[#FED7AA]" />
              <div className="w-16 h-16 rounded-full bg-[#D4AF37] text-white flex flex-col items-center justify-center font-bold text-xs shadow-lg z-10 border-2 border-white">
                <span>SURPRIZ</span>
                <span className="text-[8px]">MAYA • 25</span>
              </div>
            </div>

            <h4 className="font-display text-xl font-bold text-[#2D232E] mt-4">
              Tied & Prepared for {gift.recipient.name}
            </h4>
            <p className="text-xs text-slate-500 max-w-xs mt-1 mb-4">
              Tap anywhere above to preview the uncurling ribbon animation.
            </p>

            <div className="w-full flex flex-col gap-2 text-left text-xs text-slate-600 bg-white/90 p-4 rounded-2xl border border-purple-100">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Soundtrack licensed for unlimited unboxings</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero spoilers enabled • No previews sent to {gift.recipient.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Keepsake preserved 100 years in cloud vault</span>
              </div>
            </div>
          </div>

          {/* Direct Link & QR Delivery */}
          <div className="p-4 bg-white rounded-2xl border border-[#EFE5DE] shadow-2xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-[#2D232E]">Direct Link & QR Delivery</h5>
              <p className="text-[11px] text-slate-500">
                After creation, you'll receive an encrypted secret URL & printable polaroid card.
              </p>
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
          <ArrowLeft className="w-4 h-4" /> Back to Live Preview
        </button>

        <div className="flex flex-col items-end gap-1">
          <button
            type="button"
            onClick={handleCreate}
            disabled={isSubmitting}
            className="px-10 py-4 rounded-full bg-gradient-to-r from-[#6B5B95] to-[#8B5CF6] hover:from-[#584880] hover:to-[#7C3AED] text-white font-bold text-base shadow-xl hover:shadow-2xl transition-all flex items-center gap-3 active:scale-95 cursor-pointer"
          >
            <Sparkles className="w-5 h-5" />
            <span>{isSubmitting ? 'Sealing Vault...' : 'Create My Surprise ✨'}</span>
          </button>
          <span className="text-[10px] text-slate-400">
            Creates custom unbox URL • Instant activation
          </span>
        </div>
      </div>
    </div>
  );
};
