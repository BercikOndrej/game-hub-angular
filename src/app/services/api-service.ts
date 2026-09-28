import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { ApiResponse } from '../types/ApiResponse';
import { GameDto, GenreDto, PlatformDto } from '../types/Dtos';
import { Game, Genre, Platform } from '../types/Games';
import * as MapHelpers from '../types/map-helpers';

export interface GameQuery {
  platformIds: number[];
  genreId: number | null;
  search: string | null;
  page: number;
  pageSize: number;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly GenresUrl = 'https://api.rawg.io/api/genres';
  private readonly GamesUrl = 'https://api.rawg.io/api/games';
  private readonly PlatformsUrl = 'https://api.rawg.io/api/platforms/lists/parents';
  private client = inject(HttpClient);

  // private cache: Map<string, Observable<Game[]>> = new Map();

  // public invalidateCache(): void {
  //   this.cache.clear();
  // }

  public loadGames(query: GameQuery): Observable<ApiResponse<Game>> {
    // Json could come insorted -> different string for same query
    // map function map key to tuple
    // const key = JSON.stringify(
    //   Object.keys(query)
    //     .sort()
    //     .map((key) => [key, query[key as keyof GameQuery]]),
    // );

    // if (this.cache.has(key)) {
    //   return this.cache.get(key)!;
    // }

    let params = new HttpParams();
    if (query.platformIds.length > 0) {
      params = params.set('parent_platforms', query.platformIds.join(','));
    }
    if (query.genreId) {
      params = params.set('genres', query.genreId.toString());
    }

    if (query.search) {
      params = params.set('search', query.search);
    }

    params = params.set('page', query.page);
    params = params.set('page_size', query.pageSize);

    const request = this.client.get<ApiResponse<GameDto>>(this.GamesUrl, { params }).pipe(
      map((response) => ({
        ...response,
        results: response.results.map((dto: GameDto) => MapHelpers.dtoToGame(dto)),
      })),
      // shareReplay({ bufferSize: 1, refCount: false }),
    );

    // this.cache.set(key, request);
    return request;
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
