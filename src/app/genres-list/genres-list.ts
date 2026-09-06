import {
  Component,
  effect,
  ElementRef,
  inject,
  linkedSignal,
  signal,
  viewChildren,
} from '@angular/core';
import { Card } from '../shared/card/card';
import { ConfirmDialog, ConfirmDialogData } from '../shared/confirm-dialog/confirm-dialog';
import { Dialog } from '@angular/cdk/dialog';
import { GameHubSignalStore } from '../stores/game-hub-signal-store';
import HttpResourcesGameHubStore from '../stores/http-resources-game-hub-store';
import RxResourceGameHubStore from '../stores/rx-resource-game-hub.-store';

@Component({
  selector: 'app-genres-list',
  templateUrl: './genres-list.html',
  imports: [Card],
})
export class GenresList {
  private confirmDialog = inject(Dialog);
  // Signal store
  // private store = inject(GameHubSignalStore);
  // protected genres = linkedSignal(() => this.store.getGenres());

  // Http resource store
  // protected httpResourceStore = inject(HttpResourcesGameHubStore);
  // protected genres = linkedSignal(() => this.httpResourceStore.genres() ?? []);

  // Rx resource store
  protected store = inject(RxResourceGameHubStore);
  protected genres = linkedSignal(() => this.store.genres() || []);

  protected cards = viewChildren(Card, { read: ElementRef });

  protected selectedGenreId = signal<number | undefined>(undefined);

  constructor() {
    effect(() => {
      const selectedId = this.selectedGenreId();
      if (selectedId === undefined) {
        return;
      }

      const index = this.genres().findIndex((genre) => genre.id === selectedId);
      this.cards()[index]?.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }

  protected confirmSelect(id: number): void {
    const founded = this.genres().find((genre) => genre.id === id);
    if (!founded) {
      console.error(`Genre with id ${id} not found.`);
      return;
    }
    const ref = this.confirmDialog.open<boolean, ConfirmDialogData>(ConfirmDialog, {
      data: {
        title: 'Vybrat herní kategorii?',
        message: 'Potvrzením se změní zobrazené hry',
      },
    });
    ref.closed.subscribe((confirmed) => {
      if (confirmed) {
        this.selectedGenreId.set(id);
      }
    });
  }
}
