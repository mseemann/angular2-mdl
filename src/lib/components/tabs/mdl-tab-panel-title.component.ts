import {
  Component,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';


@Component({
  selector: 'mdl-tab-panel-title',
  template:
    `
   <ng-content></ng-content>
   `,
  encapsulation: ViewEncapsulation.None
})
export class MdlTabPanelTitleComponent {

  constructor(public vcRef: ViewContainerRef) {}

}
