import {
  Component,
  ViewEncapsulation,
  HostListener,
  forwardRef,
  Inject,
  ViewContainerRef,
  AfterViewInit,
  ViewChildren,
  QueryList,
  ElementRef
} from '@angular/core';
import {
  IMdlDialogAction,
  MdlDialogReference,
  IMdlCustomDialog,
  MDL_CONFIGUARTION,
  IMdlSimpleDialogConfiguration
} from './mdl-dialog.service';

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
export class MdlDialogComponent implements IMdlCustomDialog, AfterViewInit {

  @ViewChildren('button') private buttons: QueryList<ElementRef>;

  // why do i need forwardRef at this point, the demo LoginDialog dosn't need this!?!?
  constructor(
    private vcRef: ViewContainerRef,
    @Inject(forwardRef( () => MDL_CONFIGUARTION)) private dialogConfiguration: IMdlSimpleDialogConfiguration,
    @Inject(forwardRef( () => MdlDialogReference)) private dialog: MdlDialogReference) {}

  get viewContainerRef() {
    return this.vcRef;
  }

  public ngAfterViewInit() {
    // set the focus to the first focuable element
    setTimeout( () => {
      this.buttons.first.nativeElement.focus();
    }, 1);
  }

  public actionClicked(action: IMdlDialogAction) {
    action.handler();
    this.dialog.hide();
  }


  // TODO Docu: if you create a custom dialog you need to implement this functionality by yourself.
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
