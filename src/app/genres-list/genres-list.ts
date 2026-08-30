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

@Component({
  selector: 'app-genres-list',
  templateUrl: './genres-list.html',
  imports: [Card],
})
export class GenresList {
  private apiService = inject(ApiService);

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

  protected select(id: number) {
    const founded = this.genres().find((genre) => genre.id === id);
    if (!founded) {
      console.error(`Genre with id ${id} not found.`);
      return;
    }
    this.selectedGenreId.set(founded.id);
  }
}
