import {NgModule} from "@angular/core";
import {ScrAuthenticationLoginService} from "./login.service";
import {ScrAuthenticationLoginComponent} from "./login.component";
import {MatButtonModule, MatInputModule} from "@angular/material";
import {RouterModule} from "@angular/router";
import {FlexLayoutModule} from "@angular/flex-layout";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";

export * from './login.component';
export * from './login.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    FlexLayoutModule,
    MatInputModule,
    MatButtonModule
  ],
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
