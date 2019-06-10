import {Component} from '@angular/core';
import {flyInOutTrigger} from '../animations/flyInOutTrigger-animation';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {AbstractDemoComponent} from '../abstract-demo.component';

import {LoginDialogComponent, TEST_VALUE} from './login-dialog.component';

import {onErrorResumeNext} from 'rxjs';
import {IOpenCloseRect, MdlDialogReference, MdlDialogService, MdlSnackbarService} from '@angular-mdl/core';


@Component({
  selector: 'demo-dialog',
  animations: [
    flyInOutTrigger
  ],
  templateUrl: 'dialog.component.html'
})
export class DialogDemoComponent extends AbstractDemoComponent {

  constructor(
    router: Router,
    route: ActivatedRoute,
    titleService: Title,
    private dialogService: MdlDialogService,
    private snackbarService: MdlSnackbarService) {

    super(router, route, titleService);

  }

  public showAlert() {
    const result = this.dialogService.alert('This is a simple Alert');
    result.subscribe(() => console.log('alert closed'));
  }

  public showConfirmMessage() {
    const result = this.dialogService.confirm('Would you like a mug of coffee?', 'No', 'Yes');
    // if you need both answers
    result.subscribe(() => {
        console.log('confirmed');
      },
      (err: any) => {
        console.log('declined');
      }
    );
    // if you only need the confirm answer
    onErrorResumeNext(result).subscribe(() => {
      console.log('confirmed 2');
    });
  }

  public showConfirmMessageWithTitle() {
    const result = this.dialogService.confirm('Would you like a mug of coffee?', 'No', 'Yes', 'Excuse me');
    // if you need both answers
    result.subscribe(() => {
        console.log('confirmed');
      },
      (err: any) => {
        console.log('declined');
      }
    );
    // if you only need the confirm answer
    onErrorResumeNext(result).subscribe(() => {
      console.log('confirmed 2');
    });
  }

  public showDialogFullWidthAction($event: MouseEvent) {
    const pDialog = this.dialogService.showDialog({
      title: 'Your choice?',
      message: 'What drink do you prefer to your meal?',
      actions: [
        {
          handler: () => {
            this.snackbarService.showToast('Coke');
          },
          text: 'One Coke',
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
      isModal: false,
      openFrom: $event,
      closeTo: {
        left: document.body.offsetWidth / 2,
        height: 0,
        top: document.body.offsetHeight / 2,
        width: 0
      } as IOpenCloseRect
    });
    pDialog.subscribe((dialogReference) => console.log('dialog visible', dialogReference));
  }

  public showDialog($event: MouseEvent) {

    const pDialog = this.dialogService.showCustomDialog({
      component: LoginDialogComponent,
      providers: [{provide: TEST_VALUE, useValue: 'Just an example'}],
      isModal: true,
      styles: {width: '300px'},
      clickOutsideToClose: true,
      openFrom: $event,
      enterTransitionDuration: 400,
      leaveTransitionDuration: 400
    });
    pDialog.subscribe((dialogReference: MdlDialogReference) => {
      console.log('dialog visible', dialogReference);
    });
  }

}
