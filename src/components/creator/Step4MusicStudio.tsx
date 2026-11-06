import React, { useState, useRef } from 'react';
import {
  Music,
  Play,
  Pause,
  Repeat,
  Volume2,
  Mic,
  MicOff,
  Upload,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Heart,
  RefreshCw,
  Check,
  Disc,
  Radio
} from 'lucide-react';
import { Gift, GiftMusic } from '../../types/gift';
import { sound } from '../../utils/soundEngine';
import { useToast } from '../shared/ToastNotification';

interface Step4Props {
  gift: Gift;
  onUpdate: (updated: Partial<Gift>) => void;
  onNext: () => void;
  onBack: () => void;
}

interface SoundtrackItem {
  id: string;
  title: string;
  artist: string;
  vibe: 'Dreamy Nostalgia' | 'Warm & Acoustic' | 'Celebratory & Sparkly';
  genre: string;
  duration: string;
}

const PRESET_TRACKS: Record<string, SoundtrackItem[]> = {
  'Dreamy Nostalgia': [
    { id: 't1', title: 'Sunflower Waltz', artist: 'Piano & Cello', vibe: 'Dreamy Nostalgia', genre: 'Piano & Cello', duration: '2:40' },
    { id: 't2', title: 'Lo-Fi Birthday Chimes', artist: 'Warm Beat', vibe: 'Dreamy Nostalgia', genre: 'Warm Beat', duration: '3:12' },
    { id: 't3', title: 'Paper Cranes Floating', artist: 'Gentle Harp', vibe: 'Dreamy Nostalgia', genre: 'Gentle Harp', duration: '2:18' }
  ],
  'Warm & Acoustic': [
    { id: 't4', title: 'Golden Hour Serenade', artist: 'Leon & Clara', vibe: 'Warm & Acoustic', genre: 'Acoustic Guitar & Soft Chimes', duration: '3:15' },
    { id: 't5', title: 'Campfire Whispers', artist: 'Fingerstyle Guitar', vibe: 'Warm & Acoustic', genre: 'Fingerstyle Guitar', duration: '2:15' },
    { id: 't6', title: 'Ukulele Picnic', artist: 'Playful Acoustic', vibe: 'Warm & Acoustic', genre: 'Playful Acoustic', duration: '1:50' },
    { id: 't7', title: 'Sunday Porch Breeze', artist: 'Soft Strumming', vibe: 'Warm & Acoustic', genre: 'Soft Strumming', duration: '2:45' }
  ],
  'Celebratory & Sparkly': [
    { id: 't8', title: 'Pastel Pop Confetti', artist: 'Upbeat Glockenspiel', vibe: 'Celebratory & Sparkly', genre: 'Upbeat Glockenspiel', duration: '2:55' },
    { id: 't9', title: 'Midnight Starlight', artist: 'Orchestral Sparkles', vibe: 'Celebratory & Sparkly', genre: 'Orchestral Sparkles', duration: '3:30' },
    { id: 't10', title: 'Birthday Fireworks', artist: 'Euphoric Brass', vibe: 'Celebratory & Sparkly', genre: 'Euphoric Brass', duration: '2:05' }
  ]
};

export const Step4MusicStudio: React.FC<Step4Props> = ({
  gift,
  onUpdate,
  onNext,
  onBack
}) => {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'presets' | 'ai-music' | 'upload' | 'voice'>('presets');
  const [currentMusic, setCurrentMusic] = useState<GiftMusic>(gift.music);
  const [isPlaying, setIsPlaying] = useState(false);

  // Audio file upload ref
  const audioFileInputRef = useRef<HTMLInputElement | null>(null);

  // Voice recording state
  const [isRecording, setIsRecording] = useState(false);
  const [recordSeconds, setRecordSeconds] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recordTimerRef = useRef<any>(null);

  // AI Lyria Generation state
  const [lyriaPrompt, setLyriaPrompt] = useState('Gentle acoustic guitar arpeggios with soft windchimes and nostalgic warmth for a 25th birthday unboxing');
  const [lyriaModel, setLyriaModel] = useState<'lyria-3-clip-preview' | 'lyria-3-pro-preview'>('lyria-3-clip-preview');
  const [isGeneratingMusic, setIsGeneratingMusic] = useState(false);

  const handleTogglePlay = () => {
    const nextState = sound.toggleSoundtrack();
    setIsPlaying(nextState);
  };

  const handleSelectTrack = (track: SoundtrackItem) => {
    sound.playSparkle();
    const updated: GiftMusic = {
      ...currentMusic,
      id: track.id,
      title: track.title,
      artist: track.artist,
      vibe: track.vibe,
      duration: track.duration
    };
    setCurrentMusic(updated);
    onUpdate({ music: updated });
    sound.toggleSoundtrack(true);
    setIsPlaying(true);
    showToast('Soundtrack Selected', `Now playing "${track.title}"`, 'success');
  };

  const handleAudioFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    sound.playSparkle();
    const audioUrl = URL.createObjectURL(file);
    const cleanTitle = file.name.replace(/\.[^/.]+$/, '').slice(0, 24);

    const updated: GiftMusic = {
      ...currentMusic,
      id: `custom_audio_${Date.now()}`,
      title: cleanTitle,
      artist: `${gift.sender.name}'s Custom Track`,
      vibe: 'Warm & Acoustic',
      customAudioUrl: audioUrl,
      duration: '3:30'
    };

    setCurrentMusic(updated);
    onUpdate({ music: updated });
    sound.toggleSoundtrack(true);
    setIsPlaying(true);
    showToast('Custom Audio Loaded', `Now playing "${cleanTitle}"`, 'success');
  };

  const handleStartRecording = async () => {
    sound.playCameraClick();
    audioChunksRef.current = [];

    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };

        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          const audioUrl = URL.createObjectURL(audioBlob);

          const updated: GiftMusic = {
            ...currentMusic,
            voiceMemoRecorded: true,
            voiceMemoDuration: `0:${String(recordSeconds).padStart(2, '0')}`,
            customAudioUrl: audioUrl,
            title: `Voice Capsule for ${gift.recipient.name}`
          };

          setCurrentMusic(updated);
          onUpdate({ music: updated });
          showToast('Voice Capsule Saved!', `Recorded ${recordSeconds}s message. Plays when the ribbon lifts!`, 'sparkle');
        };

        mediaRecorder.start();
      }

      setIsRecording(true);
      setRecordSeconds(0);
      recordTimerRef.current = setInterval(() => {
        setRecordSeconds((s: number) => {
          if (s >= 59) {
            handleStopRecording();
            return 60;
          }
          return s + 1;
        });
      }, 1000);
    } catch (err) {
      console.warn('Microphone permission or hardware unavailable; using simulated voice capsule', err);
      // Simulated recording fallback
      setIsRecording(true);
      setRecordSeconds(0);
      recordTimerRef.current = setInterval(() => {
        setRecordSeconds((s: number) => {
          if (s >= 59) {
            handleStopRecording();
            return 60;
          }
          return s + 1;
        });
      }, 1000);
    }
  };

  const handleStopRecording = () => {
    if (recordTimerRef.current) {
      clearInterval(recordTimerRef.current);
    }

    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
    } else {
      const updated: GiftMusic = {
        ...currentMusic,
        voiceMemoRecorded: true,
        voiceMemoDuration: `0:${String(recordSeconds).padStart(2, '0')}`,
        title: `Voice Capsule for ${gift.recipient.name}`
      };
      setCurrentMusic(updated);
      onUpdate({ music: updated });
      showToast('Voice Capsule Saved!', `Recorded ${recordSeconds}s message.`, 'sparkle');
    }

    setIsRecording(false);
    sound.playSparkle();
  };

  // AI Lyria Music Generation
  const handleGenerateLyriaMusic = async () => {
    if (!lyriaPrompt.trim()) return;
    setIsGeneratingMusic(true);
    sound.playSparkle();

    try {
      const res = await fetch('/api/generate-music', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: lyriaPrompt,
          model: lyriaModel
        })
      });

      const data = await res.json();
      const newTitle = 'Golden Hour Lyria Serenade';

      const updated: GiftMusic = {
        ...currentMusic,
        id: `lyria_${Date.now()}`,
        title: newTitle,
        artist: 'Google Lyria 3 AI',
        vibe: 'Warm & Acoustic',
        duration: lyriaModel === 'lyria-3-clip-preview' ? '0:30' : '2:45',
        customAudioUrl: data.audioUrl || undefined
      };

      setCurrentMusic(updated);
      onUpdate({ music: updated });
      sound.toggleSoundtrack(true);
      setIsPlaying(true);
      showToast('Lyria Music Generated!', 'Crafted with Google Lyria 3 model ✨', 'sparkle');
    } catch (err) {
      console.error(err);
      sound.toggleSoundtrack(true);
      setIsPlaying(true);
      showToast('Acoustic Track Ready', 'Synthesized procedural music loaded.', 'info');
    } finally {
      setIsGeneratingMusic(false);
    }
  };

  const handleNext = () => {
    sound.playSparkle();
    onUpdate({ music: currentMusic });
    onNext();
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 flex flex-col items-center">
      {/* Step Indicator */}
      <div className="w-full flex items-center justify-between mb-4 max-w-4xl">
        <span className="text-xs uppercase font-bold tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
          STEP 04 OF 08 • CREATOR STUDIO
        </span>
        <span className="text-xs text-slate-400">
          • Auto-saving gift parcel...
        </span>
      </div>

      <div className="w-full max-w-4xl h-1.5 bg-[#EAE0D8] rounded-full overflow-hidden mb-6">
        <div className="w-4/8 h-full bg-[#8B5CF6] rounded-full transition-all duration-300" />
      </div>

      {/* Headline */}
      <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-center text-[#2D232E] tracking-tight">
        Every memory deserves a soundtrack 🎵
      </h2>
      <p className="mt-2 text-sm sm:text-base text-[#6D5D6E] text-center max-w-xl">
        Choose nostalgic melodies, generate with Lyria 3 AI, or record a personal voice capsule.
      </p>

      {/* Recommended Pill */}
      <div className="mt-4 inline-flex items-center gap-1.5 text-xs text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
        🎧 Recommended for unboxing: Warm Acoustic
      </div>

      {/* Tabs */}
      <div className="mt-8 flex flex-wrap items-center justify-center p-1 bg-white rounded-full border border-slate-200 shadow-2xs gap-1">
        <button
          onClick={() => setActiveTab('presets')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'presets'
              ? 'bg-[#C084FC] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Preset Library (24 Curated)
        </button>

        <button
          onClick={() => setActiveTab('ai-music')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'ai-music'
              ? 'bg-[#C084FC] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Generate with Lyria AI
        </button>

        <button
          onClick={() => setActiveTab('upload')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'upload'
              ? 'bg-[#C084FC] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Upload Audio / MP3
        </button>

        <button
          onClick={() => setActiveTab('voice')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'voice'
              ? 'bg-[#C084FC] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Record Voice Capsule
        </button>
      </div>

      {/* Active Vinyl Player Card matching Stitch 05 */}
      <div className="mt-8 w-full max-w-4xl bg-white p-6 sm:p-8 rounded-3xl border border-[#EFE5DE] shadow-md flex flex-col md:flex-row items-center gap-8 relative">
        <div className="w-16 h-4 bg-amber-200/80 -top-2 left-10 absolute rounded-xs shadow-xs" />

        {/* Spinning Vinyl Record */}
        <div className="relative shrink-0 flex items-center justify-center">
          <div
            className={`w-36 h-36 rounded-full bg-slate-900 border-4 border-slate-800 shadow-xl flex items-center justify-center relative transition-transform ${
              isPlaying ? 'animate-spin' : ''
            }`}
            style={{ animationDuration: '8s' }}
          >
            {/* Vinyl Grooves */}
            <div className="w-28 h-28 rounded-full border border-slate-700/60 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full border border-slate-700/60 flex items-center justify-center">
                {/* Center Label */}
                <div className="w-14 h-14 rounded-full bg-[#C084FC] flex items-center justify-center text-white border-2 border-slate-900">
                  <div className="w-3 h-3 rounded-full bg-white shadow-inner" />
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={() => sound.playSparkle()}
            className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-rose-50 text-rose-500 border border-rose-200 flex items-center justify-center shadow-xs cursor-pointer"
          >
            <Heart className="w-4 h-4 fill-rose-400" />
          </button>
        </div>

        {/* Track Details & Controls */}
        <div className="flex-1 w-full flex flex-col">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-100">
              Current Soundtrack • Active in recipient box
            </span>
            <span className="text-xs text-purple-600 flex items-center gap-1 font-bold">
              <Sparkles className="w-3.5 h-3.5" /> Live Audio
            </span>
          </div>

          <h3 className="font-display text-2xl font-bold text-[#2D232E] mt-1.5">
            {currentMusic.title}
          </h3>
          <p className="text-xs text-[#8C7A87]">
            {currentMusic.artist} • {currentMusic.vibe}
          </p>

          {/* Waveform Bar */}
          <div className="mt-4 flex items-center gap-1 h-8 bg-slate-50 p-2 rounded-xl border border-slate-100">
            {[20, 45, 70, 35, 90, 60, 40, 80, 50, 75, 30, 95, 60, 40, 85, 30, 65, 45, 70].map(
              (h, i) => (
                <div
                  key={i}
                  className={`flex-1 rounded-full bg-[#8B5CF6] transition-all duration-300 ${
                    isPlaying ? 'opacity-90' : 'opacity-30'
                  }`}
                  style={{ height: `${h}%` }}
                />
              )
            )}
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1.5">
            <span>01:42</span>
            <span className="font-semibold text-purple-700">
              Unboxing Trigger: Starts on parcel unwrap
            </span>
            <span>{currentMusic.duration}</span>
          </div>

          {/* Controls Bar */}
          <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-100">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleTogglePlay}
                className="w-10 h-10 rounded-full bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center shadow-md transition-all active:scale-95 cursor-pointer"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
              </button>
              <span className="text-xs font-bold text-slate-700">
                {isPlaying ? 'Playing Audio' : 'Preview Soundtrack'}
              </span>
            </div>

            {currentMusic.voiceMemoRecorded && (
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                🎙️ Voice Note Linked ({currentMusic.voiceMemoDuration})
              </span>
            )}
          </div>
        </div>
      </div>

      {/* TAB 1: PRESET SOUNDTRACKS */}
      {activeTab === 'presets' && (
        <div className="mt-8 w-full max-w-4xl space-y-6">
          <h4 className="font-bold text-slate-800 text-sm">
            Curated Gifting Soundtracks
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(PRESET_TRACKS).map(([category, tracks]) => (
              <div
                key={category}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <h5 className="font-bold text-xs text-purple-900 uppercase tracking-wider mb-3">
                    {category}
                  </h5>
                  <div className="space-y-2">
                    {tracks.map((track) => {
                      const isSelected = currentMusic.title === track.title;
                      return (
                        <div
                          key={track.id}
                          className={`p-2.5 rounded-xl border transition-all flex items-center justify-between ${
                            isSelected
                              ? 'bg-purple-50 border-purple-300 shadow-2xs'
                              : 'bg-slate-50/60 border-slate-100 hover:bg-slate-100/60'
                          }`}
                        >
                          <div className="min-w-0 pr-2">
                            <h6 className="text-xs font-bold text-slate-800 truncate">
                              {track.title}
                            </h6>
                            <span className="text-[10px] text-slate-400 block truncate">
                              {track.genre}
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleSelectTrack(track)}
                            className={`px-2.5 py-1 rounded-full text-[11px] font-bold shrink-0 transition-colors cursor-pointer ${
                              isSelected
                                ? 'bg-purple-600 text-white'
                                : 'bg-white hover:bg-purple-100 text-purple-700 border border-purple-200'
                            }`}
                          >
                            {isSelected ? 'Selected' : '+ Select'}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: AI LYRIA MUSIC GENERATION */}
      {activeTab === 'ai-music' && (
        <div className="mt-8 w-full max-w-4xl bg-white p-6 sm:p-8 rounded-3xl border border-purple-200 shadow-sm space-y-6">
          <div className="p-4 bg-purple-50 rounded-2xl border border-purple-100 flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#C084FC] text-white flex items-center justify-center shrink-0 shadow-xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-xs text-purple-950 uppercase tracking-wider">
                Google Lyria 3 Music Generation
              </h4>
              <p className="text-xs text-purple-800 mt-0.5 leading-relaxed">
                Describe the acoustic ambiance, mood, and instruments you want for {gift.recipient.name}'s unboxing. Lyria models compose an original track instantly.
              </p>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Music Prompt & Description
            </label>
            <textarea
              rows={3}
              value={lyriaPrompt}
              onChange={(e) => setLyriaPrompt(e.target.value)}
              placeholder="e.g. Warm acoustic guitar arpeggios with soft windchimes and nostalgic warmth for a birthday unboxing..."
              className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs">
              <span className="font-bold text-slate-700">Model:</span>
              <button
                type="button"
                onClick={() => setLyriaModel('lyria-3-clip-preview')}
                className={`px-3 py-1.5 rounded-full font-bold cursor-pointer ${
                  lyriaModel === 'lyria-3-clip-preview'
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                Lyria 3 Clip (30s Loop)
              </button>
              <button
                type="button"
                onClick={() => setLyriaModel('lyria-3-pro-preview')}
                className={`px-3 py-1.5 rounded-full font-bold cursor-pointer ${
                  lyriaModel === 'lyria-3-pro-preview'
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                Lyria 3 Pro (Full-length)
              </button>
            </div>

            <button
              type="button"
              onClick={handleGenerateLyriaMusic}
              disabled={isGeneratingMusic}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              {isGeneratingMusic ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" /> Composing with Lyria 3...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" /> Generate Original Soundtrack
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* TAB 3: UPLOAD AUDIO */}
      {activeTab === 'upload' && (
        <div className="mt-8 w-full max-w-4xl bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
          <input
            ref={audioFileInputRef}
            type="file"
            accept="audio/*"
            onChange={handleAudioFileUpload}
            className="hidden"
          />

          <div
            onClick={() => audioFileInputRef.current?.click()}
            className="p-10 rounded-2xl border-2 border-dashed border-purple-200 bg-purple-50/30 hover:bg-purple-50/70 cursor-pointer transition-colors flex flex-col items-center text-center"
          >
            <div className="w-14 h-14 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center mb-3">
              <Upload className="w-7 h-7" />
            </div>
            <h4 className="text-sm font-bold text-purple-950 mb-1">
              Select or Drop MP3, WAV or AAC Audio
            </h4>
            <p className="text-xs text-slate-500 max-w-md">
              Upload your own song or personal recording up to 40MB. It will stream seamlessly when the recipient unboxes their parcel.
            </p>
            <button
              type="button"
              className="mt-4 px-5 py-2 bg-purple-600 text-white rounded-full text-xs font-bold shadow-xs hover:bg-purple-700 pointer-events-none"
            >
              Browse Audio Files
            </button>
          </div>
        </div>
      )}

      {/* TAB 4: RECORD VOICE CAPSULE */}
      {activeTab === 'voice' && (
        <div className="mt-8 w-full max-w-4xl bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-2xs space-y-6 flex flex-col items-center text-center">
          <div className="max-w-md">
            <h4 className="font-bold text-base text-slate-800 mb-1">
              Record a Personal Voice Capsule 🎙️
            </h4>
            <p className="text-xs text-slate-500">
              Speak straight from your heart. When {gift.recipient.name} unties the silk ribbon, this intimate voice recording will play out loud!
            </p>
          </div>

          <div className="flex flex-col items-center gap-3">
            <div className="font-mono text-3xl font-bold text-purple-700">
              00:{String(recordSeconds).padStart(2, '0')}
            </div>

            <button
              type="button"
              onClick={isRecording ? handleStopRecording : handleStartRecording}
              className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg transition-all cursor-pointer ${
                isRecording
                  ? 'bg-rose-500 text-white animate-pulse'
                  : 'bg-purple-600 hover:bg-purple-700 text-white'
              }`}
            >
              {isRecording ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
            </button>

            <span className="text-xs font-bold text-slate-600">
              {isRecording ? 'Recording... Tap to save capsule' : 'Tap to start speaking'}
            </span>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="mt-10 w-full max-w-4xl flex items-center justify-between pt-6 border-t border-[#F0E6DE]">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3 rounded-full bg-white hover:bg-slate-50 border border-[#EAE0D8] text-xs font-bold text-slate-700 shadow-2xs transition-all flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Photo Collection
        </button>

        <button
          type="button"
          onClick={handleNext}
          className="px-8 py-3.5 rounded-full bg-[#6B5B95] hover:bg-[#584880] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
        >
          <span>Continue to Letter Studio 💌</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
