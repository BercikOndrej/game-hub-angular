import { Component, computed, input, Signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

type StarState = 'star' | 'star_half' | 'star_border';

@Component({
  imports: [MatIcon],
  selector: 'app-rating-stars',
  templateUrl: './rating-stars.html',
  styleUrl: './rating-stars.css',
  host: { class: 'flex p-2 items-center justify-center' },
})
export class RatingStars {
  public rating = input.required<number, number>({
    transform: (n: number) => Math.floor(n * 2) / 2,
  });

  private readonly startsCount = 5;

  protected starRating: Signal<StarState[] | undefined> = computed<StarState[] | undefined>(() => {
    if (this.rating() > 5 || this.rating() < 0) {
      return undefined;
    }

    let rating = this.rating();
    let starStates: StarState[] = [];
    for (let i = 0; i < this.startsCount; i++) {
      if (rating >= 1) {
        rating--;
        starStates.push('star');
        continue;
      } else if (rating >= 0.5) {
        rating -= 0.5;
        starStates.push('star_half');
        continue;
      } else {
        starStates.push('star_border');
      }
    }
    return starStates;
  });
}
