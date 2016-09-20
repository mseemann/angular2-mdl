import {
  Injectable,
  ViewContainerRef
} from '@angular/core';
import { Type } from '@angular/core/src/type';
import { MdlDialogComponent } from './mdl-dialog.component';


export enum ConfirmResult {
  Confirmed,
  Declined
};

export interface IMdlDialogConfiguration {
  message: string;
  actions?: [{
    handler: () => void;
    text: string;
    isClosingAction?: boolean;
  }];
  fullWidthAction?: boolean;
  vcRef?: ViewContainerRef;
  isModal?: boolean;
}

export interface IMdlCustomDialogConfiguration {
  component: Type<any>;
  vcRef?: ViewContainerRef;
  isModal?: boolean;
}

@Injectable()
export class MdlDialogService {

  private defaultViewContainerRef: ViewContainerRef;

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
              resolve(ConfirmResult.Declined);
            },
            text: declineText,
            isClosingAction: true
          },
          {
            handler: () => {
              resolve(ConfirmResult.Confirmed);
            },
            text: confirmText,
          }
        ],
        vcRef: vcRef,
        isModal: true
      });
    });
  }

  public showDialog(dialogConfiguration: IMdlDialogConfiguration): Promise<MdlDialogComponent> {

    return Promise.resolve(null);
  }

  public showCustomDialog(dialogConfiguration: IMdlCustomDialogConfiguration): Promise<MdlDialogComponent> {

    return Promise.resolve(null);
  }

}
