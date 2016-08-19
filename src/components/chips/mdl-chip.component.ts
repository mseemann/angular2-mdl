import {
  Component,
  NgModule,
  Input,
  EventEmitter,
  Output
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdlIconModule } from './../icon/mdl-icon.component';


@Component({
  selector: 'mdl-chip',
  host: {
    '[class.mdl-chip]': 'true'
  },
  template: `
    <span *ngIf="mdlLabel" class="mdl-chip__text">{{mdlLabel}}</span>
    <button *ngIf="mdlActionIcon" (click)="action()" type="button" class="mdl-chip__action">
      <mdl-icon>{{mdlActionIcon}}</mdl-icon>
    </button>
    <ng-content></ng-content>
  `
})
export class MdlChipComponent {

  @Input('mdl-label') public mdlLabel;
  @Input('mdl-action-icon') public mdlActionIcon;
  @Output('action-click') private actionClick = new EventEmitter();

  public action() {
    this.actionClick.emit();
  }
}


const DIRECTIVES = [MdlChipComponent];

@NgModule({
  imports: [MdlIconModule, CommonModule],
  exports: DIRECTIVES,
  declarations: DIRECTIVES,
})
export class MdlChipModule {}
