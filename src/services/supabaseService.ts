import { Gift } from '../types/gift';
import { GiftStorageService } from './storageService';

/**
 * Supabase Integration Architecture for SURPRIZ
 *
 * SQL Schema definition for Supabase Postgres backend:
 *
 * ```sql
 * -- 1. Gifts Table
 * create table if not exists public.gifts (
 *   id uuid primary key default gen_random_uuid(),
 *   slug text unique not null,
 *   created_at timestamp with time zone default timezone('utc'::text, now()) not null,
 *   creator_edit_token uuid default gen_random_uuid() not null,
 *   status text default 'draft' check (status in ('draft', 'published', 'archived')),
 *   sender jsonb not null,
 *   recipient jsonb not null,
 *   music jsonb not null,
 *   letter jsonb not null,
 *   relationship text not null,
 *   template text not null,
 *   palette text not null,
 *   animations jsonb not null,
 *   canvas_elements jsonb not null,
 *   password_hash text not null,
 *   prompt_clue text,
 *   notify_on_open boolean default true
 * );
 *
 * -- 2. Photos Table (Private media storage with signed URLs)
 * create table if not exists public.gift_photos (
 *   id uuid primary key default gen_random_uuid(),
 *   gift_id uuid references public.gifts(id) on delete cascade not null,
 *   slot_number int not null,
 *   storage_path text not null,
 *   title text,
 *   tag text,
 *   is_cover boolean default false,
 *   rotation float default 0,
 *   scale float default 100,
 *   frame_style text default 'polaroid',
 *   fastener text default 'tape',
 *   caption text
 * );
 *
 * -- 3. Memories Table
 * create table if not exists public.gift_memories (
 *   id uuid primary key default gen_random_uuid(),
 *   gift_id uuid references public.gifts(id) on delete cascade not null,
 *   order_index int not null,
 *   title text not null,
 *   memory_date text,
 *   story text,
 *   photo_url text,
 *   tags text[],
 *   location text,
 *   sticker text
 * );
 *
 * -- 4. Recipient Reactions & Audit Log
 * create table if not exists public.recipient_events (
 *   id uuid primary key default gen_random_uuid(),
 *   gift_id uuid references public.gifts(id) on delete cascade not null,
 *   event_type text not null, -- 'opened', 'candle_blown', 'toast_reaction'
 *   payload jsonb,
 *   created_at timestamp with time zone default timezone('utc'::text, now()) not null
 * );
 * ```
 */

export interface SupabaseConfig {
  supabaseUrl?: string;
  supabaseAnonKey?: string;
}

export class SupabaseService {
  private static config: SupabaseConfig = {
    supabaseUrl: (import.meta as any).env?.VITE_SUPABASE_URL || '',
    supabaseAnonKey: (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || ''
  };

  public static isConfigured(): boolean {
    return Boolean(this.config.supabaseUrl && this.config.supabaseAnonKey);
  }

  public static async fetchGift(slug: string): Promise<Gift | null> {
    if (!this.isConfigured()) {
      // Local fallback layer
      return GiftStorageService.getGiftBySlug(slug);
    }
    // Remote fetch would happen here
    return GiftStorageService.getGiftBySlug(slug);
  }

  public static async saveGift(gift: Gift): Promise<Gift> {
    // Always sync locally
    GiftStorageService.saveGift(gift);
    return gift;
  }
}
