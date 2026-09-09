import { GameDto, GenreDto, PlatformDto } from './Dtos';
import { Game, Genre, Platform } from './Games';

export const dtoToGenre = (dto: GenreDto): Genre =>
  ({
    ...dto,
    backgroundImage: dto.image_background,
    gamesCount: dto.games_count,
  }) satisfies Genre;

export const dtoToGame = (dto: GameDto): Game =>
  ({
    ...dto,
    backgroundImage: dto.background_image,
    platforms: dto.platforms.map(({ platform }) => platform),
  }) satisfies Game;

export const dtoToPlatform = (dto: PlatformDto): Platform =>
  ({
    id: dto.id,
    name: dto.name,
    slug: dto.slug,
  }) satisfies Platform;
