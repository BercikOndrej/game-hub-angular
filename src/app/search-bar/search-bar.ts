import { Component, signal } from '@angular/core';
import { MatInput, MatHint } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule, MatIcon, MatHint],
  selector: 'app-search-bar',
  templateUrl: './search-bar.html',
})
export class SearchBar {
  protected value = signal('');

  protected searchGames(): void {
    alert(`Searching games based on: ${this.value()}`);
  }
}
