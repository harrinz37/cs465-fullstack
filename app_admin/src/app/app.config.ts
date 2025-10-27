// app_admin/src/app/app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app-routing';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { jwtInterceptor } from './jwt.interceptor';
import { AuthenticationService } from './services/authentication.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([jwtInterceptor])),
    AuthenticationService
  ]
};
