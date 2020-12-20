import {Component, EventEmitter, HostBinding, Input, Output, ViewEncapsulation} from '@angular/core';


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

  // eslint-disable-next-line
  @Input('mdl-label')
  mdlLabel;

  // eslint-disable-next-line
  @Input('mdl-action-icon')
  mdlActionIcon;

  // eslint-disable-next-line
  @Output('action-click')
  actionClick = new EventEmitter();

  @HostBinding('class.mdl-chip')
  isChip = true;

  @HostBinding('class.mdl-chip--contact')
  isChipContact = false;

  action(): void {
    this.actionClick.emit();
  }
}


