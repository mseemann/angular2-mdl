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

export class InternalMdlDialogReference {
// TODO internal DialogReference?
}

export class MdlDialogReference {

  private components = new Set<ComponentRef<any>>();
  private onHideSubject: Subject<any> = new Subject();
  public hostDialog: MdlDialogHostComponent;
  public closeCallback: () => void;

  // constructor(internaleRef: InternalMdlDialogReference) {
  //
  // }

  public addComponentRef(cRef: ComponentRef<any>) {
    this.components.add(cRef);
  }

  // TODO this should be a method a user should see
  public hide() {
    this.components.forEach( (cRef) => {
      cRef.destroy();
    });
    this.onHideSubject.next();
    this.onHideSubject.complete();
    this.closeCallback();
  }

  // TODO this should be a method a user should see
  public onHide(): Observable<void> {
    return this.onHideSubject.asObservable();
  }
}


export interface IMdlCustomDialog {
  viewContainerRef: ViewContainerRef;
}

export interface IMdlDialogAction {
  handler: () => void;
  text: string;
  isClosingAction?: boolean;
}

export interface IMdlDialogConfiguration {
  vcRef?: ViewContainerRef;
  isModal?: boolean;
}

export interface IMdlSimpleDialogConfiguration extends IMdlDialogConfiguration {
  title?: string;
  message: string;
  actions?: [IMdlDialogAction];
  fullWidthAction?: boolean;
}

export interface IMdlCustomDialogConfiguration extends IMdlDialogConfiguration {
  component: Type<any>;
}

// @experimental
@Injectable()
export class MdlDialogService {

  private defaultViewContainerRef: ViewContainerRef;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    @Inject(DOCUMENT) private doc: HTMLDocument) {}

  public setDefaultViewContainerRef(vcRef: ViewContainerRef) {
    this.defaultViewContainerRef = vcRef;
  }

  /**
   * Shows a dialog that is just an alert - e.g. with one button.
   * @param alertMessage The message that should be displayed.
   * @param vcRef The ViewContainerRef where the aletr dialog should be attached to.
   * Must not be provided if setDefaultViewContainerRef was set.
   * @returns A promise that is called if the user hits the Ok button.
   */
  public alert(alertMessage: string, vcRef?: ViewContainerRef): Promise<void> {
    return new Promise((resolve: (value?: void) => void, reject: (reason?: any) => void) => {

      this.showDialog({
        message: alertMessage,
        actions: [
          { handler: () => resolve(), text: 'Ok', isClosingAction: true }
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

    let dialogRef = new MdlDialogReference();

    let providers = [
      { provide: MdlDialogReference, useValue: dialogRef },
      {provide: MDL_CONFIGUARTION, useValue: config}
    ];

    let contentDialog = this.createComponentInstance(config.vcRef, providers, MdlDialogComponent);

    return this.createHostDialog(dialogRef, contentDialog, config);
  }

  /**
   * Shows a dialog that is specified by the provided configuration.
   * @param config The custom dialog configuration.
   * @returns A promise that returns the MdlDialogReference.
   */
  public showCustomDialog(config: IMdlCustomDialogConfiguration): Promise<MdlDialogReference> {

    let dialogRef = new MdlDialogReference();

    let providers = [
      { provide: MdlDialogReference, useValue: dialogRef }
    ];

    let contentDialog = this.createComponentInstance(config.vcRef, providers, config.component);

    return this.createHostDialog(dialogRef, contentDialog, config);
  }

  private createHostDialog(dialogRef: MdlDialogReference, contentDialog: any, dialogConfig: IMdlDialogConfiguration) {

    if ( !contentDialog.viewContainerRef ) {
      throw new Error('The CustomDialog should implement the interface IMdlCustomDialog');
    }

    let providers = [
      { provide: MdlDialogReference, useValue: dialogRef },
      { provide: MDL_CONTENT_VIEW_CONTAINER_REF, useValue: contentDialog.viewContainerRef}
    ];

    let hostDialogComponent
      = this.createComponentInstance(dialogConfig.vcRef, providers, MdlDialogHostComponent);

    dialogRef.hostDialog = hostDialogComponent;

    dialogRef.closeCallback = () => {
      this.popDialog(dialogRef);
    };
    this.pushDialog(dialogRef);

    if ( dialogConfig.isModal ) {
      // TODO show backdrop if modal dialog
      let overlay = this.doc.createElement('div');
      overlay.className = 'dialog-backdrop';
      overlay.style.zIndex = String(MIN_DIALOG_Z_INDEX);
      this.doc.body.appendChild(overlay);
    }

    // // TODO zIndex ordering

    return Promise.resolve(dialogRef);
  }

  private pushDialog(dialogRef: MdlDialogReference) {
      console.log('pushDialog');
  }

  private popDialog(dialogRef: MdlDialogReference) {
    console.log('popDialog');
  }

  private createComponentInstance <T> (targetVCRef: ViewContainerRef, providers: Provider[], component: Type<T> ): T {

    let cFactory            = this.componentFactoryResolver.resolveComponentFactory(component);
    let viewContainerRef    = targetVCRef || this.defaultViewContainerRef;

    let resolvedProviders   = ReflectiveInjector.resolve(providers);
    let parentInjector      = viewContainerRef.parentInjector;
    let childInjector       = ReflectiveInjector.fromResolvedProviders(resolvedProviders, parentInjector);

    let componentRef = viewContainerRef.createComponent(cFactory, viewContainerRef.length, childInjector);

    const dialogRef: MdlDialogReference = childInjector.get(MdlDialogReference);

    // add the componentref to the dialogref - this will later be used to
    // call componentref.destroy if the dialog goes hidden.
    dialogRef.addComponentRef(componentRef);

    return componentRef.instance;
  }


}
