import {
  AfterContentInit,
  Component,
  ContentChildren,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  Output,
  QueryList,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';

import {MdlTabPanelComponent} from './mdl-tab-panel.component';
import {toNumber} from '../common/number.property';
import {toBoolean} from '../common/boolean-property';

@Component({
  selector: 'mdl-tabs',
  template:
      `
    <div class="mdl-tabs__tab-bar">
      <div *ngFor="let tab of tabs.toArray()">
        <div
          *ngIf="tab.titleComponent"
          class="mdl-tabs__tab"
          (click)="tabSelected(tab)"
          [mdl-ripple]="isRipple && !tab.disabled"
          [ngClass]="{'is-active': tab.isActive, 'disabled': tab.disabled}"
          [append-view-container-ref]="tab.titleComponent.vcRef"></div>
        <a *ngIf="!tab.titleComponent" href="javascript:void(0)"
           (click)="tabSelected(tab)"
           class="mdl-tabs__tab"
           [mdl-ripple]="isRipple && !tab.disabled"
           [ngClass]="{'is-active': tab.isActive, 'disabled': tab.disabled}">{{tab.title}}</a>
      </div>
    </div>
    <ng-content></ng-content>
  `,
  encapsulation: ViewEncapsulation.None
})
export class MdlTabsComponent implements AfterContentInit, OnChanges {

  // eslint-disable-next-line
  @Output('mdl-tab-active-changed') public selectedTabEmitter = new EventEmitter();
  @ContentChildren(MdlTabPanelComponent) public tabs: QueryList<MdlTabPanelComponent>;

  @HostBinding('class.mdl-tabs') isTabs = true;
  @HostBinding('class.is-upgraded') isUpgraded = true;

  private selectedIndexIntern = 0;
  private isRippleIntern = false;

  @Input('mdl-tab-active-index')
  get selectedIndex() {
    return this.selectedIndexIntern;
  }

  set selectedIndex(value) {
    this.selectedIndexIntern = toNumber(value);
  }

  @Input('mdl-ripple')
  get isRipple() {
    return this.isRippleIntern;
  }

  set isRipple(value) {
    this.isRippleIntern = toBoolean(value);
  }

  public ngAfterContentInit() {
    // the initial tabs
    this.updateSelectedTabIndex();
    // listen to tab changes - this would not be necessary if this would be fixed:
    // https://github.com/angular/angular/issues/12818
    this.tabs.changes.subscribe(() => {
      this.updateSelectedTabIndex();
    });
  }

  public ngOnChanges(changes: SimpleChanges): any {
    if (changes.selectedIndex) {
      this.updateSelectedTabIndex();
    }
  }

  public tabSelected(tab: MdlTabPanelComponent) {
    if (tab.disabled) {
      return;
    }

    const index = this.tabs.toArray().indexOf(tab);
    if (index !== this.selectedIndex) {
      this.selectedIndex = index;
      this.updateSelectedTabIndex();
      this.selectedTabEmitter.emit({index: this.selectedIndex});
    }
  }

  private updateSelectedTabIndex() {
    if (this.tabs) {
      // https://github.com/angular/angular/issues/6005
      // this would not be necessare if this would be fixed: https://github.com/angular/angular/issues/12818
      setTimeout(() => {
        this.tabs.forEach((tab, idx) => {
          tab.isActive = this.selectedIndex === idx;
        });
      }, 1);
    }
  }
}
