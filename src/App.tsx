import React, { useState, useEffect } from 'react';
import { Gift, GiftPhoto } from './types/gift';
import { GiftStorageService } from './services/storageService';
import { sound } from './utils/soundEngine';
import { TopNav, AppMode } from './components/layout/TopNav';
import { Footer } from './components/layout/Footer';
import { ParticleStage } from './components/shared/ParticleStage';
import { ToastProvider, useToast } from './components/shared/ToastNotification';
import { GeminiLiveVoiceModal } from './components/shared/GeminiLiveVoiceModal';
import { GlobalTextEditModal } from './components/shared/GlobalTextEditModal';
import { PhotoEditModal } from './components/shared/PhotoEditModal';
import { Sparkles, Mic, Type, Edit3, Image as ImageIcon } from 'lucide-react';

// Creator Components
import { WelcomeScreen } from './components/creator/WelcomeScreen';
import { Step1SenderRecipient } from './components/creator/Step1SenderRecipient';
import { Step2BirthdayDetails } from './components/creator/Step2BirthdayDetails';
import { Step3PhotoCollection } from './components/creator/Step3PhotoCollection';
import { Step4MusicStudio } from './components/creator/Step4MusicStudio';
import { Step5LetterStudio } from './components/creator/Step5LetterStudio';
import { Step6MemoryBuilder } from './components/creator/Step6MemoryBuilder';
import { Step7Relationship } from './components/creator/Step7Relationship';
import { Step8Templates } from './components/creator/Step8Templates';
import { Step9Palette } from './components/creator/Step9Palette';
import { Step10Animations } from './components/creator/Step10Animations';
import { Step11VisualEditor } from './components/creator/Step11VisualEditor';
import { Step12LivePreview } from './components/creator/Step12LivePreview';
import { Step13FinalReview } from './components/creator/Step13FinalReview';
import { GiftSharingView } from './components/creator/GiftSharingView';

// Recipient Components
import { RecipientPasswordGate } from './components/recipient/RecipientPasswordGate';
import { Chapter1Unwrap } from './components/recipient/Chapter1Unwrap';
import { Chapter2PhotoGallery } from './components/recipient/Chapter2PhotoGallery';
import { Chapter3LetterReveal } from './components/recipient/Chapter3LetterReveal';
import { Chapter4Finale } from './components/recipient/Chapter4Finale';

// Gallery Component
import { GiftBoxGallery } from './components/gallery/GiftBoxGallery';

function SurprizApp() {
  const [currentMode, setCurrentMode] = useState<AppMode>('creator');
  const [creatorStep, setCreatorStep] = useState<number>(0);
  const [recipientChapter, setRecipientChapter] = useState<number>(0); // 0: Password Gate, 1: Unwrap, 2: Gallery, 3: Letter, 4: Finale
  const [soundMuted, setSoundMuted] = useState<boolean>(sound.getMuted());

  // Gift state
  const [activeGiftId, setActiveGiftId] = useState<string>(() => GiftStorageService.getActiveGiftId());
  const [gift, setGift] = useState<Gift>(() => {
    return GiftStorageService.getGiftById(GiftStorageService.getActiveGiftId()) || GiftStorageService.getAllGifts()[0];
  });
  const [allGifts, setAllGifts] = useState<Gift[]>(() => GiftStorageService.getAllGifts());

  // Global Modals State
  const [isVoiceMuseOpen, setIsVoiceMuseOpen] = useState(false);
  const [isGlobalTextOpen, setIsGlobalTextOpen] = useState(false);
  const [globalEditingPhoto, setGlobalEditingPhoto] = useState<GiftPhoto | null>(null);

  // Keep state updated
  useEffect(() => {
    const loaded = GiftStorageService.getGiftById(activeGiftId);
    if (loaded) {
      setGift(loaded);
    }
  }, [activeGiftId]);

  const handleUpdateGift = (partial: Partial<Gift>) => {
    const updated = { ...gift, ...partial };
    setGift(updated);
    GiftStorageService.saveGift(updated);
    setAllGifts(GiftStorageService.getAllGifts());
  };

  const handleToggleSound = () => {
    const nextMute = !soundMuted;
    sound.setMuted(nextMute);
    setSoundMuted(nextMute);
  };

  const handleSelectMode = (mode: AppMode) => {
    setCurrentMode(mode);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenRecipientForGift = (id: string) => {
    setActiveGiftId(id);
    GiftStorageService.setActiveGiftId(id);
    const targetGift = GiftStorageService.getGiftById(id);
    if (targetGift) setGift(targetGift);
    setRecipientChapter(0);
    setCurrentMode('recipient');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenCreatorForGift = (id: string) => {
    setActiveGiftId(id);
    GiftStorageService.setActiveGiftId(id);
    const targetGift = GiftStorageService.getGiftById(id);
    if (targetGift) setGift(targetGift);
    setCreatorStep(1);
    setCurrentMode('creator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCreateNewGift = () => {
    const newId = `gift_${Date.now()}`;
    const newGift: Gift = {
      ...gift,
      id: newId,
      slug: `surprise-${Date.now().toString().slice(-4)}`,
      createdAt: new Date().toISOString(),
      status: 'draft',
      recipient: {
        ...gift.recipient,
        name: 'Alex Rivera',
        petName: 'Star 🌟',
        bannerHeading: 'Happy 25th Birthday, Alex! 🎈'
      },
      security: {
        ...gift.security,
        secretKey: 'ALEX2024',
        isUnlocked: false
      }
    };
    GiftStorageService.saveGift(newGift);
    setActiveGiftId(newId);
    GiftStorageService.setActiveGiftId(newId);
    setGift(newGift);
    setAllGifts(GiftStorageService.getAllGifts());
    setCreatorStep(1);
    setCurrentMode('creator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteGift = (id: string) => {
    GiftStorageService.deleteGift(id);
    const updated = GiftStorageService.getAllGifts();
    setAllGifts(updated);
    if (updated.length > 0) {
      setActiveGiftId(updated[0].id);
      setGift(updated[0]);
    }
  };

  const handleInsertVoiceMuseIntoLetter = (text: string) => {
    handleUpdateGift({
      letter: {
        ...gift.letter,
        body: gift.letter.body + '\n\n' + text
      }
    });
  };

  const handleInsertVoiceMuseAsMemory = (title: string, story: string) => {
    const newMemory = {
      id: `mem_${Date.now()}`,
      number: gift.memories.length + 1,
      title,
      story,
      date: gift.birthday?.date || 'October 14, 2024',
      photoUrl: gift.photos[0]?.url || 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=600&q=80',
      tags: ['#golden-memory', '#cherished'],
      location: 'Special Place',
      sticker: '✨',
      stickerBg: '#FED7AA'
    };
    handleUpdateGift({
      memories: [...gift.memories, newMemory]
    });
  };

  const handleSaveGlobalPhoto = (updatedPhoto: GiftPhoto) => {
    const nextPhotos = gift.photos.map((p) => (p.id === updatedPhoto.id ? updatedPhoto : p));
    handleUpdateGift({ photos: nextPhotos });
    setGlobalEditingPhoto(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF9F5] text-[#2D232E] relative font-sans">
      {/* Background Ambient Particles (Hearts, Sparkles, Petals) */}
      <ParticleStage
        effects={gift.animations.activeEffects}
        reducedMotion={gift.animations.respectReducedMotion}
      />

      {/* Top Bar Navigation */}
      <TopNav
        currentMode={currentMode}
        onSelectMode={handleSelectMode}
        soundMuted={soundMuted}
        onToggleSound={handleToggleSound}
      />

      {/* Main Mode Viewport */}
      <main className="flex-1 relative z-10 pb-16">
        {/* ================= CREATOR STUDIO MODE ================= */}
        {currentMode === 'creator' && (
          <div className="w-full">
            {creatorStep === 0 && (
              <WelcomeScreen
                onStart={() => setCreatorStep(1)}
                onExploreMood={(mood) => {
                  handleUpdateGift({
                    recipient: { ...gift.recipient, bannerHeading: `${mood} Surprise for ${gift.recipient.name}! ✨` }
                  });
                  setCreatorStep(1);
                }}
                onOpenRecipient={() => {
                  setRecipientChapter(0);
                  setCurrentMode('recipient');
                }}
              />
            )}

            {creatorStep === 1 && (
              <Step1SenderRecipient
                gift={gift}
                onUpdate={handleUpdateGift}
                onNext={() => setCreatorStep(2)}
                onBack={() => setCreatorStep(0)}
              />
            )}

            {creatorStep === 2 && (
              <Step2BirthdayDetails
                gift={gift}
                onUpdate={handleUpdateGift}
                onNext={() => setCreatorStep(3)}
                onBack={() => setCreatorStep(1)}
              />
            )}

            {creatorStep === 3 && (
              <Step3PhotoCollection
                gift={gift}
                onUpdate={handleUpdateGift}
                onNext={() => setCreatorStep(4)}
                onBack={() => setCreatorStep(2)}
              />
            )}

            {creatorStep === 4 && (
              <Step4MusicStudio
                gift={gift}
                onUpdate={handleUpdateGift}
                onNext={() => setCreatorStep(5)}
                onBack={() => setCreatorStep(3)}
              />
            )}

            {creatorStep === 5 && (
              <Step5LetterStudio
                gift={gift}
                onUpdate={handleUpdateGift}
                onNext={() => setCreatorStep(6)}
                onBack={() => setCreatorStep(4)}
              />
            )}

            {creatorStep === 6 && (
              <Step6MemoryBuilder
                gift={gift}
                onUpdate={handleUpdateGift}
                onNext={() => setCreatorStep(7)}
                onBack={() => setCreatorStep(5)}
              />
            )}

            {creatorStep === 7 && (
              <Step7Relationship
                gift={gift}
                onUpdate={handleUpdateGift}
                onNext={() => setCreatorStep(8)}
                onBack={() => setCreatorStep(6)}
              />
            )}

            {creatorStep === 8 && (
              <Step8Templates
                gift={gift}
                onUpdate={handleUpdateGift}
                onNext={() => setCreatorStep(9)}
                onBack={() => setCreatorStep(7)}
              />
            )}

            {creatorStep === 9 && (
              <Step9Palette
                gift={gift}
                onUpdate={handleUpdateGift}
                onNext={() => setCreatorStep(10)}
                onBack={() => setCreatorStep(8)}
              />
            )}

            {creatorStep === 10 && (
              <Step10Animations
                gift={gift}
                onUpdate={handleUpdateGift}
                onNext={() => setCreatorStep(11)}
                onBack={() => setCreatorStep(9)}
              />
            )}

            {creatorStep === 11 && (
              <Step11VisualEditor
                gift={gift}
                onUpdate={handleUpdateGift}
                onNext={() => setCreatorStep(12)}
                onBack={() => setCreatorStep(10)}
              />
            )}

            {creatorStep === 12 && (
              <Step12LivePreview
                gift={gift}
                onNext={() => setCreatorStep(13)}
                onBack={() => setCreatorStep(11)}
                onLaunchRecipient={() => {
                  setRecipientChapter(0);
                  setCurrentMode('recipient');
                }}
              />
            )}

            {creatorStep === 13 && (
              <Step13FinalReview
                gift={gift}
                onUpdate={handleUpdateGift}
                onComplete={() => setCreatorStep(14)}
                onBack={() => setCreatorStep(12)}
              />
            )}

            {creatorStep === 14 && (
              <GiftSharingView
                gift={gift}
                onOpenRecipient={() => {
                  setRecipientChapter(0);
                  setCurrentMode('recipient');
                }}
                onEditBlueprint={() => setCreatorStep(1)}
                onOpenGallery={() => setCurrentMode('gallery')}
              />
            )}
          </div>
        )}

        {/* ================= RECIPIENT EXPERIENCE MODE ================= */}
        {currentMode === 'recipient' && (
          <div className="w-full">
            {recipientChapter === 0 && (
              <RecipientPasswordGate
                gift={gift}
                onUnlocked={() => {
                  setRecipientChapter(1);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}

            {recipientChapter === 1 && (
              <Chapter1Unwrap
                gift={gift}
                onNextChapter={() => {
                  setRecipientChapter(2);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onGoToChapter={(ch) => {
                  setRecipientChapter(ch);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onEditGift={() => setIsGlobalTextOpen(true)}
              />
            )}

            {recipientChapter === 2 && (
              <Chapter2PhotoGallery
                gift={gift}
                onNextChapter={() => {
                  setRecipientChapter(3);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onPrevChapter={() => {
                  setRecipientChapter(1);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onUpdateGift={handleUpdateGift}
              />
            )}

            {recipientChapter === 3 && (
              <Chapter3LetterReveal
                gift={gift}
                onNextChapter={() => {
                  setRecipientChapter(4);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onPrevChapter={() => {
                  setRecipientChapter(2);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onUpdateGift={handleUpdateGift}
              />
            )}

            {recipientChapter === 4 && (
              <Chapter4Finale
                gift={gift}
                onReplayJourney={() => {
                  setRecipientChapter(1);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onCreateNewGift={() => {
                  handleCreateNewGift();
                }}
                onUpdateGift={handleUpdateGift}
              />
            )}
          </div>
        )}

        {/* ================= GIFT BOX GALLERY MODE ================= */}
        {currentMode === 'gallery' && (
          <GiftBoxGallery
            gifts={allGifts}
            activeGiftId={activeGiftId}
            onSelectGift={(id) => {
              setActiveGiftId(id);
              GiftStorageService.setActiveGiftId(id);
            }}
            onOpenRecipient={handleOpenRecipientForGift}
            onOpenCreator={handleOpenCreatorForGift}
            onCreateNew={handleCreateNewGift}
            onDeleteGift={handleDeleteGift}
          />
        )}
      </main>

      {/* Floating Action Controls Dock */}
      <div className="fixed bottom-6 left-6 z-40 flex items-center gap-2">
        {/* Gemini Live Voice Muse Button */}
        <button
          type="button"
          onClick={() => {
            sound.playSparkle();
            setIsVoiceMuseOpen(true);
          }}
          className="px-4 py-2.5 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-xs shadow-xl flex items-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer ring-2 ring-white/80"
          title="Open Gemini Live Voice & Text Muse"
        >
          <Sparkles className="w-4 h-4 animate-spin text-amber-200" style={{ animationDuration: '6s' }} />
          <span>Gemini Live Muse 🎙️</span>
        </button>

        {/* Quick Edit All Text Button */}
        <button
          type="button"
          onClick={() => {
            sound.playSparkle();
            setIsGlobalTextOpen(true);
          }}
          className="px-3.5 py-2.5 rounded-full bg-white/90 hover:bg-white text-slate-800 font-bold text-xs shadow-lg border border-slate-200 flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          title="Edit Any Text on Demand"
        >
          <Type className="w-3.5 h-3.5 text-purple-600" />
          <span className="hidden sm:inline">Edit Text</span>
        </button>

        {/* Quick Edit Cover Photo Button */}
        <button
          type="button"
          onClick={() => {
            sound.playCameraClick();
            setGlobalEditingPhoto(gift.photos[0] || null);
          }}
          className="px-3.5 py-2.5 rounded-full bg-white/90 hover:bg-white text-slate-800 font-bold text-xs shadow-lg border border-slate-200 flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          title="Edit or Replace Cover Photo"
        >
          <ImageIcon className="w-3.5 h-3.5 text-pink-600" />
          <span className="hidden sm:inline">Edit Photos</span>
        </button>
      </div>

      {/* Footer */}
      <Footer />

      {/* Global Modals */}
      <GeminiLiveVoiceModal
        isOpen={isVoiceMuseOpen}
        recipientName={gift.recipient.name}
        senderName={gift.sender.name}
        onClose={() => setIsVoiceMuseOpen(false)}
        onInsertIntoLetter={handleInsertVoiceMuseIntoLetter}
        onInsertAsMemory={handleInsertVoiceMuseAsMemory}
      />

      <GlobalTextEditModal
        isOpen={isGlobalTextOpen}
        gift={gift}
        onClose={() => setIsGlobalTextOpen(false)}
        onSave={handleUpdateGift}
      />

      <PhotoEditModal
        isOpen={Boolean(globalEditingPhoto)}
        photo={globalEditingPhoto}
        onClose={() => setGlobalEditingPhoto(null)}
        onSave={handleSaveGlobalPhoto}
      />
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <SurprizApp />
    </ToastProvider>
  );
}
