import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ComponentRef, inject, Injectable, signal } from '@angular/core';
import { ToastComponent } from '../shared/toast-component/toast-component';

const ANIMATION_DURATION = 1000;

@Injectable({ providedIn: 'root' })
export class ToastService {
  private readonly overlay = inject(Overlay);

  private overlayRef?: OverlayRef;
  private timer?: ReturnType<typeof setTimeout>;
  private componentRef?: ComponentRef<ToastComponent>;

  public show(message: string, duration: number = 5000): void {
    this.disposeNow();

    this.overlayRef = this.overlay.create({
      positionStrategy: this.overlay.position().global().bottom('24px').left('24px'),
    });

    const portal = new ComponentPortal(ToastComponent);
    this.componentRef = this.overlayRef.attach(portal);
    this.componentRef.setInput('message', message);
    this.componentRef.instance.onClose.subscribe(() => {
      this.dismiss();
    });

    this.timer = setTimeout(() => this.dismiss(), duration);
  }

  private dismiss(): void {
    clearInterval(this.timer);
    this.componentRef?.instance.leaving.set(true); // spustí leave animaci
    this.timer = setTimeout(() => this.disposeNow(), ANIMATION_DURATION);
  }

  private disposeNow(): void {
    clearTimeout(this.timer);
    this.overlayRef?.dispose();
    this.overlayRef = undefined;
    this.componentRef = undefined;
  }
}
