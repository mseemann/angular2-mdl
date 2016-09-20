import {
  Injectable,
  ViewContainerRef
} from '@angular/core';
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
    isClosingAction: boolean;
  }];
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

    return Promise.resolve();
  }

  public confirm(
    question: string,
    declineText = 'Cancel',
    confirmText = 'Ok',
    vcRef?: ViewContainerRef): Promise<ConfirmResult> {

    return Promise.resolve(ConfirmResult.Confirmed);
  }

  public showDialog(dialogConfiguration: IMdlDialogConfiguration): Promise<MdlDialogComponent> {

    return null;
  }

}
