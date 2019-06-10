import {Component} from '@angular/core';

import {flyInOutTrigger} from '../animations/flyInOutTrigger-animation';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {AbstractDemoComponent} from '../abstract-demo.component';
import {MdlSnackbarService} from '@angular-mdl/core';

@Component({
  selector: 'demo-snackbar',
  animations: [
    flyInOutTrigger
  ],
  templateUrl: 'snackbar.component.html'
})
export class SnackbarDemoComponent extends AbstractDemoComponent {

  constructor(
    router: Router,
    route: ActivatedRoute,
    titleService: Title,
    private mdlSnackbarService: MdlSnackbarService) {
    super(router, route, titleService);
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
