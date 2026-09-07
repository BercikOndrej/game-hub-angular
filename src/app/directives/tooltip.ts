import { Directive, ElementRef, inject, input, OnDestroy } from '@angular/core';
import { Overlay, OverlayRef, OverlayPositionBuilder } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { TooltipComponent } from '../shared/tooltip-component/tooltip-component';

@Directive({
  selector: '[appTooltip]',
  host: {
    '(mouseenter)': 'onEnter()',
    '(mouseleave)': 'onLeave()',
  },
})
export class Tooltip implements OnDestroy {
  public text = input.required<string>({ alias: 'appTooltip' });

  private overlay = inject(Overlay);
  private positionBuilder = inject(OverlayPositionBuilder);
  private elRef = inject(ElementRef);
  private overlayRef: OverlayRef | null = null;

  public onEnter() {
    // This is a array of position
    // if it is impossible create overlay in that postion (overlay outside of screen)
    // next position is used
    const positionStrategy = this.positionBuilder.flexibleConnectedTo(this.elRef).withPositions([
      {
        originX: 'center',
        originY: 'top',
        overlayX: 'center',
        overlayY: 'bottom',
        offsetY: -8,
        offsetX: -15,
      },
    ]);

    this.overlayRef = this.overlay.create({
      positionStrategy: positionStrategy,
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
