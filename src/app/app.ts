import { Component, effect, inject, signal } from '@angular/core';
import { NavBar } from './nav-bar/nav-bar';
import { GenresList } from './genres-list/genres-list';
import { GameHubSignalStore } from './stores/game-hub-signal-store';

@Component({
  imports: [NavBar, GenresList],
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App {
  private ghStore = inject(GameHubSignalStore);

  constructor() {
    this.ghStore.loadGames();
    this.ghStore.loadGenres();
  }
}
