import { Component } from '@angular/core';
import { GameList } from './game-list/game-list';
import { GenresList } from './genres-list/genres-list';
import { NavBar } from './nav-bar/nav-bar';

@Component({
  imports: [GameList, GenresList, NavBar],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  // We are not using clasic simple signal store right now
  // private ghStore = inject(GameHubSignalStore);

  constructor() {
    // this.ghStore.loadGames();
    // this.ghStore.loadGenres();
  }
}
