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
import { MdlDialogService } from '../../components/dialog/mdl-dialog.service';

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
    this.dialogService.showAlert('This is a simple Alter');
  }

  public showConfirmMessage() {

  }

  public showDialog() {

  }

  public showDialogFullWidthAction() {

  }
}
