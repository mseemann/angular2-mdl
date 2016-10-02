import {
  Component,
  forwardRef,
  Inject,
  ComponentFactoryResolver, ViewContainerRef
} from '@angular/core';
import { flyInOutTrigger } from '../animations/flyInOutTrigger-animation';
import { hostConfig } from '../animations/flyInOutTrigger-animation';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AbstractDemoComponent } from '../abstract-demo.component';
import {
  MdlDialogService,
  ConfirmResult,
  MdlDialogReference } from '../../../lib/components/dialog/index';
import { MdlSnackbarService } from '../../../lib/components/snackbar/mdl-snackbar.service';
import { LoginDialogComponent } from './login-dialog.component';
import { Angular2MdlAppComponent } from '../app.component';

@Component({
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
    private dialogService: MdlDialogService,
    private snackbarService: MdlSnackbarService,
    @Inject(forwardRef(() => Angular2MdlAppComponent)) private app: Angular2MdlAppComponent,
    private componentFactoryResolver: ComponentFactoryResolver,
    private vcRef: ViewContainerRef) {

    super(router, route, titleService);
    // TODO why is ot not possibe to use this.app.vcRef instead of vcRef?
    // -> animaito errors if option dialog is present
    snackbarService.setDefaultViewContainerRef(vcRef);


    dialogService.setDefaultViewContainerRef(this.app.vcRef);
  }

  public showAlert() {
    let result = this.dialogService.alert('This is a simple Alert');
    result.then( () => console.log('alert closed') );
  }

  public showConfirmMessage() {
    let result = this.dialogService.confirm('Would you like a mug of coffee?', 'No', 'Yes');
    result.then( choosedOption => console.log( choosedOption === ConfirmResult.Confirmed ) );
  }

  public showDialogFullWidthAction() {
    let pDialog = this.dialogService.showDialog({
      title: 'Your choice?',
      message: 'What drink do you prefer to your meal?',
      actions: [
        {
          handler: () => {
              this.snackbarService.showToast('Coke');
          },
          text: 'One Coke' ,
          isClosingAction: true
        },
        {
          handler: () => {
            this.snackbarService.showToast('Vine');
          },
          text: 'A bottle of vine'
        },
        {
          handler: () => {
            this.snackbarService.showToast('Beer');
          },
          text: 'A pint of beer'
        }
      ],
      fullWidthAction: true,
      isModal: false
    });
    pDialog.then( (dialogReference) => console.log('dialog visible', dialogReference) );
  }

  public showDialog() {

    let pDialog = this.dialogService.showCustomDialog({
      component: LoginDialogComponent,
      isModal: true
    });
    pDialog.then( (dialogReference: MdlDialogReference) => {
      console.log('dialog visible', dialogReference);
    });
  }
}
