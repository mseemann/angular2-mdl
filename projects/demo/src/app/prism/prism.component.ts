import { Directive, ElementRef, OnInit } from "@angular/core";
import { Prism } from "./prism.vendor";

@Directive({
  selector: "[demoPrism]",
})
export class PrismDirective implements OnInit {
  constructor(private el: ElementRef) {}

  public ngOnInit(): void {
    const rawHtml = this.el.nativeElement.textContent.replace(
      new RegExp('=""', "g"),
      ""
    );
    this.el.nativeElement.innerHTML = Prism.highlight(
      rawHtml,
      Prism.languages.html
    );
  }
}
