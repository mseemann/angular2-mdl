import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {HostBinding, OnDestroy, OnInit} from '@angular/core';


export class AbstractDemoComponent implements OnInit, OnDestroy {

  @HostBinding('style.display') style = 'block';
  private sub: any;
  private windowTitle = 'angular2-mdl';

  constructor(private router: Router, private route: ActivatedRoute, private titleService: Title) {
  }

  @HostBinding('@flyInOut')
  private get slideIn() {
    return true;
  }

  public ngOnInit() {
    this.titleService.setTitle(this.windowTitle);
    this.sub = this.router.events.subscribe((event) => {
      if (this.route.snapshot.data && this.route.snapshot.data.title) {
        const title = this.windowTitle + ' - ' + this.route.snapshot.data.title;
        this.titleService.setTitle(title);
      } else {
        this.titleService.setTitle(this.windowTitle);
      }
    });
  }

  public ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
