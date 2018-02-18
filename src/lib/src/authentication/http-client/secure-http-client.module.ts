import { NgModule } from '@angular/core';

import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import {ScrAuthenticationErrorInterceptor} from "./authentifictation-error.interceptor";
import {ScrAuthenticationInterceptor} from "./authentication.interceptor";

export * from './authentifictation-error.interceptor';

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ScrAuthenticationErrorInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ScrAuthenticationInterceptor,
      multi: true,
    }
  ],
  exports: [ HttpClientModule ]
})
export class ScrSecureHttpClientModule {

}
