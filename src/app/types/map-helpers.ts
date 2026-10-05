import { GameDto, GenreDto } from './dtos';
import { Game, Genre } from './games';

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
