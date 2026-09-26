import { afterNextRender, DestroyRef, Directive, ElementRef, inject, output } from '@angular/core';

@Directive({
  selector: '[appInfiniteScrolling]',
})
export class InfiniteScrollingDirective {
  private elRef = inject(ElementRef);
  private destroyRef = inject(DestroyRef);

  public scrollToEnd = output<void>();

  private observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        this.scrollToEnd.emit();
      }
    },
    {
      rootMargin: '300px',
    },
  );

  constructor() {
    afterNextRender(() => this.observer.observe(this.elRef.nativeElement));
    this.destroyRef.onDestroy(() => this.observer.disconnect());
  }
}
