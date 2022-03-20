import {
  ComponentFactoryResolver,
  ComponentRef,
  EventEmitter,
  Injectable,
  Injector,
  StaticProvider,
  TemplateRef,
  Type,
  ViewContainerRef,
} from "@angular/core";
import { Observable, Subject } from "rxjs";

import { MdlSimpleDialogComponent } from "./mdl-simple-dialog.component";
import { MdlDialogHostComponent } from "./mdl-dialog-host.component";
import {
  IMdlCustomDialogConfiguration,
  IMdlDialogConfiguration,
  IMdlSimpleDialogConfiguration,
} from "./mdl-dialog-configuration";
import { InternalMdlDialogReference } from "./internal-dialog-reference";
import { MdlDialogOutletService } from "../dialog-outlet/mdl-dialog-outlet.service";
import { MdlDialogReference } from "./mdl-dialog-reference";
import { MDL_CONFIGUARTION, MIN_DIALOG_Z_INDEX } from "./config";

/**
 * The MdlDialogService is used to open different kind of dialogs. SimpleDialogs and Custom Dialogs.
 *
 * @experimental
 */

@Injectable({
  providedIn: "root",
})
export class MdlDialogService {
  /**
   * Emits an event when either all modals are closed, or one gets opened.
   *
   * @returns A subscribable event emitter that provides a boolean indicating whether a modal is open or not.
   */
  onDialogsOpenChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  private openDialogs = new Array<InternalMdlDialogReference>();

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private mdlDialogOutletService: MdlDialogOutletService,
    private injector: Injector
  ) {
    this.mdlDialogOutletService.backdropClickEmitter.subscribe(() => {
      this.onBackdropClick();
    });
  }

  /**
   * Shows a dialog that is just an alert - e.g. with one button.
   *
   * @param alertMessage The message that should be displayed.
   * @param okText The text that the button should have
   * @param title The optional title of the dialog
   * returns An Observable that is called if the user hits the Ok button.
   */
  public alert(
    alertMessage: string,
    okText = "Ok",
    title?: string
  ): Observable<void> {
    const result: Subject<void> = new Subject();

    this.showDialog({
      title,
      message: alertMessage,
      actions: [
        {
          handler: () => {
            result.next();
            result.complete();
          },
          text: okText,
        },
      ],
      isModal: true,
    });

    return result;
  }

  /**
   * Shows a dialog that is just a confirm message - e.g. with two button.
   *
   * @param question The question that should be displayed.
   * @param title The title that should be displayed on top of Question.
   * @param declineText The text for decline button. defaults to Cancel
   * @param confirmText The text for the confirm button . defaults to Ok
   * returns An Observable that is called if the user hits the Ok button.
   */
  public confirm(
    question: string,
    declineText = "Cancel",
    confirmText = "Ok",
    title?: string
  ): Observable<void> {
    const result: Subject<void> = new Subject();

    this.showDialog({
      title,
      message: question,
      actions: [
        {
          handler: () => {
            result.next();
            result.complete();
          },
          text: confirmText,
        },
        {
          handler: () => {
            result.error(null);
          },
          text: declineText,
          isClosingAction: true,
        },
      ],
      isModal: true,
    });

    return result.asObservable();
  }

  /**
   * Shows a dialog that is specified by the provided configuration.
   *
   * @param config The simple dialog configuration.
   * returns An Observable that returns the MdlDialogReference.
   */
  public showDialog(
    config: IMdlSimpleDialogConfiguration
  ): Observable<MdlDialogReference> {
    if (config.actions.length === 0) {
      throw new Error("a dialog mus have at least one action");
    }

    const internalDialogRef = new InternalMdlDialogReference(config);

    const providers = [
      {
        provide: MdlDialogReference,
        useValue: new MdlDialogReference(internalDialogRef),
      },
      { provide: MDL_CONFIGUARTION, useValue: config },
    ];

    const hostComponentRef = this.createHostDialog(internalDialogRef, config);

    this.createComponentInstance(
      hostComponentRef?.instance?.dialogTarget,
      providers,
      MdlSimpleDialogComponent
    );

    return this.showHostDialog(internalDialogRef.dialogRef, hostComponentRef);
  }

  /**
   * Shows a dialog that is specified by the provided configuration.
   *
   * @param config The custom dialog configuration.
   * returns An Observable that returns the MdlDialogReference.
   */
  public showCustomDialog(
    config: IMdlCustomDialogConfiguration
  ): Observable<MdlDialogReference> {
    const internalDialogRef = new InternalMdlDialogReference(config);

    const providers: StaticProvider[] = [
      {
        provide: MdlDialogReference,
        useValue: new MdlDialogReference(internalDialogRef),
      },
    ];

    if (config.providers) {
      providers.push(...config.providers);
    }

    const hostComponentRef = this.createHostDialog(internalDialogRef, config);

    this.createComponentInstance(
      hostComponentRef?.instance.dialogTarget,
      providers,
      config.component
    );

    return this.showHostDialog(internalDialogRef.dialogRef, hostComponentRef);
  }

  public showDialogTemplate(
    template: TemplateRef<unknown>,
    config: IMdlDialogConfiguration
  ): Observable<MdlDialogReference> {
    const internalDialogRef = new InternalMdlDialogReference(config);

    const hostComponentRef = this.createHostDialog(internalDialogRef, config);

    hostComponentRef?.instance.dialogTarget?.createEmbeddedView(template);

    return this.showHostDialog(internalDialogRef.dialogRef, hostComponentRef);
  }

  private showHostDialog(
    dialogRef: MdlDialogReference | undefined,
    hostComponentRef: ComponentRef<MdlDialogHostComponent> | undefined
  ) {
    const result: Subject<MdlDialogReference> = new Subject();

    setTimeout(() => {
      result.next(dialogRef);
      result.complete();
      hostComponentRef?.instance.show();
    });

    return result.asObservable();
  }

  private createHostDialog(
    internalDialogRef: InternalMdlDialogReference,
    dialogConfig: IMdlDialogConfiguration
  ) {
    const viewContainerRef = this.mdlDialogOutletService.viewContainerRef;
    if (!viewContainerRef) {
      throw new Error(
        "You did not provide a ViewContainerRef. " +
          "Please see https://github.com/mseemann/angular2-mdl/wiki/How-to-use-the-MdlDialogService"
      );
    }

    const providers: StaticProvider[] = [
      { provide: MDL_CONFIGUARTION, useValue: dialogConfig },
      { provide: InternalMdlDialogReference, useValue: internalDialogRef },
    ];

    const hostDialogComponent = this.createComponentInstance(
      viewContainerRef,
      providers,
      MdlDialogHostComponent
    );

    internalDialogRef.hostDialogComponentRef = hostDialogComponent;
    internalDialogRef.isModal = dialogConfig.isModal;

    internalDialogRef.closeCallback = () => {
      this.popDialog(internalDialogRef);
      hostDialogComponent?.instance.hide(hostDialogComponent);
    };
    this.pushDialog(internalDialogRef);

    return hostDialogComponent;
  }

  private pushDialog(dialogRef: InternalMdlDialogReference) {
    if (this.openDialogs.length === 0) {
      // first dialog being opened
      this.onDialogsOpenChanged.emit(true);
    }

    this.openDialogs.push(dialogRef);
    this.orderDialogStack();
  }

  private popDialog(dialogRef: InternalMdlDialogReference) {
    this.openDialogs.splice(this.openDialogs.indexOf(dialogRef), 1);
    this.orderDialogStack();

    if (this.openDialogs.length === 0) {
      // last dialog being closed
      this.onDialogsOpenChanged.emit(false);
    }
  }

  private orderDialogStack() {
    // +1 because the overlay may have MIN_DIALOG_Z_INDEX if the dialog is modal.
    let zIndex = MIN_DIALOG_Z_INDEX + 1;

    this.openDialogs.forEach((iDialogRef) => {
      if (iDialogRef.hostDialog) {
        iDialogRef.hostDialog.zIndex = zIndex;
      }
      // +2 to make room for the overlay if a dialog is modal
      zIndex += 2;
    });

    this.mdlDialogOutletService.hideBackdrop();

    // if there is a modal dialog append the overloay to the dom - if not remove the overlay from the body
    const topMostModalDialog: InternalMdlDialogReference | null =
      this.getTopMostInternalDialogRef();
    if (topMostModalDialog) {
      // move the overlay diredct under the topmos modal dialog
      this.mdlDialogOutletService.showBackdropWithZIndex(
        topMostModalDialog?.hostDialog?.zIndex
          ? topMostModalDialog.hostDialog.zIndex - 1
          : 0
      );
    }
  }

  private getTopMostInternalDialogRef(): InternalMdlDialogReference | null {
    let topMostModalDialog: InternalMdlDialogReference | null = null;

    for (let i = this.openDialogs.length - 1; i >= 0; i--) {
      if (this.openDialogs[i].isModal) {
        topMostModalDialog = this.openDialogs[i];
        break;
      }
    }
    return topMostModalDialog;
  }

  private onBackdropClick() {
    const topMostModalDialog: InternalMdlDialogReference | null =
      this.getTopMostInternalDialogRef();
    if (topMostModalDialog?.config.clickOutsideToClose) {
      topMostModalDialog?.hide();
    }
  }

  private createComponentInstance<T>(
    viewContainerRef: ViewContainerRef | undefined,
    providers: StaticProvider[],
    component: Type<T>
  ): ComponentRef<T> | undefined {
    const cFactory =
      this.componentFactoryResolver.resolveComponentFactory(component);

    const injector = Injector.create({
      providers: [
        ...providers,
        { provide: ViewContainerRef, useValue: viewContainerRef },
      ],
      parent: this.injector,
    });

    return viewContainerRef?.createComponent(
      cFactory,
      viewContainerRef.length,
      injector
    );
  }
}
