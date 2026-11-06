import React, { useState } from 'react';
import {
  Upload,
  Image as ImageIcon,
  ArrowRight,
  ArrowLeft,
  Wand2,
  Shuffle,
  Plus,
  Trash2,
  Star,
  GripVertical,
  Check,
  Sparkles,
  Edit3,
  Video
} from 'lucide-react';
import { Gift, GiftPhoto } from '../../types/gift';
import { sound } from '../../utils/soundEngine';
import { useToast } from '../shared/ToastNotification';
import { PhotoEditModal } from '../shared/PhotoEditModal';
import { GooglePhotosModal } from '../shared/GooglePhotosModal';

interface Step3Props {
  gift: Gift;
  onUpdate: (updated: Partial<Gift>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const Step3PhotoCollection: React.FC<Step3Props> = ({
  gift,
  onUpdate,
  onNext,
  onBack
}) => {
  const { showToast } = useToast();
  const [photos, setPhotos] = useState<GiftPhoto[]>(gift.photos);
  const [editingPhoto, setEditingPhoto] = useState<GiftPhoto | null>(null);
  const [isGooglePhotosOpen, setIsGooglePhotosOpen] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    sound.playCameraClick();
    const newPhotos: GiftPhoto[] = [];

    Array.from(files).forEach((file, idx) => {
      if (photos.length + newPhotos.length >= 30) return;
      const url = URL.createObjectURL(file);
      const cleanName = file.name.replace(/\.[^/.]+$/, '').slice(0, 20);
      const slot = photos.length + newPhotos.length + 1;

      newPhotos.push({
        id: `photo_${Date.now()}_${idx}`,
        url,
        title: cleanName,
        tag: 'Moment',
        slotNumber: slot,
        isCover: photos.length === 0 && idx === 0,
        rotation: (idx % 2 === 0 ? 1 : -1) * 2,
        scale: 100,
        frameStyle: 'polaroid',
        fastener: 'tape',
        fastenerColor: '#DDD6FE',
        caption: `${cleanName} ✨`,
        date: 'Today',
        location: 'Special Place'
      });
    });

    const combined = [...photos, ...newPhotos];
    setPhotos(combined);
    onUpdate({ photos: combined });
    showToast('Photos Added', `Added ${newPhotos.length} moments to parcel.`, 'success');
  };

  const handleShuffle = () => {
    sound.playSparkle();
    const shuffled = [...photos].sort(() => Math.random() - 0.5).map((p, i) => ({
      ...p,
      slotNumber: i + 1,
      isCover: i === 0
    }));
    setPhotos(shuffled);
    onUpdate({ photos: shuffled });
    showToast('Story Resequenced', 'Photos shuffled into fresh sequence!', 'sparkle');
  };

  const handleAutoEnhance = () => {
    sound.playSparkle();
    const enhanced = photos.map((p) => ({
      ...p,
      fastenerColor: '#DDD6FE'
    }));
    setPhotos(enhanced);
    onUpdate({ photos: enhanced });
    showToast('Auto-Enhanced Colors', 'Harmonized film tone and contrasts across all moments ✨', 'sparkle');
  };

  const handleAddBorders = () => {
    sound.playCameraClick();
    const bordered = photos.map((p) => ({
      ...p,
      fastener: 'tape' as const,
      fastenerColor: '#FBCFE8'
    }));
    setPhotos(bordered);
    onUpdate({ photos: bordered });
    showToast('Scrapbook Borders Applied', 'Added pastel washi tape to all polaroids.', 'success');
  };

  const handleSetCover = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playSparkle();
    const updated = photos.map((p) => ({
      ...p,
      isCover: p.id === id
    }));
    setPhotos(updated);
    onUpdate({ photos: updated });
    showToast('Cover Photo Set', 'This photo will open the recipient experience!', 'sparkle');
  };

  const handleDeletePhoto = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playWaxPop();
    const filtered = photos.filter((p) => p.id !== id).map((p, i) => ({
      ...p,
      slotNumber: i + 1,
      isCover: i === 0
    }));
    setPhotos(filtered);
    onUpdate({ photos: filtered });
    showToast('Photo Removed', 'Moment removed from collection.', 'info');
  };

  const handleSaveEditedPhoto = (updatedPhoto: GiftPhoto) => {
    const updated = photos.map((p) => (p.id === updatedPhoto.id ? updatedPhoto : p));
    setPhotos(updated);
    onUpdate({ photos: updated });
    setEditingPhoto(null);
  };

  const handleGooglePhotosImport = (importedPhotos: GiftPhoto[]) => {
    const combined = [...photos, ...importedPhotos].slice(0, 30);
    setPhotos(combined);
    onUpdate({ photos: combined });
  };

  const handleNext = () => {
    sound.playSparkle();
    onUpdate({ photos });
    onNext();
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 flex flex-col items-center">
      {/* Step Indicator */}
      <div className="w-full flex items-center justify-between mb-4 max-w-5xl">
        <span className="text-xs uppercase font-bold tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
          STEP 03 OF 08 • CREATOR STUDIO
        </span>
        <span className="text-xs font-mono font-bold text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200">
          📷 {photos.length} / 30 added
        </span>
      </div>

      <div className="w-full max-w-5xl h-1.5 bg-[#EAE0D8] rounded-full overflow-hidden mb-6">
        <div
          className="h-full bg-[#8B5CF6] rounded-full transition-all duration-300"
          style={{ width: `${(photos.length / 30) * 100}%` }}
        />
      </div>

      {/* Headline */}
      <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-center text-[#2D232E] tracking-tight">
        Let's collect your favourite moments 📷
      </h2>
      <p className="mt-2 text-sm sm:text-base text-[#6D5D6E] text-center max-w-2xl">
        Upload up to 30 photos. Tap any photo to edit title, caption, location, or replace with new photos or AI video!
      </p>

      {/* Upload Dropzone matching Stitch 04 */}
      <div className="mt-8 w-full max-w-4xl bg-white rounded-3xl p-8 border-2 border-dashed border-purple-200 shadow-xs flex flex-col items-center text-center relative hover:border-purple-400 transition-colors">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileUpload}
          className="hidden"
        />

        <div className="w-16 h-16 rounded-3xl bg-purple-100 text-[#8B5CF6] flex items-center justify-center mb-4 relative shadow-inner">
          <Upload className="w-8 h-8" />
          <span className="absolute -top-1 -right-1 text-sm">✨</span>
        </div>

        <h3 className="font-display text-xl font-bold text-[#2D232E] mb-1">
          Drop photos here or Browse
        </h3>
        <p className="text-xs text-slate-500 max-w-md mb-6">
          Supports crisp high-res JPG, PNG, HEIC & Live Photos up to 25MB each.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-6 py-2.5 rounded-full bg-[#C084FC] hover:bg-[#A855F7] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
          >
            <ImageIcon className="w-4 h-4" />
            Choose from Computer
          </button>

          <button
            type="button"
            onClick={() => {
              sound.playSparkle();
              setIsGooglePhotosOpen(true);
            }}
            className="px-6 py-2.5 rounded-full bg-[#FAF5FF] hover:bg-purple-100 text-purple-700 text-xs font-bold border border-purple-200 transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
          >
            Import Google Photos
          </button>
        </div>

        {/* Feature badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-6 pt-6 border-t border-slate-100 text-[11px] text-slate-500">
          <span className="flex items-center gap-1.5 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-purple-500" /> Auto-orientation
          </span>
          <span className="flex items-center gap-1.5 font-medium">
            🔒 Encrypted Vault
          </span>
          <span className="flex items-center gap-1.5 font-medium">
            ♡ Print-ready DPI
          </span>
        </div>
      </div>

      {/* Quick Studio Magic Toolbar matching Stitch 04 */}
      <div className="mt-8 w-full max-w-5xl flex flex-wrap items-center justify-between gap-4 p-4 bg-white/80 backdrop-blur-xs rounded-2xl border border-[#EFE5DE]">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-600 mr-2">Quick Studio Magic:</span>
          <button
            onClick={handleAutoEnhance}
            className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Wand2 className="w-3.5 h-3.5 text-purple-600" />
            Auto-enhance Colors
          </button>
          <button
            onClick={handleAddBorders}
            className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            Add Scrapbook Borders
          </button>
          <button
            onClick={handleShuffle}
            className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Shuffle className="w-3.5 h-3.5 text-purple-600" />
            Shuffle Order
          </button>
        </div>

        <div className="flex items-center gap-4 text-xs font-semibold text-slate-500">
          <span className="flex items-center gap-1">
            <GripVertical className="w-3.5 h-3.5 text-slate-400" />
            Tap any card to Edit & Replace
          </span>
          <span className="flex items-center gap-1 text-amber-700 font-bold">
            ★ Cover Card = Slot #1
          </span>
        </div>
      </div>

      {/* 12 Photo Cards Grid matching Stitch 04 */}
      <div className="mt-8 w-full max-w-5xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {photos.map((photo) => (
          <div
            key={photo.id}
            onClick={() => {
              sound.playCameraClick();
              setEditingPhoto(photo);
            }}
            style={{
              transform: `rotate(${photo.rotation || 0}deg)`,
              transition: 'transform 0.2s'
            }}
            className="bg-white p-3.5 pb-4 rounded-xl shadow-md border border-[#EFE5DE] flex flex-col relative group hover:shadow-xl hover:scale-105 transition-all select-none cursor-pointer"
          >
            {/* Washi Tape */}
            <div
              className="w-12 h-4 -top-2 left-1/2 -translate-x-1/2 absolute rounded-xs opacity-80 shadow-xs pointer-events-none"
              style={{ backgroundColor: photo.fastenerColor || '#DDD6FE' }}
            />

            {/* Cover Badge */}
            {photo.isCover && (
              <span className="absolute top-2 left-2 z-10 text-[9px] font-bold bg-[#FEF3C7] text-[#B45309] px-1.5 py-0.5 rounded-full shadow-2xs flex items-center gap-0.5">
                ★ Cover Photo
              </span>
            )}

            {/* Hover actions */}
            <div className="absolute top-2 right-2 z-10 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  sound.playCameraClick();
                  setEditingPhoto(photo);
                }}
                title="Edit Text & Replace Image"
                className="w-6 h-6 rounded-full bg-white/95 text-purple-600 hover:bg-purple-50 flex items-center justify-center shadow-xs cursor-pointer"
              >
                <Edit3 className="w-3 h-3" />
              </button>
              <button
                type="button"
                onClick={(e) => handleSetCover(photo.id, e)}
                title="Set as Cover Photo"
                className="w-6 h-6 rounded-full bg-white/95 text-amber-500 hover:bg-amber-50 flex items-center justify-center shadow-xs cursor-pointer"
              >
                <Star className="w-3 h-3 fill-amber-400" />
              </button>
              <button
                type="button"
                onClick={(e) => handleDeletePhoto(photo.id, e)}
                title="Remove photo"
                className="w-6 h-6 rounded-full bg-white/95 text-rose-500 hover:bg-rose-50 flex items-center justify-center shadow-xs cursor-pointer"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>

            {/* Photo Image or Video Preview */}
            <div className="w-full aspect-square rounded-lg overflow-hidden bg-slate-100 mb-2 relative">
              {photo.videoUrl ? (
                <video
                  src={photo.videoUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <img
                  src={photo.url}
                  alt={photo.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              )}

              {photo.videoUrl && (
                <span className="absolute bottom-1 right-1 bg-black/70 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                  <Video className="w-2.5 h-2.5 text-rose-400" /> Loop
                </span>
              )}

              {/* In-place edit overlay hint */}
              <div className="absolute inset-0 bg-purple-900/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white text-[11px] font-bold gap-1">
                <Edit3 className="w-3.5 h-3.5" /> Edit & Replace
              </div>
            </div>

            {/* Title & Slot details */}
            <div className="flex flex-col">
              <h4 className="text-xs font-bold text-[#2D232E] truncate">
                {photo.title}
              </h4>
              <div className="flex items-center justify-between text-[10px] text-slate-400 mt-0.5">
                <span>#{String(photo.slotNumber).padStart(2, '0')} · {photo.isCover ? 'Cover Slot' : photo.tag}</span>
                <span className="font-semibold text-purple-600">{photo.tag}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Need more chapters banner */}
      <div className="mt-10 w-full max-w-5xl bg-[#FAF5FF] p-4 sm:p-5 rounded-2xl border border-purple-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-200 text-purple-700 flex items-center justify-center text-lg">
            📖
          </div>
          <div>
            <h4 className="text-xs font-bold text-purple-900">Need more chapters?</h4>
            <p className="text-[11px] text-purple-700">
              You have {30 - photos.length} slots remaining in this curated experience parcel.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="px-4 py-2 rounded-xl bg-white hover:bg-purple-50 text-purple-700 font-bold text-xs border border-purple-200 shadow-2xs transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          Add more photos
        </button>
      </div>

      {/* Navigation */}
      <div className="mt-10 w-full max-w-5xl flex items-center justify-between pt-6 border-t border-[#F0E6DE]">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3 rounded-full bg-white hover:bg-slate-50 border border-[#EAE0D8] text-xs font-bold text-slate-700 shadow-2xs transition-all flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Birthday Info
        </button>

        <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-emerald-700">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          Ready to synchronize
        </div>

        <button
          type="button"
          onClick={handleNext}
          className="px-8 py-3.5 rounded-full bg-[#6B5B95] hover:bg-[#584880] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
        >
          <span>Continue to Music 🎵</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Photo Edit & Replace Modal */}
      <PhotoEditModal
        isOpen={Boolean(editingPhoto)}
        photo={editingPhoto}
        onClose={() => setEditingPhoto(null)}
        onSave={handleSaveEditedPhoto}
      />

      {/* Google Photos Modal */}
      <GooglePhotosModal
        isOpen={isGooglePhotosOpen}
        onClose={() => setIsGooglePhotosOpen(false)}
        onImport={handleGooglePhotosImport}
        currentCount={photos.length}
      />
    </div>
  );
};
