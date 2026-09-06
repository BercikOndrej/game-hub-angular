import { Component, Host, input, output } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-card',
  templateUrl: './card.html',
  host: {
    class:
      'group h-full flex flex-col rounded-2xl space-y-2 transform duration-300 overflow-hidden',
    '[class.hover:cursor-pointer]': 'isClickable()',
    '[class.hover:bg-gray-400]': 'isClickable()',
    '[class.bg-gray-400]': 'isSelected()',
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
