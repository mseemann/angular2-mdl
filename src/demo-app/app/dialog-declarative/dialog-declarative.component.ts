import {
  Component,
  ViewChild
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
  MdlDialogComponent
} from '../../../lib/components/dialog/index';

@Component({
  selector: 'dialog-declarative-demo',
  host: hostConfig,
  animations: [
    flyInOutTrigger
  ],
  templateUrl: 'dialog-declarative.component.html'
})
export class DialogDeclarativeDemo extends AbstractDemoComponent {

  public username: string = 'testuser';

  @ViewChild('editUserDialog') private  editUserDialog: MdlDialogComponent;

  constructor(
    router: Router,
    route: ActivatedRoute,
    titleService: Title) {
    super(router, route, titleService);
  }


  public saveUser() {
    console.log('user saved!');
    this.editUserDialog.close();
  }
}
