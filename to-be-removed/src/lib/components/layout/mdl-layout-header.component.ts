import {
  Component,
  ElementRef,
  Renderer2,
  ViewEncapsulation,
  QueryList,
  Inject,
  forwardRef
} from '@angular/core';
import { MdlLayoutTabPanelComponent } from './mdl-layout-tab-panel.component';
import { MdlLayoutComponent } from './mdl-layout.component';


@Component({
  selector: 'mdl-layout-header',
  host: {
    '[class.mdl-layout__header]': 'true',
    '[class.is-casting-shadow]': 'mode==="standard" || isCompact',
    '[class.mdl-layout__header--seamed]': 'isSeamed',
    '[class.mdl-layout__header--waterfall]': 'mode==="waterfall"',
    '[class.mdl-layout__header--scroll]': 'mode==="scroll"',
    '[class.is-compact]' : 'isCompact',
    '(transitionend)': 'onTransitionEnd()',
    '(click)': 'onClick()'
  },
  template: `
     <ng-content></ng-content>
     <div *ngIf="tabs?.toArray()?.length > 0" class="mdl-layout__tab-bar-container">
         <div class="mdl-layout__tab-bar is-casting-shadow">
           <div *ngFor="let tab of tabs.toArray()" 
                class="mdl-layout__tab" 
                [ngClass]="{'is-active': tab.isActive}"
                (mouseover)="mdlLayout.onTabMouseover(tab)" 
                (mouseout)="mdlLayout.onTabMouseout(tab)">
              <div 
                *ngIf="tab.titleComponent" 
                (click)="mdlLayout.tabSelected(tab)"
                [mdl-ripple]="isRipple"
                [append-view-container-ref]="tab.titleComponent.vcRef"></div>
              <a *ngIf="!tab.titleComponent" 
                    href="javascript:void(0)"   
                    (click)="mdlLayout.tabSelected(tab)"
                    class="mdl-layout__tab" 
                    [ngClass]="{'is-active': tab.isActive}"
                    [mdl-ripple]="isRipple"
                   >{{tab.title}}</a>
             </div>
         </div>
     </div>
  `,
  encapsulation: ViewEncapsulation.None
})
export class MdlLayoutHeaderComponent {

  // set from MdlLayoutComponent
  public mode: string;
  public el: HTMLElement;
  public isCompact = false;
  public isAnimating = false;
  public isSeamed = false;
  public isRipple = true;

  // will be set from mdllayoutcomponent
  public tabs: QueryList<MdlLayoutTabPanelComponent>;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    @Inject(forwardRef(() => MdlLayoutComponent)) private mdlLayout: MdlLayoutComponent) {
    this.el = elementRef.nativeElement;
  }

  public onTransitionEnd() {
    this.isAnimating = false;
  }

  public onClick() {
    if (this.isCompact) {
      this.isCompact = false;
      this.isAnimating = true;
    }
  }
}
