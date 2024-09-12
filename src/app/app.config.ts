import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withPreloading } from '@angular/router';

import { routes } from './app.routes';
import { LoggingPreloadingStrategy } from './services/logging-preloading-strategy';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withPreloading(LoggingPreloadingStrategy)),
    { provide: LoggingPreloadingStrategy, useClass: LoggingPreloadingStrategy },
  ],
};
