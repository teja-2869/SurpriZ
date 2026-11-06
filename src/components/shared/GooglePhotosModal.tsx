import React, { useState } from 'react';
import { X, Check, Image as ImageIcon, Sparkles, FolderHeart } from 'lucide-react';
import { sound } from '../../utils/soundEngine';
import { useToast } from './ToastNotification';
import { GiftPhoto } from '../../types/gift';

interface GooglePhotosModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (selectedPhotos: GiftPhoto[]) => void;
  currentCount: number;
}

const GOOGLE_ALBUM_PHOTOS = [
  {
    title: 'Summer Seaside Dip',
    tag: 'Coast',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    caption: 'Crystal blue waters and sand everywhere! 🌊',
    date: 'July 14'
  },
  {
    title: 'Vintage Cafe Brunch',
    tag: 'Foodie',
    url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
    caption: 'Best blueberry pancakes in town 🥞',
    date: 'May 02'
  },
  {
    title: 'Trailhead Sunrise',
    tag: 'Adventure',
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    caption: 'Freezing cold at 5 AM but worth every ray ⛰️',
    date: 'Sep 19'
  },
  {
    title: 'Birthday Candle Glow',
    tag: 'Celebration',
    url: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80',
    caption: 'Cheering at midnight surrounded by loved ones 🎂',
    date: 'Oct 28'
  },
  {
    title: 'Autumn Park Walks',
    tag: 'Nature',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    caption: 'Golden leaves crunching under our boots 🍂',
    date: 'Nov 12'
  },
  {
    title: 'Cat Nap in Sunbeam',
    tag: 'Cozy',
    url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80',
    caption: 'Oliver sleeping upside down in the parcel box 🐾',
    date: 'Aug 05'
  }
];

export const GooglePhotosModal: React.FC<GooglePhotosModalProps> = ({
  isOpen,
  onClose,
  onImport,
  currentCount
}) => {
  const { showToast } = useToast();
  const [selectedIndices, setSelectedIndices] = useState<number[]>([0, 1]);

  if (!isOpen) return null;

  const toggleSelect = (index: number) => {
    sound.playCameraClick();
    setSelectedIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleImport = () => {
    sound.playSparkle();
    const imported: GiftPhoto[] = selectedIndices.map((idx, offset) => {
      const item = GOOGLE_ALBUM_PHOTOS[idx];
      return {
        id: `gp_photo_${Date.now()}_${offset}`,
        url: item.url,
        title: item.title,
        tag: item.tag,
        slotNumber: currentCount + offset + 1,
        isCover: false,
        rotation: (offset % 2 === 0 ? 1 : -1) * 3,
        scale: 100,
        frameStyle: 'polaroid',
        fastener: 'tape',
        fastenerColor: '#FBCFE8',
        caption: item.caption,
        date: item.date
      };
    });

    onImport(imported);
    showToast('Import Complete', `Added ${imported.length} photos from Google Photos`, 'success');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#FFFDFB] w-full max-w-2xl rounded-3xl shadow-2xl border border-purple-200 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-purple-100 bg-[#FAF5FF]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shadow-xs">
              <FolderHeart className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-purple-700 tracking-wider">
                Google Photos Sync
              </span>
              <h3 className="font-display text-base font-bold text-[#2D232E]">
                Select Moments from "Shared Favorites" Album
              </h3>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playWaxPop();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-white hover:bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center shadow-xs cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Photo Grid */}
        <div className="p-6 overflow-y-auto">
          <p className="text-xs text-slate-500 mb-4">
            Select photos from your connected library to include in this surprise parcel:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {GOOGLE_ALBUM_PHOTOS.map((photo, index) => {
              const isSelected = selectedIndices.includes(index);
              return (
                <div
                  key={photo.title}
                  onClick={() => toggleSelect(index)}
                  className={`relative rounded-2xl overflow-hidden border-2 cursor-pointer transition-all ${
                    isSelected
                      ? 'border-purple-600 ring-2 ring-purple-300 shadow-md scale-98'
                      : 'border-transparent hover:border-slate-300'
                  }`}
                >
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="w-full aspect-square object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-2.5">
                    <h5 className="text-xs font-bold text-white truncate">{photo.title}</h5>
                    <span className="text-[10px] text-white/80">{photo.date}</span>
                  </div>

                  <div
                    className={`absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center shadow-xs ${
                      isSelected ? 'bg-purple-600 text-white' : 'bg-black/40 text-white'
                    }`}
                  >
                    {isSelected ? <Check className="w-3.5 h-3.5" /> : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50">
          <span className="text-xs font-bold text-slate-600">
            {selectedIndices.length} moments selected
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleImport}
              disabled={selectedIndices.length === 0}
              className="px-6 py-2 rounded-full bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 disabled:opacity-40 cursor-pointer"
            >
              <Check className="w-4 h-4" /> Import {selectedIndices.length} Photos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
