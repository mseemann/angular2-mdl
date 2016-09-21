import {
  Inject,
  Injectable,
  Injector,
  ViewContainerRef,
  ComponentFactoryResolver,
  ComponentRef,
  Type,
  OpaqueToken,
  ReflectiveInjector
} from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

import { MdlDialogComponent } from './mdl-dialog.component';

export const TEST = new OpaqueToken('test');

export enum ConfirmResult {
  Confirmed,
  Declined
};

export class MdlDialogReference {

  private components = new Set<ComponentRef<any>>();

  public dialog: MdlDialogComponent;
  public addComponentRef(cRef: ComponentRef<any>) {
    this.components.add(cRef);
  }

  public hide() {
    this.components.forEach( (cRef) => {
      cRef.destroy();
    });
  }

}

export interface IMdlDialogAction {
  handler: () => void;
  text: string;
  isClosingAction?: boolean;
}

export interface IMdlDialogConfiguration {
  vcRef?: ViewContainerRef;
  isModal?: boolean;

  viewContainerRef?: ComponentRef<any>;
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

  public alert(alertMessage: string, vcRef?: ViewContainerRef): Promise<void> {
    return new Promise((resolve: (value?: void) => void, reject: (reason?: any) => void) => {

      this.showDialog({
        message: alertMessage,
        actions: [
          {
            handler: () => {
              resolve();
            },
            text: 'Ok',
            isClosingAction: true
          }
        ],
        vcRef: vcRef,
        isModal: true
      });

    });
  }

  public confirm(
    question: string,
    declineText = 'Cancel',
    confirmText = 'Ok',
    vcRef?: ViewContainerRef): Promise<ConfirmResult> {

    return new Promise((resolve: (value: ConfirmResult) => void, reject: (reason?: any) => void) => {
      this.showDialog({
        message: question,
        actions: [
          {
            handler: () => {
              resolve(ConfirmResult.Confirmed);
            },
            text: confirmText,
          },
          {
            handler: () => {
              resolve(ConfirmResult.Declined);
            },
            text: declineText,
            isClosingAction: true
          }
        ],
        vcRef: vcRef,
        isModal: true
      });
    });
  }

  public showDialog(dialogConfiguration: IMdlSimpleDialogConfiguration): Promise<MdlDialogReference> {
    let dialogRef = new MdlDialogReference();
    return this.createAndShowDialog(dialogConfiguration, dialogRef);
  }

  public showCustomDialog(dialogConfiguration: IMdlCustomDialogConfiguration): Promise<MdlDialogReference> {

    let dialogRef = new MdlDialogReference();

    let customDialogComponentRef: ComponentRef<any>
      = this.createComponentRef(dialogConfiguration, dialogRef, dialogConfiguration.component);

    dialogRef.addComponentRef(customDialogComponentRef);

    // TODO the component must implement an Interface and return the viewContainerRef
    dialogConfiguration.viewContainerRef = customDialogComponentRef.instance.vcRef;

    return this.createAndShowDialog(dialogConfiguration, dialogRef);
  }

  private createAndShowDialog(
    dialogConfiguration: IMdlDialogConfiguration,
    dialogRef: MdlDialogReference): Promise<MdlDialogReference> {

    return new Promise((resolve: (value: MdlDialogReference) => void, reject: (reason?: any) => void) => {

      let cRef: ComponentRef<any>
        = this.createComponentRef(dialogConfiguration, dialogRef, MdlDialogComponent);

      dialogRef.addComponentRef(cRef);



      let dialogComponent = <MdlDialogComponent> cRef.instance;
      dialogComponent.dialogConfiguration = dialogConfiguration;

      dialogRef.dialog = dialogComponent;

        // TODO show backdrop if modal dialog
      // TODO zIndex ordering
      // let overlay = this.doc.createElement('div');
      // overlay.className = 'dialog-backdrop';
      // this.doc.body.appendChild(overlay);

      resolve(dialogRef);

    });
  }

  private createComponentRef(
    dialogConfiguration: IMdlDialogConfiguration,
    dialogRef: MdlDialogReference,
    component: Type<any> ) {

    let cFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    let viewContainerRef  = dialogConfiguration.vcRef || this.defaultViewContainerRef;
    let providers = ReflectiveInjector.resolve([{ provide: MdlDialogReference, useValue: dialogRef }]);
    let parentInjector = viewContainerRef.parentInjector;
    let childInjector: Injector = ReflectiveInjector.fromResolvedProviders(providers, parentInjector);
    return viewContainerRef.createComponent(cFactory, viewContainerRef.length, childInjector);

  }


}
