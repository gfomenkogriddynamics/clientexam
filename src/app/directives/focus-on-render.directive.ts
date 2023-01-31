import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appFocusOnRender]'
})
export class FocusOnRenderDirective {
  constructor(private elementRef: ElementRef) {
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.focus();
  }
}
