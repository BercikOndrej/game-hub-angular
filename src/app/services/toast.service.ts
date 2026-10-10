import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ComponentRef, inject, Service, signal } from '@angular/core';
import { ToastItem, ToastVariant } from '../types/toast-item';
import { ToastContainer } from '../shared/toast-container/toast-container';

@Service()
export class ToastService {
  private readonly overlay = inject(Overlay);

  private activeItems = signal<ToastItem[]>([]);

  private overlayRef?: OverlayRef;
  private componentRef?: ComponentRef<ToastContainer>;
  private timers = new Map<string, ReturnType<typeof setTimeout>>();

  public show(message: string, variant: ToastVariant, duration: number = 5000): void {
    const id = crypto.randomUUID();
    const newToast: ToastItem = {
      id: id,
      message: message,
      duration: duration,
      variant: variant,
    };

    this.activeItems.update((prev) => [...prev, newToast]);

    this.attachContainer();

    this.timers?.set(
      id,
      setTimeout(() => this.dismiss(id), duration),
    );
    this.componentRef?.setInput('items', this.activeItems());
  }

  public dismiss(id: string): void {
    const timeout = this.timers?.get(id);
    if (!timeout) {
      return;
    }

    clearTimeout(timeout);
    this.timers.delete(id);
    this.activeItems.update((prev) => prev.filter((item) => item.id !== id));
    this.componentRef?.setInput('items', this.activeItems());

    if (this.activeItems().length === 0) {
      setTimeout(() => {
        if (this.activeItems().length > 0) {
          return;
        }
        this.overlayRef?.dispose();
        this.overlayRef = undefined;
        this.componentRef = undefined;
      }, 1000);
    }
  }

  private attachContainer() {
    if (this.overlayRef) {
      return;
    }

    this.overlayRef = this.overlay.create({
      positionStrategy: this.overlay.position().global().bottom('24px').left('24px'),
    });

    const portal = new ComponentPortal(ToastContainer);
    this.componentRef = this.overlayRef.attach(portal);
  }
}
