import {Directive, HostBinding} from '@angular/core';


@Directive({
  // eslint-disable-next-line
  selector: 'mdl-layout-header[mdl-layout-header-transparent]'
})
export class MdlLayoutHeaderTransparentDirective {
  @HostBinding('class.mdl-layout__header--transparent') isTransparent = true;
}
