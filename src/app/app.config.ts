import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { httpAuthInterceptor } from './core/interceptors/http-auth.interceptor';
import { jsonHeaderInterceptor } from './core/interceptors/json-header.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([jsonHeaderInterceptor, httpAuthInterceptor])),
    provideClientHydration()
  ]
};
