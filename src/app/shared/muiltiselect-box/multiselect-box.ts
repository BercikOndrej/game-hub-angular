import { CdkListbox, CdkOption, ListboxValueChangeEvent } from '@angular/cdk/listbox';
import { Overlay, OverlayPositionBuilder, OverlayRef } from '@angular/cdk/overlay';
import { CdkPortal } from '@angular/cdk/portal';
import {
  Component,
  computed,
  ElementRef,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { faSolidCheck, faSolidChevronDown, faSolidChevronUp } from '@ng-icons/font-awesome/solid';
import { Button } from '../button/button';

export interface ListItem<TId extends string | number> {
  id: TId;
  name: string;
}

@Component({
  imports: [NgIcon, CdkListbox, CdkOption, CdkPortal, Button],
  selector: 'app-multiselect-box',
  styleUrl: './multiselect-box.css',
  templateUrl: './multiselect-box.html',
  providers: [provideIcons({ faSolidChevronDown, faSolidChevronUp, faSolidCheck })],
})
export class MultiselectBox<T extends string | number> {
  private elementRef = inject(ElementRef);
  private overlay = inject(Overlay);
  private positionStrategyBuilder = inject(OverlayPositionBuilder);
  private portal = viewChild.required(CdkPortal);
  private overlayRef: OverlayRef | null = null;

  public name = input.required<string>();
  public items = input.required<ListItem<T>[]>();
  public onSelectionChange = output<T[]>();

  protected isOpen = signal<boolean>(false);
  protected selected = signal<T[]>([]);
  protected nameLabel = computed<string>(() => {
    const len = this.selected().length;
    return len > 0
      ? `${len} ${this.name().toLowerCase()} selected`
      : `Select ${this.name().toLowerCase()}`;
  });

  protected onItemsChange(event: ListboxValueChangeEvent<T>): void {
    this.selected.set([...event.value]);
    this.onSelectionChange.emit(this.selected());
  }

  protected onOpen(): void {
    if (this.isOpen()) {
      this.closeOverlay();
      return;
    }

    this.toggleOpen();
    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      positionStrategy: this.positionStrategy,
    });
    this.overlayRef.backdropClick().subscribe(() => this.closeOverlay());
    this.overlayRef.attach(this.portal());
  }

  protected toggleOpen() {
    this.isOpen.update((open) => !open);
  }

  private closeOverlay() {
    this.overlayRef?.dispose();
    this.overlayRef = null;
    this.toggleOpen();
  }

  private positionStrategy = this.positionStrategyBuilder
    .flexibleConnectedTo(this.elementRef)
    .withPositions([
      {
        originX: 'center',
        originY: 'bottom',
        overlayX: 'center',
        overlayY: 'top',
        offsetY: 15,
      },
      {
        originX: 'center',
        originY: 'top',
        overlayX: 'center',
        overlayY: 'bottom',
        offsetY: -15,
      },
    ]);
}
