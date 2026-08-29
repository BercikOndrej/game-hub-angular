import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiResponse } from '../types/ApiResponse';
import { Game, Genre } from '../types/Games';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private GenresUrl = 'https://api.rawg.io/api/genres';
  private GamesUrl = 'https://api.rawg.io/api/games';
  private client = inject(HttpClient);

  public getAllGames(): Observable<Game[]> {
    return this.client
      .get<ApiResponse<Game>>(this.GamesUrl, {})
      .pipe(map((response) => response.results));
  }

  public getGame(): Observable<Game> {
    return this.client.get<Game>(this.GamesUrl, {});
  }

  public getAllGenres(): Observable<Genre[]> {
    return this.client
      .get<ApiResponse<Genre>>(this.GenresUrl, {})
      .pipe(map((response) => response.results));
  }

  public getGennre(): Observable<Genre> {
    return this.client.get<Genre>(this.GenresUrl, {});
  }
}
