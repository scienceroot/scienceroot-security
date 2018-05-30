import {NgModule} from "@angular/core";
import {RouterModule, Routes} from '@angular/router';
import {ScrAuthenticationLoginComponent} from './login/login.component';
import {ScrAuthenticationLoginModule} from "./login/login.module";
import {ScrAuthenticationGuard} from "./authentication.guard";
import {ScrPasswordResetComponent} from './reset/reset.component';
import {ScrPasswordResetModule} from './reset/reset.module';
import {ScrPasswordResetService} from './reset/reset.service';
import {ScrPasswordSetComponent} from './reset/set.component';

export * from './authentication.const';
export * from './authentication.guard';

export * from './http-client/secure-http-client.module';
export * from './login/login.module';
export * from './store/index';

const routes: Routes = [
  {path: 'login', component: ScrAuthenticationLoginComponent},
  {path: 'forgotPassword', component: ScrPasswordResetComponent},
  {path: 'resetPassword', component: ScrPasswordSetComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    ScrAuthenticationLoginModule,
    ScrPasswordResetModule
  ],
  declarations: [
  ],
  exports: [
    RouterModule,
    ScrAuthenticationLoginModule
  ],
  providers: [
    ScrAuthenticationGuard
  ]
})
export class ScrAuthenticationModule {

}
