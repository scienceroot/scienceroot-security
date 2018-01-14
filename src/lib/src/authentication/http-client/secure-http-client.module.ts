import { NgModule } from '@angular/core';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { authOptionsFactory } from './auth-http.factory';
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import {BdAuthenticationErrorInterceptor} from "./authentifictation-error.interceptor";

export * from './authentifictation-error.interceptor';

@NgModule({
  imports: [
    HttpClientModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: authOptionsFactory,
        deps: [AuthStore]
      }
    }),
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: BdAuthenticationErrorInterceptor,
    multi: true,
  }],
  exports: [ HttpClientModule ]
})
export class ScrSecureHttpClientModule {

}
