import { ViewContainerRef, Injectable, ApplicationRef, ComponentFactoryResolver, EventEmitter } from '@angular/core';
import { MdlDialogOutletComponent } from './mdl-dialog-outlet.component';
import { MdlBackdropOverlayComponent } from './mdl-backdrop-overlay.component';


@Injectable()
export class MdlDialogOutletService {

  private viewContainerRef_: ViewContainerRef;
  private backdropComponent: MdlBackdropOverlayComponent;

  public backdropClickEmitter: EventEmitter<any> = new EventEmitter();

  constructor(
    private appRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver) {
    let dialogOutletCompRef = null;
    try {
      dialogOutletCompRef = this.appRef.bootstrap(MdlDialogOutletComponent);
    } catch (e) {
      // the user did not use the dialog.outlet element outside of his root app.
    }
    if (dialogOutletCompRef) {
      this.setViewContainerRef(dialogOutletCompRef.instance.viewContainerRef);
    }
  }

  public setDefaultViewContainerRef(vCRef: ViewContainerRef) {
    this.setViewContainerRef(vCRef);
  }

  public get viewContainerRef(): ViewContainerRef {
    return this.viewContainerRef_;
  }

  private setViewContainerRef(value: ViewContainerRef) {
    this.viewContainerRef_ = value;

    if (this.viewContainerRef_) {
      let cFactory = this.componentFactoryResolver.resolveComponentFactory(MdlBackdropOverlayComponent);
      this.backdropComponent = this.viewContainerRef_.createComponent(cFactory).instance;
      this.backdropComponent.clickEmitter.subscribe( () => {
        this.backdropClickEmitter.emit();
      })
    }
  }

  public hideBackdrop() {
    this.backdropComponent.hide();
  }

  public showBackdropWithZIndex(zIndex: number) {
    this.backdropComponent.showWithZIndex(zIndex);
  }
}
