import { ApplicationConfig, provideBrowserGlobalErrorListeners, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

// модулі
import { CustomRoutingModule } from './custom-routing/custom-routing-module';
import { CustomRoutingRoutingModule } from './custom-routing/custom-routing-routing-module';

// інтерсептор
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { customInterceptor } from './custom-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),

    // Підключаємо модулі
    importProvidersFrom(CustomRoutingModule),
    importProvidersFrom(CustomRoutingRoutingModule),

    // Інтерсептор
    {
      provide: HTTP_INTERCEPTORS,
      useValue: customInterceptor,
      multi: true
    }

  ]
};
