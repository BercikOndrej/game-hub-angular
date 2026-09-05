import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiResponse } from '../types/ApiResponse';
import { Game, Genre } from '../types/Games';
import { GameDto, GenreDto } from '../types/Dtos';
import * as MapHelpers from '../types/map-helpers';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private GenresUrl = 'https://api.rawg.io/api/genres';
  private GamesUrl = 'https://api.rawg.io/api/games';
  private client = inject(HttpClient);

  public loadGames(): Observable<Game[]> {
    return this.client
      .get<ApiResponse<GameDto>>(this.GamesUrl, {})
      .pipe(map((response) => response.results.map((dto: GameDto) => MapHelpers.dtoToGame(dto))));
  }

  public getGame(): Observable<Game> {
    return this.client
      .get<GameDto>(this.GamesUrl, {})
      .pipe(map((dto: GameDto) => MapHelpers.dtoToGame(dto)));
  }

  public loadGenres(): Observable<Genre[]> {
    return this.client
      .get<ApiResponse<GenreDto>>(this.GenresUrl, {})
      .pipe(map((response) => response.results.map((dto: GenreDto) => MapHelpers.dtoToGenre(dto))));
  }

  public getGennre(): Observable<Genre> {
    return this.client
      .get<GenreDto>(this.GenresUrl, {})
      .pipe(map((dto: GenreDto) => MapHelpers.dtoToGenre(dto)));
  }
}
