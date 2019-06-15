import {Directive, HostBinding, Inject, OnInit, Optional} from '@angular/core';
import {MdlChipComponent} from './mdl-chip.component';
import {MdlStructureError} from '../common/mdl-error';

@Directive({
  // tslint:disable-next-line
  selector: '[mdl-chip-contact]'
})
export class MdlChipContactDirective implements OnInit {

  @HostBinding('class.mdl-chip__contact') isChipContact = true;

  constructor(@Optional() @Inject(MdlChipComponent) private mdlChipComponent: MdlChipComponent) {
  }

  public ngOnInit() {
    if (!this.mdlChipComponent) {
      throw new MdlStructureError('mdl-chip-contact', 'mdl-chip');
    }
    (this.mdlChipComponent as MdlChipComponent).isChipContact = true;
  }
}

