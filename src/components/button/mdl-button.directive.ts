import {
  Directive,
  ElementRef,
  Renderer,
  OnInit} from '@angular/core';

@Directive({
  selector: 'button[mdl-button]'
})
export class MdlButtonDirective implements OnInit {

  cssClasses:string[] = ['mdl-button', 'mdl-button--raised', 'mdl-button--colored'];

  constructor(private renderer: Renderer, private elementRef: ElementRef){
  }

  ngOnInit(){
    this.cssClasses.forEach( (cssClass) => {
      this.renderer.setElementClass(this.elementRef.nativeElement, cssClass, true)
    })

  }


}
