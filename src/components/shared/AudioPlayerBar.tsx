import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Music2 } from 'lucide-react';
import { sound } from '../../utils/soundEngine';

import { GiftMusic } from '../../types/gift';

interface AudioPlayerBarProps {
  title?: string;
  artist?: string;
  autoPlay?: boolean;
  music?: GiftMusic;
  recipientName?: string;
}

export const AudioPlayerBar: React.FC<AudioPlayerBarProps> = ({
  title,
  artist,
  autoPlay = false,
  music,
  recipientName
}) => {
  const displayTitle = music?.title || title || 'Golden Hour Serenade';
  const displayArtist = music?.artist || artist || `${recipientName ? `${recipientName}'s` : "Birthday"} Mixtape • Track 02`;
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(sound.getMuted());

  useEffect(() => {
    if (autoPlay) {
      const playing = sound.toggleSoundtrack(true);
      setIsPlaying(playing);
    }
    return () => {
      // Don't auto-stop if navigating within experience unless unmounted
    };
  }, [autoPlay]);

  const handleTogglePlay = () => {
    const nextState = sound.toggleSoundtrack();
    setIsPlaying(nextState);
  };

  const handleToggleMute = () => {
    const nextMute = !isMuted;
    sound.setMuted(nextMute);
    setIsMuted(nextMute);
  };

  return (
    <div className="flex items-center gap-3 px-4 py-2 bg-white/90 backdrop-blur-md rounded-full border border-[#EFE5DE] shadow-sm max-w-sm">
      <button
        onClick={handleTogglePlay}
        className="w-8 h-8 rounded-full bg-[#8B5CF6] text-white flex items-center justify-center hover:bg-[#7C3AED] transition-transform active:scale-90 shrink-0"
        title={isPlaying ? 'Pause' : 'Play'}
      >
        {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
      </button>

      <div className="flex flex-col min-w-0 pr-1">
        <span className="text-xs font-bold text-[#2D232E] truncate">{title}</span>
        <span className="text-[10px] text-[#8C7A87] truncate">{artist}</span>
      </div>

      {/* Dynamic Waveform Visualizer */}
      <div className="flex items-center gap-0.5 h-4 px-1 shrink-0">
        {[40, 75, 55, 90, 60, 30].map((h, i) => (
          <span
            key={i}
            className={`w-0.5 rounded-full bg-[#8B5CF6] transition-all duration-300 ${
              isPlaying ? 'animate-pulse' : 'opacity-40'
            }`}
            style={{
              height: isPlaying ? `${h}%` : '20%',
              animationDelay: `${i * 120}ms`
            }}
          />
        ))}
      </div>

      <button
        onClick={handleToggleMute}
        className="text-[#8C7A87] hover:text-[#2D232E] transition-colors p-1 shrink-0"
        title={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5" />}
      </button>
    </div>
  );
};
