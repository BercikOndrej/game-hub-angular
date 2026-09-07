import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-tooltip-component',
  templateUrl: './tooltip-component.html',
})
export class TooltipComponent {
  public text = input<string>('');
}
