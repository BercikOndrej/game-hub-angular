import { Component, computed, input, output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { ToastVariant } from '../../types/toast-item';

@Component({
  selector: 'app-toast-component',
  imports: [MatIcon],
  templateUrl: './toast-component.html',
  styleUrl: './toast-component.css',
  host: {
    '[class.toast--info]': "variant() === 'INFO'",
    '[class.toast--warning]': "variant() === 'WARNING'",
    '[class.toast--danger]': "variant() === 'DANGER'",
    '[class.toast--success]': "variant() === 'SUCCESS'",
    '[attr.role]': 'role()',
    '[attr.aria-live]': 'ariaLive()',
  },
})
export class ToastComponent {
  public readonly message = input.required<string>();
  public readonly variant = input.required<ToastVariant>();
  public dismiss = output<void>();

  protected readonly role = computed<'alert' | 'status'>(() =>
    this.variant() === 'DANGER' ? 'alert' : 'status',
  );
  protected readonly ariaLive = computed<'assertive' | 'polite'>(() =>
    this.variant() === 'DANGER' ? 'assertive' : 'polite',
  );
}
