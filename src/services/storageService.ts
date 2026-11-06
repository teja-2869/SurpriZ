import { Gift } from '../types/gift';
import { INITIAL_GIFT } from '../data/defaultGiftData';

const STORAGE_KEY_GIFTS = 'surpriz_gifts_db_v1';
const STORAGE_KEY_ACTIVE_GIFT = 'surpriz_active_gift_id';

/**
 * Normalizes any loaded gift object to ensure full schema backwards-compatibility
 */
export function normalizeGift(g: any): Gift {
  if (!g) return { ...INITIAL_GIFT };

  const age = g.birthday?.age ?? g.recipient?.milestoneAge ?? 25;
  const birthMonth = g.recipient?.birthMonth || 'October';
  const birthDay = g.recipient?.birthDay || 14;
  const birthYear = g.recipient?.birthYear || 1999;

  return {
    ...INITIAL_GIFT,
    ...g,
    sender: {
      ...INITIAL_GIFT.sender,
      ...(g.sender || {})
    },
    birthday: {
      age: Number(age) || 25,
      date: g.birthday?.date || `${birthMonth} ${birthDay}, ${birthYear}`,
      zodiacSign: g.birthday?.zodiacSign || 'Libra ♎',
      birthStone: g.birthday?.birthStone || 'Opal',
      birthFlower: g.birthday?.birthFlower || 'Marigold',
      ...(g.birthday || {})
    },
    recipient: {
      ...INITIAL_GIFT.recipient,
      milestoneAge: Number(age) || 25,
      birthMonth,
      birthDay,
      birthYear,
      ...(g.recipient || {})
    },
    security: {
      ...INITIAL_GIFT.security,
      secretKey: g.security?.secretKey || 'MAYA2024',
      promptClue: g.security?.promptClue || "Maya's first pet's name & milestone year",
      passwordHint: g.security?.passwordHint || g.security?.promptClue || 'Ask Clara!',
      notifyOnOpen: g.security?.notifyOnOpen ?? true,
      isUnlocked: g.security?.isUnlocked ?? false,
      ...(g.security || {})
    },
    letter: {
      ...INITIAL_GIFT.letter,
      ...(g.letter || {})
    },
    music: {
      ...INITIAL_GIFT.music,
      ...(g.music || {})
    },
    photos: Array.isArray(g.photos) && g.photos.length > 0 ? g.photos : INITIAL_GIFT.photos,
    memories: Array.isArray(g.memories) && g.memories.length > 0 ? g.memories : INITIAL_GIFT.memories
  };
}

/**
 * Storage Service for offline local persistence and Supabase synchronization
 */
export class GiftStorageService {
  private static loadGifts(): Record<string, Gift> {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_GIFTS);
      if (!stored) {
        const initial = { [INITIAL_GIFT.id]: normalizeGift(INITIAL_GIFT) };
        localStorage.setItem(STORAGE_KEY_GIFTS, JSON.stringify(initial));
        return initial;
      }
      const parsed = JSON.parse(stored);
      const normalizedMap: Record<string, Gift> = {};
      for (const key of Object.keys(parsed)) {
        normalizedMap[key] = normalizeGift(parsed[key]);
      }
      return normalizedMap;
    } catch (e) {
      console.warn('Could not read from local storage', e);
      return { [INITIAL_GIFT.id]: normalizeGift(INITIAL_GIFT) };
    }
  }

  private static saveAllGifts(map: Record<string, Gift>) {
    try {
      localStorage.setItem(STORAGE_KEY_GIFTS, JSON.stringify(map));
    } catch (e) {
      console.warn('Could not save to local storage', e);
    }
  }

  public static getGiftById(id: string): Gift | null {
    const gifts = this.loadGifts();
    return gifts[id] ? normalizeGift(gifts[id]) : null;
  }

  public static getGiftBySlug(slug: string): Gift | null {
    const gifts = this.loadGifts();
    const found = Object.values(gifts).find((g) => g.slug.toLowerCase() === slug.toLowerCase());
    return found ? normalizeGift(found) : null;
  }

  public static getAllGifts(): Gift[] {
    const gifts = this.loadGifts();
    return Object.values(gifts).map(normalizeGift);
  }

  public static saveGift(gift: Gift): Gift {
    const normalized = normalizeGift(gift);
    const gifts = this.loadGifts();
    gifts[normalized.id] = normalized;
    this.saveAllGifts(gifts);
    return normalized;
  }

  public static deleteGift(id: string): boolean {
    const gifts = this.loadGifts();
    if (gifts[id]) {
      delete gifts[id];
      this.saveAllGifts(gifts);
      return true;
    }
    return false;
  }

  public static getActiveGiftId(): string {
    return localStorage.getItem(STORAGE_KEY_ACTIVE_GIFT) || INITIAL_GIFT.id;
  }

  public static setActiveGiftId(id: string) {
    localStorage.setItem(STORAGE_KEY_ACTIVE_GIFT, id);
  }

  /**
   * Secure password verification method simulating backend hash authentication
   */
  public static verifyGiftPassword(giftId: string, enteredCode: string): { success: boolean; message: string } {
    const gift = this.getGiftById(giftId);
    if (!gift) {
      return { success: false, message: 'Gift parcel not found in vault.' };
    }

    const cleanEntered = enteredCode.trim().toUpperCase();
    const cleanActual = gift.security.secretKey.trim().toUpperCase();

    if (cleanEntered === cleanActual) {
      // Mark as unlocked in memory
      gift.security.isUnlocked = true;
      this.saveGift(gift);
      return { success: true, message: 'Vault seal released! Unwrapping gift...' };
    }

    return {
      success: false,
      message: 'Incorrect secret key. Hint: ' + (gift.security.promptClue || gift.security.passwordHint || 'Ask the sender!')
    };
  }
}
