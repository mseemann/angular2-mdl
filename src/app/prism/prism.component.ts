import {
  Directive,
  Component,
  OnInit,
  ElementRef
} from '@angular/core';
import { Prism } from './prism.vendor';

@Directive({
  selector: '[prism]'
})
export class PrismDirective implements OnInit {


  constructor(private el:ElementRef){

  }

  ngOnInit() {

    var rawHtml = this.el.nativeElement.textContent.replace(new RegExp('=""', 'g'), '');
    // REMOVE the escaped exression so angular ignores the content :(
    rawHtml = rawHtml.replace(new RegExp('{x{', 'g'), '{{');
    var html = Prism.highlight(rawHtml, Prism.languages.html);
    var pre = document.createElement('pre');

    pre.innerHTML = html;
    pre.style.display = 'block';
    pre.style.backgroundColor = '#f5f2f0';
    this.el.nativeElement.innerHTML = '';
    this.el.nativeElement.appendChild(pre);
  }



}
