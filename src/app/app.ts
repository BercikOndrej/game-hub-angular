import { Component, signal } from '@angular/core';
import { NavBar } from './nav-bar/nav-bar';
import { GenresList } from './genres/genres-list/genres-list';

@Component({
  imports: [NavBar, GenresList],
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App {}
