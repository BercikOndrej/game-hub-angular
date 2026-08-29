import { Component, inject, linkedSignal, signal } from '@angular/core';
import { ApiService } from '../../services/http-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { GenreCard } from '../genre-card/genre-card';

@Component({
  selector: 'app-genres-list',
  templateUrl: './genres-list.html',
  imports: [GenreCard],
})
export class GenresList {
  private apiService = inject(ApiService);

  loadedGenres = toSignal(this.apiService.getAllGenres(), {
    initialValue: [],
  });

  protected genres = linkedSignal(() => this.loadedGenres());
  protected selectedGenreId = signal<number | undefined>(undefined);

  protected select(id: number) {
    const founded = this.genres().find((genre) => genre.id === id);
    if (!founded) {
      console.error(`Genre with id ${id} not found.`);
      return;
    }
    this.selectedGenreId.set(founded.id);
  }
}
