import { afterNextRender, DestroyRef, Directive, ElementRef, inject, output } from '@angular/core';

@Directive({
  selector: '[appInfiniteScrolling]',
})
export class InfiniteScrollingDirective {
  private readonly elRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);

  public scrollToEnd = output<void>();

  private readonly observer = new IntersectionObserver(
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
