import {
  Component,
  ViewContainerRef
} from '@angular/core';
import {
  MdlSnackbarService
} from '../../components';
import { flyInOutTrigger } from './../animations/flyInOutTrigger-animation';
import { hostConfig } from './../animations/flyInOutTrigger-animation';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AbstractDemoComponent } from './../abstract-demo.component';

@Component({
  moduleId: module.id,
  selector: 'snackbar-demo',
  host: hostConfig,
  animations: [
    flyInOutTrigger
  ],
  templateUrl: 'snackbar.component.html'
})
export class SnackbarDemo extends AbstractDemoComponent {

  constructor(
    router: Router,
    route: ActivatedRoute,
    titleService: Title,
    private mdlSnackbarService: MdlSnackbarService,
    private vcRef: ViewContainerRef) {
    super(router, route, titleService);
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
