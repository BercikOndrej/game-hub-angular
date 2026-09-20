import { Directive, ElementRef, inject, input, OnDestroy } from '@angular/core';
import {
  ConnectedPosition,
  Overlay,
  OverlayRef,
  OverlayPositionBuilder,
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { TooltipComponent } from './tooltip-component';

@Directive({
  selector: '[appTooltip]',
  host: {
    '(mouseenter)': 'onEnter()',
    '(mouseleave)': 'onLeave()',
  },
})
export class Tooltip implements OnDestroy {
  public text = input.required<string | null>({ alias: 'appTooltip' });
  public disabled = input<boolean>(false, { alias: 'appTooltipDisable' });

  private overlay = inject(Overlay);
  private positionBuilder = inject(OverlayPositionBuilder);
  private elRef = inject(ElementRef);
  private overlayRef: OverlayRef | null = null;

  private readonly positions: ConnectedPosition[] = [
    {
      originX: 'center',
      originY: 'top',
      overlayX: 'center',
      overlayY: 'bottom',
      offsetY: -8,
      offsetX: -15,
    },
    {
      originX: 'center',
      originY: 'bottom',
      overlayX: 'center',
      overlayY: 'top',
      offsetY: -8,
      offsetX: -15,
    },
  ];

  public onEnter() {
    const inputText = this.text();
    const isDisabled = this.disabled();
    if (inputText == null || inputText.length === 0 || isDisabled) {
      return;
    }

    const positionStrategy = this.positionBuilder
      .flexibleConnectedTo(this.elRef)
      .withPositions(this.positions);

    this.overlayRef = this.overlay.create({
      positionStrategy: positionStrategy,
      panelClass: 'tooltip-container',
    });

    const portal = new ComponentPortal(TooltipComponent);

    const componentRef = this.overlayRef.attach(portal);
    componentRef.setInput('text', this.text());
  }

  public onLeave() {
    this.overlayRef?.dispose();
    this.overlayRef = null;
  }

  ngOnDestroy(): void {
    this.overlayRef?.dispose();
  }
}
