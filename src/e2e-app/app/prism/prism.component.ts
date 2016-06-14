import { Component, OnInit, ElementRef, ViewEncapsulation } from '@angular/core';
import { Prism } from './prism.vendor';

/**
  Format the content of the component by prism. Needs prism.js to be loaded
 */
@Component({
  moduleId: module.id,
  selector: 'prism',
  template: '<ng-content></ng-content>',
  styleUrls: ['prism.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class PrismDirective implements OnInit {

  private el:HTMLElement;

  constructor(private elt:ElementRef){
    this.el = elt.nativeElement;
  }

  ngOnInit(){
    // remove empty attribute values
    var rawHtml = this.el.innerHTML.replace(new RegExp('=""', 'g'), '');
    var html:string = Prism.highlight(rawHtml, Prism.languages.html);
    var pre = document.createElement('pre');

    pre.innerHTML = html;
    this.el.innerHTML = '';
    this.el.appendChild(pre);
  }
}
