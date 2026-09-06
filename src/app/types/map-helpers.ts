import { GameDto, GenreDto } from './Dtos';
import { Game, Genre } from './Games';

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
