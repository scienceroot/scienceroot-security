import {NgModule} from "@angular/core";
import {ScrAuthenticationLoginModule} from "./login/login.module";

export * from './authentication.const';

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
  ]
})
export class ScrAuthenticationModule {

}
