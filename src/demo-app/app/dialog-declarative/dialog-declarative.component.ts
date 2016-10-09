import {
  Component,
  ViewChild,
  ViewChildren,
  QueryList,
  OnInit, AfterContentInit, ContentChildren, AfterViewInit, AfterViewChecked
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
import { MdlTextFieldComponent } from '../../../lib/components/textfield/mdl-textfield.component';

@Component({
  selector: 'dialog-declarative-demo',
  host: hostConfig,
  animations: [
    flyInOutTrigger
  ],
  templateUrl: 'dialog-declarative.component.html'
})
export class DialogDeclarativeDemo extends AbstractDemoComponent implements AfterViewInit {

  public username: string = 'testuser';

  @ViewChild('editUserDialog') private  editUserDialog: MdlDialogComponent;
  @ViewChildren(MdlTextFieldComponent) private tfList: QueryList<MdlTextFieldComponent>;

  constructor(
    router: Router,
    route: ActivatedRoute,
    titleService: Title) {
    super(router, route, titleService);
  }

  public ngAfterViewInit() {
    console.log('afterviewinit', this.tfList);
    if(this.tfList){
      console.log(this.tfList.first);
      this.tfList.first.setFocus();
      this.tfList.changes.subscribe( (x) => {
        console.log(x);
      })
    }
  }

  public alertConfirmd(){
    console.log('alertConfirmd');
  }

  public saveUser() {
    console.log('user saved!', this.tfList);
    this.editUserDialog.close();
  }

  public onDialogShow(){

    console.log('dialog shown');
  }
}
