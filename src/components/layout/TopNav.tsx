import React from 'react';
import { Gift, Volume2, VolumeX, User, Sparkles } from 'lucide-react';
import { sound } from '../../utils/soundEngine';

export type AppMode = 'creator' | 'recipient' | 'gallery';

interface TopNavProps {
  currentMode: AppMode;
  onSelectMode: (mode: AppMode) => void;
  soundMuted: boolean;
  onToggleSound: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  currentMode,
  onSelectMode,
  soundMuted,
  onToggleSound
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#FFF9F5]/90 backdrop-blur-md border-b border-[#F3E8E2] px-4 md:px-8 py-3 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Zone */}
        <button
          onClick={() => {
            sound.playChime();
            onSelectMode('creator');
          }}
          className="flex items-center gap-2.5 text-left group transition-transform active:scale-95"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#8B5CF6] to-[#EC4899] flex items-center justify-center text-white shadow-sm group-hover:shadow transition-shadow">
            <Gift className="w-4 h-4" />
          </div>
          <span className="font-display font-bold text-xl tracking-wide text-[#2D232E]">
            SURPRIZ
          </span>
        </button>

        {/* Central Segmented Mode Switcher */}
        <div className="hidden sm:flex items-center p-1 bg-[#F5ECE5] rounded-full border border-[#E9DFD8] shadow-inner text-xs font-semibold">
          <button
            onClick={() => {
              sound.playSparkle();
              onSelectMode('creator');
            }}
            className={`px-4 py-1.5 rounded-full transition-all duration-200 ${
              currentMode === 'creator'
                ? 'bg-[#C084FC] text-white shadow-sm font-bold'
                : 'text-[#6D5D6E] hover:text-[#2D232E]'
            }`}
          >
            Creator Studio
          </button>
          <button
            onClick={() => {
              sound.playSparkle();
              onSelectMode('recipient');
            }}
            className={`px-4 py-1.5 rounded-full transition-all duration-200 ${
              currentMode === 'recipient'
                ? 'bg-[#C084FC] text-white shadow-sm font-bold'
                : 'text-[#6D5D6E] hover:text-[#2D232E]'
            }`}
          >
            Recipient Experience
          </button>
          <button
            onClick={() => {
              sound.playSparkle();
              onSelectMode('gallery');
            }}
            className={`px-4 py-1.5 rounded-full transition-all duration-200 ${
              currentMode === 'gallery'
                ? 'bg-[#C084FC] text-white shadow-sm font-bold'
                : 'text-[#6D5D6E] hover:text-[#2D232E]'
            }`}
          >
            Gift Box Gallery
          </button>
        </div>

        {/* Right Action Zone */}
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleSound}
            title={soundMuted ? 'Turn on sound' : 'Mute sound'}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 border border-[#EBE0D8] text-xs font-medium text-[#6D5D6E] hover:text-[#2D232E] hover:bg-white shadow-2xs transition-all"
          >
            {soundMuted ? (
              <>
                <VolumeX className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden md:inline">Chimes Off</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#8B5CF6] animate-pulse" />
                <span className="hidden md:inline">Chimes On</span>
              </>
            )}
          </button>

          <button
            onClick={() => {
              sound.playSparkle();
              onSelectMode('gallery');
            }}
            title="Profile & Vault"
            className="w-8 h-8 rounded-full bg-[#6B5B95] text-white flex items-center justify-center hover:opacity-90 transition-opacity shadow-xs"
          >
            <User className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mobile Mode Switcher Strip */}
      <div className="flex sm:hidden items-center justify-center gap-1 mt-2 p-1 bg-[#F5ECE5] rounded-full text-xs font-semibold">
        <button
          onClick={() => onSelectMode('creator')}
          className={`flex-1 py-1 rounded-full text-center ${
            currentMode === 'creator' ? 'bg-[#C084FC] text-white font-bold' : 'text-[#6D5D6E]'
          }`}
        >
          Creator
        </button>
        <button
          onClick={() => onSelectMode('recipient')}
          className={`flex-1 py-1 rounded-full text-center ${
            currentMode === 'recipient' ? 'bg-[#C084FC] text-white font-bold' : 'text-[#6D5D6E]'
          }`}
        >
          Recipient
        </button>
        <button
          onClick={() => onSelectMode('gallery')}
          className={`flex-1 py-1 rounded-full text-center ${
            currentMode === 'gallery' ? 'bg-[#C084FC] text-white font-bold' : 'text-[#6D5D6E]'
          }`}
        >
          Gallery
        </button>
      </div>
    </header>
  );
};
