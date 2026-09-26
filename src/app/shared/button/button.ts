import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-button',
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
  public readonly disabled = input(false);
}
