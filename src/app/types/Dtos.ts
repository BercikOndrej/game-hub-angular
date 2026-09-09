import { Platform } from './Games';

export interface GamePlatformDto {
  platform: Platform;
  released_at: string | null;
}

export interface PlatformDto {
  id: number;
  name: string;
  slug: string;
}

export interface GameDto {
  id: number;
  slug: string;
  name: string;
  released: string;
  background_image: string;
  rating: number;
  platforms: GamePlatformDto[];
}

export interface GenreDto {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
  description?: string;
}
