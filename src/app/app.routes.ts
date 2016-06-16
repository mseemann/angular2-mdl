import { provideRouter, RouterConfig } from '@angular/router';

import { AppRoutes } from './app.component';

const routes: RouterConfig = [
  ...AppRoutes
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
