import {
  Component,
  ViewEncapsulation,
  HostListener,
  forwardRef,
  Inject,
  AfterViewInit,
  ViewChildren,
  QueryList,
  ElementRef,
  NgZone
} from '@angular/core';
import {
  MdlDialogReference,
  MDL_CONFIGUARTION
} from './mdl-dialog.service';
import {
  IMdlDialogAction,
  IMdlSimpleDialogConfiguration
} from './mdl-dialog-configuration';

@Component({
  selector: 'mdl-dialog',
  host: {
    '[class.mdl-dialog]': 'true',
    '[class.open]': 'visible',
  },
  template: `<ng-content></ng-content>`
})
export class MdlDialogComponent {
  private visible: boolean = false;
  public show() {
    this.visible = true;
  }
  public close() {
    this.visible = false;
  }
}

// @experimental
@Component({
  selector: 'mdl-dialog-component',
  host: {
    '[class.mdl-dialog]': 'true',
    '[class.open]': 'true',
    '[class.fixed]': 'true'
  },
  template: `
      <div>
        <h3 class="mdl-dialog__title" *ngIf="dialogConfiguration?.title">{{dialogConfiguration?.title}}</h3>
        <div class="mdl-dialog__content">{{dialogConfiguration?.message}}</div>
        <div 
          class="mdl-dialog__actions" 
          [ngClass]="{'mdl-dialog__actions--full-width': dialogConfiguration?.fullWidthAction}">
          <button
            #button
            type="button" 
            class="mdl-button mdl-color-text--primary" 
            *ngFor="let action of dialogConfiguration?.actions" 
            (click)="actionClicked(action)"
            [ngClass]="{'close': action.isClosingAction}">{{action.text}}</button>
        </div>
      </div>
  `,
  encapsulation: ViewEncapsulation.None
})
export class MdlDialogDefaultComponent implements AfterViewInit {

  @ViewChildren('button') private buttons: QueryList<ElementRef>;

  // why do i need forwardRef at this point, the demo LoginDialog dosn't need this!?!?
  constructor(
    @Inject(forwardRef( () => MDL_CONFIGUARTION)) private dialogConfiguration: IMdlSimpleDialogConfiguration,
    @Inject(forwardRef( () => MdlDialogReference)) private dialog: MdlDialogReference,
    private ngZone: NgZone) {}

  public ngAfterViewInit() {
    // set the focus to the first focuable element
    this.ngZone.onMicrotaskEmpty.subscribe( () => {
      this.buttons.first.nativeElement.focus();
    });
  }

  public actionClicked(action: IMdlDialogAction) {
    action.handler();
    this.dialog.hide();
  }

  @HostListener('keydown.esc')
  public onEsc(): void {
    // run the first action that is marked as closing action
    let closeAction = this.dialogConfiguration.actions.find( action => action.isClosingAction);
    if (closeAction) {
      closeAction.handler();
      this.dialog.hide();
    }
  }

}
