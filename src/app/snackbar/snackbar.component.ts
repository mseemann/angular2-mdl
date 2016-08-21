import {
  Component,
  ViewContainerRef
} from '@angular/core';
import {
  MdlSnackbarService
} from '../../components';
import { flyInOutTrigger } from './../animations/flyInOutTrigger-animation';
import { hostConfig } from './../animations/flyInOutTrigger-animation';

@Component({
  moduleId: module.id,
  selector: 'snackbar-demo',
  host: hostConfig,
  animations: [
    flyInOutTrigger
  ],
  templateUrl: 'snackbar.component.html'
})
export class SnackbarDemo {

  constructor(private mdlSnackbarService: MdlSnackbarService, private vcRef: ViewContainerRef) {
    mdlSnackbarService.setDefaultViewContainerRef(vcRef);
  }

  public showSnackbar() {
    this.mdlSnackbarService.showSnackbar({
      message: 'The Message',
      action: {
        handler: () => {
          this.mdlSnackbarService.showToast('You hit the ok Button');
        },
        text: 'OK'
      }
    });
  }
}
