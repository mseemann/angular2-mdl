import {
  Component,
  Inject,
  ViewContainerRef
} from '@angular/core';
import {
  MDL_DIRECTIVES,
  MdlSnackbarService
} from '../../components';
import { PrismDirective } from './../prism/prism.component';

@Component({
  moduleId: module.id,
  selector: 'snackbar-demo',
  templateUrl: 'snackbar.component.html',
  directives: [
    MDL_DIRECTIVES,
    PrismDirective
  ]
})
export class SnackbarDemo {

  constructor(private mdlSnackbarService: MdlSnackbarService, private vcRef: ViewContainerRef){
    mdlSnackbarService.setDefaultViewContainerRef(vcRef);
  }

  showSnackbar(){
    this.mdlSnackbarService.showSnackbar({
      message:'The Message',
      timeout:2000,
      actionHandler:()=>{
        this.mdlSnackbarService.showToast('You hit the ok Button');
      },
      actionText:'OK'
    });
  }
}
