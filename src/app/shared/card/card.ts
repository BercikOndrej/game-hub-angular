import { Component, Host, input, output } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-card',
  templateUrl: './card.html',
  styleUrl: './card.css',
  host: {
    '[class.clickable]': 'isClickable()',
    '[class.selected]': 'isSelected()',
    '(click)': 'handleClick()',
  },
})
export class Card {
  public hasHeader = input(false);
  public hasFooter = input(false);
  public isClickable = input(false);
  public isSelected = input(false);
  public cardClick = output();

  protected handleClick() {
    if (this.isClickable()) {
      this.cardClick.emit();
    }
  }
}
