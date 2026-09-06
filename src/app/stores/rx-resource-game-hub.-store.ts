import { inject, Injectable } from '@angular/core';
import { ApiService } from '../services/api-service';
import { rxResource } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export default class RxResourceGameHubStore {
  private apiService = inject(ApiService);

  private gamesResource = rxResource({
    stream: () => this.apiService.loadGames(),
  });

  private genresResource = rxResource({
    stream: () => this.apiService.loadGenres(),
  });

  // Public API
  // Games
  public games = this.gamesResource.value;
  public areGamesLoading = this.gamesResource.isLoading;
  public gamesError = this.gamesResource.error;

  // Genres
  public genres = this.genresResource.value;
  public areGenresLoading = this.genresResource.isLoading;
  public genresError = this.genresResource.error;
}
