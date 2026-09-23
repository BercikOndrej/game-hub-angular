import { inject, Injectable, signal } from '@angular/core';
import { ApiService, GameQuery } from '../services/api-service';
import { rxResource } from '@angular/core/rxjs-interop';
import { Platform } from '../types/Games';

@Injectable({ providedIn: 'root' })
export default class RxResourceGameHubStore {
  private apiService = inject(ApiService);

  private selectedPlatformIds = signal<number[]>([]);

  private selectedGenreId = signal<number | null>(null);

  private gamesResource = rxResource({
    params: () => ({
      platformIds: this.selectedPlatformIds(),
      genreId: this.selectedGenreId(),
    }),
    stream: ({ params }) => this.apiService.loadGames(params satisfies GameQuery),
  });

  private genresResource = rxResource({
    stream: () => this.apiService.loadGenres(),
  });

  private platformResource = rxResource({
    stream: () => this.apiService.loadPlatforms(),
  });

  private setPlatformIdsFunction = (ids: number[]): void => {
    const foundedList = this.platformResource
      .value()
      ?.map((platform: Platform) => platform.id)
      .filter((id: number) => ids.includes(id));

    this.selectedPlatformIds.set(foundedList ? [...foundedList] : []);
  };

  private setGenreIdFunction = (genreId: number): void => {
    this.selectedGenreId.set(genreId);
  };

  // Public API
  // Games
  public games = this.gamesResource.value;
  public areGamesLoading = this.gamesResource.isLoading;
  public gamesError = this.gamesResource.error;

  // Genres
  public genres = this.genresResource.value;
  public areGenresLoading = this.genresResource.isLoading;
  public genresError = this.genresResource.error;
  public setGenreId = this.setGenreIdFunction;

  // Platforms
  public platforms = this.platformResource.value;
  public arePlatformsLoading = this.platformResource.isLoading;
  public platformsError = this.platformResource.error;
  public selectedPlatformIdsValue = this.selectedPlatformIds;
  public setSeledctedPlatformIds = this.setPlatformIdsFunction;
}
