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
  private readonly elementRef = inject(ElementRef);
  private readonly overlay = inject(Overlay);
  private readonly positionStrategyBuilder = inject(OverlayPositionBuilder);
  private readonly portal = viewChild.required(CdkPortal);
  private overlayRef: OverlayRef | null = null;

  public readonly name = input.required<string>();
  public readonly items = input.required<ListItem<T>[]>();
  public selectionChanged = output<T[]>();

  protected readonly isOpen = signal<boolean>(false);
  protected readonly selected = signal<T[]>([]);
  protected readonly nameLabel = computed<string>(() => {
    const len = this.selected().length;
    return len > 0
      ? `${len} ${this.name().toLowerCase()} selected`
      : `Select ${this.name().toLowerCase()}`;
  });

  protected onItemsChange(event: ListboxValueChangeEvent<T>): void {
    this.selected.set([...event.value]);
    this.selectionChanged.emit(this.selected());
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

  protected toggleOpen(): void {
    this.isOpen.update((open) => !open);
  }

  private closeOverlay(): void {
    this.overlayRef?.dispose();
    this.overlayRef = null;
    this.toggleOpen();
  }

  private readonly positionStrategy = this.positionStrategyBuilder
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
