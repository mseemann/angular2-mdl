import {
  Directive,
  Input,
  OnChanges,
  ElementRef,
  Renderer2,
  NgModule,
  ModuleWithProviders,
  SimpleChanges
} from '@angular/core';

@Directive({
  selector: '[mdl-badge]',
  host: {
    '[class.mdl-badge]': 'true'
  }
})
export class MdlBadgeDirective implements OnChanges {

  private el: HTMLElement;

  @Input('mdl-badge') public mdlBadgeContent: string;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    this.el = elementRef.nativeElement;
  }

  public ngOnChanges(changes: SimpleChanges) {
    this.renderer.setAttribute(this.el, 'data-badge', this.mdlBadgeContent);
  }

}

@Directive({
  selector: '[mdl-badge-overlap]',
  host: {
    '[class.mdl-badge--overlap]': 'true'
  }
})
export class MdlBadgeOverlapDirective {}

@Directive({
  selector: '[mdl-badge-no-background]',
  host: {
    '[class.mdl-badge--no-background]': 'true'
  }
})
export class MdlBadgeNoBackgroundDirective {}


const MDL_BADGE_DIRECTIVES = [MdlBadgeDirective, MdlBadgeOverlapDirective, MdlBadgeNoBackgroundDirective];

@NgModule({
  imports: [],
  exports: MDL_BADGE_DIRECTIVES,
  declarations: MDL_BADGE_DIRECTIVES,
})
export class MdlBadgeModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: MdlBadgeModule,
      providers: []
    };
  }
}
