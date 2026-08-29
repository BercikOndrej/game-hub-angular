import { Component, input, output } from '@angular/core';
import { Genre } from '../../types/Games';

@Component({
  imports: [],
  selector: 'app-genre-card',
  templateUrl: './genre-card.html',
})
export class GenreCard {
  public genre = input.required<Genre>();
  public isSelected = input.required<boolean>();
  public onSelect = output<number>();
}
