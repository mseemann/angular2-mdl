import {
  NgModule,
  ApplicationRef
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MdlModule } from './../components/index';
import { RouterModule } from '@angular/router';
import { Angular2MdlAppComponent } from './app.component';
import { APP_ROUTER_PROVIDERS } from './app.routes';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    MdlModule,
    RouterModule
  ],
  providers: [
    APP_ROUTER_PROVIDERS,
  ],
  declarations: [
    Angular2MdlAppComponent
  ],
  entryComponents: [
    Angular2MdlAppComponent
  ],
})
export class Angular2MdlAppModule {

  constructor(private appRef: ApplicationRef) { }

  public ngDoBootstrap() {
    this.appRef.bootstrap(Angular2MdlAppComponent);
  }
}
