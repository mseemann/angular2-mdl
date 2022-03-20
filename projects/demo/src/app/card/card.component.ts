import { AfterContentInit, Component, ViewEncapsulation } from "@angular/core";
import { flyInOutTrigger } from "../animations/flyInOutTrigger-animation";
import { ActivatedRoute, Router } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { AbstractDemoComponent } from "../abstract-demo.component";

@Component({
  selector: "demo-card",
  templateUrl: "card.component.html",
  styleUrls: ["card.component.scss"],
  animations: [flyInOutTrigger],
  encapsulation: ViewEncapsulation.None,
})
export class CardDemoComponent
  extends AbstractDemoComponent
  implements AfterContentInit
{
  constructor(router: Router, route: ActivatedRoute, titleService: Title) {
    super(router, route, titleService);
  }

  public ngAfterContentInit(): void {
    ((d, sc, u) => {
      // eslint-disable-next-line
      const s: any = d.createElement(sc);
      // eslint-disable-next-line
      const p: any = d.getElementsByTagName(sc)[0];
      s.type = "text/javascript";
      s.async = true;
      s.src = u + "?v=" + +new Date();
      p.parentNode.insertBefore(s, p);
    })(
      document,
      "script",
      "//aff.bstatic.com/static/affiliate_base/js/flexiproduct.js"
    );
  }

  public booknow(): void {
    const url = "http://www.booking.com/index.html?aid=818140";
    window.open(url);
  }
}
