import React, { useState } from 'react';
import { GiftPhoto } from '../../types/gift';
import { Heart, Volume2, Sparkles, MapPin, Calendar, RotateCcw } from 'lucide-react';
import { sound } from '../../utils/soundEngine';

interface PolaroidCardProps {
  photo: GiftPhoto;
  onClick?: () => void;
  interactive?: boolean;
  onToggleFavorite?: (id: string) => void;
  isFavorited?: boolean;
}

export const PolaroidCard: React.FC<PolaroidCardProps> = ({
  photo,
  onClick,
  interactive = true,
  onToggleFavorite,
  isFavorited = false
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const handleAudioPlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playChime();
    setIsPlayingAudio(true);
    setTimeout(() => setIsPlayingAudio(false), 2000);
  };

  const handleFlip = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playCameraClick();
    setIsFlipped(!isFlipped);
  };

  const handleHeart = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playSparkle();
    onToggleFavorite?.(photo.id);
  };

  return (
    <div
      onClick={onClick}
      style={{
        transform: `rotate(${photo.rotation || 0}deg) scale(${(photo.scale || 100) / 100})`,
        transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s'
      }}
      className={`relative bg-white p-3.5 pb-5 rounded-md shadow-md hover:shadow-xl hover:scale-[1.03] transition-all cursor-pointer group select-none border border-[#EFE5DE]`}
    >
      {/* Washi Tape Fastener at Top */}
      {photo.fastener === 'tape' && (
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-6 opacity-75 shadow-xs z-10 pointer-events-none rounded-xs"
          style={{
            backgroundColor: photo.fastenerColor || '#DDD6FE',
            transform: 'rotate(-2deg)'
          }}
        />
      )}
      {photo.fastener === 'clip' && (
        <div className="absolute -top-3 left-6 text-amber-700/60 z-10 text-xs font-mono font-bold">
          📎
        </div>
      )}
      {photo.fastener === 'wax' && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-rose-700/80 shadow-inner z-10 flex items-center justify-center text-[10px] text-amber-200">
          ★
        </div>
      )}

      {/* Cover Slot Badge if present */}
      {photo.isCover && (
        <span className="absolute top-4 left-4 z-10 text-[10px] font-bold bg-[#FEF3C7] text-[#B45309] px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1">
          ★ Cover Photo
        </span>
      )}

      {/* Slot Pill Number */}
      <span className="absolute top-4 right-4 z-10 text-[10px] font-bold text-slate-500 bg-white/80 backdrop-blur-xs px-1.5 py-0.5 rounded">
        #{String(photo.slotNumber).padStart(2, '0')}
      </span>

      {/* Card Content or Flipped Scribble Backing */}
      {!isFlipped ? (
        <div className="flex flex-col">
          <div className="w-full aspect-square rounded-sm overflow-hidden bg-slate-100 relative mb-3">
            <img
              src={photo.url}
              alt={photo.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          <div className="px-1 flex flex-col justify-between min-h-[52px]">
            <h4 className="font-handwriting text-xl font-bold text-[#2D232E] leading-snug truncate">
              {photo.caption || photo.title}
            </h4>

            <div className="flex items-center justify-between mt-1 text-[11px] text-[#8C7A87]">
              <span>{photo.date || 'Summer 2024'}</span>
              <div className="flex items-center gap-1.5">
                {photo.scribble && (
                  <button
                    onClick={handleFlip}
                    title="Flip for secret note"
                    className="p-1 hover:text-[#8B5CF6] transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" />
                  </button>
                )}
                {photo.audioClip && (
                  <button
                    onClick={handleAudioPlay}
                    title={`Play audio: ${photo.audioClip.title}`}
                    className={`p-1 hover:text-[#8B5CF6] transition-colors ${
                      isPlayingAudio ? 'text-[#8B5CF6] animate-pulse' : ''
                    }`}
                  >
                    <Volume2 className="w-3 h-3" />
                  </button>
                )}
                <button
                  onClick={handleHeart}
                  className="p-1 hover:text-rose-500 transition-colors"
                >
                  <Heart
                    className={`w-3.5 h-3.5 ${
                      isFavorited ? 'fill-rose-500 text-rose-500' : 'text-slate-300'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full aspect-square flex flex-col justify-between p-4 bg-[#FFFBF0] rounded-sm border border-amber-100 text-amber-950">
          <div>
            <div className="flex items-center justify-between text-xs text-amber-700/80 mb-2">
              <span className="font-semibold flex items-center gap-1">
                <MapPin className="w-3 h-3" /> {photo.location || 'Paris, France'}
              </span>
              <span>{photo.date}</span>
            </div>
            <p className="font-handwriting text-lg leading-relaxed text-amber-900">
              "{photo.scribble || photo.caption}"
            </p>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-amber-200/60 text-xs text-amber-800">
            <span className="font-bold">Secret Scribble</span>
            <button
              onClick={handleFlip}
              className="text-amber-800 font-bold hover:underline flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" /> Flip back
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
