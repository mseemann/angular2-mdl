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
    private dialogService: MdlDialogService) {

    super(router, route, titleService);
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

  }

  public showDialogFullWidthAction() {

  }
}
