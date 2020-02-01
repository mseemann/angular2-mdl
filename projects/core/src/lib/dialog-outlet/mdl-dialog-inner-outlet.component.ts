// the component is used inside the app-root. this is possible because this component
// is exported from the module
import {Component, forwardRef, Inject, ViewContainerRef} from '@angular/core';
import {MdlDialogOutletService} from './mdl-dialog-outlet.service';

@Component({
  // tslint:disable-next-line
  selector: 'dialog-outlet',
  template: ''
})
export class MdlDialogInnerOutletComponent {

  constructor(
    private vCRef: ViewContainerRef,
    @Inject(forwardRef(() => MdlDialogOutletService)) service) {

    (service as MdlDialogOutletService).setDefaultViewContainerRef(vCRef);
  }
}
