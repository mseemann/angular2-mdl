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
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { DOCUMENT } from '@angular/platform-browser';

import { MdlDialogComponent } from './mdl-dialog.component';

export const TEST = new OpaqueToken('test');

export enum ConfirmResult {
  Confirmed,
  Declined
};

export interface IMdlDialogReference {
  hide();
  onHide(): Observable<any>;
}

export class MdlDialogReference implements IMdlDialogReference {

  private components = new Set<ComponentRef<any>>();
  private onHideSubject: Subject<any> = new Subject();

  public addComponentRef(cRef: ComponentRef<any>) {
    this.components.add(cRef);
  }

  public hide() {
    this.components.forEach( (cRef) => {
      cRef.destroy();
    });
    this.onHideSubject.next();
    this.onHideSubject.complete();
  }

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

  public showDialog(dialogConfiguration: IMdlSimpleDialogConfiguration): Promise<IMdlDialogReference> {
    return this.createAndShowDialog(dialogConfiguration, new MdlDialogReference());
  }

  public showCustomDialog(dialogConfiguration: IMdlCustomDialogConfiguration): Promise<IMdlDialogReference> {

    let dialogRef = new MdlDialogReference();

    let customDialogComponentRef: ComponentRef<any>
      = this.createComponentRef(dialogConfiguration, dialogRef, dialogConfiguration.component);

    // add the ComponentRef of the customdilaog to the dialogref - so we can later destroy is safely
    dialogRef.addComponentRef(customDialogComponentRef);

    const mdlCustomDialogInstance = customDialogComponentRef.instance;
    const customDialogViewContainerRef = mdlCustomDialogInstance.viewContainerRef;

    if (!customDialogViewContainerRef) {
      throw new Error('The CustomDialog should implement the interface IMdlCustomDialog');
    }

    return this.createAndShowDialog(dialogConfiguration, dialogRef, customDialogViewContainerRef);
  }

  private createAndShowDialog(
    dialogConfiguration: IMdlDialogConfiguration,
    dialogRef: MdlDialogReference,
    customDialogViewContainerRef?: ViewContainerRef): Promise<IMdlDialogReference> {

    return new Promise((resolve: (value: MdlDialogReference) => void, reject: (reason?: any) => void) => {

      let dialogComponentRef: ComponentRef<any>
        = this.createComponentRef(dialogConfiguration, dialogRef, MdlDialogComponent);

      // add the ComponentRef of the dialog to the dialogref - so we can later destroy is safely
      dialogRef.addComponentRef(dialogComponentRef);

      // get the dialog instance and configure the instance
      let dialogComponent                           = <MdlDialogComponent> dialogComponentRef.instance;
      dialogComponent.dialogConfiguration           = dialogConfiguration;
      dialogComponent.customDialogViewContainerRef  = customDialogViewContainerRef;

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
