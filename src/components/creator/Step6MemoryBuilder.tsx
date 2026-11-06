import React, { useState } from 'react';
import {
  ArrowRight,
  ArrowLeft,
  Plus,
  Calendar,
  Sparkles,
  Heart,
  Tag,
  MapPin,
  RotateCcw,
  Camera,
  Check,
  Eye,
  Edit3,
  Upload,
  Trash2
} from 'lucide-react';
import { Gift, GiftMemory } from '../../types/gift';
import { sound } from '../../utils/soundEngine';
import { useToast } from '../shared/ToastNotification';
import { MemoryEditModal } from '../shared/MemoryEditModal';

interface Step6Props {
  gift: Gift;
  onUpdate: (updated: Partial<Gift>) => void;
  onNext: () => void;
  onBack: () => void;
}

const STICKER_LIST = ['🌸', '✨', '🎂', '☕', '🥂', '💌', '🎈', '🐱', '📍'];

export const Step6MemoryBuilder: React.FC<Step6Props> = ({
  gift,
  onUpdate,
  onNext,
  onBack
}) => {
  const { showToast } = useToast();
  const [memories, setMemories] = useState<GiftMemory[]>(gift.memories);
  const [isFlipMode, setIsFlipMode] = useState(false);
  const [flippedIds, setFlippedIds] = useState<Record<string, boolean>>({});
  const [editingMemory, setEditingMemory] = useState<GiftMemory | null>(null);

  // Drafting state for new memory
  const [draftTitle, setDraftTitle] = useState('');
  const [draftDate, setDraftDate] = useState('Aug 24, 2024');
  const [draftStory, setDraftStory] = useState('');
  const [draftTag, setDraftTag] = useState('#golden-memories');
  const [draftSticker, setDraftSticker] = useState('🌸');
  const [draftPhotoUrl, setDraftPhotoUrl] = useState(
    'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=600&q=80'
  );
  const [draftLocation, setDraftLocation] = useState('Secret Rooftop');
  const draftFileInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleDraftFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    sound.playCameraClick();
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        setDraftPhotoUrl(result);
        showToast('Photo Loaded', 'Ready for new memory pin.', 'success');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveDraft = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draftTitle.trim() || !draftStory.trim()) {
      showToast('Missing details', 'Please enter a memory title and story.', 'error');
      return;
    }

    sound.playCameraClick();
    const newMem: GiftMemory = {
      id: `mem_${Date.now()}`,
      number: memories.length + 1,
      title: draftTitle.trim(),
      date: draftDate.trim() || 'Aug 24, 2024',
      story: draftStory.trim(),
      photoUrl: draftPhotoUrl,
      tags: [draftTag, '#cherished'],
      location: draftLocation.trim(),
      sticker: draftSticker,
      stickerBg: '#FED7AA'
    };

    const updated = [...memories, newMem];
    setMemories(updated);
    onUpdate({ memories: updated });

    setDraftTitle('');
    setDraftStory('');
    sound.playSparkle();
    showToast('Memory Card Pinned!', `Created Memory #${newMem.number}: ${newMem.title}`, 'sparkle');
  };

  const handleToggleCardFlip = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playCameraClick();
    setFlippedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSaveEditedMemory = (updated: GiftMemory) => {
    const nextList = memories.map((m) => (m.id === updated.id ? updated : m));
    setMemories(nextList);
    onUpdate({ memories: nextList });
    setEditingMemory(null);
  };

  const handleDeleteMemory = (id: string) => {
    sound.playWaxPop();
    const nextList = memories.filter((m) => m.id !== id).map((m, idx) => ({
      ...m,
      number: idx + 1
    }));
    setMemories(nextList);
    onUpdate({ memories: nextList });
    showToast('Memory Removed', 'Card unpinned from board.', 'info');
  };

  const handleNext = () => {
    sound.playSparkle();
    onUpdate({ memories });
    onNext();
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 flex flex-col items-center">
      {/* Step Indicator */}
      <div className="w-full flex items-center justify-between mb-4 max-w-5xl">
        <span className="text-xs uppercase font-bold tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
          STEP 06 OF 08 • CREATOR STUDIO
        </span>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-purple-800 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
            Total Memories: {memories.length} Created
          </span>
          <button
            onClick={() => {
              sound.playSparkle();
              window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
            }}
            className="px-3 py-1 bg-[#C084FC] hover:bg-[#A855F7] text-white text-xs font-bold rounded-full flex items-center gap-1 shadow-2xs transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Pin New Memory
          </button>
        </div>
      </div>

      <div className="w-full max-w-5xl h-1.5 bg-[#EAE0D8] rounded-full overflow-hidden mb-6">
        <div className="w-6/8 h-full bg-[#8B5CF6] rounded-full transition-all duration-300" />
      </div>

      {/* Headline */}
      <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-center text-[#2D232E] tracking-tight">
        Little things we'll always remember 🌷
      </h2>
      <p className="mt-2 text-sm sm:text-base text-[#6D5D6E] text-center max-w-2xl">
        Pin individual micro-memories and milestones. Tap any card's edit pencil to replace story, photos, date, or sticker.
      </p>

      {/* Sort & Sticker Bar */}
      <div className="mt-8 w-full max-w-5xl flex flex-wrap items-center justify-between gap-4 p-4 bg-white/80 backdrop-blur-xs rounded-2xl border border-[#EFE5DE]">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
          <span className="text-slate-400 font-bold">SORT BY:</span>
          <button className="px-3 py-1 rounded-full bg-slate-900 text-white font-bold text-xs cursor-pointer">
            Story Timeline
          </button>
          <button className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 text-xs cursor-pointer">
            Chronological
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-slate-400 font-bold mr-1">DECO STICKERS:</span>
          {STICKER_LIST.map((st) => (
            <button
              key={st}
              onClick={() => {
                sound.playSparkle();
                showToast('Sticker ready', `Selected ${st} sticker`, 'sparkle');
              }}
              className="px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-sm transition-transform hover:scale-125"
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Memory Cards Grid matching Stitch 07 */}
      <div className="mt-8 w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {memories.map((mem) => {
          const isFlipped = flippedIds[mem.id] || isFlipMode;
          return (
            <div
              key={mem.id}
              className="bg-white p-6 rounded-3xl border border-[#EFE5DE] shadow-md hover:shadow-xl transition-all relative flex flex-col justify-between group"
            >
              {/* Paper Clip & Washi Tape Top */}
              <div className="w-14 h-4 bg-amber-200/80 -top-2 left-12 absolute rounded-xs shadow-xs pointer-events-none" />
              <div className="absolute -top-3 left-6 text-amber-800 font-mono text-sm pointer-events-none">
                📎
              </div>

              {/* Action Buttons Top Right */}
              <div className="absolute top-4 right-4 flex items-center gap-1.5 z-10">
                <button
                  type="button"
                  onClick={() => {
                    sound.playCameraClick();
                    setEditingMemory(mem);
                  }}
                  title="Edit Memory Details & Photo"
                  className="w-7 h-7 rounded-full bg-purple-50 hover:bg-purple-100 text-purple-700 flex items-center justify-center shadow-xs transition-colors cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteMemory(mem.id)}
                  title="Delete memory"
                  className="w-7 h-7 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-600 flex items-center justify-center shadow-xs transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
                <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-sm shadow-2xs">
                  {mem.sticker || '🌸'}
                </div>
              </div>

              {/* Memory Number Header */}
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-400 mb-3">
                <span>::: MEMORY #{mem.number}</span>
              </div>

              {!isFlipped ? (
                <div>
                  <div
                    onClick={(e) => handleToggleCardFlip(mem.id, e)}
                    className="w-full h-52 rounded-2xl overflow-hidden bg-slate-100 mb-4 relative cursor-pointer"
                  >
                    <img
                      src={mem.photoUrl}
                      alt={mem.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {mem.location && (
                      <span className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-rose-400" />
                        {mem.location}
                      </span>
                    )}

                    <span className="absolute bottom-3 right-3 bg-white/80 backdrop-blur-xs text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                      <RotateCcw className="w-3 h-3" /> Flip note
                    </span>
                  </div>

                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-display text-xl font-bold text-[#2D232E]">
                      {mem.title}
                    </h3>
                    <span className="text-xs font-mono text-slate-400">{mem.date}</span>
                  </div>

                  <p className="text-sm text-[#6D5D6E] leading-relaxed mb-4">
                    "{mem.story}"
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {mem.tags.map((t) => (
                        <span
                          key={t}
                          className="text-[11px] font-semibold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-100"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => setEditingMemory(mem)}
                      className="text-xs font-bold text-purple-600 hover:text-purple-800 flex items-center gap-1 cursor-pointer"
                    >
                      <Edit3 className="w-3 h-3" /> Edit story
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  onClick={(e) => handleToggleCardFlip(mem.id, e)}
                  className="h-full flex flex-col justify-between py-6 px-4 bg-[#FFFBF0] rounded-2xl border border-amber-200 cursor-pointer"
                >
                  <div>
                    <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block mb-2">
                      Handwritten Soundbite & Secret Clip
                    </span>
                    <p className="font-handwriting text-2xl text-amber-950 leading-relaxed">
                      "{mem.story}"
                    </p>
                  </div>
                  <div className="pt-4 border-t border-amber-200/80 flex items-center justify-between text-xs text-amber-800">
                    <span className="font-semibold">Recorded by {gift.sender.name}</span>
                    <span className="flex items-center gap-1 font-bold">
                      <RotateCcw className="w-3 h-3" /> Tap to unflip
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Drafting in Progress Card matching Stitch 07 */}
        <form
          onSubmit={handleSaveDraft}
          className="bg-[#FFFDF9] p-6 rounded-3xl border-2 border-dashed border-purple-200 shadow-sm flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-[#2D232E] flex items-center gap-1.5">
                <span>📝</span> DRAFTING IN PROGRESS
              </span>
              <span className="text-[10px] font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">
                Active Pin
              </span>
            </div>

            <input
              ref={draftFileInputRef}
              type="file"
              accept="image/*"
              onChange={handleDraftFileUpload}
              className="hidden"
            />

            {/* Photo preview with upload button */}
            <div
              onClick={() => draftFileInputRef.current?.click()}
              className="w-full h-36 rounded-xl overflow-hidden bg-purple-50/50 border border-purple-200 mb-3 relative group cursor-pointer flex items-center justify-center"
            >
              <img
                src={draftPhotoUrl}
                alt="Draft memory"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white text-xs font-bold gap-1.5">
                <Upload className="w-4 h-4" /> Replace Photo
              </div>
            </div>

            <div className="space-y-3">
              <input
                type="text"
                value={draftTitle}
                onChange={(e) => setDraftTitle(e.target.value)}
                placeholder="Memory Title (e.g. Midnight Ice Cream Run)"
                className="w-full px-3 py-2 text-xs bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-purple-400 font-bold"
              />

              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={draftDate}
                  onChange={(e) => setDraftDate(e.target.value)}
                  placeholder="Date (e.g. Aug 24, 2024)"
                  className="w-full px-3 py-1.5 text-xs bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-purple-400"
                />
                <input
                  type="text"
                  value={draftLocation}
                  onChange={(e) => setDraftLocation(e.target.value)}
                  placeholder="Location (e.g. Seaside Pier)"
                  className="w-full px-3 py-1.5 text-xs bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-purple-400"
                />
              </div>

              <textarea
                rows={3}
                value={draftStory}
                onChange={(e) => setDraftStory(e.target.value)}
                placeholder="What made this memory unforgettable? Share the story..."
                className="w-full px-3 py-2 text-xs bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-purple-400"
              />
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-purple-100 flex items-center justify-between">
            <div className="flex items-center gap-1 text-sm">
              {['🌸', '✨', '🎂', '☕', '🥂'].map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setDraftSticker(st)}
                  className={`w-6 h-6 rounded flex items-center justify-center ${
                    draftSticker === st ? 'bg-amber-100 scale-125' : ''
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Pin to Scrapbook
            </button>
          </div>
        </form>
      </div>

      {/* Navigation */}
      <div className="mt-10 w-full max-w-5xl flex items-center justify-between pt-6 border-t border-[#F0E6DE]">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3 rounded-full bg-white hover:bg-slate-50 border border-[#EAE0D8] text-xs font-bold text-slate-700 shadow-2xs transition-all flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Letter Studio
        </button>

        <button
          type="button"
          onClick={handleNext}
          className="px-8 py-3.5 rounded-full bg-[#6B5B95] hover:bg-[#584880] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
        >
          <span>Continue to Relationship Bond 🌸</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Memory Edit Modal */}
      <MemoryEditModal
        isOpen={Boolean(editingMemory)}
        memory={editingMemory}
        onClose={() => setEditingMemory(null)}
        onSave={handleSaveEditedMemory}
        onDelete={handleDeleteMemory}
      />
    </div>
  );
};
