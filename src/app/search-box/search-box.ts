import { Component, ElementRef, signal, viewChild } from '@angular/core';
import { MatHint } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule, MatIcon, MatHint],
  selector: 'app-search-box',
  templateUrl: './search-box.html',
  styleUrl: './search-box.css',
})
export class SearchBox {
  protected value = signal('');
  protected searchInput = viewChild.required<ElementRef<HTMLInputElement>>('searchInput');

  protected clearAndFocusInput() {
    if (this.searchInput().nativeElement.value.length > 0) {
      this.searchInput().nativeElement.value = '';
    }
    this.searchInput().nativeElement.focus();
  }

  protected searchGames(): void {
    alert(`Searching games based on: ${this.value()}`);
  }
}
