import React, { useState } from 'react';
import {
  ArrowRight,
  ArrowLeft,
  Heart,
  Bookmark,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Volume2,
  Smile,
  ShieldCheck,
  Check,
  Edit3
} from 'lucide-react';
import { Gift } from '../../types/gift';
import { sound } from '../../utils/soundEngine';
import { fireHeartSparkles } from '../../utils/confettiEngine';
import { useToast } from '../shared/ToastNotification';

interface Chapter3Props {
  gift: Gift;
  onNextChapter: () => void;
  onPrevChapter: () => void;
  onUpdateGift?: (updated: Partial<Gift>) => void;
}

export const Chapter3LetterReveal: React.FC<Chapter3Props> = ({
  gift,
  onNextChapter,
  onPrevChapter,
  onUpdateGift
}) => {
  const { showToast } = useToast();
  const [hugsCount, setHugsCount] = useState(gift.letter.hugsCount || 34);
  const [hasHugged, setHasHugged] = useState(false);
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);
  const [isEditingLetter, setIsEditingLetter] = useState(false);
  const [editedSalutation, setEditedSalutation] = useState(gift.letter.salutation);
  const [editedBody, setEditedBody] = useState(gift.letter.body);

  const handleSendHug = () => {
    sound.playSparkle();
    fireHeartSparkles();
    if (!hasHugged) {
      setHugsCount((h) => h + 1);
      setHasHugged(true);
      showToast('Hug Sent! ♥', `Sent a warm hug to ${gift.sender.name}!`, 'sparkle');
    }
  };

  const handleToggleVoice = () => {
    sound.playChime();
    setIsPlayingVoice(!isPlayingVoice);
    showToast(
      isPlayingVoice ? 'Voice Note Paused' : 'Voice Note Playing',
      `Playing ${gift.sender.name}'s recorded message`,
      'info'
    );
  };

  const handleSaveLetter = () => {
    sound.playWaxPop();
    if (onUpdateGift) {
      onUpdateGift({
        letter: {
          ...gift.letter,
          salutation: editedSalutation,
          body: editedBody
        }
      });
    }
    setIsEditingLetter(false);
    showToast('Letter Updated', 'Saved new heartfelt wording.', 'success');
  };

  const handleNext = () => {
    sound.playSparkle();
    onNextChapter();
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 flex flex-col items-center">
      {/* Chapter Indicator */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-[11px] font-bold text-rose-700 bg-rose-50 px-3.5 py-1 rounded-full border border-rose-100 shadow-2xs">
          ♥ CHAPTER 3 OF 4 • WORDS FROM THE HEART
        </span>
        <button
          type="button"
          onClick={() => setIsEditingLetter(!isEditingLetter)}
          className="px-3 py-1 rounded-full bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-bold border border-purple-200 flex items-center gap-1 transition-colors cursor-pointer"
        >
          <Edit3 className="w-3 h-3" /> {isEditingLetter ? 'Done Editing' : 'Edit Letter Text'}
        </button>
      </div>

      {/* Headline */}
      <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-center text-[#2D232E] tracking-tight">
        A letter written just for you 💌
      </h2>
      <p className="mt-2 text-sm sm:text-base text-[#6D5D6E] text-center max-w-xl">
        Take a slow breath, plug in your earphones, and open the keepsake note crafted late into the night.
      </p>

      {/* Luxury Parchment Letter Card matching Stitch 19 */}
      <div className="mt-10 w-full bg-gradient-to-b from-[#F9EFEA] to-[#F1E4DF] p-4 sm:p-8 rounded-[40px] shadow-2xl border border-[#E8DCD5] relative">
        <div className="bg-[#FFFDF9] rounded-3xl p-6 sm:p-10 shadow-md border border-[#F0E6DE] flex flex-col relative overflow-hidden">
          {/* Top Washi Tape */}
          <div className="w-20 h-4 bg-amber-200/80 -top-2 left-16 absolute rounded-xs shadow-xs" />
          <div className="w-20 h-4 bg-pink-200/80 -top-2 right-16 absolute rounded-xs shadow-xs" />

          {/* Monogram Seal Top Right */}
          <div className="absolute top-8 right-8 w-14 h-14 rounded-full bg-[#6B5B95] text-white flex flex-col items-center justify-center font-display shadow-md border-2 border-white select-none">
            <span className="text-xs font-bold">
              {gift.sender.name[0]}&{gift.recipient.name[0]}
            </span>
            <span className="text-[10px]">♡</span>
          </div>

          <div className="mb-2">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Keepsake Archive #{gift.birthday?.age ?? gift.recipient?.milestoneAge ?? 25}
            </span>

            {isEditingLetter ? (
              <input
                type="text"
                value={editedSalutation}
                onChange={(e) => setEditedSalutation(e.target.value)}
                className="w-full mt-1 px-3 py-2 bg-purple-50/50 rounded-xl border border-purple-200 font-display text-2xl font-bold text-purple-950"
              />
            ) : (
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-purple-950 mt-1 leading-snug pr-16">
                {gift.letter.salutation}
              </h3>
            )}
          </div>

          {/* Letter Body in Beautiful Caveat Handwriting */}
          {isEditingLetter ? (
            <div className="mt-4 space-y-3">
              <textarea
                rows={8}
                value={editedBody}
                onChange={(e) => setEditedBody(e.target.value)}
                className="w-full p-4 bg-purple-50/40 rounded-2xl border border-purple-200 font-handwriting text-2xl leading-relaxed text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <button
                type="button"
                onClick={handleSaveLetter}
                className="px-6 py-2.5 rounded-full bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <Check className="w-4 h-4" /> Save Letter Changes
              </button>
            </div>
          ) : (
            <div className="mt-6 text-slate-900 font-handwriting text-2xl leading-relaxed whitespace-pre-line tracking-wide">
              {gift.letter.body}
            </div>
          )}

          {/* Postmark & Reactions Bar matching Stitch 19 */}
          <div className="mt-10 pt-6 border-t border-[#F0E6DE] flex flex-wrap items-center justify-between gap-4">
            <div className="p-3 bg-[#FAF5FF] rounded-2xl border border-purple-100 flex items-center gap-2.5">
              <span className="text-lg">💌</span>
              <div>
                <span className="text-[10px] uppercase font-bold text-purple-700 block">
                  POSTMARKED WITH LOVE
                </span>
                <span className="text-xs font-medium text-slate-600">
                  {gift.letter.postmark}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleSendHug}
                className={`px-4 py-2.5 rounded-full border text-xs font-bold flex items-center gap-2 transition-all active:scale-95 cursor-pointer ${
                  hasHugged
                    ? 'bg-rose-500 text-white shadow-md'
                    : 'bg-rose-50 hover:bg-rose-100 text-rose-700 border-rose-200'
                }`}
              >
                <Heart className={`w-4 h-4 ${hasHugged ? 'fill-white' : 'fill-rose-500'}`} />
                <span>{hugsCount} Warm Hugs</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  sound.playSparkle();
                  showToast('Letter Bookmarked', 'Saved into your personal Keepsake Vault.', 'success');
                }}
                className="p-2.5 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-500 border border-slate-200 cursor-pointer"
                title="Bookmark letter"
              >
                <Bookmark className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="mt-10 w-full flex items-center justify-between">
        <button
          type="button"
          onClick={onPrevChapter}
          className="px-6 py-3 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 transition-all flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Photo Gallery
        </button>

        <button
          type="button"
          onClick={handleNext}
          className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#C084FC] to-[#8B5CF6] hover:from-[#A855F7] hover:to-[#7C3AED] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
        >
          <span>Continue to Birthday Finale 🎂</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
