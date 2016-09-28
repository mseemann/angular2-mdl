import {
  Inject,
  Injectable,
  ViewContainerRef,
  ComponentFactoryResolver,
  ComponentRef,
  Type,
  ReflectiveInjector,
  OpaqueToken,
  Provider,
  EmbeddedViewRef
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DOCUMENT } from '@angular/platform-browser';

import { MdlDialogComponent } from './mdl-dialog.component';
import { MdlDialogHostComponent } from './mdl-dialog-host.component';
import {
  IMdlDialogConfiguration,
  IMdlCustomDialogConfiguration,
  IMdlSimpleDialogConfiguration
} from './mdl-dialog-configuration';
import { InternalMdlDialogReference } from './internal-dialog-reference';

export const MDL_CONFIGUARTION = new OpaqueToken('MDL_CONFIGUARTION');
export const MIN_DIALOG_Z_INDEX = 100000;

export enum ConfirmResult {
  Confirmed,
  Declined
}

/**
 * The reference to the created and displayed dialog.
 */
export class MdlDialogReference {

  constructor(private internaleRef: InternalMdlDialogReference) {
    internaleRef.dialogRef = this;
  }

  /**
   * closes the dialog
   */
  public hide() {
    this.internaleRef.hide();
  }

  /**
   * Observable that emits, if the dialog was closed.
   * @returns {Observable<void>}
   */
  public onHide(): Observable<void> {
    return this.internaleRef.onHide();
  }
}

/**
 * The MdlDialogService is used to open different kind of dialogs. SimpleDialogs and Custom Dialogs.
 * @experimental
  */

@Injectable()
export class MdlDialogService {

  private defaultViewContainerRef: ViewContainerRef;

  private openDialogs = new Array<InternalMdlDialogReference>();
  private overlay: HTMLElement;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    @Inject(DOCUMENT) private doc: any) {

    // create the overlay - that we will need to block the ui in case of modal dialogs
    // TODO bad angular design
    this.overlay = this.doc.createElement('div');
    this.overlay.className = 'dialog-backdrop';
    this.overlay.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }

  public setDefaultViewContainerRef(vcRef: ViewContainerRef) {
    this.defaultViewContainerRef = vcRef;
  }

  /**
   * Shows a dialog that is just an alert - e.g. with one button.
   * @param alertMessage The message that should be displayed.
   * @param okTex The text that the button should have
   * @param title The optional title of the dialog
   * @param vcRef The ViewContainerRef where the alert dialog should be attached to.
   * Must not be provided if setDefaultViewContainerRef was set.
   * @returns A promise that is called if the user hits the Ok button.
   */
  public alert(alertMessage: string, okText = 'Ok', title?: string, vcRef?: ViewContainerRef): Promise<void> {
    return new Promise((resolve: (value?: void) => void, reject: (reason?: any) => void) => {

      this.showDialog({
        title: title,
        message: alertMessage,
        actions: [
          { handler: () => resolve(), text: okText}
        ],
        vcRef: vcRef,
        isModal: true
      });

    });
  }

  /**
   * Shows a dialog that is just a confirm message - e.g. with two button.
   * @param question The question that should be displayed.
   * @param declineText The text for decline button. defaults to Cancel
   * @param confirmText The text for the confirm button . defaults to Ok
   * @param vcRef The ViewContainerRef where the aletr dialog should be attached to.
   * Must not be provided if setDefaultViewContainerRef was set.
   * @returns A promise that is called if the user hits the Ok button.
   */
  public confirm(
    question: string,
    declineText = 'Cancel',
    confirmText = 'Ok',
    vcRef?: ViewContainerRef): Promise<ConfirmResult> {

    return new Promise((resolve: (value: ConfirmResult) => void, reject: (reason?: any) => void) => {
      this.showDialog({
        message: question,
        actions: [
          { handler: () => resolve(ConfirmResult.Confirmed), text: confirmText },
          { handler: () => resolve(ConfirmResult.Declined), text: declineText, isClosingAction: true }
        ],
        vcRef: vcRef,
        isModal: true
      });
    });
  }

  /**
   * Shows a dialog that is specified by the provided configuration.
   * @param config The simple dialog configuration.
   * @returns A promise that returns the MdlDialogReference.
   */
  public showDialog(config: IMdlSimpleDialogConfiguration): Promise<MdlDialogReference> {

    if (config.actions.length === 0 ) {
      throw new Error('a dialog mus have at least one aciton');
    }

    let internalDialogRef = new InternalMdlDialogReference();

    let providers = [
      { provide: MdlDialogReference, useValue: new MdlDialogReference(internalDialogRef) },
      { provide: MDL_CONFIGUARTION, useValue: config}
    ];

    let hostComponentRef = this.createHostDialog(internalDialogRef, config);

    this.createAttachedComponentInstance(hostComponentRef, providers, MdlDialogComponent);

    return Promise.resolve(internalDialogRef.dialogRef);
  }

  /**
   * Shows a dialog that is specified by the provided configuration.
   * @param config The custom dialog configuration.
   * @returns A promise that returns the MdlDialogReference.
   */
  public showCustomDialog(config: IMdlCustomDialogConfiguration): Promise<MdlDialogReference> {

    let internalDialogRef = new InternalMdlDialogReference();

    let providers = [
      { provide: MdlDialogReference, useValue: new MdlDialogReference(internalDialogRef) }
    ];

    let hostComponentRef = this.createHostDialog(internalDialogRef, config);

    this.createAttachedComponentInstance(hostComponentRef, providers, config.component);

    return Promise.resolve(internalDialogRef.dialogRef);
  }

  private createHostDialog(internalDialogRef: InternalMdlDialogReference, dialogConfig: IMdlDialogConfiguration) {

    console.log('create host in', (dialogConfig.vcRef || this.defaultViewContainerRef));
    let hostDialogComponent
      = this.createComponentInstance(dialogConfig.vcRef, [], MdlDialogHostComponent);

    internalDialogRef.hostDialogComponentRef = hostDialogComponent;
    internalDialogRef.isModal     = dialogConfig.isModal;

    internalDialogRef.closeCallback = () => {
      this.popDialog(internalDialogRef);
    };
    this.pushDialog(internalDialogRef);

    return hostDialogComponent;
  }

  private pushDialog(dialogRef: InternalMdlDialogReference) {
    this.openDialogs.push(dialogRef);
    this.orderDialogStack();
  }

  private popDialog(dialogRef: InternalMdlDialogReference) {
    this.openDialogs.splice(this.openDialogs.indexOf(dialogRef), 1);
    this.orderDialogStack();
  }

  private orderDialogStack() {
    // +1 because the overlay may have MIN_DIALOG_Z_INDEX if the dialog is modal.
    let zIndex = MIN_DIALOG_Z_INDEX + 1;


    this.openDialogs.forEach( (iDialogRef) => {
      iDialogRef.hostDialog.zIndex = zIndex;
      // +2 to make room for the overlay if a dialog is modal
      zIndex += 2;
    });

    // if there is a modal dialog append the overloay to the dom - if not remove the overlay from the body
    let topMostModalDialog: InternalMdlDialogReference = null;
    for (var i = (this.openDialogs.length - 1); i >= 0; i--) {
      if (this.openDialogs[i].isModal) {
        topMostModalDialog = this.openDialogs[i];
        break;
      }
    }

    if (this.overlay.parentElement) {
      this.overlay.parentElement.removeChild(this.overlay);
    }

    if (topMostModalDialog) {
      // append the overlay - TODO bad angular design
      this.doc.body.appendChild(this.overlay);
      // move the overlay diredct under the topmos modal dialog
      this.overlay.style.zIndex = String(topMostModalDialog.hostDialog.zIndex - 1);
    }

  }

  private createComponentInstance <T> (
    targetVCRef: ViewContainerRef,
    providers: Provider[], component: Type<T> ): ComponentRef<any> {

    let cFactory            = this.componentFactoryResolver.resolveComponentFactory(component);
    let viewContainerRef    = targetVCRef || this.defaultViewContainerRef;

    let resolvedProviders   = ReflectiveInjector.resolve(providers);
    let parentInjector      = viewContainerRef.parentInjector;
    let childInjector       = ReflectiveInjector.fromResolvedProviders(resolvedProviders, parentInjector);

    return viewContainerRef.createComponent(cFactory, viewContainerRef.length, childInjector);
  }

  /**
   * create a ComponentRef and attache the component node to the host component view (DOM)
   * @param hostComponentRef
   * @param providers
   * @param component
   * @returns {ComponentRef<any>}
   */
  private createAttachedComponentInstance <T> (
    hostComponentRef: ComponentRef<any>,
    providers: Provider[],
    component: Type<T>): ComponentRef<any> {

    let hostViewRef = hostComponentRef.instance.viewContainerRef;
    let componentRef = this.createComponentInstance(hostViewRef, providers, component);

    // FIXME this results in strange dom structures!
    let hostView = <EmbeddedViewRef<any>> componentRef.hostView;
    hostViewRef.element.nativeElement.appendChild(hostView.rootNodes[0]);

    return componentRef;
  }

}
