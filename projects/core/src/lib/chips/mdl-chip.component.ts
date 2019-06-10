import {Component, ContentChild, EventEmitter, HostBinding, Input, Output, ViewEncapsulation} from '@angular/core';
import {MdlChipContactDirective} from './mdl-chip-contact.directive';


@Component({
  selector: 'mdl-chip',
  template: `
    <ng-content></ng-content>
    <span *ngIf="mdlLabel" class="mdl-chip__text">{{mdlLabel}}</span>
    <button *ngIf="mdlActionIcon" (click)="action()" type="button" class="mdl-chip__action">
      <mdl-icon>{{mdlActionIcon}}</mdl-icon>
    </button>
  `,
  encapsulation: ViewEncapsulation.None
})
export class MdlChipComponent {

  // tslint:disable-next-line
  @Input('mdl-label') public mdlLabel;

  // tslint:disable-next-line
  @Input('mdl-action-icon') public mdlActionIcon;

  // tslint:disable-next-line
  @Output('action-click') public actionClick = new EventEmitter();

  @HostBinding('class.mdl-chip') isChip = true;

  @HostBinding('class.mdl-chip--contact')
  @ContentChild(MdlChipContactDirective, {static: true}) chipContact: MdlChipContactDirective;

  public action() {
    this.actionClick.emit();
  }
}


