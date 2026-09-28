import { Component, debounced, effect, ElementRef, inject, signal, viewChild } from '@angular/core';
import { MatHint } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import RxResourceGameHubStore from '../stores/rx-resource-game-hub.store';

@Component({
  imports: [FormsModule, MatIcon, MatHint],
  selector: 'app-search-box',
  templateUrl: './search-box.html',
  styleUrl: './search-box.css',
})
export class SearchBox {
  private readonly store = inject(RxResourceGameHubStore);
  protected value = signal('');
  protected searchInput = viewChild.required<ElementRef<HTMLInputElement>>('searchInput');
  private readonly debouncedSearch = debounced(this.value, 2000);

  constructor() {
    effect(() => {
      const value = this.debouncedSearch.value();
      this.store.setSearch(value);
    });
  }

  protected clearAndFocusInput() {
    if (this.searchInput().nativeElement.value.length > 0) {
      this.searchInput().nativeElement.value = '';
    }
    this.value.set('');
    this.searchInput().nativeElement.focus();
  }

  protected searchGames(): void {
    this.store.setSearch(this.value());
  }
}
