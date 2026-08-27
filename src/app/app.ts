import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBar } from './nav-bar/nav-bar';

@Component({
  imports: [RouterOutlet, NavBar],
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App {}
