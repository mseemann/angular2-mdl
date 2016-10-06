import {
  Inject,
  Injectable,
  ViewContainerRef,
  ComponentFactoryResolver,
  ComponentRef,
  Type,
  ReflectiveInjector,
  OpaqueToken,
  Provider
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { DOCUMENT } from '@angular/platform-browser';

import { MdlDialogComponent } from './mdl-dialog.component';
import { MdlDialogHostComponent } from './mdl-dialog-host.component';

export const MDL_CONFIGUARTION = new OpaqueToken('MDL_CONFIGUARTION');
export const MDL_CONTENT_VIEW_CONTAINER_REF = new OpaqueToken('MDL_CONTENT_VIEW_CONTAINER_REF');
export const MIN_DIALOG_Z_INDEX = 100000;

export enum ConfirmResult {
  Confirmed,
  Declined
}

/**
 * Internal representation of the dialog ref. the service
 * user should not have access to the created components
 * and internal implementations.
 */
export class InternalMdlDialogReference {

  private components = new Set<ComponentRef<any>>();
  private onHideSubject: Subject<any> = new Subject();
  public hostDialog: MdlDialogHostComponent;
  public closeCallback: () => void;
  public isModal = false;

  public addComponentRef(cRef: ComponentRef<any>) {
    this.components.add(cRef);
  }

  public hide() {
    this.components.forEach( (cRef) => {
      cRef.destroy();
    });
    this.onHideSubject.next();
    this.onHideSubject.complete();
    this.closeCallback();
  }

  public onHide(): Observable<void> {
    return this.onHideSubject.asObservable();
  }
}

/**
 * The reference to the created and displayed dialog.
 */
export class MdlDialogReference {

  constructor(private internaleRef: InternalMdlDialogReference) {}

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
 * Every custom dialog should implement this interface. This is needed to get
 * hold of the viewContainerRef of the dialog. The viewcontainerref will be
 * inlcuded in the host dialog. the host dialog is managed by this service.
 */
export interface IMdlCustomDialog {
  viewContainerRef: ViewContainerRef;
}

/**
 * The simple Dialog can have as much actions as needed by the user.
 */
export interface IMdlDialogAction {
  /**
   * the handler is a callback function. this funciton will be called if
   * the action button was clicked.
   */
  handler: () => void;
  /**
   * the text of the action button
   */
  text: string;
  /**
   * is this a closing aciton? means the action is called if the user pressed the esc key.
   */
  isClosingAction?: boolean;
}

/**
 * Dialog configuration for all dialogs (simple or custom)
 */
export interface IMdlDialogConfiguration {
  /**
   * The viewcontainerref the dialog will be attached to.
   * required if not provided by setDefaultViewContainerRef.
   */
  vcRef?: ViewContainerRef;
  /**
   * true if the dialog should be opened as modal.
   */
  isModal?: boolean;
}

/**
 * The simple dialog. Easy to use - dosn't need a special component.
 */
export interface IMdlSimpleDialogConfiguration extends IMdlDialogConfiguration {
  /**
   * the title of the dialog
   */
  title?: string;
  /**
   * the message that should be displayed
   */
  message: string;
  /**
   * the actions that are used for this dialog (the order will be reversed by mdl.
   */
  actions: [IMdlDialogAction];
  /**
   * should the actions be displayed as full width actions. every aciton is one row.
   */
  fullWidthAction?: boolean;
}

/**
 * Configuration for a custom dialog. You need to provide a component that
 * should be used as the content of the dialog. the component mus match the
 * fowllowing conditions:
 * - must implement IMdlCustomDialog
 * - must be an entrycompnent (property of your module)
 * If youn need acces to the MdlDialogReference you may inject it in your constructor:
 *
 * export class MyDialog implements IMdlCustomDialog {
 *
 *   constructor(private dialogref: MdlDialogReference){}
 *
 *   ...
 * }
 */
export interface IMdlCustomDialogConfiguration extends IMdlDialogConfiguration {
  component: Type<any>;
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

    if(config.actions.length === 0 ){
      throw new Error('a dialog mus have at least one aciton');
    }

    let internalDialogRef = new InternalMdlDialogReference();
    let dialogRef = new MdlDialogReference(internalDialogRef);

    let providers = [
      { provide: MdlDialogReference, useValue: dialogRef },
      { provide: InternalMdlDialogReference, useValue: internalDialogRef },
      {provide: MDL_CONFIGUARTION, useValue: config}
    ];

    let contentDialog = this.createComponentInstance(config.vcRef, providers, MdlDialogComponent);

    return this.createHostDialog(dialogRef, internalDialogRef, contentDialog, config);
  }

  /**
   * Shows a dialog that is specified by the provided configuration.
   * @param config The custom dialog configuration.
   * @returns A promise that returns the MdlDialogReference.
   */
  public showCustomDialog(config: IMdlCustomDialogConfiguration): Promise<MdlDialogReference> {

    let internalDialogRef = new InternalMdlDialogReference();
    let dialogRef = new MdlDialogReference(internalDialogRef);

    let providers = [
      { provide: MdlDialogReference, useValue: dialogRef },
      { provide: InternalMdlDialogReference, useValue: internalDialogRef }
    ];

    let contentDialog = this.createComponentInstance(config.vcRef, providers, config.component);

    return this.createHostDialog(dialogRef, internalDialogRef, contentDialog, config);
  }

  private createHostDialog(
    dialogRef: MdlDialogReference,
    internalDialogRef: InternalMdlDialogReference,
    contentDialog: any,
    dialogConfig: IMdlDialogConfiguration) {

    if ( !contentDialog.viewContainerRef ) {
      throw new Error('The CustomDialog should implement the interface IMdlCustomDialog');
    }

    let providers = [
      { provide: MdlDialogReference, useValue: dialogRef },
      { provide: InternalMdlDialogReference, useValue: internalDialogRef },
      { provide: MDL_CONTENT_VIEW_CONTAINER_REF, useValue: contentDialog.viewContainerRef}
    ];

    let hostDialogComponent
      = this.createComponentInstance(dialogConfig.vcRef, providers, MdlDialogHostComponent);

    internalDialogRef.hostDialog  = hostDialogComponent;
    internalDialogRef.isModal     = dialogConfig.isModal;

    internalDialogRef.closeCallback = () => {
      this.popDialog(internalDialogRef);
    };
    this.pushDialog(internalDialogRef);

    return Promise.resolve(dialogRef);
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

  private createComponentInstance <T> (targetVCRef: ViewContainerRef, providers: Provider[], component: Type<T> ): T {

    let cFactory            = this.componentFactoryResolver.resolveComponentFactory(component);
    let viewContainerRef    = targetVCRef || this.defaultViewContainerRef;

    if (!viewContainerRef) {
      throw new Error('You did not provide a ViewContainerRef. Please see https://github.com/mseemann/angular2-mdl/wiki/How-to-use-the-MdlDialogService')
    }

    let resolvedProviders   = ReflectiveInjector.resolve(providers);
    let parentInjector      = viewContainerRef.parentInjector;
    let childInjector       = ReflectiveInjector.fromResolvedProviders(resolvedProviders, parentInjector);

    let componentRef = viewContainerRef.createComponent(cFactory, viewContainerRef.length, childInjector);

    const internalDialogRef: InternalMdlDialogReference = childInjector.get(InternalMdlDialogReference);

    // add the componentref to the internalDialogRef - this will later be used to
    // call componentref.destroy if the dialog goes hidden.
    internalDialogRef.addComponentRef(componentRef);

    return componentRef.instance;
  }


}
