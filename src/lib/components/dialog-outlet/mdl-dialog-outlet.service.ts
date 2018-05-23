import {
  ViewContainerRef,
  Injectable,
  ApplicationRef,
  ComponentFactoryResolver,
  EventEmitter,
  NgZone,
} from '@angular/core';
import { MdlDialogOutletComponent } from './mdl-dialog-outlet.component';
import { MdlBackdropOverlayComponent } from './mdl-backdrop-overlay.component';
import { take } from 'rxjs/operators';

@Injectable()
export class MdlDialogOutletService {
  private _viewContainerRef: ViewContainerRef;
  private backdropComponent: MdlBackdropOverlayComponent;

  public backdropClickEmitter: EventEmitter<any> = new EventEmitter();

  constructor(
    private appRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    ngZone: NgZone,
  ) {
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

  public setDefaultViewContainerRef(vCRef: ViewContainerRef) {
    this.setViewContainerRef(vCRef);
  }

  public get viewContainerRef(): ViewContainerRef {
    return this._viewContainerRef;
  }

  private setViewContainerRef(value: ViewContainerRef) {
    this._viewContainerRef = value;

    if (this._viewContainerRef) {
      let cFactory = this.componentFactoryResolver.resolveComponentFactory(
        MdlBackdropOverlayComponent,
      );
      this.backdropComponent = this._viewContainerRef.createComponent(cFactory).instance;
      this.backdropComponent.clickEmitter.subscribe(() => {
        this.backdropClickEmitter.emit();
      });
    }
  }

  public hideBackdrop() {
    this.backdropComponent.hide();
  }

  public showBackdropWithZIndex(zIndex: number) {
    this.backdropComponent.showWithZIndex(zIndex);
  }
}
