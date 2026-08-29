import { Component, signal } from '@angular/core';
import { MatHint } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule, MatIcon, MatHint],
  selector: 'app-search-box',
  templateUrl: './search-box.html',
})
export class SearchBox {
  protected value = signal('');

  protected searchGames(): void {
    alert(`Searching games based on: ${this.value()}`);
  }
}
