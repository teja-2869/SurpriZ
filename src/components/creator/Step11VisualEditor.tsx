import React, { useState } from 'react';
import {
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Heart,
  Save,
  Share2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Smartphone,
  Monitor,
  Eye,
  Sliders,
  Type,
  Music,
  Plus,
  Layers,
  Check,
  Smile,
  Cake,
  Edit3,
  Video,
  Upload
} from 'lucide-react';
import { Gift, GiftPhoto, GiftMemory } from '../../types/gift';
import { sound } from '../../utils/soundEngine';
import { useToast } from '../shared/ToastNotification';
import { PhotoEditModal } from '../shared/PhotoEditModal';
import { GlobalTextEditModal } from '../shared/GlobalTextEditModal';

interface Step11Props {
  gift: Gift;
  onUpdate: (updated: Partial<Gift>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const Step11VisualEditor: React.FC<Step11Props> = ({
  gift,
  onUpdate,
  onNext,
  onBack
}) => {
  const { showToast } = useToast();
  const [photos, setPhotos] = useState<GiftPhoto[]>(gift.photos);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'photos' | 'text' | 'memories' | 'stickers' | 'sound'>('photos');
  const [viewDevice, setViewDevice] = useState<'desktop' | 'mobile'>('mobile');
  const [zoomLevel, setZoomLevel] = useState(100);

  // Modals state
  const [editingPhoto, setEditingPhoto] = useState<GiftPhoto | null>(null);
  const [isGlobalTextOpen, setIsGlobalTextOpen] = useState(false);

  // Safe age accessor
  const milestoneAge = gift?.birthday?.age ?? gift?.recipient?.milestoneAge ?? 25;

  // Editable Letter & Note Text in Canvas
  const [letterExcerpt, setLetterExcerpt] = useState(gift.letter.body.slice(0, 140) + '...');
  const [loveNote, setLoveNote] = useState(
    `Happy ${milestoneAge}th to my favorite human on Earth! ${gift.recipient.name}, you make everything sparkle brighter ✨`
  );

  const activePhoto = photos[selectedPhotoIndex] || photos[0];

  const updateActivePhoto = (partial: Partial<GiftPhoto>) => {
    const updated = [...photos];
    updated[selectedPhotoIndex] = { ...updated[selectedPhotoIndex], ...partial };
    setPhotos(updated);
    onUpdate({ photos: updated });
  };

  const handleSaveEditedPhoto = (updatedPhoto: GiftPhoto) => {
    const updated = photos.map((p) => (p.id === updatedPhoto.id ? updatedPhoto : p));
    setPhotos(updated);
    onUpdate({ photos: updated });
    setEditingPhoto(null);
  };

  const handleNext = () => {
    sound.playSparkle();
    onUpdate({ photos });
    onNext();
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 py-6 flex flex-col items-center">
      {/* Top Header Bar matching Stitch 12 */}
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 mb-4 pb-4 border-b border-[#EFE5DE]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#C084FC] text-white flex items-center justify-center shadow-xs">
            🖌️
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400">
              STEP 11 OF 12 • FULL CANVAS STUDIO • Auto-saved just now
            </span>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-[#2D232E]">
              Visual Gift Editor • {gift.recipient.name}'s {milestoneAge}th Birthday Surprise 🎁
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsGlobalTextOpen(true)}
            className="px-4 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-bold border border-purple-200 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Type className="w-3.5 h-3.5" /> Edit All Text
          </button>

          <button
            onClick={() => {
              sound.playSparkle();
              showToast('Draft Saved', 'Gift blueprint successfully preserved.', 'success');
            }}
            className="px-4 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" /> Save Draft
          </button>

          <button
            onClick={() => {
              sound.playSparkle();
              navigator.clipboard?.writeText(window.location.origin);
              showToast('Link Copied!', 'Gift share link copied to clipboard.', 'sparkle');
            }}
            className="px-4 py-2 rounded-xl bg-[#FCE7F3] hover:bg-[#FBCFE8] text-pink-700 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" /> Share Link
          </button>
        </div>
      </div>

      {/* Canvas Controls Strip */}
      <div className="w-full flex flex-wrap items-center justify-between gap-4 py-2 px-4 bg-white rounded-2xl border border-slate-200 mb-6 shadow-2xs">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
          <button
            onClick={() => setZoomLevel((z) => Math.max(z - 10, 70))}
            className="w-7 h-7 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-500 cursor-pointer"
          >
            -
          </button>
          <span className="w-12 text-center font-mono">{zoomLevel}%</span>
          <button
            onClick={() => setZoomLevel((z) => Math.min(z + 10, 140))}
            className="w-7 h-7 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-500 cursor-pointer"
          >
            +
          </button>
          <span className="text-slate-300">|</span>
          <button
            onClick={() => {
              sound.playSparkle();
              showToast('Undo', 'Reverted previous action.', 'info');
            }}
            className="p-1 hover:bg-slate-100 rounded text-slate-500 cursor-pointer"
            title="Undo"
          >
            ⤺
          </button>
          <button
            onClick={() => {
              sound.playSparkle();
              showToast('Redo', 'Restored action.', 'info');
            }}
            className="p-1 hover:bg-slate-100 rounded text-slate-500 cursor-pointer"
            title="Redo"
          >
            ⤻
          </button>
          <span className="text-slate-300">|</span>
          <button
            onClick={() => {
              sound.playSparkle();
              showToast('Grid Snapped', 'All polaroids aligned to grid.', 'info');
            }}
            className="px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded text-[11px] font-bold text-slate-700 cursor-pointer"
          >
            ▦ Snap
          </button>
        </div>

        {/* Device Switcher */}
        <div className="flex items-center p-1 bg-slate-100 rounded-xl text-xs font-bold">
          <button
            onClick={() => setViewDevice('desktop')}
            className={`px-3 py-1 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer ${
              viewDevice === 'desktop' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" /> Desktop
          </button>
          <button
            onClick={() => setViewDevice('mobile')}
            className={`px-3 py-1 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer ${
              viewDevice === 'mobile' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" /> Mobile
          </button>
        </div>
      </div>

      {/* Main 3-Column Studio Workspace matching Stitch 12 */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Chapters, Elements & Layers (3 cols) */}
        <div className="lg:col-span-3 bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#2D232E] uppercase tracking-wider">
              Canvas Elements
            </span>
            <span className="text-[10px] text-purple-700 font-bold bg-purple-100 px-2 py-0.5 rounded-full">
              Live Layer
            </span>
          </div>

          {/* Layer tabs */}
          <div className="flex flex-col gap-1 text-xs">
            <button
              onClick={() => setActiveTab('photos')}
              className={`p-2.5 rounded-xl text-left flex items-center justify-between transition-colors cursor-pointer ${
                activeTab === 'photos'
                  ? 'bg-purple-100/70 text-purple-900 font-bold'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span className="flex items-center gap-2">🖼️ Photo Gallery</span>
              <span className="text-[10px] text-slate-400">{photos.length} photos</span>
            </button>

            <button
              onClick={() => setActiveTab('text')}
              className={`p-2.5 rounded-xl text-left flex items-center justify-between transition-colors cursor-pointer ${
                activeTab === 'text'
                  ? 'bg-purple-100/70 text-purple-900 font-bold'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span className="flex items-center gap-2">📝 Text & Letters</span>
              <span className="text-[10px] text-slate-400">Stationery</span>
            </button>

            <button
              onClick={() => setActiveTab('memories')}
              className={`p-2.5 rounded-xl text-left flex items-center justify-between transition-colors cursor-pointer ${
                activeTab === 'memories'
                  ? 'bg-purple-100/70 text-purple-900 font-bold'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span className="flex items-center gap-2">📖 Memories</span>
              <span className="text-[10px] text-slate-400">{gift.memories.length} cards</span>
            </button>

            <button
              onClick={() => setActiveTab('sound')}
              className={`p-2.5 rounded-xl text-left flex items-center justify-between transition-colors cursor-pointer ${
                activeTab === 'sound'
                  ? 'bg-purple-100/70 text-purple-900 font-bold'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span className="flex items-center gap-2">🎵 Soundtrack</span>
              <Music className="w-3.5 h-3.5 text-purple-600" />
            </button>

            <button
              onClick={() => setActiveTab('stickers')}
              className={`p-2.5 rounded-xl text-left flex items-center justify-between transition-colors cursor-pointer ${
                activeTab === 'stickers'
                  ? 'bg-purple-100/70 text-purple-900 font-bold'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span className="flex items-center gap-2">✨ Deco Stickers</span>
              <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
                Deco
              </span>
            </button>
          </div>

          {/* TAB CONTENT: Photo selector list */}
          {activeTab === 'photos' && (
            <div className="pt-3 border-t border-slate-100 space-y-2">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                Select Photo to Choreograph
              </span>
              <div className="grid grid-cols-4 gap-1.5 max-h-36 overflow-y-auto">
                {photos.map((p, idx) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      sound.playCameraClick();
                      setSelectedPhotoIndex(idx);
                    }}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-transform cursor-pointer ${
                      selectedPhotoIndex === idx
                        ? 'border-purple-600 scale-105 shadow-xs'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={p.url} alt={p.title} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setEditingPhoto(activePhoto)}
                className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" /> Edit Selected Photo & Text
              </button>
            </div>
          )}

          {/* TAB CONTENT: Quick Deco Stickers Strip */}
          <div className="pt-3 border-t border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-2">
              Tap Stickers to Add Sparkle
            </span>
            <div className="flex items-center justify-between text-base p-2 bg-slate-50 rounded-xl">
              {['🌸', '✨', '🎂', '☕', '📷', '🎈'].map((st) => (
                <button
                  key={st}
                  onClick={() => {
                    sound.playSparkle();
                    showToast('Sticker added', `Attached ${st} to the page!`, 'sparkle');
                  }}
                  className="hover:scale-125 transition-transform cursor-pointer"
                >
                  {st}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Center Column: Live Canvas Viewport (6 cols) */}
        <div className="lg:col-span-6 flex flex-col items-center">
          <div
            style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
            className={`transition-all duration-300 w-full ${
              viewDevice === 'mobile' ? 'max-w-sm' : 'max-w-xl'
            } bg-[#FFFDF9] rounded-[40px] shadow-2xl border-8 border-slate-900/10 p-6 flex flex-col relative overflow-hidden`}
          >
            {/* Stage Title */}
            <div className="text-center mb-6">
              <span className="text-[10px] uppercase font-bold text-purple-600 tracking-wider">
                Chapter 3: {gift.recipient.name}'s Golden Moments
              </span>
              <p className="text-xs text-slate-400 mt-0.5">
                Curated with love by {gift.sender.name}
              </p>
            </div>

            {/* Draggable/Interactive Polaroid #1 */}
            <div
              onClick={() => {
                sound.playCameraClick();
                setSelectedPhotoIndex(0);
              }}
              style={{
                transform: `rotate(${activePhoto.rotation || -4}deg) scale(${
                  (activePhoto.scale || 105) / 100
                })`
              }}
              className="bg-white p-3.5 pb-5 rounded-xl shadow-lg border border-purple-200 cursor-pointer relative group transition-transform"
            >
              {/* Tape */}
              <div
                className="w-14 h-4 -top-2 left-1/2 -translate-x-1/2 absolute rounded-xs shadow-xs"
                style={{ backgroundColor: activePhoto.fastenerColor || '#F472B6' }}
              />

              <div className="w-full aspect-square rounded-lg overflow-hidden bg-slate-100 mb-2 relative">
                {activePhoto.videoUrl ? (
                  <video
                    src={activePhoto.videoUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={activePhoto.url}
                    alt={activePhoto.title}
                    className="w-full h-full object-cover"
                  />
                )}

                {/* Edit overlay */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditingPhoto(activePhoto);
                  }}
                  className="absolute bottom-2 right-2 bg-purple-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Edit3 className="w-3 h-3" /> Edit / Replace
                </button>
              </div>

              <h4 className="font-handwriting text-xl font-bold text-slate-800 text-center">
                {activePhoto.caption || activePhoto.title}
              </h4>
              <p className="text-[10px] text-slate-400 text-center font-mono mt-0.5">
                {activePhoto.date} • {activePhoto.location || 'Sunset Terrace'}
              </p>
            </div>

            {/* Polaroid #2 */}
            <div
              onClick={() => {
                sound.playCameraClick();
                setSelectedPhotoIndex(1 < photos.length ? 1 : 0);
              }}
              className="bg-white p-3 rounded-lg shadow-md border border-slate-200 rotate-2 mt-6 cursor-pointer hover:scale-105 transition-transform relative group"
            >
              <div className="w-12 h-3.5 -top-1.5 left-1/2 -translate-x-1/2 absolute bg-teal-200 rounded-xs" />
              <div className="w-full h-36 rounded overflow-hidden bg-slate-100 mb-2 relative">
                <img
                  src={photos[1]?.url || photos[0].url}
                  alt="Second moment"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditingPhoto(photos[1] || photos[0]);
                  }}
                  className="absolute bottom-2 right-2 bg-purple-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Edit3 className="w-2.5 h-2.5" /> Edit
                </button>
              </div>
              <h5 className="font-handwriting text-lg text-slate-800 text-center">
                {photos[1]?.caption || photos[1]?.title || 'Golden laughter'}
              </h5>
            </div>

            {/* Love Note Pinned */}
            <div className="mt-6 p-4 bg-[#FFF5F7] rounded-2xl border border-pink-200 shadow-xs relative">
              <span className="text-[10px] font-bold text-pink-700 flex items-center gap-1 mb-1">
                <Heart className="w-3 h-3 fill-pink-500" /> LOVE NOTE
              </span>
              <p className="font-handwriting text-xl text-pink-950 leading-relaxed">
                "{loveNote}"
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Element Inspector & Modifiers (3 cols) */}
        <div className="lg:col-span-3 bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#2D232E] uppercase tracking-wider">
              Element Inspector
            </span>
            <button
              type="button"
              onClick={() => setEditingPhoto(activePhoto)}
              className="text-[11px] text-purple-600 font-bold hover:underline flex items-center gap-1"
            >
              <Edit3 className="w-3 h-3" /> Full Editor
            </button>
          </div>

          {/* Photo Tilt Slider */}
          <div>
            <div className="flex items-center justify-between mb-1.5 text-xs">
              <span className="font-bold text-slate-700">Tilt Angle</span>
              <span className="font-mono text-purple-700 font-bold">
                {activePhoto.rotation || 0}°
              </span>
            </div>
            <input
              type="range"
              min="-15"
              max="15"
              value={activePhoto.rotation || 0}
              onChange={(e) => updateActivePhoto({ rotation: Number(e.target.value) })}
              className="w-full accent-purple-600"
            />
          </div>

          {/* Photo Scale Slider */}
          <div>
            <div className="flex items-center justify-between mb-1.5 text-xs">
              <span className="font-bold text-slate-700">Photo Scale</span>
              <span className="font-mono text-purple-700 font-bold">
                {activePhoto.scale || 100}%
              </span>
            </div>
            <input
              type="range"
              min="80"
              max="130"
              value={activePhoto.scale || 100}
              onChange={(e) => updateActivePhoto({ scale: Number(e.target.value) })}
              className="w-full accent-purple-600"
            />
          </div>

          {/* Frame Aesthetic */}
          <div>
            <span className="text-[11px] font-bold text-slate-700 block mb-2">
              Frame Aesthetic
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {(['polaroid', 'stamp', 'soft', 'film'] as const).map((frame) => (
                <button
                  key={frame}
                  type="button"
                  onClick={() => {
                    sound.playSparkle();
                    updateActivePhoto({ frameStyle: frame });
                  }}
                  className={`py-1.5 px-2 rounded-xl text-center capitalize text-[11px] font-semibold transition-colors cursor-pointer ${
                    activePhoto.frameStyle === frame
                      ? 'bg-purple-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {frame === 'polaroid' ? 'Polaroid Frame' : frame === 'stamp' ? 'Vintage Stamp' : frame === 'soft' ? 'Soft Rounded' : 'Film Strip'}
                </button>
              ))}
            </div>
          </div>

          {/* Caption input */}
          <div>
            <label className="text-[11px] font-bold text-slate-700 block mb-1">
              Handwritten Caption
            </label>
            <input
              type="text"
              value={activePhoto.caption || ''}
              onChange={(e) => updateActivePhoto({ caption: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-handwriting text-base font-bold text-[#2D232E] focus:ring-2 focus:ring-[#8B5CF6] focus:outline-none"
            />
          </div>

          {/* Love note quick edit */}
          <div>
            <label className="text-[11px] font-bold text-slate-700 block mb-1">
              Love Note on Stage
            </label>
            <textarea
              rows={2}
              value={loveNote}
              onChange={(e) => setLoveNote(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-[#8B5CF6] focus:outline-none font-handwriting text-base"
            />
          </div>
        </div>
      </div>

      {/* Storyboard Navigation Bar matching Stitch 12 bottom */}
      <div className="mt-10 w-full max-w-7xl bg-white p-6 rounded-3xl border border-[#EFE5DE] shadow-md flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-xs font-bold text-[#2D232E]">
              Unboxing Experience Storyboard
            </h4>
            <p className="text-[11px] text-slate-400">
              The recipient experiences your surprise chapters sequentially
            </p>
          </div>
          <span className="text-xs text-slate-500 font-semibold">
            Choreographed with live audio & haptic particles
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-center">
            <span className="text-[10px] font-mono text-slate-400 block mb-1">Ch. 1</span>
            <div className="text-lg mb-1">🔒</div>
            <h6 className="text-xs font-bold text-slate-800">Magical Lid & Seal</h6>
            <span className="text-[10px] text-slate-400">Step 1: Unlock</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-center">
            <span className="text-[10px] font-mono text-slate-400 block mb-1">Ch. 2</span>
            <div className="text-lg mb-1">💌</div>
            <h6 className="text-xs font-bold text-slate-800">The Heartfelt Letter</h6>
            <span className="text-[10px] text-slate-400">Step 2: Read letter</span>
          </div>

          <div className="p-3 bg-purple-50 rounded-2xl border-2 border-purple-400 text-center shadow-xs">
            <span className="text-[10px] font-bold text-purple-700 bg-white px-2 py-0.5 rounded-full inline-block mb-1">
              Active
            </span>
            <div className="text-lg mb-1">🖼️</div>
            <h6 className="text-xs font-bold text-purple-900">Scrapbook Wall</h6>
            <span className="text-[10px] text-purple-700 font-semibold">Step 3: Interactive</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-center">
            <span className="text-[10px] font-mono text-slate-400 block mb-1">Ch. 4</span>
            <div className="text-lg mb-1">📌</div>
            <h6 className="text-xs font-bold text-slate-800">Little Memory Pins</h6>
            <span className="text-[10px] text-slate-400">Step 4: Sound clips</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-center">
            <span className="text-[10px] font-mono text-slate-400 block mb-1">Ch. 5</span>
            <div className="text-lg mb-1">🎂</div>
            <h6 className="text-xs font-bold text-slate-800">Grand Birthday Finale</h6>
            <span className="text-[10px] text-slate-400">Step 5: Confetti burst</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors flex items-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Animation Studio
          </button>

          <span className="text-xs text-slate-500 hidden sm:block">
            ✨ Every surprise chapter comes with warm custom background melodies & haptic sparkles.
          </span>

          <button
            type="button"
            onClick={handleNext}
            className="px-8 py-3 rounded-full bg-[#C084FC] hover:bg-[#A855F7] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
          >
            <span>Preview Entire Experience ✨</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Modals */}
      <PhotoEditModal
        isOpen={Boolean(editingPhoto)}
        photo={editingPhoto}
        onClose={() => setEditingPhoto(null)}
        onSave={handleSaveEditedPhoto}
      />

      <GlobalTextEditModal
        isOpen={isGlobalTextOpen}
        gift={gift}
        onClose={() => setIsGlobalTextOpen(false)}
        onSave={(updated) => onUpdate(updated)}
      />
    </div>
  );
};
