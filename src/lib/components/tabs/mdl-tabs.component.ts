import {
  Component,
  ContentChildren,
  QueryList,
  AfterContentInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { toBoolean } from '../common/boolean-property';
import { toNumber } from '../common/number.property';
import { MdlTabPanelComponent } from './mdl-tab-panel.component';

@Component({
  selector: 'mdl-tabs',
  host: {
    '[class.mdl-tabs]': 'true',
    '[class.is-upgraded]': 'true'
  },
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

  private _selectedIndex: number = 0;
  @Input('mdl-tab-active-index')
  get selectedIndex() { return this._selectedIndex; }
  set selectedIndex(value) { this._selectedIndex = toNumber(value); }

  private _isRipple = false;
  @Input('mdl-ripple')
  get isRipple() { return this._isRipple; }
  set isRipple(value) { this._isRipple = toBoolean(value); }

  @Output('mdl-tab-active-changed') public selectedTabEmitter = new EventEmitter();

  @ContentChildren(MdlTabPanelComponent) public tabs: QueryList<MdlTabPanelComponent>;

  public ngAfterContentInit() {
    // the initial tabs
    this.updateSelectedTabIndex();
    // listen to tab changes - this would not be necessary if this would be fixed:
    // https://github.com/angular/angular/issues/12818
    this.tabs.changes.subscribe( () => {
      this.updateSelectedTabIndex();
    });
  }

  public ngOnChanges(changes: SimpleChanges): any {
    if ( changes['selectedIndex'] ) {
      this.updateSelectedTabIndex();
    }
  }

  private updateSelectedTabIndex() {
    if ( this.tabs ) {
      // https://github.com/angular/angular/issues/6005
      // this would not be necessare if this would be fixed: https://github.com/angular/angular/issues/12818
      setTimeout( () => {
        this.tabs.forEach( (tab, idx) => {
          tab.isActive = this.selectedIndex === idx;
        });
      }, 1);
    }
  }

  public tabSelected(tab: MdlTabPanelComponent) {
    if (tab.disabled) {
      return;
    }

    let index = this.tabs.toArray().indexOf(tab);
    if (index != this.selectedIndex) {
      this.selectedIndex = index;
      this.updateSelectedTabIndex();
      this.selectedTabEmitter.emit({index: this.selectedIndex});
    }
  }
}
