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
  public readonly isClickable = input(false);
  public readonly isSelected = input(false);
  public cardClick = output();

  protected readonly headerContent = contentChild<ElementRef<HTMLElement>>('.header');
  protected readonly hasHeader = computed<boolean>(() => this.headerContent != undefined);

  protected readonly footerContent = contentChild<ElementRef<HTMLElement>>('.footer');
  protected readonly hasFooter = computed<boolean>(() => this.footerContent != undefined);

  protected handleClick(): void {
    if (this.isClickable()) {
      this.cardClick.emit();
    }
  }
}
