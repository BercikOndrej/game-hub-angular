import { inject, Injectable, signal } from '@angular/core';
import { ApiService } from '../services/api-service';
import { rxResource } from '@angular/core/rxjs-interop';
import { Platform } from '../types/Games';

@Injectable({ providedIn: 'root' })
export default class RxResourceGameHubStore {
  private apiService = inject(ApiService);

  private selectedPlatformIds = signal<number[]>([]);

  private gamesResource = rxResource({
    params: () => ({
      platformIds: this.selectedPlatformIds(),
    }),
    stream: ({ params }) => this.apiService.loadGames(params.platformIds),
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

  // Public API
  // Games
  public games = this.gamesResource.value;
  public areGamesLoading = this.gamesResource.isLoading;
  public gamesError = this.gamesResource.error;

  // Genres
  public genres = this.genresResource.value;
  public areGenresLoading = this.genresResource.isLoading;
  public genresError = this.genresResource.error;

  // Platforms
  public platforms = this.platformResource.value;
  public arePlatformsLoading = this.platformResource.isLoading;
  public platformsError = this.platformResource.error;
  public selectedPlatformIdsValue = this.selectedPlatformIds;
  public setSeledctedPlatformIds = this.setPlatformIdsFunction;
}
