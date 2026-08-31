import {
  Component,
  effect,
  ElementRef,
  inject,
  linkedSignal,
  signal,
  viewChildren,
} from '@angular/core';
import { ApiService } from '../services/http-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Card } from '../shared/card/card';
import { ConfirmDialog, ConfirmDialogData } from '../shared/confirm-dialog/confirm-dialog';
import { Dialog } from '@angular/cdk/dialog';

@Component({
  selector: 'app-genres-list',
  templateUrl: './genres-list.html',
  imports: [Card],
})
export class GenresList {
  private apiService = inject(ApiService);
  private confirmDialog = inject(Dialog);

  protected cards = viewChildren(Card, { read: ElementRef });
  loadedGenres = toSignal(this.apiService.getAllGenres(), {
    initialValue: [],
  });

  protected genres = linkedSignal(() => this.loadedGenres());
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
