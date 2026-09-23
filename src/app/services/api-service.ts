import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiResponse } from '../types/ApiResponse';
import { Game, Genre, Platform } from '../types/Games';
import { GameDto, GenreDto, PlatformDto } from '../types/Dtos';
import * as MapHelpers from '../types/map-helpers';

export interface GameQuery {
  platformIds: number[];
  genreId: number | null;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly GenresUrl = 'https://api.rawg.io/api/genres';
  private readonly GamesUrl = 'https://api.rawg.io/api/games';
  private readonly PlatformsUrl = 'https://api.rawg.io/api/platforms/lists/parents';
  private client = inject(HttpClient);

  public loadGames(query: GameQuery): Observable<Game[]> {
    let params = new HttpParams();
    if (query.platformIds.length > 0) {
      params = params.set('parent_platforms', query.platformIds.join(','));
    }
    if (query.genreId) {
      params = params.set('genres', query.genreId.toString());
    }

    return this.client
      .get<ApiResponse<GameDto>>(this.GamesUrl, { params })
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

  public loadPlatforms(): Observable<Platform[]> {
    return this.client
      .get<ApiResponse<PlatformDto>>(this.PlatformsUrl, {})
      .pipe(
        map((response) =>
          response.results.map((dto: PlatformDto) => MapHelpers.dtoToPlatform(dto)),
        ),
      );
  }
}
