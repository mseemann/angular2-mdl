import {
  Directive,
  OnInit,
  ElementRef
} from '@angular/core';
import { Prism } from './prism.vendor';

@Directive({
  selector: '[prism]'
})
export class PrismDirective implements OnInit {


  constructor(private el: ElementRef) {
  }

  public ngOnInit() {
    var rawHtml = this.el.nativeElement.textContent.replace(new RegExp('=""', 'g'), '');
    var html = Prism.highlight(rawHtml, Prism.languages.html);
    this.el.nativeElement.innerHTML = html;
  }

}
