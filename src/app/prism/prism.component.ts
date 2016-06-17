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
  directives: [],
  encapsulation: ViewEncapsulation.Emulated
})
export class PrismComponent implements OnInit {

  private el:HTMLElement;

  constructor(private elt:ElementRef){
    this.el = elt.nativeElement;
  }

  ngOnInit(){
    // remove empty attribute values
    console.log(this.el.innerText);
    var rawHtml = this.el.innerText.replace(new RegExp('=""', 'g'), '');
    rawHtml = rawHtml.replace(new RegExp('<br/>', 'g'), '\n');
    var html:string = Prism.highlight(rawHtml, Prism.languages.html);
    var pre = document.createElement('pre');

    pre.innerHTML = html;
    this.el.innerHTML = '';
    this.el.appendChild(pre);
  }
}
