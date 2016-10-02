import {
  Directive,
  ViewContainerRef,
  Renderer,
  Input,
  AfterViewInit
} from '@angular/core';

@Directive({
  selector: '[append-view-container-ref]'
})
export class AppendViewContainerRefDirective implements AfterViewInit {

  @Input('append-view-container-ref') public viewContainerRefToAppend: ViewContainerRef;

  constructor(private viewRef: ViewContainerRef, private renderer: Renderer) {
  }

  public ngAfterViewInit() {
    this.renderer.projectNodes(
      this.viewRef.element.nativeElement,
      [this.viewContainerRefToAppend.element.nativeElement]
    );
  }
}
