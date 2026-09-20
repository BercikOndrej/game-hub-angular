import { Component, computed, contentChild, ElementRef, input, output } from '@angular/core';

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
  public isClickable = input(false);
  public isSelected = input(false);
  public cardClick = output();

  protected headerContent = contentChild<ElementRef<HTMLElement>>('.header');
  protected hasHeader = computed<boolean>(() => this.headerContent != undefined);

  protected footerContent = contentChild<ElementRef<HTMLElement>>('.footer');
  protected hasFooter = computed<boolean>(() => this.footerContent != undefined);

  protected handleClick() {
    if (this.isClickable()) {
      this.cardClick.emit();
    }
  }
}
