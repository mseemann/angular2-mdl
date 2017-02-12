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
  EventEmitter
} from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

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

  /**
   * closes the dialog
   */
  public hide(data?: any) {
    this.internaleRef.hide(data);
  }

  /**
   * Observable that emits, if the dialog was closed.
   * @returns {Observable<void>}
   */
  public onHide(): Observable<any> {
    return this.internaleRef.onHide();
  }

  /**
   * Observable that emits, if the dialog is really visible and not only created.
   * @returns {Observable<void>}
   */
  public onVisible(): Observable<void> {
    return this.internaleRef.onVisible();
  }
}

/**
 * The MdlDialogService is used to open different kind of dialogs. SimpleDialogs and Custom Dialogs.
 * @experimental
  */

@Injectable()
export class MdlDialogService {

  private openDialogs = new Array<InternalMdlDialogReference>();

  /**
   * Emits an event when either all modals are closed, or one gets opened.
   * @returns A subscribable event emitter that provides a boolean indicating whether a modal is open or not.
   */
  public onDialogsOpenChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    @Inject(DOCUMENT) private doc: any,
    private appRef: ApplicationRef,
    private mdlDialogOutletService: MdlDialogOutletService) {

    this.mdlDialogOutletService.backdropClickEmitter.subscribe( () => {
      this.onBackdropClick();
    });
  }

  /**
   * Shows a dialog that is just an alert - e.g. with one button.
   * @param alertMessage The message that should be displayed.
   * @param okText The text that the button should have
   * @param title The optional title of the dialog
   * @returns An Observable that is called if the user hits the Ok button.
   */
  public alert(alertMessage: string, okText = 'Ok', title?: string): Observable<void> {
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
   * @param title The title that should be displayed on top of Question.
   * @param declineText The text for decline button. defaults to Cancel
   * @param confirmText The text for the confirm button . defaults to Ok
   * @returns An Observable that is called if the user hits the Ok button.
   */
  public confirm(
    question: string,
    declineText = 'Cancel',
    confirmText = 'Ok',
    title?: string): Observable<void> {

    let result: Subject<any> = new Subject();

    this.showDialog({
      title: title,
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

    let internalDialogRef = new InternalMdlDialogReference(config);

    let providers = [
      { provide: MdlDialogReference, useValue: new MdlDialogReference(internalDialogRef) },
      { provide: MDL_CONFIGUARTION, useValue: config}
    ];

    let hostComponentRef = this.createHostDialog(internalDialogRef, config);

    let cRef = this.createComponentInstance(
      hostComponentRef.instance.dialogTarget,
      providers,
      MdlSimpleDialogComponent);

    return this.showHostDialog(internalDialogRef.dialogRef, hostComponentRef);
  }

  /**
   * Shows a dialog that is specified by the provided configuration.
   * @param config The custom dialog configuration.
   * @returns An Observable that returns the MdlDialogReference.
   */
  public showCustomDialog(config: IMdlCustomDialogConfiguration): Observable<MdlDialogReference> {

    let internalDialogRef = new InternalMdlDialogReference(config);

    let providers: Provider[] = [
      { provide: MdlDialogReference, useValue: new MdlDialogReference(internalDialogRef) }
    ];

    if (config.providers){
      providers.push(...config.providers);
    }

    let hostComponentRef = this.createHostDialog(internalDialogRef, config);

    this.createComponentInstance(hostComponentRef.instance.dialogTarget, providers, config.component);

    return this.showHostDialog(internalDialogRef.dialogRef, hostComponentRef);
  }

  public showDialogTemplate(template: TemplateRef<any>, config: IMdlDialogConfiguration): Observable<MdlDialogReference> {

    let internalDialogRef = new InternalMdlDialogReference(config);

    let hostComponentRef = this.createHostDialog(internalDialogRef, config);

    hostComponentRef.instance.dialogTarget.createEmbeddedView(template);

    return this.showHostDialog(internalDialogRef.dialogRef, hostComponentRef);
  }

  private showHostDialog(dialogRef: MdlDialogReference, hostComponentRef: ComponentRef<MdlDialogHostComponent> ) {

    let result: Subject<any> = new Subject();

    setTimeout( () => {
      result.next(dialogRef);
      result.complete();
      hostComponentRef.instance.show();
    });

    return result.asObservable();
  }

  private createHostDialog(internalDialogRef: InternalMdlDialogReference, dialogConfig: IMdlDialogConfiguration) {

    let viewContainerRef = this.mdlDialogOutletService.viewContainerRef;
    if (!viewContainerRef) {
      throw new Error('You did not provide a ViewContainerRef. ' +
        'Please see https://github.com/mseemann/angular2-mdl/wiki/How-to-use-the-MdlDialogService');
    }

    let providers: Provider[] = [
      { provide: MDL_CONFIGUARTION, useValue: dialogConfig },
      { provide: InternalMdlDialogReference, useValue: internalDialogRef}
    ];

    let hostDialogComponent = this.createComponentInstance(viewContainerRef, providers, MdlDialogHostComponent);

    internalDialogRef.hostDialogComponentRef  = hostDialogComponent;
    internalDialogRef.isModal                 = dialogConfig.isModal;

    internalDialogRef.closeCallback = () => {
      this.popDialog(internalDialogRef);
      hostDialogComponent.instance.hide(hostDialogComponent);
    };
    this.pushDialog(internalDialogRef);

    return hostDialogComponent;
  }

  private pushDialog(dialogRef: InternalMdlDialogReference) {
    if (this.openDialogs.length == 0) { // first dialog being opened
        this.onDialogsOpenChanged.emit(true);
    }

    this.openDialogs.push(dialogRef);
    this.orderDialogStack();
  }

  private popDialog(dialogRef: InternalMdlDialogReference) {
    this.openDialogs.splice(this.openDialogs.indexOf(dialogRef), 1);
    this.orderDialogStack();

    if (this.openDialogs.length == 0) { // last dialog being closed
      this.onDialogsOpenChanged.emit(false);
    }
  }

  private orderDialogStack() {
    // +1 because the overlay may have MIN_DIALOG_Z_INDEX if the dialog is modal.
    let zIndex = MIN_DIALOG_Z_INDEX + 1;


    this.openDialogs.forEach( (iDialogRef) => {
      iDialogRef.hostDialog.zIndex = zIndex;
      // +2 to make room for the overlay if a dialog is modal
      zIndex += 2;
    });

    this.mdlDialogOutletService.hideBackdrop();

    // if there is a modal dialog append the overloay to the dom - if not remove the overlay from the body
    let topMostModalDialog: InternalMdlDialogReference = this.getTopMostInternalDialogRef();
    if (topMostModalDialog) {
      // move the overlay diredct under the topmos modal dialog
      this.mdlDialogOutletService.showBackdropWithZIndex(topMostModalDialog.hostDialog.zIndex - 1);
    }

  }

  private getTopMostInternalDialogRef(): InternalMdlDialogReference {
    let topMostModalDialog: InternalMdlDialogReference = null;

    for (var i = (this.openDialogs.length - 1); i >= 0; i--) {
      if (this.openDialogs[i].isModal) {
        topMostModalDialog = this.openDialogs[i];
        break;
      }
    }
    return topMostModalDialog;
  }

  private onBackdropClick(){
    let topMostModalDialog: InternalMdlDialogReference = this.getTopMostInternalDialogRef();
    if (topMostModalDialog.config.clickOutsideToClose){
      topMostModalDialog.hide();
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
