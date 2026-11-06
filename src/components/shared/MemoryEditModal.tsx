import React, { useState } from 'react';
import {
  X,
  Upload,
  Sparkles,
  MapPin,
  Calendar,
  Tag,
  Check,
  RotateCw,
  Camera,
  Trash2,
  Smile
} from 'lucide-react';
import { GiftMemory } from '../../types/gift';
import { sound } from '../../utils/soundEngine';
import { useToast } from './ToastNotification';

interface MemoryEditModalProps {
  isOpen: boolean;
  memory: GiftMemory | null;
  onClose: () => void;
  onSave: (updated: GiftMemory) => void;
  onDelete?: (id: string) => void;
}

const STICKERS = ['🌸', '✨', '🎂', '☕', '🥂', '💌', '🎈', '🐱', '🥐', '📍', '🌻', '🎁'];

export const MemoryEditModal: React.FC<MemoryEditModalProps> = ({
  isOpen,
  memory,
  onClose,
  onSave,
  onDelete
}) => {
  const { showToast } = useToast();

  if (!isOpen || !memory) return null;

  const [title, setTitle] = useState(memory.title);
  const [date, setDate] = useState(memory.date);
  const [story, setStory] = useState(memory.story);
  const [location, setLocation] = useState(memory.location || '');
  const [photoUrl, setPhotoUrl] = useState(memory.photoUrl);
  const [sticker, setSticker] = useState(memory.sticker || '🌸');
  const [tagsInput, setTagsInput] = useState(memory.tags.join(', '));
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    sound.playCameraClick();
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        setPhotoUrl(result);
        showToast('Memory Photo Updated', `Loaded "${file.name}"`, 'success');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (!title.trim() || !story.trim()) {
      showToast('Missing details', 'Please enter both a title and story for this memory.', 'error');
      return;
    }

    sound.playWaxPop();
    const parsedTags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)
      .map((t) => (t.startsWith('#') ? t : `#${t}`));

    const updated: GiftMemory = {
      ...memory,
      title: title.trim(),
      date: date.trim() || 'August 2024',
      story: story.trim(),
      location: location.trim(),
      photoUrl,
      sticker,
      tags: parsedTags.length > 0 ? parsedTags : ['#cherished']
    };

    onSave(updated);
    showToast('Memory Updated', `Saved "${updated.title}"`, 'success');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#FFFDFB] w-full max-w-2xl rounded-3xl shadow-2xl border border-purple-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-purple-100 bg-[#FAF5FF]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-900 flex items-center justify-center font-bold text-lg shadow-xs">
              {sticker}
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-purple-700 tracking-wider">
                Scrapbook Memory Editor
              </span>
              <h3 className="font-display text-lg font-bold text-[#2D232E]">
                Edit Memory #{memory.number}: {title}
              </h3>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playWaxPop();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-white hover:bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center shadow-xs transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          {/* Photo replacement */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              Memory Photograph
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-2xl border border-slate-200">
              <img
                src={photoUrl}
                alt={title}
                className="w-20 h-20 rounded-xl object-cover shrink-0 border border-slate-200 shadow-2xs"
              />
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap gap-2 mb-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1.5 rounded-full bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-2xs cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5" /> Upload Replacement Photo
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPhotoUrl('https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80');
                      showToast('Photo Reset', 'Replaced with party keepsake.', 'info');
                    }}
                    className="px-3 py-1.5 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold"
                  >
                    Reset to Default
                  </button>
                </div>
                <input
                  type="url"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  placeholder="Or paste photo URL..."
                  className="w-full px-2.5 py-1 text-xs bg-white rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-purple-400 font-mono text-slate-600"
                />
              </div>
            </div>
          </div>

          {/* Title & Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Memory Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Midnight stargazing on the roof"
                className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-slate-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1 flex items-center gap-1">
                <Calendar className="w-3 h-3 text-purple-600" /> Date or Timestamp
              </label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="e.g. Aug 24, 2024"
                className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
          </div>

          {/* Location & Sticker */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-rose-500" /> Location / Setting
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Lisbon Sunset Terrace"
                className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1 flex items-center gap-1">
                <Smile className="w-3 h-3 text-amber-500" /> Deco Sticker
              </label>
              <div className="flex items-center gap-1.5 overflow-x-auto py-1">
                {STICKERS.map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => {
                      sound.playSparkle();
                      setSticker(st);
                    }}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-base transition-transform ${
                      sticker === st
                        ? 'bg-amber-100 scale-125 border border-amber-300'
                        : 'bg-slate-100 hover:bg-slate-200'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Story Narrative */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Heartfelt Story & What Made It Special
            </label>
            <textarea
              rows={3}
              value={story}
              onChange={(e) => setStory(e.target.value)}
              placeholder="Tell the unforgettable story of this moment..."
              className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-slate-200 text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1 flex items-center gap-1">
              <Tag className="w-3 h-3 text-slate-400" /> Tags (comma separated)
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="#golden-memories, #unforgettable, #cherished"
              className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50">
          {onDelete ? (
            <button
              type="button"
              onClick={() => {
                if (window.confirm('Delete this memory card?')) {
                  onDelete(memory.id);
                  onClose();
                }
              }}
              className="px-4 py-2 rounded-xl text-rose-600 hover:bg-rose-50 text-xs font-bold transition-colors flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" /> Delete
            </button>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-6 py-2 rounded-full bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
            >
              <Check className="w-4 h-4" /> Save Memory
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
