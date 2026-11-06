import React, { useState } from 'react';
import {
  ArrowRight,
  ArrowLeft,
  Volume2,
  Heart,
  Bookmark,
  Maximize2,
  RotateCcw,
  Sparkles,
  MapPin,
  Play,
  Grid,
  Layers,
  Sliders,
  Edit3
} from 'lucide-react';
import { Gift, GiftPhoto } from '../../types/gift';
import { sound } from '../../utils/soundEngine';
import { PolaroidCard } from '../shared/PolaroidCard';
import { AudioPlayerBar } from '../shared/AudioPlayerBar';
import { useToast } from '../shared/ToastNotification';
import { PhotoEditModal } from '../shared/PhotoEditModal';

interface Chapter2Props {
  gift: Gift;
  onNextChapter: () => void;
  onPrevChapter: () => void;
  onUpdateGift?: (updated: Partial<Gift>) => void;
}

export const Chapter2PhotoGallery: React.FC<Chapter2Props> = ({
  gift,
  onNextChapter,
  onPrevChapter,
  onUpdateGift
}) => {
  const { showToast } = useToast();
  const [viewMode, setViewMode] = useState<'scrapbook' | 'slideshow' | 'grid'>('scrapbook');
  const [activeFilter, setActiveFilter] = useState('All Moments');
  const [favoritedPhotos, setFavoritedPhotos] = useState<Record<string, boolean>>({
    photo_01: true,
    photo_08: true
  });
  const [playingFeaturedAudio, setPlayingFeaturedAudio] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState<GiftPhoto | null>(null);

  const handleToggleFavorite = (id: string) => {
    sound.playSparkle();
    setFavoritedPhotos((prev) => ({ ...prev, [id]: !prev[id] }));
    showToast('Favorited', 'Added to your favorites vault.', 'sparkle');
  };

  const handleFeaturedAudio = () => {
    sound.playChime();
    setPlayingFeaturedAudio(!playingFeaturedAudio);
  };

  const handleNext = () => {
    sound.playSparkle();
    onNextChapter();
  };

  const handleSaveEditedPhoto = (updatedPhoto: GiftPhoto) => {
    if (onUpdateGift) {
      const updatedPhotos = gift.photos.map((p) =>
        p.id === updatedPhoto.id ? updatedPhoto : p
      );
      onUpdateGift({ photos: updatedPhotos });
    }
    setEditingPhoto(null);
  };

  // Filter photos
  const filteredPhotos = gift.photos.filter((p) => {
    if (activeFilter === 'All Moments') return true;
    if (activeFilter === 'Roadtrips & Sunsets')
      return p.tag === 'Summer' || p.tag === 'Hero Moment' || p.tag === 'Adventure';
    if (activeFilter === 'Silly Mishaps')
      return p.tag === 'Cozy' || p.tag === 'Sweet' || p.tag === 'Night';
    if (activeFilter === 'Fur Baby Mochi 🐾')
      return (
        p.tag === 'Naptime' ||
        p.title.toLowerCase().includes('mochi') ||
        p.title.toLowerCase().includes('oli')
      );
    return true;
  });

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 flex flex-col items-center">
      {/* Chapter Indicator */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-[11px] font-bold text-rose-700 bg-rose-50 px-3.5 py-1 rounded-full border border-rose-100 shadow-2xs">
          ✨ CHAPTER 2 OF 4 • CURATED MOMENTS
        </span>
      </div>

      {/* Headline */}
      <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-center text-[#2D232E] tracking-tight">
        Every snapshot holds a story we cherish 📷
      </h2>
      <p className="mt-2 text-sm sm:text-base text-[#6D5D6E] text-center max-w-2xl">
        {gift.photos.length} keepsake polaroids captured with love. Tap any photo to inspect, flip, or edit in place.
      </p>

      {/* Controls & Filter Pills matching Stitch 18 */}
      <div className="mt-8 w-full max-w-5xl flex flex-wrap items-center justify-between gap-4 p-4 bg-white/80 backdrop-blur-xs rounded-2xl border border-[#EFE5DE]">
        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {['All Moments', 'Roadtrips & Sunsets', 'Silly Mishaps', 'Fur Baby Mochi 🐾'].map(
            (tab) => {
              const count = tab === 'All Moments' ? gift.photos.length : undefined;
              return (
                <button
                  key={tab}
                  onClick={() => {
                    sound.playSparkle();
                    setActiveFilter(tab);
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    activeFilter === tab
                      ? 'bg-[#C084FC] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {tab} {count ? `(${count})` : ''}
                </button>
              );
            }
          )}
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-full text-xs font-bold text-slate-600">
          <button
            onClick={() => setViewMode('scrapbook')}
            className={`px-3 py-1 rounded-full flex items-center gap-1.5 transition-colors cursor-pointer ${
              viewMode === 'scrapbook' ? 'bg-white text-slate-900 shadow-2xs' : ''
            }`}
          >
            <Layers className="w-3.5 h-3.5" /> Scrapbook Wall
          </button>
          <button
            onClick={() => setViewMode('slideshow')}
            className={`px-3 py-1 rounded-full flex items-center gap-1.5 transition-colors cursor-pointer ${
              viewMode === 'slideshow' ? 'bg-white text-slate-900 shadow-2xs' : ''
            }`}
          >
            ▶ Slideshow
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`px-3 py-1 rounded-full flex items-center gap-1.5 transition-colors cursor-pointer ${
              viewMode === 'grid' ? 'bg-white text-slate-900 shadow-2xs' : ''
            }`}
          >
            <Grid className="w-3.5 h-3.5" /> Grid
          </button>
        </div>
      </div>

      {/* Featured Keepsake #08 Spotlight Card matching Stitch 18 */}
      <div className="mt-8 w-full max-w-5xl bg-white p-6 sm:p-8 rounded-3xl border border-[#EFE5DE] shadow-md grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative overflow-hidden">
        {/* Airmail Stamp */}
        <div className="absolute top-4 right-6 w-16 h-12 bg-pink-50 border-2 border-dashed border-pink-300 rounded-md p-1 flex flex-col items-center justify-center text-center shadow-xs rotate-6">
          <span className="text-[7px] font-bold text-pink-700 uppercase">PARIS AIRMAIL</span>
          <span className="text-[8px] font-mono font-bold text-pink-900">24.06.22</span>
          <span className="text-[6px] text-pink-500 uppercase">SPECIAL MEMORY</span>
        </div>

        {/* Photo Column */}
        <div className="md:col-span-5 relative">
          <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 shadow-inner relative group">
            <img
              src={gift.photos[0]?.url || "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80"}
              alt="Rooftop in Paris"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <span className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
              <MapPin className="w-3 h-3 text-rose-400" /> {gift.photos[0]?.location || 'Paris, France'}
            </span>

            {/* Quick edit button */}
            <button
              type="button"
              onClick={() => setEditingPhoto(gift.photos[0])}
              className="absolute top-3 left-3 bg-white/90 hover:bg-white text-purple-700 text-xs font-bold px-2.5 py-1 rounded-full shadow-md flex items-center gap-1 transition-all"
            >
              <Edit3 className="w-3 h-3" /> Edit Photo
            </button>
          </div>
        </div>

        {/* Text & Audio Column */}
        <div className="md:col-span-7 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] uppercase font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
                • FEATURED KEEPSAKE #01
              </span>
              <span className="text-xs font-mono text-slate-400">{gift.photos[0]?.date || 'Summer'} • 9:42 PM</span>
            </div>

            <h3 className="font-display text-2xl font-bold text-[#2D232E] mt-1 mb-3">
              {gift.photos[0]?.title || 'Rooftop Sunset'}
            </h3>

            <div className="p-4 bg-[#FFFBF0] rounded-2xl border border-amber-200/80 mb-4">
              <p className="font-handwriting text-xl text-amber-950 leading-relaxed">
                "{gift.photos[0]?.caption || 'Remember when we danced in the pouring rain? Our shoes were ruined but my heart was completely full.'}"
              </p>
              <span className="text-[11px] uppercase font-bold text-amber-800 block text-right mt-2">
                — INKED BY {gift.sender.name.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Interactive Audio Clip & Actions Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
            <button
              onClick={handleFeaturedAudio}
              className={`px-4 py-2 rounded-full border text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                playingFeaturedAudio
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-purple-50 hover:bg-purple-100 text-purple-800 border-purple-200'
              }`}
            >
              <Play className="w-3.5 h-3.5 ml-0.5" />
              <span>Rain & Laughter Audio (0:14)</span>
              <div className="flex items-center gap-0.5 h-3 ml-1">
                {[30, 60, 90, 40].map((h, i) => (
                  <div
                    key={i}
                    style={{ height: `${h}%` }}
                    className={`w-0.5 rounded-full ${
                      playingFeaturedAudio ? 'bg-white animate-pulse' : 'bg-purple-400'
                    }`}
                  />
                ))}
              </div>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleToggleFavorite('featured')}
                className="p-2 rounded-full bg-slate-50 hover:bg-rose-50 text-slate-500 hover:text-rose-500 transition-colors cursor-pointer"
                title="Heart this memory"
              >
                <Heart
                  className={`w-4 h-4 ${
                    favoritedPhotos['featured'] ? 'fill-rose-500 text-rose-500' : ''
                  }`}
                />
              </button>
              <button
                onClick={() => {
                  sound.playSparkle();
                  showToast('Bookmarked', 'Added to your Keepsake Vault.', 'success');
                }}
                className="p-2 rounded-full bg-slate-50 hover:bg-purple-50 text-slate-500 hover:text-purple-600 transition-colors cursor-pointer"
                title="Bookmark"
              >
                <Bookmark className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Polaroid Gallery Grid matching Stitch 18 */}
      <div className="mt-8 w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredPhotos.map((photo) => (
          <div key={photo.id} className="relative group">
            <PolaroidCard
              photo={photo}
              isFavorited={favoritedPhotos[photo.id]}
              onToggleFavorite={handleToggleFavorite}
            />
            <button
              type="button"
              onClick={() => setEditingPhoto(photo)}
              title="Edit photo or text"
              className="absolute top-2 left-2 z-20 bg-white/90 hover:bg-white text-purple-700 p-1.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Bottom Milestone Progress Tracker matching Stitch 18 */}
      <div className="mt-12 w-full max-w-5xl bg-white p-5 rounded-3xl border border-[#EFE5DE] shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 font-bold text-xs">
            <span className="text-purple-600">Chapter 2 of 4</span>
            <span className="text-slate-400">• Gallery Complete</span>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onPrevChapter}
            className="px-6 py-2.5 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 transition-all flex items-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Unwrap
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-[#C084FC] to-[#8B5CF6] hover:from-[#A855F7] hover:to-[#7C3AED] text-white font-bold text-xs shadow-md hover:shadow-lg transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
          >
            <span>Proceed to Chapter 3: Love Letter 💌</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Floating Audio Player Bar */}
      <AudioPlayerBar music={gift.music} recipientName={gift.recipient.name} />

      {/* Photo Edit Modal */}
      <PhotoEditModal
        isOpen={Boolean(editingPhoto)}
        photo={editingPhoto}
        onClose={() => setEditingPhoto(null)}
        onSave={handleSaveEditedPhoto}
      />
    </div>
  );
};
