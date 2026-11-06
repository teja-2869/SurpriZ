import { Gift, GiftPalette, GiftTemplate } from '../types/gift';

export const PALETTES: GiftPalette[] = [
  {
    id: 'rose',
    name: 'Rose Pop',
    mood: 'Romantic & Tender',
    description: 'Warm rosy embrace filled with blush and velvet warmth.',
    colors: ['#FCE7F3', '#F472B6', '#FFF1F2', '#9D174D'],
    saturation: 15,
    bgWash: '#FFF5F7',
    cardWash: '#FFFFFF',
    accent: '#DB2777'
  },
  {
    id: 'lavender',
    name: 'Lavender Day',
    mood: 'Dreamy & Whimsical • Current Choice',
    description: 'The iconic SURPRIZ aesthetic. Playful, magical, and soft.',
    colors: ['#DDD6FE', '#FBCFE8', '#FFFBEB', '#4C1D95'],
    saturation: 18,
    bgWash: '#FAF5FF',
    cardWash: '#FFFFFF',
    accent: '#7C3AED'
  },
  {
    id: 'ocean',
    name: 'Ocean Breeze',
    mood: 'Fresh & Serene',
    description: 'Coastal nostalgia, calm breezes, and refreshing blue horizons.',
    colors: ['#CCFBF1', '#6EE7B7', '#F0FDFA', '#115E59'],
    saturation: 10,
    bgWash: '#F0FDFA',
    cardWash: '#FFFFFF',
    accent: '#0D9488'
  },
  {
    id: 'golden',
    name: 'Golden Hour',
    mood: 'Warm & Nostalgic',
    description: 'Late-afternoon sunlight, diner laughter, and golden childhood summers.',
    colors: ['#FED7AA', '#FB923C', '#FEF3C7', '#C2410C'],
    saturation: 22,
    bgWash: '#FFFBEB',
    cardWash: '#FFFFFF',
    accent: '#EA580C'
  },
  {
    id: 'midnight',
    name: 'Midnight Magic',
    mood: 'Cinematic & Starry',
    description: 'Twinkling night skies, secret midnight stargazing, and constellation magic.',
    colors: ['#312E81', '#4338CA', '#C7D2FE', '#EEF2FF'],
    saturation: 25,
    bgWash: '#1E1B4B',
    cardWash: '#2E2A72',
    accent: '#818CF8'
  }
];

export const TEMPLATES: GiftTemplate[] = [
  {
    id: 'portfolio',
    name: 'Memory Portfolio',
    category: 'Minimal & Editorial',
    photosCountText: '10–25 Photos',
    description: 'Elegant photograph-led presentation with large photos, clean modern typography, and refined transitions.',
    motionLabel: 'Subtle motion transitions',
    previewImage: 'VOL. 03 • PARIS • JUNE 2024'
  },
  {
    id: 'scrapbook',
    name: 'Scrapbook Gallery',
    category: 'Playful & Nostalgic',
    badge: 'Creator Favorite • Active Choice',
    photosCountText: '12–30 Photos',
    description: 'Polaroid photos, stickers, doodles, handwritten notes, washi tape, and playful textured paper layers.',
    motionLabel: 'Selected for Maya Rose 💜',
    previewImage: 'Best day ever! Maya & Leo 🌸'
  },
  {
    id: 'tree',
    name: 'Memory Tree',
    category: 'Whimsical & Organic',
    photosCountText: '12 Blooms',
    description: 'A beautiful illustrated blooming tree where memories hang like leaves or fairy lanterns as the recipient explores.',
    motionLabel: 'Branch unwrap flow',
    previewImage: 'Lantern 02'
  },
  {
    id: 'cinematic',
    name: 'Cinematic Memories',
    category: 'Immersive & Emotional',
    photosCountText: 'Audio Sync',
    description: 'Film strip aesthetics, slow widescreen pan transitions, ambient light flares, and soundtrack sync.',
    motionLabel: 'Fullscreen theater mode',
    previewImage: 'KODAK PORTRA 400'
  },
  {
    id: 'floating',
    name: 'Floating Memories',
    category: 'Dreamy & Spatial',
    photosCountText: 'Cloudscape Vibe',
    description: 'Weightless 3D floating photo cards, soft parallax tilt, layered cloud shadows, and interactive gravity physics.',
    motionLabel: 'Weightless physics',
    previewImage: '3D Parallax View'
  }
];

export const INITIAL_GIFT: Gift = {
  id: 'gift_maya_25th',
  slug: 'maya-rose-25th',
  createdAt: '2024-10-10T14:30:00Z',
  status: 'published',
  sender: {
    name: 'Clara Bennett',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    relationship: 'Best Friends'
  },
  birthday: {
    age: 25,
    date: 'October 14, 2024',
    zodiacSign: 'Libra ♎',
    birthStone: 'Opal',
    birthFlower: 'Marigold'
  },
  recipient: {
    name: 'Maya Rose',
    petName: 'Sunshine ☀️',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
    birthMonth: 'October',
    birthDay: 14,
    birthYear: 1999,
    milestoneAge: 25,
    revealDate: '2024-10-14',
    revealTime: '09:00 AM',
    timezone: 'Pacific Standard Time (PST, UTC-8)',
    bannerHeading: 'Happy 25th Birthday, Maya! 🎈'
  },
  photos: [
    {
      id: 'photo_01',
      url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80',
      title: 'Golden hour roof',
      tag: 'Hero Moment',
      slotNumber: 1,
      isCover: true,
      heroMoment: true,
      rotation: -4,
      scale: 105,
      frameStyle: 'polaroid',
      fastener: 'tape',
      fastenerColor: '#F472B6',
      caption: 'Golden hour roof giggles ✨',
      date: 'Aug 14, 2024',
      location: 'Sunset Terrace',
      scribble: 'We laughed until our cheeks literally hurt!',
      audioClip: { title: 'Rooftop giggles', duration: '0:18' }
    },
    {
      id: 'photo_02',
      url: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80',
      title: 'Market flowers &',
      tag: 'Bloom',
      slotNumber: 2,
      isCover: false,
      rotation: 2,
      scale: 100,
      frameStyle: 'polaroid',
      fastener: 'tape',
      fastenerColor: '#C084FC',
      caption: 'Weekend farmer flower haul 🌸',
      date: 'May 18, 2023',
      location: 'Montmartre Market',
      scribble: 'You insisted on buying peonies for our whole floor.'
    },
    {
      id: 'photo_03',
      url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
      title: 'Pacific coast picr',
      tag: 'Summer',
      slotNumber: 3,
      isCover: false,
      rotation: -2,
      scale: 100,
      frameStyle: 'polaroid',
      fastener: 'clip',
      caption: 'Seagulls eyeing our sourdough basket 🌊',
      date: 'July 22, 2023',
      location: 'Big Sur Coast',
      scribble: 'Cold ocean breeze and the warmest memories.'
    },
    {
      id: 'photo_04',
      url: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=600&q=80',
      title: 'Pasta disaster tu',
      tag: 'Cozy',
      slotNumber: 4,
      isCover: false,
      rotation: 3,
      scale: 100,
      frameStyle: 'polaroid',
      fastener: 'tape',
      caption: 'We ended up ordering delivery at 11 PM anyway 🍝',
      date: 'May 10, 2022',
      location: 'Apartment 4B Kitchen',
      scribble: 'Flour in our hair, flour on the ceiling!'
    },
    {
      id: 'photo_05',
      url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80',
      title: 'That midnight er',
      tag: 'Night',
      slotNumber: 5,
      isCover: false,
      rotation: -3,
      scale: 100,
      frameStyle: 'polaroid',
      fastener: 'wax',
      caption: 'Singing every lyric with voice cracked 🎶',
      date: 'Sep 05, 2022',
      location: 'The Velvet Room'
    },
    {
      id: 'photo_06',
      url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80',
      title: 'Sunrise trail afte',
      tag: 'Adventure',
      slotNumber: 6,
      isCover: false,
      rotation: 1,
      scale: 100,
      frameStyle: 'polaroid',
      fastener: 'tape',
      caption: 'Smelled like wet cedar and sheer freedom 🌲',
      date: 'Oct 03, 2022',
      location: 'Cascade Overlook'
    },
    {
      id: 'photo_07',
      url: 'https://images.unsplash.com/photo-1501446529957-6226bd447c46?auto=format&fit=crop&w=600&q=80',
      title: 'Pistachio gelato i',
      tag: 'Sweet',
      slotNumber: 7,
      isCover: false,
      rotation: -2,
      scale: 100,
      frameStyle: 'polaroid',
      fastener: 'tape',
      caption: 'Melting faster than we could snap photos 🍦',
      date: 'Aug 04, 2023',
      location: 'Boardwalk Cones'
    },
    {
      id: 'photo_08',
      url: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=600&q=80',
      title: 'Box inspector Oli',
      tag: 'Naptime',
      slotNumber: 8,
      isCover: false,
      rotation: 2,
      scale: 100,
      frameStyle: 'polaroid',
      fastener: 'clip',
      caption: 'Mochi declaring all packaging his personal property 🐱',
      date: 'Nov 18, 2023',
      location: 'Living Room Rug'
    },
    {
      id: 'photo_09',
      url: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=600&q=80',
      title: 'Old town booksh',
      tag: 'Autumn',
      slotNumber: 9,
      isCover: false,
      rotation: -1,
      scale: 100,
      frameStyle: 'polaroid',
      fastener: 'tape',
      caption: 'Lost between dusty poetry shelves for three hours 📚',
      date: 'Nov 02, 2023',
      location: 'The Corner Quarto'
    },
    {
      id: 'photo_10',
      url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80',
      title: 'Birthday sparkler',
      tag: 'Glow',
      slotNumber: 10,
      isCover: false,
      rotation: 3,
      scale: 100,
      frameStyle: 'polaroid',
      fastener: 'wax',
      caption: 'Midnight wishes made under sparkling stars ✨',
      date: 'Oct 14, 2023',
      location: 'Backyard Garden'
    },
    {
      id: 'photo_11',
      url: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=600&q=80',
      title: 'Winter feast reun',
      tag: 'Warmth',
      slotNumber: 11,
      isCover: false,
      rotation: -2,
      scale: 100,
      frameStyle: 'polaroid',
      fastener: 'clip',
      caption: 'Hot pot, endless tea, and too many belly laughs 🍲',
      date: 'Dec 24, 2023',
      location: 'Warm Hearth Bistro'
    },
    {
      id: 'photo_12',
      url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80',
      title: 'Writing future po',
      tag: 'Letters',
      slotNumber: 12,
      isCover: false,
      rotation: 1,
      scale: 100,
      frameStyle: 'polaroid',
      fastener: 'tape',
      caption: 'Writing notes to our future 30-year-old selves ☕',
      date: 'Apr 19, 2024',
      location: 'Alfama Terrace'
    }
  ],
  music: {
    id: 'track_golden_hour',
    title: 'Golden Hour Serenade',
    artist: 'Leon & Clara',
    vibe: 'Warm & Acoustic',
    duration: '03:15',
    currentTime: '01:42',
    isLoop: true,
    volume: 85,
    cinematicFadeIn: true,
    voiceMemoRecorded: true,
    voiceMemoDuration: '0:45 min',
    voiceMemoNote: 'Recorded late night while thinking of you'
  },
  letter: {
    salutation: 'To Maya, the sun of my universe ☀️',
    body: `Dearest Maya,

Every chapter with you turns ordinary days into poetry. Remember when we danced in the warm July drizzle until our shoes were soaked and we couldn't stop giggling at how ridiculous we looked?

Thank you for being my constant anchor, my favorite conspirator, and the warmest hug in human form. You make the world gentler, bolder, and so incomparably colorful.

Forever your co-pilot,
Clara Bennett 💖`,
    closing: 'Forever your co-pilot,',
    signature: 'Clara Bennett 💖',
    tone: 'Handwritten Romance',
    openingExperience: 'wax_melt',
    font: 'script',
    waxColor: '#7C3AED',
    postmark: 'October 14, 2024 • Montmartre Airmail',
    hugsCount: 34
  },
  memories: [
    {
      id: 'mem_1',
      number: 1,
      title: 'The 2AM Waffle Run 🧇',
      date: 'Aug 14, 2021',
      photoUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80',
      story: 'When the car battery died and we ate strawberry waffles on the curb laughing until tears came out.',
      tags: ['#midnight-snacks', '#strawberry-vibes'],
      location: 'Rooftop Diner',
      sticker: '🧇',
      stickerBg: '#FED7AA'
    },
    {
      id: 'mem_2',
      number: 2,
      title: 'First Solo Roadtrip 🚙',
      date: 'Jul 03, 2022',
      photoUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80',
      story: 'Singing every lyric to 2000s throwbacks along Highway 1 with windows rolled all the way down.',
      tags: ['#highway-one', '#playlist-gold'],
      location: 'Big Sur Overlook',
      sticker: '🚗',
      stickerBg: '#BAE6FD'
    },
    {
      id: 'mem_3',
      number: 3,
      title: 'Adopting Little Mochi 🐾',
      date: 'Nov 18, 2023',
      photoUrl: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=600&q=80',
      story: 'The day you decided one look at the shelter was all it took. Best roommate ever.',
      tags: ['#cat-parent', '#fur-family'],
      location: 'Tiny Mochi Day 1',
      sticker: '🐾',
      stickerBg: '#DDD6FE'
    },
    {
      id: 'mem_4',
      number: 4,
      title: 'Pasta Disaster Tuesday 🍝',
      date: 'May 10, 2022',
      photoUrl: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=600&q=80',
      story: 'We ended up ordering takeout at 11 PM anyway, but agreed the homemade sauce tasted like pure optimism.',
      tags: ['#kitchen-chaos', '#cozy'],
      location: 'Apt 4B',
      sticker: '🍴',
      stickerBg: '#FBCFE8'
    },
    {
      id: 'mem_5',
      number: 5,
      title: 'Rooftop Sunset in Paris 🥐',
      date: 'Jun 24, 2022',
      photoUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80',
      story: 'Remember when we danced in the pouring rain with cheap melting pistachio gelato? Our shoes were ruined but my heart was completely full.',
      tags: ['#paris', '#summer-rain'],
      location: 'Paris, France',
      sticker: '✨',
      stickerBg: '#FEF08A'
    }
  ],
  curiosities: {
    insideJokes: {
      title: 'Our Inside Joke Vault',
      desc: 'Things that would make zero sense to anyone else on Earth.',
      count: 5
    },
    promises: {
      title: '3 Promises for Year 25',
      desc: 'Solemn, silly, and heartfelt vows for the year ahead.',
      date: 'Stamped on October 14'
    },
    playlist: {
      title: 'Secret Playlist Tribute',
      desc: '25 songs scored to 25 unforgettable memory scenes.',
      runtime: '1 hr 38 mins of sunshine'
    }
  },
  relationship: 'best_friends',
  template: 'scrapbook',
  palette: 'lavender',
  animations: {
    activeEffects: ['confetti', 'hearts', 'sparkles'],
    intensity: 'balanced',
    density: 45,
    soundSync: true,
    respectReducedMotion: false
  },
  canvasElements: [
    {
      id: 'item_1',
      type: 'polaroid',
      x: 180,
      y: 120,
      rotation: -4,
      scale: 105,
      content: 'Golden hour roof giggles ✨'
    },
    {
      id: 'item_2',
      type: 'polaroid',
      x: 200,
      y: 450,
      rotation: 2,
      scale: 98,
      content: 'The strawberry shortcake rush 🍰'
    },
    {
      id: 'item_3',
      type: 'note',
      x: 160,
      y: 720,
      rotation: -1,
      scale: 100,
      content: 'Happy 25th to my favorite human on Earth! Maya, you make everything sparkle brighter ✨'
    }
  ],
  security: {
    secretKey: 'MOCHI2024',
    promptClue: "Maya's first pet's name & milestone year (Hint: fluffy samoyed)!",
    notifyOnOpen: true,
    isUnlocked: false
  },
  recipientState: {
    unwrapped: false,
    currentChapter: 1,
    candlesExtinguished: 0,
    candlesTotal: 25,
    likedLetter: false,
    reactions: {
      '😭 Tears of Joy': 14,
      '🥹 So Touched': 28,
      '💖 Huge Hug': 52,
      '🎉 Party On!': 31,
      '🥂 Cheers!': 22
    }
  }
};
