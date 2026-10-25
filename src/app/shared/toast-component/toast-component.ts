import { Component, computed, input, output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { ToastVariant } from '../../types/toast-item';

@Component({
  selector: 'app-toast-component',
  imports: [MatIcon],
  templateUrl: './toast-component.html',
  styleUrl: './toast-component.css',
  host: {
    '[class.toast--info]': 'variant() === ToastVariant.Info',
    '[class.toast--warning]': 'variant() === ToastVariant.Warning',
    '[class.toast--danger]': 'variant() === ToastVariant.Danger',
    '[class.toast--success]': 'variant() === ToastVariant.Success',
    '[attr.role]': 'role()',
    '[attr.aria-live]': 'ariaLive()',
  },
})
export class ToastComponent {
  protected readonly ToastVariant = ToastVariant;

  public message = input.required<string>();
  public variant = input.required<ToastVariant>();
  public dismiss = output<void>();

  protected readonly role = computed<'alert' | 'status'>(() =>
    this.variant() === ToastVariant.Danger ? 'alert' : 'status',
  );
  protected readonly ariaLive = computed<'assertive' | 'polite'>(() =>
    this.variant() === ToastVariant.Danger ? 'assertive' : 'polite',
  );
}
