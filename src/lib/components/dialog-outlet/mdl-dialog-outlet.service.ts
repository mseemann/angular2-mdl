import { ViewContainerRef, Injectable, ApplicationRef } from '@angular/core';
import { MdlDialogOutletComponent } from './mdl-dialog-outlet.component';


@Injectable()
export class MdlDialogOutletService {

  private viewContainerRef: ViewContainerRef;


  constructor(private appRef: ApplicationRef) {
    try {
      let dialogOutletCompRef = this.appRef.bootstrap(MdlDialogOutletComponent);
      this.viewContainerRef = dialogOutletCompRef.instance.viewContainerRef;
    } catch ( e) {
    }


    //
    // // check, of the component is already present
    // this.appRef.components.forEach( (comp) => {
    //   console.log(comp.instance);
    //   console.log(comp.instance instanceof MdlDialogOutletComponent);
    // })


  }

  public setDefaultViewContainerRef(vCRef: ViewContainerRef) {
    this.viewContainerRef = vCRef;
  }


  public getViewContainerRef(){
    return this.viewContainerRef;
  }
}
