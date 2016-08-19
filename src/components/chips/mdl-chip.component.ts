import {
  Component,
  NgModule,
  Input
} from '@angular/core';
import {CommonModule} from '@angular/common';


@Component({
  selector: 'mdl-chip',
  host: {
    '[class.mdl-chip]': 'true'
  },
  template: '<span *ngIf="mdlLabel" class="mdl-chip__text">{{mdlLabel}}</span><ng-content></ng-content>'
})
export class MdlChipComponent {

  @Input('mdl-label') public mdlLabel;

}


const DIRECTIVES = [MdlChipComponent];

@NgModule({
  imports: [CommonModule],
  exports: DIRECTIVES,
  declarations: DIRECTIVES,
})
export class MdlChipModule {}
