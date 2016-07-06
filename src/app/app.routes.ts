import { provideRouter, RouterConfig } from '@angular/router';

import { appRoutes } from './app.component';

const routes: RouterConfig = [
  ...appRoutes
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
