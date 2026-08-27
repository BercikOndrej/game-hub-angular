import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Button } from '../shared/button/button';
import { SearchBar } from '../search-bar/search-bar';

@Component({
  imports: [MatIcon, Button, SearchBar],
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.html',
})
export class NavBar {
  protected toggleTheme(): void {
    alert('Color theme of the app has been changed.');
  }
}
