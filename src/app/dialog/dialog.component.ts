import {
  Component,
  ViewContainerRef
} from '@angular/core';
import { flyInOutTrigger } from './../animations/flyInOutTrigger-animation';
import { hostConfig } from './../animations/flyInOutTrigger-animation';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AbstractDemoComponent } from './../abstract-demo.component';
import { MdlDialogService, ConfirmResult } from '../../components/dialog/mdl-dialog.service';
import { MdlSnackbarService } from '../../components/snackbar/mdl-snackbar.service';
import { LoginDialogComponent } from './login-dialog.component';

@Component({
  moduleId: module.id,
  selector: 'dialog-demo',
  host: hostConfig,
  animations: [
    flyInOutTrigger
  ],
  templateUrl: 'dialog.component.html'
})
export class DialogDemo extends AbstractDemoComponent {

  constructor(
    router: Router,
    route: ActivatedRoute,
    titleService: Title,
    private vcRef: ViewContainerRef,
    private dialogService: MdlDialogService,
    private snackbarService: MdlSnackbarService) {

    super(router, route, titleService);
    snackbarService.setDefaultViewContainerRef(vcRef);
    dialogService.setDefaultViewContainerRef(vcRef);

  }

  public showAlert() {
    let result = this.dialogService.alert('This is a simple Alert');
    result.then( () => console.log('alert closed') );
  }

  public showConfirmMessage() {
    let result = this.dialogService.confirm('Would you like a mug of coffee?', 'No', 'Yes');
    result.then( choosedOption => console.log( choosedOption === ConfirmResult.Confirmed ) );
  }

  public showDialog() {
    let pDialog = this.dialogService.showDialog({
      message: 'Dialog with three actions',
      actions: [
        {
          handler: () => {
              this.snackbarService.showToast('Dialog closed with Button 1');
          },
          text: 'Button 1' ,
          isClosingAction: true
        },
        {
          handler: () => {
            this.snackbarService.showToast('Dialog closed with Button 2');
          },
          text: 'Button 2'
        },
        {
          handler: () => {
            this.snackbarService.showToast('Dialog closed with Button 3');
          },
          text: 'Button 3' ,
          isClosingAction: false
        }
      ],
      isModal: true
    });
    pDialog.then( (dialog) => console.log('dialog visible') );
  }

  public showDialogFullWidthAction() {
    let pDialog = this.dialogService.showCustomDialog({
      component: LoginDialogComponent,
      isModal: true
    });
    pDialog.then( () => console.log('dialog visible') );
  }
}
