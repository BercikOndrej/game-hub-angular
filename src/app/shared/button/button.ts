import { Component, input } from '@angular/core';

export type ButtonPopupKind = 'listbox' | 'menu' | 'dialog';

@Component({
  imports: [],
  selector: 'app-button',
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
  public readonly disabled = input<boolean>(false);
  public readonly ariaHasPopup = input<ButtonPopupKind | null>(null);
  public readonly ariaExpanded = input<boolean | null>(null);
}
