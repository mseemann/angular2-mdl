import {
  Component,
  Input,
  EventEmitter,
  Output,
  ContentChild
} from '@angular/core';
import { MdlChipContactDirective } from './mdl-chip-contact.directive';


@Component({
  selector: 'mdl-chip',
  host: {
    '[class.mdl-chip]': 'true',
    '[class.mdl-chip--contact]': 'chipContact'
  },
  template: `
    <ng-content></ng-content>
    <span *ngIf="mdlLabel" class="mdl-chip__text">{{mdlLabel}}</span>
    <button *ngIf="mdlActionIcon" (click)="action()" type="button" class="mdl-chip__action">
      <mdl-icon>{{mdlActionIcon}}</mdl-icon>
    </button>
  `
})
export class MdlChipComponent {

  @Input('mdl-label') public mdlLabel;
  @Input('mdl-action-icon') public mdlActionIcon;
  @Output('action-click') private actionClick = new EventEmitter();
  @ContentChild(MdlChipContactDirective) protected chipContact: MdlChipContactDirective;

  public action() {
    this.actionClick.emit();
  }
}


