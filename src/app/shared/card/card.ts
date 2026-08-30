import { Component, input, output } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-card',
  templateUrl: './card.html',
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
