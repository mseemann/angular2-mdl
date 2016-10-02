import {
  Directive,
  Optional,
  forwardRef,
  Inject,
  OnInit
} from '@angular/core';
import { MdlChipComponent } from './mdl-chip.component';
import { MdlStructureError } from '../common/mdl-error';

@Directive({
  selector: '[mdl-chip-contact]',
  host: {
    '[class.mdl-chip__contact]': 'true'
  }
})
export class MdlChipContactDirective implements OnInit {

  constructor(@Optional() @Inject(forwardRef(() => MdlChipComponent))  private mdlChipComponent: MdlChipComponent) {
  }

  public ngOnInit() {
    if (!this.mdlChipComponent) {
      throw new MdlStructureError('mdl-chip-contact', 'mdl-chip');
    }
  }
}

