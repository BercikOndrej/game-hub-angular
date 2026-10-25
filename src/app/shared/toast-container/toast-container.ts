import { Component, inject, input } from '@angular/core';
import { ToastService } from '../../services/toast.service';
import { ToastItem } from '../../types/toast-item';
import { ToastComponent } from '../toast-component/toast-component';

@Component({
  selector: 'app-toast-container',
  imports: [ToastComponent],
  templateUrl: './toast-container.html',
  styleUrl: './toast-container.css',
})
export class ToastContainer {
  private readonly toastService = inject(ToastService);
  public readonly items = input.required<ToastItem[]>();

  protected deleteToast(id: string): void {
    this.toastService.dismiss(id);
  }
}
