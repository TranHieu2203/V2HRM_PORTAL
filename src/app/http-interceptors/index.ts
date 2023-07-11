/* "Barrel" of Http Interceptors */
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { NoopInterceptor } from './noop-interceptor';
import { LoggingInterceptor } from './logging-interceptor';
import { AuthInterceptor } from './auth-interceptor';
import { TokenInterceptor } from './token-interceoptor';

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  //{ provide: HTTP_INTERCEPTORS, useClass: NoopInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
];