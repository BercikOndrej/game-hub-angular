import { computed, inject, Injectable, linkedSignal, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ApiService, GameQuery } from '../services/api.service';
import { ApiResponse } from '../types/api-response';
import { Game, Platform } from '../types/games';

@Injectable({ providedIn: 'root' })
export default class RxResourceGameHubStore {
  private readonly apiService = inject(ApiService);

  protected readonly allGames = linkedSignal<Game[] | undefined, Game[]>({
    source: () => this.gamesPageResource.value()?.results,
    computation: (games, prev) => [...(prev?.value ?? []), ...(games ?? [])],
  });

  // #region Page and search
  private readonly search = signal<string | null>('');

  private pageSize = 20;
  private readonly setPageSizeFunction = (page: number): void => {
    if (page < 1) {
      return;
    }
    this.pageSize = page;
  };

  private readonly setSearchFunction = (input: string): void => {
    this.search.set(input === '' ? null : input);
  };

  // API
  public setPageSize = this.setPageSizeFunction;
  public setSearch = this.setSearchFunction;

  // #endregion

  // #region Games
  private readonly page = signal<number>(1);

  private readonly gamesPageResource = rxResource({
    params: () => ({
      platformIds: this.selectedPlatformIds(),
      genreId: this.selectedGenreId(),
      search: this.search(),
      page: this.page(),
      pageSize: this.pageSize,
    }),
    stream: ({ params }) => this.apiService.loadGames(params satisfies GameQuery),
  });

  private readonly _games = linkedSignal<
    { page: number; response: ApiResponse<Game> | undefined },
    Game[]
  >({
    source: () => ({
      page: this.page(),
      response: this.gamesPageResource.hasValue() ? this.gamesPageResource.value() : undefined,
    }),
    computation: ({ page, response }, prev) => {
      const baseItems = page === 1 ? [] : (prev?.value ?? []);
      return [...baseItems, ...(response?.results ?? [])];
    },
  });

  private readonly _hasMore = computed(() =>
    this.gamesPageResource.hasValue()
      ? this._games().length < this.gamesPageResource.value().count
      : false,
  );

  private readonly setInicialGameState = (): void => {
    this.page.set(1);
  };

  private readonly _loadMore = (): void => {
    if (!this.hasMore() || this.gamesPageResource.isLoading() || this.gamesPageResource.error()) {
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

  private readonly selectedGenreId = signal<number | null>(null);

  private readonly genresResource = rxResource({
    stream: () => this.apiService.loadGenres(),
  });

  private readonly setGenreIdFunction = (genreId: number): void => {
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

  private readonly selectedPlatformIds = signal<number[]>([]);

  private readonly platformResource = rxResource({
    stream: () => this.apiService.loadPlatforms(),
  });

  private readonly setPlatformIdsFunction = (ids: number[]): void => {
    const foundedList = this.platforms()
      .map((platform: Platform) => platform.id)
      .filter((id: number) => ids.includes(id));

    this.selectedPlatformIds.set(foundedList ? [...foundedList] : []);
    this.setInicialGameState();
  };

  // API
  public readonly platforms = computed<Platform[]>(() =>
    this.platformResource.hasValue() ? this.platformResource.value() : [],
  );

  public arePlatformsLoading = this.platformResource.isLoading;
  public platformsError = this.platformResource.error;
  public selectedPlatformIdsValue = this.selectedPlatformIds;
  public setSeledctedPlatformIds = this.setPlatformIdsFunction;

  // #endregion
}
