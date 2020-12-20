import {
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  QueryList,
  ViewEncapsulation,
} from "@angular/core";
import { MdlLayoutTabPanelComponent } from "./mdl-layout-tab-panel.component";
import { MdlLayoutMediatorService } from "./mdl-layout-mediator.service";

@Component({
  selector: "mdl-layout-header",
  template: `
    <ng-content></ng-content>
    <div
      *ngIf="tabs?.toArray()?.length > 0"
      class="mdl-layout__tab-bar-container"
    >
      <div class="mdl-layout__tab-bar is-casting-shadow">
        <div
          *ngFor="let tab of tabs.toArray()"
          class="mdl-layout__tab"
          [ngClass]="{ 'is-active': tab.isActive }"
          (mouseover)="onTabMouseover(tab)"
          (mouseout)="onTabMouseout(tab)"
        >
          <div
            *ngIf="tab.titleComponent"
            (click)="tabSelected(tab)"
            [mdl-ripple]="isRipple"
            [append-view-container-ref]="tab.titleComponent.vcRef"
          ></div>
          <a
            *ngIf="!tab.titleComponent"
            href="javascript:void(0)"
            (click)="tabSelected(tab)"
            class="mdl-layout__tab"
            [ngClass]="{ 'is-active': tab.isActive }"
            [mdl-ripple]="isRipple"
            >{{ tab.title }}</a
          >
        </div>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class MdlLayoutHeaderComponent {
  @HostBinding("class.mdl-layout__header--seamed")
  isSeamed = false;
  @HostBinding("class.mdl-layout__header")
  isLayoutHeader = true;
  @HostBinding("class.is-compact")
  isCompact = false;

  isAnimating = false;

  isRipple = true;
  // set from MdlLayoutComponent
  mode: string;
  el: HTMLElement;

  // will be set from mdllayoutcomponent
  tabs: QueryList<MdlLayoutTabPanelComponent>;

  constructor(
    private elementRef: ElementRef,
    private layoutMediatorService: MdlLayoutMediatorService
  ) {
    this.el = elementRef.nativeElement;
  }

  @HostBinding("class.mdl-layout__header--waterfall")
  get isWaterfall(): boolean {
    return this.mode === "waterfall";
  }

  @HostBinding("class.is-casting-shadow") get isCastingShadow(): boolean {
    return this.mode === "standard" || this.isCompact;
  }

  @HostBinding("class.mdl-layout__header--scroll")
  get isHeaderScroll(): boolean {
    return this.mode === "scroll";
  }

  @HostListener("transitionend")
  onTransitionEnd(): void {
    this.isAnimating = false;
  }

  @HostListener("click")
  onClick(): void {
    if (this.isCompact) {
      this.isCompact = false;
      this.isAnimating = true;
    }
  }

  onTabMouseover(tab: MdlLayoutTabPanelComponent): void {
    this.layoutMediatorService.tabMouseover(tab);
  }

  onTabMouseout(tab: MdlLayoutTabPanelComponent): void {
    this.layoutMediatorService.tabMouseout(tab);
  }

  tabSelected(tab: MdlLayoutTabPanelComponent): void {
    this.layoutMediatorService.tabSelected(tab);
  }
}
