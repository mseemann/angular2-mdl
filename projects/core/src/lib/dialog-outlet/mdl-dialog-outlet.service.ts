import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  EventEmitter,
  Injectable,
  ViewContainerRef,
} from "@angular/core";
import { MdlBackdropOverlayComponent } from "./mdl-backdrop-overlay.component";
import { filter, take } from "rxjs/operators";
import { MdlDialogOutletComponent } from "./mdl-dialog-outlet.component";

@Injectable({
  providedIn: "root",
})
export class MdlDialogOutletService {
  backdropClickEmitter: EventEmitter<void> = new EventEmitter();

  private viewContainerRefInternal: ViewContainerRef | null = null;
  private backdropComponent: MdlBackdropOverlayComponent;

  constructor(
    private appRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    let dialogOutletCompRef: ComponentRef<MdlDialogOutletComponent> = null;
    appRef.isStable
      .pipe(
        take(1),
        filter(() => this.viewContainerRefInternal == null)
      )
      .subscribe(() => {
        try {
          dialogOutletCompRef = this.appRef.bootstrap(MdlDialogOutletComponent);
        } catch (e) {
          // the user did not use the dialog.outlet element outside of his root app.
          // console.log(e);
        }
        if (dialogOutletCompRef) {
          this.setViewContainerRef(
            dialogOutletCompRef.instance.viewContainerRef
          );
        }
      });
  }

  get viewContainerRef(): ViewContainerRef {
    return this.viewContainerRefInternal;
  }

  setDefaultViewContainerRef(vCRef: ViewContainerRef): void {
    this.setViewContainerRef(vCRef);
  }

  hideBackdrop(): void {
    this.backdropComponent.hide();
  }

  showBackdropWithZIndex(zIndex: number): void {
    this.backdropComponent.showWithZIndex(zIndex);
  }

  private setViewContainerRef(value: ViewContainerRef) {
    this.viewContainerRefInternal = value;

    if (this.viewContainerRefInternal) {
      const cFactory = this.componentFactoryResolver.resolveComponentFactory(
        MdlBackdropOverlayComponent
      );
      this.backdropComponent = this.viewContainerRefInternal.createComponent(
        cFactory
      ).instance;
      this.backdropComponent.clickEmitter.subscribe(() => {
        this.backdropClickEmitter.emit();
      });
    }
  }
}
