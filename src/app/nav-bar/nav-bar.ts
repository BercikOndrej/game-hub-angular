import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Button } from '../shared/button/button';
import { SearchBox } from '../search-box/search-box';
import { ToastService } from '../services/toast.service';

@Component({
  imports: [MatIcon, Button, SearchBox],
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css',
})
export class NavBar {
  private readonly toastService = inject(ToastService);

  protected toggleTheme(): void {
    this.toastService.show('Theme should change, but it has no implementation right now.');
  }
}
