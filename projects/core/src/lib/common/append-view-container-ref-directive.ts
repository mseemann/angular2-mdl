import {AfterViewInit, Directive, Input, Renderer2, ViewContainerRef} from '@angular/core';

@Directive({
  // eslint-disable-next-line
  selector: '[append-view-container-ref]'
})
export class AppendViewContainerRefDirective implements AfterViewInit {

  @Input('append-view-container-ref') public viewContainerRefToAppend: ViewContainerRef;

  constructor(private viewRef: ViewContainerRef, private renderer: Renderer2) {
  }

  public ngAfterViewInit() {
    this.renderer.appendChild(
      this.viewRef.element.nativeElement,
      this.viewContainerRefToAppend.element.nativeElement
    );
  }
}
