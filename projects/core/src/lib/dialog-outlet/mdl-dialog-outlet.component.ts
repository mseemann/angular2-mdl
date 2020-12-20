import {Component, ViewContainerRef} from '@angular/core';


// the componnet is used outside the app-root. injecting MdlDialogService would not work
// this component is not exported - needs to be instanciated by
//    let x = this.appRef.bootstrap(MdlDialogOutletComponent);
@Component({
  // eslint-disable-next-line
  selector: 'dialog-outlet',
  template: ''
})
export class MdlDialogOutletComponent {

  constructor(public readonly vCRef: ViewContainerRef) {
  }

  get viewContainerRef(): ViewContainerRef {
    return this.vCRef;
  }
}

