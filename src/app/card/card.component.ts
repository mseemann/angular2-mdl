import {
  Component,
  ViewEncapsulation,
  AfterContentInit
} from '@angular/core';
import { flyInOutTrigger } from './../animations/flyInOutTrigger-animation';
import { hostConfig } from './../animations/flyInOutTrigger-animation';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AbstractDemoComponent } from './../abstract-demo.component';

/* tslint:disable */
@Component({
  moduleId: module.id,
  selector: 'card-demo',
  templateUrl: 'card.component.html',
  styles: [
    `
    .demo-card-wide {
      width: 500px;
      margin-right:1rem;
    }
    .demo-card-wide > .mdl-card__title {
      color: #fff;
      height: 176px;
      background: url('assets/sund.jpg') center / cover;
    }
    .demo-card-wide > .mdl-card__menu {
      color: #fff;
    }
    
    .demo-card-square.mdl-card {
      width: 320px;
      height: 320px;
      margin-right:1rem;
    }
    .demo-card-square > .mdl-card__title {
      color: #fff;
      background:
        url('assets/wood.jpg') bottom right 15% no-repeat #46B6AC;
    }

    .demo-card-image.mdl-card {
      width: 256px;
      height: 256px;
      margin-right:1rem;
      background: url('assets/richter.jpg') center / cover;
    }
    .demo-card-image > .mdl-card__actions {
      height: 52px;
      padding: 16px;
      background: rgba(0, 0, 0, 0.2);
    }
    .demo-card-image__filename {
      color: #fff;
      font-size: 14px;
      font-weight: 500;
    }
    
    .demo-card-event.mdl-card {
      width: 256px;
      height: 256px;
      margin-right:1rem;
      background: url('http://r.bstatic.com/static/affiliate_base/img/banners/branded_set_2/200x200/e2ba08df23df8354ed950047c69537ba7a3bb73f.jpg') center / cover;
    }
    .demo-card-event > .mdl-card__actions {
      border-color: rgba(255, 255, 255, 0.2);
    }
    .demo-card-event > .mdl-card__title {
      align-items: flex-start;
    }
    .demo-card-event > .mdl-card__title > h4 {
      margin-top: 0;
    }
    .demo-card-event > .mdl-card__actions {
      display: flex;
      box-sizing:border-box;
      align-items: center;
    }
    .demo-card-event > .mdl-card__actions > .material-icons {
      padding-right: 10px;
    }
    .demo-card-event > .mdl-card__title,
    .demo-card-event > .mdl-card__actions,
    .demo-card-event > .mdl-card__actions > .mdl-button {
      color: #fff;
    }
    
    .example-separator {
      clear: both;  
      margin-bottom: 1rem;
    }
    `
  ],
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
