export interface GiftPhoto {
  id: string;
  url: string;
  title: string;
  tag: string;
  slotNumber: number;
  isCover: boolean;
  heroMoment?: boolean;
  rotation?: number; // degrees, e.g. -4
  scale?: number; // percentage, e.g. 105
  frameStyle?: 'polaroid' | 'stamp' | 'soft' | 'film';
  fastener?: 'tape' | 'clip' | 'wax' | 'none';
  fastenerColor?: string;
  caption?: string;
  date?: string;
  location?: string;
  scribble?: string;
  videoUrl?: string;
  audioClip?: {
    title: string;
    duration: string;
  };
}

export interface GiftMusic {
  id: string;
  title: string;
  artist: string;
  vibe: 'Dreamy Nostalgia' | 'Warm & Acoustic' | 'Celebratory & Sparkly' | 'Custom';
  duration: string;
  currentTime: string;
  isLoop: boolean;
  volume: number; // 0 to 100
  cinematicFadeIn: boolean;
  voiceMemoRecorded: boolean;
  voiceMemoDuration?: string;
  voiceMemoNote?: string;
  customAudioUrl?: string;
}

export interface GiftMemory {
  id: string;
  number: number;
  title: string;
  date: string;
  story: string;
  photoUrl: string;
  tags: string[];
  location?: string;
  sticker?: string; // emoji or sticker name
  stickerBg?: string;
  isFavorite?: boolean;
}

export interface GiftLetter {
  salutation: string;
  body: string;
  closing: string;
  signature: string;
  tone: 'Handwritten Romance' | 'Warm & Nostalgic' | 'Playful & Silly' | 'Short & Sweet' | 'Golden Milestone';
  openingExperience: 'wax_melt' | 'ribbon_untie' | 'slow_unroll';
  font: 'script' | 'sans' | 'serif';
  waxColor: string;
  postmark: string;
  hugsCount: number;
}

export type RelationshipType = 'parents' | 'siblings' | 'best_friends' | 'partners' | 'crush' | 'custom';

export interface GiftRelationship {
  type: RelationshipType;
  title: string;
  tag: string;
  vibe: string;
  description: string;
  icon: string;
  color: string;
}

export type TemplateId = 'portfolio' | 'scrapbook' | 'tree' | 'cinematic' | 'floating';

export interface GiftTemplate {
  id: TemplateId;
  name: string;
  category: string;
  badge?: string;
  description: string;
  photosCountText: string;
  motionLabel: string;
  previewImage?: string;
}

export type PaletteId = 'rose' | 'lavender' | 'ocean' | 'golden' | 'midnight';

export interface GiftPalette {
  id: PaletteId;
  name: string;
  mood: string;
  description: string;
  colors: string[]; // 4 hex colors
  saturation: number; // -50 to +50
  bgWash: string;
  cardWash: string;
  accent: string;
}

export interface GiftAnimations {
  activeEffects: string[]; // e.g. ['confetti', 'hearts', 'sparkles']
  intensity: 'gentle' | 'balanced' | 'festive';
  density: number; // 15 to 90
  soundSync: boolean;
  respectReducedMotion: boolean;
}

export interface CanvasElement {
  id: string;
  type: 'polaroid' | 'sticker' | 'tape' | 'note' | 'stamp';
  x: number;
  y: number;
  rotation: number;
  scale: number;
  content: string;
  meta?: any;
}

export interface GiftSecurity {
  secretKey: string;
  promptClue: string;
  passwordHint?: string;
  notifyOnOpen: boolean;
  isUnlocked: boolean;
}

export interface GiftBirthday {
  age: number;
  date: string;
  zodiacSign: string;
  birthStone: string;
  birthFlower: string;
}

export interface Gift {
  id: string;
  slug: string;
  createdAt: string;
  status: 'draft' | 'published';
  sender: {
    name: string;
    avatar?: string;
    relationship?: string;
  };
  birthday: GiftBirthday;
  recipient: {
    name: string;
    petName?: string;
    avatar?: string;
    birthMonth: string;
    birthDay: number;
    birthYear: number;
    milestoneAge: number;
    revealDate: string;
    revealTime: string;
    timezone: string;
    bannerHeading: string;
  };
  photos: GiftPhoto[];
  music: GiftMusic;
  letter: GiftLetter;
  memories: GiftMemory[];
  curiosities: {
    insideJokes: { title: string; desc: string; count: number };
    promises: { title: string; desc: string; date: string };
    playlist: { title: string; desc: string; runtime: string };
  };
  relationship: RelationshipType;
  template: TemplateId;
  palette: PaletteId;
  animations: GiftAnimations;
  canvasElements: CanvasElement[];
  security: GiftSecurity;
  recipientState?: {
    unwrapped: boolean;
    currentChapter: number;
    candlesExtinguished: number;
    candlesTotal: number;
    likedLetter: boolean;
    reactions: Record<string, number>;
  };
}
