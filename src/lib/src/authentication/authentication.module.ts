import {NgModule} from "@angular/core";
import {ScrAuthenticationLoginModule} from "./login/login.module";
import {ScrAuthenticationGuard} from "./authentication.guard";

export * from './authentication.const';
export * from './authentication.guard';

export * from './http-client/secure-http-client.module';
export * from './login/login.module';
export * from './store/index';

@NgModule({
  imports: [
    ScrAuthenticationLoginModule
  ],
  declarations: [
  ],
  exports: [
    ScrAuthenticationLoginModule
  ],
  providers: [
    ScrAuthenticationGuard
  ]
})
export class ScrAuthenticationModule {

}
