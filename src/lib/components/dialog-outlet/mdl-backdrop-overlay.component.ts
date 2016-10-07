import { Component, HostListener, HostBinding, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'mdl-backdrop-overlay',
  host: {
    '[class.dialog-backdrop]': 'true',
  },
  template: ``,
  styles: [
    `    
      .dialog-backdrop {
        position: fixed;
        top: 0; right: 0; bottom: 0; left: 0;
        background: rgba(0,0,0,0.1);
      }
    `
  ],
  encapsulation: ViewEncapsulation.None
})
export class MdlBackdropOverlayComponent {

  @HostBinding('style.display')
  get display() {
    return this.visible ? null : 'none';
  }
  private visible = false;

  @HostBinding('style.zIndex')
  private zIndex = 0;

  @HostListener('click', ['$event'])
  public onBackdropClick(e) {
    e.stopPropagation();
  }

  public hide() {
    this.visible = false;
  }

  public showWithZIndex(zIndex: number) {
    this.zIndex = zIndex;
    this.visible = true;
  }
}
