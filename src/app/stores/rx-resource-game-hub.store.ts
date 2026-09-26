import { computed, effect, inject, Injectable, linkedSignal, signal } from '@angular/core';
import { ApiService, GameQuery } from '../services/api-service';
import { rxResource } from '@angular/core/rxjs-interop';
import { Game, Platform } from '../types/Games';

@Injectable({ providedIn: 'root' })
export default class RxResourceGameHubStore {
  private apiService = inject(ApiService);

  protected readonly allGames = linkedSignal<Game[] | undefined, Game[]>({
    source: () => this.gamesPageResource.value()?.results,
    computation: (games, prev) => [...(prev?.value ?? []), ...(games || [])],
  });

  // #region Page

  private pageSize = 20;
  private setPageSizeFunction = (page: number) => {
    if (page < 1) {
      return;
    }
    this.pageSize = page;
  };

  // API
  public setPageSize = this.setPageSizeFunction;

  // #endregion

  // #region Games
  private readonly page = signal<number>(1);

  private gamesPageResource = rxResource({
    params: () => ({
      platformIds: this.selectedPlatformIds(),
      genreId: this.selectedGenreId(),
      page: this.page(),
      pageSize: this.pageSize,
    }),
    stream: ({ params }) => this.apiService.loadGames(params satisfies GameQuery),
  });

  private _games = signal<Game[]>([]);

  private _hasMore = computed(
    () => this._games().length < (this.gamesPageResource.value()?.count ?? 0),
  );

  private _synch = effect(() => {
    const loadedGames = this.gamesPageResource.value()?.results ?? [];
    this._games.update((prev) => [...prev, ...loadedGames]);
  });

  private setInicialGameState = (): void => {
    this.page.set(1);
    this._games.set([]);
  };

  private _loadMore = (): void => {
    if (this.gamesPageResource.isLoading() || this.gamesPageResource.error() || !this.hasMore()) {
      return;
    }
    this.page.update((prev) => prev + 1);
  };

  // API
  public games = this._games.asReadonly();
  public hasMore = this._hasMore;
  public loadMore = this._loadMore;
  public areGamesLoading = this.gamesPageResource.isLoading;
  public gamesError = this.gamesPageResource.error;

  // #endregion

  // #region Genres

  private selectedGenreId = signal<number | null>(null);

  private genresResource = rxResource({
    stream: () => this.apiService.loadGenres(),
  });

  private setGenreIdFunction = (genreId: number): void => {
    this.selectedGenreId.set(genreId);
    this.setInicialGameState();
  };

  // API
  public genres = this.genresResource.value;
  public areGenresLoading = this.genresResource.isLoading;
  public genresError = this.genresResource.error;
  public setGenreId = this.setGenreIdFunction;

  // #endregion

  // #region Platforms

  private selectedPlatformIds = signal<number[]>([]);

  private platformResource = rxResource({
    stream: () => this.apiService.loadPlatforms(),
  });

  private setPlatformIdsFunction = (ids: number[]): void => {
    const foundedList = this.platformResource
      .value()
      ?.map((platform: Platform) => platform.id)
      .filter((id: number) => ids.includes(id));

    this.selectedPlatformIds.set(foundedList ? [...foundedList] : []);
    this.setInicialGameState;
  };

  // API
  public platforms = this.platformResource.value;
  public arePlatformsLoading = this.platformResource.isLoading;
  public platformsError = this.platformResource.error;
  public selectedPlatformIdsValue = this.selectedPlatformIds;
  public setSeledctedPlatformIds = this.setPlatformIdsFunction;

  // #endregion
}
