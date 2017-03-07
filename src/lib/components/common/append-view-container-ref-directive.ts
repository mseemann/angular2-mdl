import {
  Directive,
  ViewContainerRef,
  RendererV2,
  Input,
  AfterViewInit
} from '@angular/core';

@Directive({
  selector: '[append-view-container-ref]'
})
export class AppendViewContainerRefDirective implements AfterViewInit {

  @Input('append-view-container-ref') public viewContainerRefToAppend: ViewContainerRef;

  constructor(private viewRef: ViewContainerRef, private renderer: RendererV2) {
  }

  public ngAfterViewInit() {
    this.renderer.appendChild(
      this.viewRef.element.nativeElement,
      this.viewContainerRefToAppend.element.nativeElement
    );
  }
}
