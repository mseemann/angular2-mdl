import {Component, ContentChild, HostBinding, Input, ViewEncapsulation} from '@angular/core';
import {MdlTabPanelTitleComponent} from './mdl-tab-panel-title.component';

@Component({
  selector: 'mdl-tab-panel-content',
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None
})
export class MdlTabPanelContentComponent {

}

@Component({
  selector: 'mdl-tab-panel',
  template:
      `
    <ng-content *ngIf="titleComponent" select="mdl-tab-panel-content"></ng-content>
    <ng-content *ngIf="!titleComponent"></ng-content>
  `,
  encapsulation: ViewEncapsulation.None
})
export class MdlTabPanelComponent {

  @ContentChild(MdlTabPanelTitleComponent, {static: true}) public titleComponent;
  // eslint-disable-next-line
  @Input('mdl-tab-panel-title') title;
  // eslint-disable-next-line
  @Input('disabled') disabled;

  @HostBinding('class.mdl-tabs__panel') isTabPanel = true;
  @HostBinding('class.is-active') isActive = false;

}
