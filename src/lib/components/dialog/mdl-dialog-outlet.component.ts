import { Component, ViewContainerRef, forwardRef, Inject } from '@angular/core';
import { MdlDialogService } from './mdl-dialog.service';


// the componnet is used outside the app-root. injecting MdlDialogService would not work
// this component is not exported - needs to be instanciated by
//    let x = this.appRef.bootstrap(MdlDialogOutletComponent);
@Component({
  selector: 'dialog-outlet',
  host: {
    '[class.dialog-outlet]': 'true',
  },
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
  host: {
    '[class.dialog-outlet]': 'true',
  },
  template: ''
})
export class MdlDialogInnerOutletComponent {

  constructor(
    private vCRef: ViewContainerRef,
    @Inject( forwardRef( () => MdlDialogService)) service: MdlDialogService) {

    service.setDefaultViewContainerRef(vCRef);
    // this.service.internaleDialogOutletPresent(this.vCref);
  }
}
