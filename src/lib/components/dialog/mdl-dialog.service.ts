import {
  Inject,
  Injectable,
  ComponentFactoryResolver,
  ComponentRef,
  Type,
  ReflectiveInjector,
  OpaqueToken,
  Provider,
  ApplicationRef,
  ViewContainerRef,
  TemplateRef,
} from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';

import { MdlSimpleDialogComponent } from './mdl-simple-dialog.component';
import { MdlDialogHostComponent } from './mdl-dialog-host.component';
import {
  IMdlDialogConfiguration,
  IMdlCustomDialogConfiguration,
  IMdlSimpleDialogConfiguration
} from './mdl-dialog-configuration';
import { InternalMdlDialogReference } from './internal-dialog-reference';
import { MdlDialogOutletService } from '../dialog-outlet/mdl-dialog-outlet.service';



export const MDL_CONFIGUARTION = new OpaqueToken('MDL_CONFIGUARTION');
export const MIN_DIALOG_Z_INDEX = 100000;

/**
 * The reference to the created and displayed dialog.
 */
export class MdlDialogReference {

  constructor(private internaleRef: InternalMdlDialogReference) {
    internaleRef.dialogRef = this;
  }

  public getHostDialog() : MdlDialogHostComponent {
    return this.internaleRef.hostDialog;
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

  private openDialogs = new Array<InternalMdlDialogReference>();

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    @Inject(DOCUMENT) private doc: any,
    private appRef: ApplicationRef,
    private mdlDialogOutletService: MdlDialogOutletService) {
  }

  /**
   * Shows a dialog that is just an alert - e.g. with one button.
   * @param alertMessage The message that should be displayed.
   * @param okTex The text that the button should have
   * @param title The optional title of the dialog
   * @returns An Observable that is called if the user hits the Ok button.
   */
  public alert(alertMessage: string, okText = 'Ok', title?: string, animate = true): Observable<void> {
    let result: Subject<any> = new Subject();

    this.showDialog({
        title: title,
        message: alertMessage,
        actions: [
          { handler: () => {
            result.next(null);
            result.complete();
          }, text: okText}
        ],
        isModal: true
      });

    return result;
  }

  /**
   * Shows a dialog that is just a confirm message - e.g. with two button.
   * @param question The question that should be displayed.
   * @param declineText The text for decline button. defaults to Cancel
   * @param confirmText The text for the confirm button . defaults to Ok
   * @returns An Observable that is called if the user hits the Ok button.
   */
  public confirm(
    question: string,
    declineText = 'Cancel',
    confirmText = 'Ok'): Observable<void> {

    let result: Subject<any> = new Subject();

    this.showDialog({
      message: question,
      actions: [
        {
          handler: () => {
            result.next(null);
            result.complete();
          }, text: confirmText
        },
        {
          handler: () => {
            result.error(null);

          }, text: declineText, isClosingAction: true
        }
      ],
      isModal: true
    });

    return result.asObservable();
  }

  /**
   * Shows a dialog that is specified by the provided configuration.
   * @param config The simple dialog configuration.
   * @returns An Observable that returns the MdlDialogReference.
   */
  public showDialog(config: IMdlSimpleDialogConfiguration): Observable<MdlDialogReference> {

    if (config.actions.length === 0 ) {
      throw new Error('a dialog mus have at least one action');
    }

    let internalDialogRef = new InternalMdlDialogReference();

    let providers = [
      { provide: MdlDialogReference, useValue: new MdlDialogReference(internalDialogRef) },
      { provide: MDL_CONFIGUARTION, useValue: config}
    ];

    let hostComponentRef = this.createHostDialog(internalDialogRef, config);

    let cRef = this.createComponentInstance(
      hostComponentRef.instance.dialogTarget,
      providers,
      MdlSimpleDialogComponent);


    return Observable.of(internalDialogRef.dialogRef);
  }

  /**
   * Shows a dialog that is specified by the provided configuration.
   * @param config The custom dialog configuration.
   * @returns Am Observable that returns the MdlDialogReference.
   */
  public showCustomDialog(config: IMdlCustomDialogConfiguration): Observable<MdlDialogReference> {

    let internalDialogRef = new InternalMdlDialogReference();

    let providers: Provider[] = [
      { provide: MdlDialogReference, useValue: new MdlDialogReference(internalDialogRef) }
    ];

    if (config.providers){
      providers.push(...config.providers);
    }

    let hostComponentRef = this.createHostDialog(internalDialogRef, config);

    this.createComponentInstance(hostComponentRef.instance.dialogTarget, providers, config.component);

    return Observable.of(internalDialogRef.dialogRef);
  }

  public showDialogTemplate(template: TemplateRef<any>, config: IMdlDialogConfiguration): Observable<MdlDialogReference> {

    let internalDialogRef = new InternalMdlDialogReference();

    // FIXME bad design. this should be done in INternalMdlDialogReference
    new MdlDialogReference(internalDialogRef)

    let hostComponentRef = this.createHostDialog(internalDialogRef, config);

    hostComponentRef.instance.dialogTarget.createEmbeddedView(template);

    return Observable.of(internalDialogRef.dialogRef);
  }



  private createHostDialog(internalDialogRef: InternalMdlDialogReference, dialogConfig: IMdlDialogConfiguration) {

    let viewContainerRef = this.mdlDialogOutletService.viewContainerRef;
    if (!viewContainerRef) {
      throw new Error('You did not provide a ViewContainerRef. ' +
        'Please see https://github.com/mseemann/angular2-mdl/wiki/How-to-use-the-MdlDialogService');
    }

    let hostDialogComponent = this.createComponentInstance(viewContainerRef, [], MdlDialogHostComponent);

    internalDialogRef.hostDialogComponentRef  = hostDialogComponent;
    internalDialogRef.isModal                 = dialogConfig.isModal;

    internalDialogRef.closeCallback = () => {
      this.popDialog(internalDialogRef);
      hostDialogComponent.destroy();
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

    this.mdlDialogOutletService.hideBackdrop();

    if (topMostModalDialog) {
      // move the overlay diredct under the topmos modal dialog
      this.mdlDialogOutletService.showBackdropWithZIndex(topMostModalDialog.hostDialog.zIndex - 1);
    }

  }

  private createComponentInstance <T> (
    viewContainerRef: ViewContainerRef,
    providers: Provider[],
    component: Type<T> ): ComponentRef<any> {

    let cFactory            = this.componentFactoryResolver.resolveComponentFactory(component);

    let resolvedProviders   = ReflectiveInjector.resolve(providers);
    let parentInjector      = viewContainerRef.parentInjector;
    let childInjector       = ReflectiveInjector.fromResolvedProviders(resolvedProviders, parentInjector);

    return viewContainerRef.createComponent(cFactory, viewContainerRef.length, childInjector);
  }


}
