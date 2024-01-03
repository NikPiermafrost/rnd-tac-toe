import { ApplicationConfig, isDevMode } from '@angular/core';
import { PreloadAllModules, provideRouter, withHashLocation, withPreloading } from '@angular/router';

import { routes } from './app.routes';
import { provideServiceWorker } from '@angular/service-worker';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withHashLocation(), 
    withPreloading(PreloadAllModules)), 
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    }
  )]
};
