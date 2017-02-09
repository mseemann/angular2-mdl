import {
  Component,
  ViewEncapsulation,
  HostListener,
  forwardRef,
  Inject,
  ViewChildren,
  QueryList,
  ElementRef
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
  selector: 'mdl-dialog-component',
  template: `
      <h3 class="mdl-dialog__title" *ngIf="dialogConfiguration?.title">{{dialogConfiguration?.title}}</h3>
      <div class="mdl-dialog__content" [innerHTML]="dialogConfiguration?.message"></div>
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
  `,
  encapsulation: ViewEncapsulation.None
})
export class MdlSimpleDialogComponent {

  @ViewChildren('button') public buttons: QueryList<ElementRef>;

  // why do i need forwardRef at this point, the demo LoginDialog dosn't need this!?!?
  constructor(
    @Inject(forwardRef( () => MDL_CONFIGUARTION)) public dialogConfiguration: IMdlSimpleDialogConfiguration,
    @Inject(forwardRef( () => MdlDialogReference)) public dialog: MdlDialogReference) {

    dialog.onVisible().subscribe( () => {
      if(this.buttons){
        this.buttons.first.nativeElement.focus();
      }
    })
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
