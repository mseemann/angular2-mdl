import {
  Component,
  ViewEncapsulation,
  HostListener,
  forwardRef,
  Inject,
  ViewContainerRef,
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
        <div class="mdl-dialog__content">
          <p>
            {{dialogConfiguration?.message}}
          </p>
        </div>
        <div 
          class="mdl-dialog__actions" 
          [ngClass]="{'mdl-dialog__actions--full-width': dialogConfiguration?.fullWidthAction}">
          <button 
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
export class MdlDialogComponent implements IMdlCustomDialog {

  // why do i need forwardRef at this point, the demo LoginDialog dosn't need this!?!?
  constructor(
    private vcRef: ViewContainerRef,
    @Inject(forwardRef( () => MDL_CONFIGUARTION)) public dialogConfiguration: IMdlSimpleDialogConfiguration,
    @Inject(forwardRef( () => MdlDialogReference)) private dialog: MdlDialogReference) {}

  get viewContainerRef() {
    return this.vcRef;
  }

  public actionClicked(action: IMdlDialogAction) {
    action.handler();
    this.dialog.hide();
  }

  // TODO this will only work if the dialog has the focus
  // TODO Docu: if you create a custom dialog you need to implement this functionality by yourself.
  @HostListener('keydown.esc')
  protected onEsc(): void {
    // TODO really bas design - may be two different dialog components?
    let actions: [IMdlDialogAction] = this.dialogConfiguration.actions;
    // run the first aciton that is marked as closing action
    if ( actions ) {
      let closeAction = actions.find( action => action.isClosingAction);
      if (closeAction) {
        closeAction.handler();
      }
      this.dialog.hide();
    }
  }

}
