import {NgModule} from "@angular/core";
import {ScrAuthenticationLoginService} from "./login.service";
import {ScrAuthenticationLoginComponent} from "./login.component";

export * from 'login.component';
export * from 'login.service';

@NgModule({
  imports: [],
  declarations: [
    ScrAuthenticationLoginComponent
  ],
  exports: [
    ScrAuthenticationLoginComponent
  ],
  providers: [
    ScrAuthenticationLoginService
  ]
})
export class ScrAuthenticationLoginModule {

}
