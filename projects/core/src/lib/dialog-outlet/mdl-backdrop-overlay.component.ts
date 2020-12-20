import {Component, EventEmitter, HostBinding, HostListener, NgZone, ViewEncapsulation} from '@angular/core';


@Component({
  selector: 'mdl-backdrop-overlay',
  template: ``,
  styles: [
    `
      .dialog-backdrop {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.1);
      }
    `
  ],
  encapsulation: ViewEncapsulation.None
})
export class MdlBackdropOverlayComponent {
  @HostBinding('style.zIndex')
  zIndex = 0;

  @HostBinding('class.dialog-backdrop')
  isBackdrop = true;

  public clickEmitter: EventEmitter<void> = new EventEmitter();

  private visible = false;

  constructor(private ngZone: NgZone) {
  }

  @HostBinding('style.display')
  get display(): string | null {
    return this.visible ? null : 'none';
  }

  @HostListener('click', ['$event'])
  onBackdropClick(e: Event): void {
    // this event runs not in angular zone of the main app. make sure it runs in the main angular zone
    // and change detection works
    this.ngZone.run(() => {
      this.clickEmitter.emit();
    });
    e.stopPropagation();
  }

  hide(): void {
    this.visible = false;
  }

  showWithZIndex(zIndex: number): void {
    this.zIndex = zIndex;
    this.visible = true;
  }
}
