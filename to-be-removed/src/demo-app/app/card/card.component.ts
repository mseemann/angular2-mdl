import {
  Component,
  ViewEncapsulation,
  AfterContentInit
} from '@angular/core';
import { flyInOutTrigger } from '../animations/flyInOutTrigger-animation';
import { hostConfig } from '../animations/flyInOutTrigger-animation';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AbstractDemoComponent } from '../abstract-demo.component';

/* tslint:disable */
@Component({
  selector: 'card-demo',
  templateUrl: 'card.component.html',
  styleUrls: ['card.component.scss'],
  host: hostConfig,
  animations: [
    flyInOutTrigger
  ],
  encapsulation: ViewEncapsulation.None
})
/* tslint:enable */
export class CardDemo extends AbstractDemoComponent implements AfterContentInit {

  constructor(router: Router, route: ActivatedRoute, titleService: Title) {
    super(router, route, titleService);
  }

  public ngAfterContentInit() {
    (function(d, sc, u) {
      var s: any = d.createElement(sc), p: any = d.getElementsByTagName(sc)[0];
      s.type = 'text/javascript';
      s.async = true;
      s.src = u + '?v=' + (+new Date());
      p.parentNode.insertBefore(s, p);
    })(document, 'script', '//aff.bstatic.com/static/affiliate_base/js/flexiproduct.js');
  }

  public booknow() {
    let url = 'http://www.booking.com/index.html?aid=818140';
    window.open(url);
  }
}
