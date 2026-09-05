import { Platform } from './Games';

export interface GameDto {
  id: number;
  slug: string;
  name: string;
  released: string;
  background_image: string;
  rating: number;
  platforms: Platform[];
}

export interface GenreDto {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
  description?: string;
}
