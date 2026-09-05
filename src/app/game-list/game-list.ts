import { Component, inject, linkedSignal, signal } from '@angular/core';
import { GameHubSignalStore } from '../stores/game-hub-signal-store';
import { Card } from '../shared/card/card';

@Component({
  imports: [Card],
  selector: 'app-game-list',
  templateUrl: './game-list.html',
})
export class GameList {
  private store = inject(GameHubSignalStore);

  protected games = linkedSignal(() => this.store.getGames());
}
