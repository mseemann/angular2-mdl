import { Component, ViewContainerRef, forwardRef, Inject } from '@angular/core';

import { MdlDialogOutletService } from './mdl-dialog-outlet.service';


// the componnet is used outside the app-root. injecting MdlDialogService would not work
// this component is not exported - needs to be instanciated by
//    let x = this.appRef.bootstrap(MdlDialogOutletComponent);
@Component({
  selector: 'dialog-outlet',
  template: ''
})
export class MdlDialogOutletComponent {

  constructor(private vCRef: ViewContainerRef) {}

  public get viewContainerRef() {
    return this.vCRef;
  }
}

// the component is used inside the app-root. this is possible because this component
// is exported from the module
@Component({
  selector: 'dialog-outlet',
  template: ''
})
export class MdlDialogInnerOutletComponent {

  constructor(
    private vCRef: ViewContainerRef,
    @Inject( forwardRef( () => MdlDialogOutletService)) service: MdlDialogOutletService) {
    service.setDefaultViewContainerRef(vCRef);
  }
}
