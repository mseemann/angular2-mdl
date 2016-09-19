import {
  Injectable,
  ViewContainerRef
} from '@angular/core';

@Injectable()
export class MdlDialogService {

  private defaultViewContainerRef: ViewContainerRef;

  public setDefaultViewContainerRef(vcRef: ViewContainerRef) {
    this.defaultViewContainerRef = vcRef;
  }

  public showAlert(alertMessage: string) {

  }
}
