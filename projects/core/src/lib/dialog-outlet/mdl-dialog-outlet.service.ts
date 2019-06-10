import {
  ApplicationRef,
  ComponentFactoryResolver,
  EventEmitter,
  Injectable,
  NgZone,
  ViewContainerRef
} from '@angular/core';
import {MdlDialogOutletComponent} from './mdl-dialog-outlet.component';
import {MdlBackdropOverlayComponent} from './mdl-backdrop-overlay.component';
import {take} from 'rxjs/operators';


@Injectable()
export class MdlDialogOutletService {

  public backdropClickEmitter: EventEmitter<any> = new EventEmitter();
  private viewContainerRefInternal: ViewContainerRef;
  private backdropComponent: MdlBackdropOverlayComponent;

  constructor(
    private appRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    ngZone: NgZone) {

    let dialogOutletCompRef = null;
    ngZone.onStable.pipe(take(1)).subscribe(() => {
      try {
        dialogOutletCompRef = this.appRef.bootstrap(MdlDialogOutletComponent);
      } catch (e) {
        // the user did not use the dialog.outlet element outside of his root app.
        // console.log(e);
      }
      if (dialogOutletCompRef) {
        this.setViewContainerRef(dialogOutletCompRef.instance.viewContainerRef);
      }
    });
  }

  public get viewContainerRef(): ViewContainerRef {
    return this.viewContainerRefInternal;
  }

  public setDefaultViewContainerRef(vCRef: ViewContainerRef) {
    this.setViewContainerRef(vCRef);
  }

  public hideBackdrop() {
    this.backdropComponent.hide();
  }

  public showBackdropWithZIndex(zIndex: number) {
    this.backdropComponent.showWithZIndex(zIndex);
  }

  private setViewContainerRef(value: ViewContainerRef) {
    this.viewContainerRefInternal = value;

    if (this.viewContainerRefInternal) {
      const cFactory = this.componentFactoryResolver.resolveComponentFactory(MdlBackdropOverlayComponent);
      this.backdropComponent = this.viewContainerRefInternal.createComponent(cFactory).instance;
      this.backdropComponent.clickEmitter.subscribe(() => {
        this.backdropClickEmitter.emit();
      });
    }
  }
}
