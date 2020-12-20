import {
  AfterContentInit,
  Component,
  ContentChild,
  ContentChildren,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
  QueryList,
} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'mdl-expansion-panel-header',
  template: `
    <ng-content></ng-content>
    <div class="mdl-expansion-panel__header--expand-icon" (click)="onClick()">
      <span *ngIf="!isExpanded" class="material-icons">expand_more</span>
      <span *ngIf="isExpanded" class="material-icons">expand_less</span>
    </div>
  `
})
export class MdlExpansionPanelHeaderComponent {
  @HostBinding('class.mdl-expansion-panel__header') isHeader = true;
  isExpanded = false;
  onChange: EventEmitter<null> = new EventEmitter<null>();

  onClick() {
    this.onChange.emit();
  }
}

@Component({
  selector: 'mdl-expansion-panel-header-list-content',
  template: '<ng-content></ng-content>'
})
export class MdlExpansionPanelHeaderListContentComponent {
  @HostBinding('class.mdl-expansion-panel__header--list-content') isContent = true;
}

@Component({
  selector: 'mdl-expansion-panel-header-secondary-content',
  template: '<ng-content></ng-content>'
})
export class MdlExpansionPanelHeaderSecondaryContentComponent {
  @HostBinding('class.mdl-expansion-panel__header--secondary-content') isSecondaryContent = true;
}

@Component({
  selector: 'mdl-expansion-panel-content',
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line
  host: {
    '[@isExpanded]': 'isExpanded'
  },
  animations: [
    trigger('isExpanded', [
      state('true', style({height: '*'})),
      state('false', style({height: '0px'})),
      transition('* => *', animate('250ms ease-in'))
    ])
  ]
})
export class MdlExpansionPanelContentComponent {
  @HostBinding('class.mdl-expansion-panel__content') isPanelContent = true;
  isExpanded = 'false';
}

@Component({
  selector: 'mdl-expansion-panel-body',
  template: '<ng-content></ng-content>'
})
export class MdlExpansionPanelBodyComponent {
  @HostBinding('class.mdl-expansion-panel__content--body') isContentBody = true;
}

@Component({
  selector: 'mdl-expansion-panel-footer',
  template: '<ng-content></ng-content>'
})
export class MdlExpansionPanelFooterComponent {
  @HostBinding('class.mdl-expansion-panel__content--footer') isContentFooter = true;
}

@Component({
  selector: 'mdl-expansion-panel',
  template: '<ng-content></ng-content>'
})
export class MdlExpansionPanelComponent implements AfterContentInit {
  @ContentChild(MdlExpansionPanelHeaderComponent, {static: true}) header: MdlExpansionPanelHeaderComponent;
  @ContentChild(MdlExpansionPanelContentComponent, {static: true}) content: MdlExpansionPanelContentComponent;
  // eslint-disable-next-line
  @Output() onChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @HostBinding('class.disabled')
  @Input() disabled = false;

  @HostBinding('tabindex') tabindex = 0;
  @HostBinding('class.mdl-expansion-panel') isExpansionPanel = true;

  private isExpanded = false;

  public get expanded() {
    return this.isExpanded;
  }

  // expanded property is getter/setter for the internal 'isExpanded' flag
  @HostBinding('class.expanded')
  @Input()
  public set expanded(bool: boolean) {
    this.toggleIt(bool);
  }

  @HostListener('keyup', ['$event'])
  onKeyUp($event: any) {
    if ($event.key === 'Enter' && !this.disabled) {
      this.toggle();
    }
  }

  ngAfterContentInit() {
    this.header.onChange.subscribe(() => {
      if (!this.disabled) {
        this.toggleIt(!this.isExpanded);
      }
    });
  }

  toggle() {
    this.toggleIt(!this.isExpanded);
  }

  expand() {
    this.toggleIt(true);
  }

  collapse() {
    this.toggleIt(false);
  }

  disableToggle() {
    this.disabled = true;
  }

  enableToggle() {
    this.disabled = false;
  }

  private toggleIt(isExpanded: boolean) {
    this.isExpanded = isExpanded;
    this.content.isExpanded = `${isExpanded}`;
    this.header.isExpanded = isExpanded;
    this.onChange.emit(isExpanded);
  }
}

@Component({
  selector: 'mdl-expansion-panel-group',
  template: '<ng-content></ng-content>'
})
export class MdlExpansionPanelGroupComponent implements AfterContentInit {
  @HostBinding('class.mdl-expansion-panel-group') isPanelGroup = true;
  @ContentChildren(MdlExpansionPanelComponent) panels: QueryList<MdlExpansionPanelComponent>;
  expandedIndex = -1;

  ngAfterContentInit() {
    this.panels.forEach((panel, i) => {
      /**
       * Set the expanded index to the panel index which is initialized in expanded state
       *
       * Having more than one of the panels being initialized in expanded state
       * is NOT supported
       */
      if (panel.expanded) {
        if (this.expandedIndex > -1) {
          const errorMessage = `
            PanelGroup does not support more than one Panel to be expanded initially.

            Make sure only one <mdl-expansion-panel> receives input like [expanded]="true".
            `;
          throw new Error(errorMessage);
        }
        this.expandedIndex = i;
      }

      /**
       * Expand the panel and collapse previously
       * expanded panel when a panel is toggled.
       * Save the new expanded panel index.
       */
      panel.onChange.subscribe((isExpanded: boolean) => {
        if (isExpanded) {
          if (i !== this.expandedIndex && this.expandedIndex >= 0) {
            this.panels.toArray()[this.expandedIndex].collapse();
          }
          this.expandedIndex = i;
        }
        if (!isExpanded && i === this.expandedIndex) {
          this.expandedIndex = -1;
        }
      });
    });
  }

  getExpanded(): number {
    return this.expandedIndex;
  }

  getPanel(index: number): MdlExpansionPanelComponent {
    return this.panels.toArray()[index];
  }

}
