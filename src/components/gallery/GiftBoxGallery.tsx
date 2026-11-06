import React from 'react';
import { Gift as GiftType } from '../../types/gift';
import {
  Gift,
  Plus,
  Eye,
  Edit,
  Share2,
  Trash2,
  Lock,
  Sparkles,
  Calendar,
  Heart,
  Music,
  Check
} from 'lucide-react';
import { sound } from '../../utils/soundEngine';

interface GiftBoxGalleryProps {
  gifts: GiftType[];
  activeGiftId: string;
  onSelectGift: (id: string) => void;
  onOpenRecipient: (id: string) => void;
  onOpenCreator: (id: string) => void;
  onCreateNew: () => void;
  onDeleteGift: (id: string) => void;
}

export const GiftBoxGallery: React.FC<GiftBoxGalleryProps> = ({
  gifts,
  activeGiftId,
  onSelectGift,
  onOpenRecipient,
  onOpenCreator,
  onCreateNew,
  onDeleteGift
}) => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 flex flex-col items-center">
      {/* Header */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 pb-4 border-b border-[#EFE5DE]">
        <div>
          <span className="text-[10px] uppercase font-bold text-purple-700 tracking-wider">
            SAVED BLUEPRINTS & VAULTS
          </span>
          <h2 className="font-display text-3xl font-bold text-[#2D232E] mt-0.5">
            Gift Box Gallery 🎁
          </h2>
          <p className="text-xs text-[#6D5D6E]">
            Manage your created surprise capsules, preview recipient views, and share magic links.
          </p>
        </div>

        <button
          onClick={() => {
            sound.playBoxOpen();
            onCreateNew();
          }}
          className="px-6 py-3 rounded-full bg-[#C084FC] hover:bg-[#A855F7] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Surprise</span>
        </button>
      </div>

      {/* Gifts Grid */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gifts.map((gift) => {
          const isActive = gift.id === activeGiftId;
          return (
            <div
              key={gift.id}
              className={`bg-white rounded-3xl p-6 border transition-all flex flex-col justify-between shadow-xs hover:shadow-md ${
                isActive ? 'border-purple-400 ring-2 ring-purple-200' : 'border-[#EFE5DE]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-100 to-pink-100 border border-purple-200 flex items-center justify-center text-xl shadow-2xs">
                    🎁
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      • {gift.status === 'published' ? 'Active & Sealed' : 'Draft'}
                    </span>
                    {isActive && (
                      <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full">
                        Selected
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="font-display text-xl font-bold text-[#2D232E] mb-1">
                  For {gift.recipient.name}
                </h3>
                <p className="text-xs text-slate-500 mb-4 font-medium">
                  {gift.recipient.bannerHeading || `Happy ${gift.recipient.milestoneAge}th Birthday!`}
                </p>

                {/* Info Pills */}
                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 mb-4 bg-slate-50 p-3 rounded-2xl">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-purple-600" />
                    <span>{gift.recipient.revealDate}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-amber-600" />
                    <span className="font-mono">{gift.security.secretKey}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5 text-rose-500" />
                    <span>From {gift.sender.name}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Music className="w-3.5 h-3.5 text-purple-600" />
                    <span className="truncate">{gift.music.title}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => {
                    sound.playBoxOpen();
                    onOpenRecipient(gift.id);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 font-bold flex items-center gap-1.5 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" /> View Gift
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      sound.playSparkle();
                      onOpenCreator(gift.id);
                    }}
                    className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                    title="Edit in Studio"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>

                  {gifts.length > 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(`Delete surprise for ${gift.recipient.name}?`)) {
                          sound.playWaxPop();
                          onDeleteGift(gift.id);
                        }
                      }}
                      className="p-2 rounded-xl bg-slate-100 hover:bg-rose-100 text-slate-500 hover:text-rose-600 transition-colors"
                      title="Delete Gift"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
