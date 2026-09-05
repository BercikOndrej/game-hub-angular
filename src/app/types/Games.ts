export interface Genre {
  id: number;
  name: string;
  slug: string;
  gamesCount: number;
  backgroundImage: string;
  description?: string;
}

export interface Game {
  id: number;
  slug: string;
  name: string;
  released: string;
  backgroundImage: string;
  rating: number;
  platforms: Platform[];
}

export interface Platform {
  id: number;
  slug: string;
  name: string;
}
