import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { authInterceptor } from './core/interceptors/auth.interceptor.js';
import { errorInterceptor } from './core/interceptors/error.interceptor.js';

export const appConfig: ApplicationConfig = {
  providers: [
    // provideZoneChangeDetection({eventCoalescing:true}),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor,errorInterceptor]))]
};
