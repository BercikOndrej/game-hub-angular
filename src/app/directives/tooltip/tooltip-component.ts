import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-tooltip-component',
  template: `<span>{{ text() }}</span> `,
})
export class TooltipComponent {
  public text = input<string>('');
}
