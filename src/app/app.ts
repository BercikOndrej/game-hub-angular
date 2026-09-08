import { Component, effect, inject, signal } from '@angular/core';
import { NavBar } from './nav-bar/nav-bar';
import { GenresList } from './genres-list/genres-list';
import { GameHubSignalStore } from './stores/game-hub-signal-store';
import { GameList } from './game-list/game-list';

@Component({
  imports: [GameList, GenresList, NavBar],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private ghStore = inject(GameHubSignalStore);

  constructor() {
    this.ghStore.loadGames();
    this.ghStore.loadGenres();
  }
}
