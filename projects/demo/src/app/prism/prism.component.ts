import {Directive, ElementRef, OnInit} from '@angular/core';
import {Prism} from './prism.vendor';

@Directive({
  selector: '[demoPrism]'
})
export class PrismDirective implements OnInit {


  constructor(private el: ElementRef) {
  }

  public ngOnInit() {
    const rawHtml = this.el.nativeElement.textContent.replace(new RegExp('=""', 'g'), '');
    const html = Prism.highlight(rawHtml, Prism.languages.html);
    this.el.nativeElement.innerHTML = html;
  }

}
