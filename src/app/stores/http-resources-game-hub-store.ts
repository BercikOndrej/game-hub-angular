import { httpResource } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Game, Genre } from '../types/Games';
import { GameDto, GenreDto } from '../types/Dtos';
import { ApiResponse } from '../types/ApiResponse';
import * as MapHelpers from '../types/map-helpers';
@Injectable({ providedIn: 'root' })
export default class HttpResourcesGameHubStore {
  private GenresUrl = 'https://api.rawg.io/api/genres';
  private GamesUrl = 'https://api.rawg.io/api/games';

  private gamesResource = httpResource<Game[]>(
    () => ({
      url: this.GamesUrl,
    }),
    {
      parse: (response) => (response as ApiResponse<GameDto>).results.map(MapHelpers.dtoToGame),
    },
  );

  private genresResource = httpResource<Genre[]>(
    () => ({
      url: this.GenresUrl,
    }),
    {
      parse: (response) => (response as ApiResponse<GenreDto>).results.map(MapHelpers.dtoToGenre),
    },
  );

  // Public api

  // Games
  public games = this.gamesResource.value;
  public areGamesLoading = this.gamesResource.isLoading;
  public gamesError = this.gamesResource.error;
  public getGame = (id: number): Game | undefined =>
    this.gamesResource.value()?.find((game) => game.id === id) ?? undefined;

  // Genres
  public genres = this.genresResource.value;
  public areGenresLoading = this.genresResource.isLoading;
  public genresError = this.genresResource.error;
  public getGenre = (id: number): Genre | undefined =>
    this.genresResource.value()?.find((genre) => genre.id === id) ?? undefined;
}
