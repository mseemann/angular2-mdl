import { provideRouter, RouterConfig } from '@angular/router';

import { AppRoutes } from './angular2-mdl.component';

const routes: RouterConfig = [
  ...AppRoutes
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
