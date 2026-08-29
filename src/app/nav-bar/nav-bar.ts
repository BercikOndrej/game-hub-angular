import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Button } from '../shared/button/button';
import { SearchBox } from '../search-box/search-box';

@Component({
  imports: [MatIcon, Button, SearchBox],
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.html',
})
export class NavBar {
  protected toggleTheme(): void {
    alert('Color theme of the app has been changed.');
  }
}
